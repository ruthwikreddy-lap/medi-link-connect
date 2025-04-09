
import React from "react";
import { format, isPast, isToday } from "date-fns";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Appointment } from "@/models/types";

interface AppointmentListProps {
  appointments: Appointment[];
  limit?: number;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({ 
  appointments, 
  limit 
}) => {
  const sortedAppointments = [...appointments]
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
    .filter(appt => appt.status === "scheduled");
    
  const displayAppointments = limit ? sortedAppointments.slice(0, limit) : sortedAppointments;

  const getAppointmentStatus = (dateTime: string) => {
    const appointmentDate = new Date(dateTime);
    if (isPast(appointmentDate) && !isToday(appointmentDate)) return "past";
    if (isToday(appointmentDate)) return "today";
    return "upcoming";
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Calendar className="mr-2 text-medilink-600" size={18} />
          Upcoming Appointments
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        {displayAppointments.length > 0 ? (
          displayAppointments.map((appointment) => {
            const appointmentStatus = getAppointmentStatus(appointment.dateTime);
            const appointmentDate = new Date(appointment.dateTime);
            
            return (
              <div 
                key={appointment.id}
                className="py-3 border-b last:border-b-0"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{appointment.type}</h4>
                  {appointmentStatus === "today" ? (
                    <Badge className="bg-green-500 hover:bg-green-600">Today</Badge>
                  ) : null}
                </div>
                
                <div className="text-sm text-gray-600 flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{format(appointmentDate, "MMM d, yyyy 'at' h:mm a")}</span>
                </div>
                
                <div className="text-sm text-gray-600 flex items-center mt-1">
                  <MapPin size={14} className="mr-1" />
                  <span>Dr. {appointment.providerName}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-3">No upcoming appointments</p>
        )}
      </CardContent>
    </Card>
  );
};
