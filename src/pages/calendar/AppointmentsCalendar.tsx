
import React, { useState } from "react";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import { Header } from "@/components/common/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { mockAppointments } from "@/data/mockData";
import { format } from "date-fns";
import { Appointment } from "@/models/types";
import { useAuth } from "@/contexts/AuthContext";

const AppointmentsCalendar: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Filter appointments based on user role and selected date
  const userAppointments = user?.role === "patient" 
    ? mockAppointments.filter(appt => appt.patientId === "p1")
    : user?.role === "provider"
      ? mockAppointments.filter(appt => appt.providerId === "d1")
      : [];
      
  const appointmentsByDate = userAppointments.reduce((acc, appointment) => {
    const dateStr = new Date(appointment.dateTime).toDateString();
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(appointment);
    return acc;
  }, {} as Record<string, Appointment[]>);
  
  const selectedAppointments = selectedDate 
    ? appointmentsByDate[selectedDate.toDateString()] || []
    : [];
  
  const appointmentDates = Object.keys(appointmentsByDate).map(
    dateStr => new Date(dateStr)
  );
  
  // Custom day renderer to highlight days with appointments
  const renderDay: CalendarProps["renderDay"] = (day, date) => {
    const hasAppointment = appointmentDates.some(
      appDate => appDate.toDateString() === date.toDateString()
    );
    
    return (
      <div className="relative">
        {day}
        {hasAppointment && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-medilink-600 rounded-full"></div>
        )}
      </div>
    );
  };

  return (
    <div className="pb-20">
      <Header title="Appointments" showBackButton />
      
      <div className="p-4">
        <Card className="mb-4">
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md"
              renderDay={renderDay}
            />
          </CardContent>
        </Card>
        
        <div className="mt-4">
          <h2 className="font-medium mb-3">
            {selectedDate ? (
              <>
                Appointments for {format(selectedDate, "MMMM d, yyyy")}
                <span className="ml-2 text-sm text-gray-500">
                  ({selectedAppointments.length})
                </span>
              </>
            ) : (
              "Select a date to view appointments"
            )}
          </h2>
          
          {selectedAppointments.length > 0 ? (
            <div className="space-y-3">
              {selectedAppointments.map(appointment => (
                <Card key={appointment.id} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{appointment.type}</h3>
                      <Badge variant={
                        appointment.status === "scheduled" ? "outline" : 
                        appointment.status === "completed" ? "secondary" : 
                        "destructive"
                      }>
                        {appointment.status}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-1 flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{format(new Date(appointment.dateTime), "h:mm a")}</span>
                      <span className="mx-1">•</span>
                      <span>{appointment.duration} min</span>
                    </div>
                    
                    <div className="text-sm text-gray-600 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      <span>
                        {user?.role === "patient" 
                          ? `Dr. ${appointment.providerName}`
                          : appointment.patientName}
                      </span>
                    </div>
                    
                    {appointment.notes && (
                      <p className="mt-2 text-sm bg-gray-50 p-2 rounded">
                        {appointment.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : selectedDate ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Calendar size={40} className="mx-auto text-gray-300" />
              <p className="mt-2 text-gray-500">No appointments for this date</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsCalendar;
