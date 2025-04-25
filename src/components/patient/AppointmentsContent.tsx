
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Calendar, Clock, MapPin, Video, Phone, UserRound, FileText,
  Plus, Search, ChevronLeft, ChevronRight, CheckCircle2,
  MessageSquare, RefreshCw, X, MoreHorizontal
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AppointmentsContent = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Demo appointments data
  const upcomingAppointments = [
    {
      id: 'APP-7821',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: 'Today',
      time: '2:00 PM - 3:00 PM',
      type: 'In-person',
      location: 'General Hospital, Suite 305',
      notes: 'Bring recent test results',
      confirmed: true,
      status: 'scheduled'
    },
    {
      id: 'APP-8342',
      doctorName: 'Dr. Michael Lee',
      specialty: 'General Medicine',
      date: 'August 20, 2024',
      time: '10:30 AM - 11:30 AM',
      type: 'In-person',
      location: 'Community Health Center, Room 120',
      notes: 'Annual physical exam',
      confirmed: true,
      status: 'scheduled'
    },
    {
      id: 'APP-8901',
      doctorName: 'Dr. Emily Chen',
      specialty: 'Dermatology',
      date: 'September 5, 2024',
      time: '1:15 PM - 1:45 PM',
      type: 'Telehealth',
      location: 'Virtual Visit',
      notes: 'Follow-up appointment',
      confirmed: false,
      status: 'pending'
    }
  ];
  
  const pastAppointments = [
    {
      id: 'APP-6754',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: 'June 15, 2024',
      time: '3:30 PM - 4:30 PM',
      type: 'In-person',
      location: 'General Hospital, Suite 305',
      notes: 'Initial consultation',
      status: 'completed'
    },
    {
      id: 'APP-6123',
      doctorName: 'Dr. James Patel',
      specialty: 'Ophthalmology',
      date: 'February 18, 2024',
      time: '9:00 AM - 10:00 AM',
      type: 'In-person',
      location: 'Vision Center, Suite 210',
      notes: 'Annual eye examination',
      status: 'completed'
    },
    {
      id: 'APP-5987',
      doctorName: 'Dr. David Wilson',
      specialty: 'Dentistry',
      date: 'January 10, 2024',
      time: '11:30 AM - 12:30 PM',
      type: 'In-person',
      location: 'Smile Dental Clinic',
      notes: 'Routine dental check-up',
      status: 'completed'
    }
  ];
  
  // Demo available times for appointment scheduling
  const availableTimes = [
    { id: 1, time: '9:00 AM', available: true },
    { id: 2, time: '10:00 AM', available: false },
    { id: 3, time: '11:00 AM', available: true },
    { id: 4, time: '1:00 PM', available: true },
    { id: 5, time: '2:00 PM', available: false },
    { id: 6, time: '3:00 PM', available: true },
    { id: 7, time: '4:00 PM', available: true }
  ];
  
  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case 'In-person':
        return <MapPin className="h-3.5 w-3.5 text-trustBlue-400" />;
      case 'Telehealth':
        return <Video className="h-3.5 w-3.5 text-green-500" />;
      case 'Phone':
        return <Phone className="h-3.5 w-3.5 text-amber-500" />;
      default:
        return <MapPin className="h-3.5 w-3.5 text-trustBlue-400" />;
    }
  };
  
  const getStatusBadge = (status: string, confirmed: boolean | undefined = true) => {
    switch (status) {
      case 'scheduled':
        return confirmed ? (
          <Badge variant="outline" className="text-green-500 border-green-500/30">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Confirmed
          </Badge>
        ) : (
          <Badge variant="outline" className="text-amber-500 border-amber-500/30">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="text-neutral-500 border-neutral-500/30">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Appointments</h2>
          <p className="text-sm text-neutral-400">Schedule and manage your healthcare visits</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-neutral-700 hover:bg-neutral-700">
            <Search className="mr-1.5 h-4 w-4" />
            Find Provider
          </Button>
          <Button variant="trust" size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-neutral-800 p-1 mb-4">
              <TabsTrigger 
                value="upcoming" 
                className="data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger 
                value="past" 
                className="data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400"
              >
                Past
              </TabsTrigger>
              <TabsTrigger 
                value="requests" 
                className="data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400"
              >
                Requests
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-0">
              <Card className="neo-card bg-neutral-900 border-neutral-800">
                <CardHeader className="pb-2 px-4 pt-4 border-b border-neutral-800">
                  <CardTitle className="text-base text-white">Upcoming Appointments</CardTitle>
                  <CardDescription className="text-xs">Your scheduled healthcare visits</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {upcomingAppointments.length > 0 ? (
                    <div className="divide-y divide-neutral-800">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="p-4 hover:bg-neutral-800/50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 rounded-lg bg-trustBlue-900/50 flex items-center justify-center mt-1">
                                <UserRound className="h-5 w-5 text-trustBlue-400" />
                              </div>
                              
                              <div>
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <h3 className="text-sm font-medium text-white">{appointment.doctorName}</h3>
                                  {getStatusBadge(appointment.status, appointment.confirmed)}
                                </div>
                                
                                <p className="text-xs text-neutral-400 mb-2">{appointment.specialty}</p>
                                
                                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                                  <div className="flex items-center">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    {appointment.date}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {appointment.time}
                                  </div>
                                  <div className="flex items-center">
                                    {getAppointmentTypeIcon(appointment.type)}
                                    <span className="ml-1">{appointment.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-2 md:mt-0">
                              {appointment.type === 'Telehealth' && (
                                <Button variant="trust" size="sm" className="h-8 text-xs">
                                  <Video className="mr-1.5 h-3.5 w-3.5" />
                                  Join
                                </Button>
                              )}
                              <Button variant="outline" size="sm" className="h-8 text-xs border-neutral-700">
                                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                                Reschedule
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 p-0 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-neutral-400">No upcoming appointments</p>
                      <Button variant="trust" size="sm" className="mt-3">
                        <Plus className="mr-1.5 h-3.5 w-3.5" />
                        Schedule New
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="past" className="mt-0">
              <Card className="neo-card bg-neutral-900 border-neutral-800">
                <CardHeader className="pb-2 px-4 pt-4 border-b border-neutral-800">
                  <CardTitle className="text-base text-white">Past Appointments</CardTitle>
                  <CardDescription className="text-xs">Your appointment history</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {pastAppointments.length > 0 ? (
                    <div className="divide-y divide-neutral-800">
                      {pastAppointments.map((appointment) => (
                        <div key={appointment.id} className="p-4 hover:bg-neutral-800/50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 rounded-lg bg-neutral-800 flex items-center justify-center mt-1">
                                <UserRound className="h-5 w-5 text-neutral-500" />
                              </div>
                              
                              <div>
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <h3 className="text-sm font-medium text-white">{appointment.doctorName}</h3>
                                  {getStatusBadge(appointment.status)}
                                </div>
                                
                                <p className="text-xs text-neutral-400 mb-2">{appointment.specialty}</p>
                                
                                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                                  <div className="flex items-center">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    {appointment.date}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {appointment.time}
                                  </div>
                                  <div className="flex items-center">
                                    {getAppointmentTypeIcon(appointment.type)}
                                    <span className="ml-1">{appointment.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-2 md:mt-0">
                              <Button variant="outline" size="sm" className="h-8 text-xs border-neutral-700">
                                <FileText className="mr-1.5 h-3.5 w-3.5" />
                                View Notes
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 p-0 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-neutral-400">No past appointments</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="requests" className="mt-0">
              <Card className="neo-card bg-neutral-900 border-neutral-800">
                <CardHeader className="pb-2 px-4 pt-4 border-b border-neutral-800">
                  <CardTitle className="text-base text-white">Appointment Requests</CardTitle>
                  <CardDescription className="text-xs">Pending appointment requests</CardDescription>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <p className="text-neutral-400">No pending appointment requests</p>
                  <Button variant="trust" size="sm" className="mt-3">
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    New Request
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="neo-card bg-neutral-900 border-neutral-800">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-base text-white">Quick Scheduling</CardTitle>
              <CardDescription className="text-xs">Available appointment slots for today</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="sm" className="text-sm h-8">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <h3 className="text-sm font-medium text-white">Today</h3>
                <Button variant="ghost" size="sm" className="text-sm h-8">
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableTimes.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={slot.available ? "outline" : "ghost"}
                    disabled={!slot.available}
                    className={`h-10 text-sm ${slot.available ? 'border-neutral-700 hover:bg-neutral-700' : 'opacity-50'}`}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
              
              <Button variant="ghost" size="sm" className="w-full justify-center text-xs h-7 mt-4">
                See more available times
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card className="neo-card bg-neutral-900 border-neutral-800">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-base text-white">Calendar</CardTitle>
              <CardDescription className="text-xs">Your appointment schedule</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md p-0"
              />
            </CardContent>
          </Card>
          
          <Card className="neo-card bg-neutral-900 border-neutral-800">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-base text-white">Quick Actions</CardTitle>
              <CardDescription className="text-xs">Appointment management</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start border-neutral-700 hover:bg-neutral-700">
                  <MessageSquare className="mr-1.5 h-4 w-4 text-trustBlue-400" />
                  Message Provider
                </Button>
                
                <Button variant="outline" className="w-full justify-start border-neutral-700 hover:bg-neutral-700">
                  <Phone className="mr-1.5 h-4 w-4 text-trustBlue-400" />
                  Call Office
                </Button>
                
                <Button variant="outline" className="w-full justify-start border-neutral-700 hover:bg-neutral-700">
                  <Calendar className="mr-1.5 h-4 w-4 text-trustBlue-400" />
                  Set Reminders
                </Button>
                
                <Button variant="outline" className="w-full justify-start border-neutral-700 hover:bg-neutral-700">
                  <X className="mr-1.5 h-4 w-4 text-trustBlue-400" />
                  Cancel Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsContent;
