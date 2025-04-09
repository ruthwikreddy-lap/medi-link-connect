
import React, { useState } from "react";
import { Calendar, Clock, Clipboard, Users, ArrowRight } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TasksList } from "@/components/provider/TasksList";
import { format } from "date-fns";
import { mockAppointments, mockTasks, mockPatients } from "@/data/mockData";
import { Task } from "@/models/types";

const ProviderDashboard: React.FC = () => {
  const today = new Date();
  const todayAppointments = mockAppointments.filter(
    app => new Date(app.dateTime).toDateString() === today.toDateString()
  ).sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleUpdateTask = (taskId: string, status: "pending" | "in-progress" | "completed" | "cancelled") => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="pb-20">
      {/* Header with statistics */}
      <div className="medilink-gradient text-white px-4 pt-6 pb-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-xl">Dr. Johnson's Dashboard</h1>
          <p className="text-sm">{format(today, "EEEE, MMM d")}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white bg-opacity-20 border-none">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Users size={16} className="mr-2" />
                <h3 className="text-sm font-medium">Patient Census</h3>
              </div>
              <p className="text-2xl font-semibold">{mockPatients.length}</p>
              <p className="text-xs opacity-80">Under your care</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white bg-opacity-20 border-none">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Calendar size={16} className="mr-2" />
                <h3 className="text-sm font-medium">Today's Schedule</h3>
              </div>
              <p className="text-2xl font-semibold">{todayAppointments.length}</p>
              <p className="text-xs opacity-80">Appointments today</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="px-4 -mt-6">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center">
                <Clock size={18} className="mr-2 text-medilink-600" />
                Upcoming Appointments
              </h3>
              <button className="text-medilink-600 text-sm flex items-center">
                View All <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
            
            {todayAppointments.length > 0 ? (
              <div className="space-y-3">
                {todayAppointments.slice(0, 3).map(appointment => (
                  <div key={appointment.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                    <div>
                      <p className="font-medium">{appointment.patientName}</p>
                      <div className="text-sm text-gray-600 flex items-center mt-1">
                        <Clock size={14} className="mr-1" />
                        <span>{format(new Date(appointment.dateTime), "h:mm a")}</span>
                        <span className="mx-1">•</span>
                        <span>{appointment.type}</span>
                      </div>
                    </div>
                    <Badge variant={appointment.status === "scheduled" ? "outline" : "secondary"}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-3">No appointments scheduled for today</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center">
            <Clipboard size={18} className="mr-2 text-medilink-600" />
            Tasks
          </h3>
          <button className="text-medilink-600 text-sm">Add New</button>
        </div>
        
        <TasksList tasks={tasks} onUpdateTask={handleUpdateTask} />
      </div>
    </div>
  );
};

export default ProviderDashboard;
