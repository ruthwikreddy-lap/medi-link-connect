import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTheme } from '@/contexts/ThemeContext';

const localizer = momentLocalizer(moment);

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    title: 'Annual Checkup',
    start: new Date(2023, 10, 15, 10, 0),
    end: new Date(2023, 10, 15, 11, 0),
    patientName: 'John Doe',
    doctorName: 'Dr. Smith',
    status: 'confirmed',
    notes: 'Regular annual physical examination',
    location: 'Main Clinic, Room 101',
  },
  {
    id: 2,
    title: 'Dental Cleaning',
    start: new Date(2023, 10, 17, 14, 30),
    end: new Date(2023, 10, 17, 15, 30),
    patientName: 'Jane Smith',
    doctorName: 'Dr. Johnson',
    status: 'confirmed',
    notes: 'Regular dental cleaning and checkup',
    location: 'Dental Wing, Room 205',
  },
  {
    id: 3,
    title: 'Follow-up Consultation',
    start: new Date(2023, 10, 20, 9, 0),
    end: new Date(2023, 10, 20, 9, 30),
    patientName: 'Robert Brown',
    doctorName: 'Dr. Williams',
    status: 'pending',
    notes: 'Follow-up on previous treatment',
    location: 'Specialist Center, Room 310',
  },
];

// Generate more appointments for the current month
const generateAppointments = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const appointments = [...mockAppointments];
  
  // Add some appointments for the current month
  for (let i = 1; i < 28; i += 2) {
    if (Math.random() > 0.7) { // Only add appointments to some days
      const hour = 9 + Math.floor(Math.random() * 8); // Hours between 9 AM and 5 PM
      const minute = Math.random() > 0.5 ? 0 : 30; // Either on the hour or half past
      
      const start = new Date(year, month, i, hour, minute);
      const end = new Date(year, month, i, hour + 1, minute);
      
      const appointmentTypes = ['Checkup', 'Consultation', 'Follow-up', 'Vaccination', 'Therapy Session', 'Lab Test'];
      const randomType = appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)];
      
      const patientNames = ['Alice Johnson', 'Bob Smith', 'Carol White', 'David Brown', 'Emma Davis', 'Frank Miller'];
      const randomPatient = patientNames[Math.floor(Math.random() * patientNames.length)];
      
      const doctorNames = ['Dr. Anderson', 'Dr. Baker', 'Dr. Clark', 'Dr. Davis', 'Dr. Evans', 'Dr. Foster'];
      const randomDoctor = doctorNames[Math.floor(Math.random() * doctorNames.length)];
      
      const statuses = ['confirmed', 'pending', 'cancelled'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      const locations = ['Main Clinic', 'East Wing', 'West Wing', 'Specialist Center', 'Urgent Care'];
      const randomLocation = `${locations[Math.floor(Math.random() * locations.length)]}, Room ${100 + Math.floor(Math.random() * 400)}`;
      
      appointments.push({
        id: 100 + appointments.length,
        title: randomType,
        start,
        end,
        patientName: randomPatient,
        doctorName: randomDoctor,
        status: randomStatus,
        notes: `${randomType} appointment`,
        location: randomLocation,
      });
    }
  }
  
  return appointments;
};

const AppointmentsCalendar = () => {
  const { session, profile, isDemoMode } = useAuth();
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  
  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    patientName: '',
    doctorName: '',
    notes: '',
    location: '',
    status: 'pending',
  });
  
  useEffect(() => {
    // In a real app, fetch appointments from API
    // For demo, use generated appointments
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get appointments
        const data = generateAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Failed to load appointments');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAppointments();
  }, []);
  
  const handleSelectEvent = (event) => {
    setSelectedAppointment(event);
    setIsDetailsOpen(true);
  };
  
  const handleSelectSlot = ({ start, end }) => {
    // Open new appointment dialog with the selected time slot
    setNewAppointment(prev => ({
      ...prev,
      date: start,
      startTime: format(start, 'HH:mm'),
      endTime: format(end, 'HH:mm'),
    }));
    setIsNewAppointmentOpen(true);
  };
  
  const handleCreateAppointment = () => {
    // In a real app, send to API
    const { date, startTime, endTime, ...rest } = newAppointment;
    
    // Parse the date and times to create Date objects
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startDate = new Date(date);
    startDate.setHours(startHour, startMinute);
    
    const endDate = new Date(date);
    endDate.setHours(endHour, endMinute);
    
    const newAppointmentObj = {
      id: Date.now(),
      ...rest,
      start: startDate,
      end: endDate,
    };
    
    setAppointments(prev => [...prev, newAppointmentObj]);
    setIsNewAppointmentOpen(false);
    toast.success('Appointment created successfully');
    
    // Reset form
    setNewAppointment({
      title: '',
      date: new Date(),
      startTime: '09:00',
      endTime: '10:00',
      patientName: '',
      doctorName: '',
      notes: '',
      location: '',
      status: 'pending',
    });
  };
  
  const handleUpdateStatus = (status) => {
    // In a real app, send to API
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...apt, status } 
          : apt
      )
    );
    setIsDetailsOpen(false);
    toast.success(`Appointment status updated to ${status}`);
  };
  
  const handleDeleteAppointment = () => {
    // In a real app, send to API
    setAppointments(prev => prev.filter(apt => apt.id !== selectedAppointment.id));
    setIsDetailsOpen(false);
    toast.success('Appointment deleted successfully');
  };
  
  const eventStyleGetter = (event) => {
    let backgroundColor = '#3182ce'; // Default blue
    
    switch (event.status) {
      case 'confirmed':
        backgroundColor = '#38a169'; // Green
        break;
      case 'pending':
        backgroundColor = '#d69e2e'; // Yellow
        break;
      case 'cancelled':
        backgroundColor = '#e53e3e'; // Red
        break;
      default:
        backgroundColor = '#3182ce'; // Blue
    }
    
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0',
        display: 'block',
      },
    };
  };
  
  const calendarFormats = useMemo(() => ({
    dayFormat: 'ddd D',
  }), []);
  
  const isProvider = profile?.user_type === 'provider';
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Appointments Calendar</h1>
        {isProvider && (
          <Button 
            onClick={() => setIsNewAppointmentOpen(true)}
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            New Appointment
          </Button>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="flex-1 min-h-[500px]">
          <Calendar
            localizer={localizer}
            events={appointments}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable={isProvider}
            eventPropGetter={eventStyleGetter}
            formats={calendarFormats}
            views={isMobile ? { agenda: true } : { month: true, week: true, day: true, agenda: true }}
            defaultView={isMobile ? 'agenda' : 'month'}
            tooltipAccessor={event => `${event.title} - ${event.patientName}`}
            className={cn(
              "rounded-md border",
              theme === 'dark' ? 'rbc-calendar-dark' : ''
            )}
          />
        </div>
      )}
      
      {/* Appointment Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAppointment?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date & Time</Label>
                  <p className="text-sm">
                    {format(selectedAppointment.start, 'PPP')}
                    <br />
                    {format(selectedAppointment.start, 'h:mm a')} - {format(selectedAppointment.end, 'h:mm a')}
                  </p>
                </div>
                
                <div>
                  <Label>Status</Label>
                  <p className={cn(
                    "text-sm capitalize font-medium",
                    selectedAppointment.status === 'confirmed' && "text-green-500",
                    selectedAppointment.status === 'pending' && "text-yellow-500",
                    selectedAppointment.status === 'cancelled' && "text-red-500",
                  )}>
                    {selectedAppointment.status}
                  </p>
                </div>
                
                <div>
                  <Label>Patient</Label>
                  <p className="text-sm">{selectedAppointment.patientName}</p>
                </div>
                
                <div>
                  <Label>Doctor</Label>
                  <p className="text-sm">{selectedAppointment.doctorName}</p>
                </div>
                
                <div className="col-span-2">
                  <Label>Location</Label>
                  <p className="text-sm">{selectedAppointment.location}</p>
                </div>
                
                <div className="col-span-2">
                  <Label>Notes</Label>
                  <p className="text-sm">{selectedAppointment.notes || 'No notes'}</p>
                </div>
              </div>
              
              {isProvider && (
                <div className="pt-4 border-t">
                  <Label>Update Status</Label>
                  <div className="flex gap-2 mt-2">
                    <Button 
                      variant={selectedAppointment.status === 'confirmed' ? 'default' : 'outline'} 
                      onClick={() => handleUpdateStatus('confirmed')}
                      className="flex-1"
                    >
                      Confirm
                    </Button>
                    <Button 
                      variant={selectedAppointment.status === 'pending' ? 'default' : 'outline'} 
                      onClick={() => handleUpdateStatus('pending')}
                      className="flex-1"
                    >
                      Pending
                    </Button>
                    <Button 
                      variant={selectedAppointment.status === 'cancelled' ? 'destructive' : 'outline'} 
                      onClick={() => handleUpdateStatus('cancelled')}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            {isProvider && (
              <Button variant="destructive" onClick={handleDeleteAppointment}>
                Delete Appointment
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New Appointment Dialog */}
      <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Appointment</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Appointment Title</Label>
              <Input 
                id="title" 
                value={newAppointment.title} 
                onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                placeholder="e.g., Annual Checkup"
              />
            </div>
            
            <div>
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newAppointment.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newAppointment.date ? format(newAppointment.date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={newAppointment.date}
                    onSelect={(date) => setNewAppointment({...newAppointment, date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input 
                  id="startTime" 
                  type="time" 
                  value={newAppointment.startTime} 
                  onChange={(e) => setNewAppointment({...newAppointment, startTime: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input 
                  id="endTime" 
                  type="time" 
                  value={newAppointment.endTime} 
                  onChange={(e) => setNewAppointment({...newAppointment, endTime: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="patientName">Patient Name</Label>
              <Input 
                id="patientName" 
                value={newAppointment.patientName} 
                onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                placeholder="Patient name"
              />
            </div>
            
            <div>
              <Label htmlFor="doctorName">Doctor Name</Label>
              <Input 
                id="doctorName" 
                value={newAppointment.doctorName} 
                onChange={(e) => setNewAppointment({...newAppointment, doctorName: e.target.value})}
                placeholder="Doctor name"
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={newAppointment.location} 
                onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                placeholder="e.g., Main Clinic, Room 101"
              />
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newAppointment.status} 
                onValueChange={(value) => setNewAppointment({...newAppointment, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                value={newAppointment.notes} 
                onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                placeholder="Additional notes about the appointment"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateAppointment}>
              Create Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentsCalendar;
