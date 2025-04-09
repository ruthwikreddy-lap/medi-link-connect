
import React from "react";
import { Bell, Heart } from "lucide-react";
import { Header } from "@/components/common/Header";
import { HealthCard } from "@/components/patient/HealthCard";
import { MedicationList } from "@/components/patient/MedicationList";
import { AppointmentList } from "@/components/patient/AppointmentList";
import { HealthUpdatesList } from "@/components/patient/HealthUpdatesList";
import { mockMedications, mockAppointments, mockHealthUpdates, currentPatient } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PatientDashboard: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Header with greeting */}
      <div className="medilink-gradient text-white px-4 pt-6 pb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage src="https://i.pravatar.cc/150?img=44" alt="Jane Smith" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h1 className="font-semibold text-xl">Hello, Jane</h1>
              <p className="text-sm opacity-90">Welcome to MediLink</p>
            </div>
          </div>
          <button className="p-2 bg-white bg-opacity-20 rounded-full">
            <Bell size={20} />
          </button>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto pb-2">
          <div className="bg-white bg-opacity-20 rounded-lg px-4 py-3 flex-shrink-0">
            <p className="text-xs opacity-80">Blood Pressure</p>
            <div className="flex items-center mt-1">
              <Heart className="animate-pulse-subtle mr-1" size={16} />
              <span className="font-medium">128/82</span>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg px-4 py-3 flex-shrink-0">
            <p className="text-xs opacity-80">Medications</p>
            <p className="font-medium mt-1">3 Active</p>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg px-4 py-3 flex-shrink-0">
            <p className="text-xs opacity-80">Next Appointment</p>
            <p className="font-medium mt-1">Apr 15</p>
          </div>
        </div>
      </div>
      
      <div className="px-4 -mt-5">
        <HealthCard patient={currentPatient} />
      </div>

      <div className="px-4 py-4 space-y-5">
        <HealthUpdatesList updates={mockHealthUpdates} limit={3} />
        <MedicationList medications={mockMedications} limit={3} />
        <AppointmentList appointments={mockAppointments} limit={2} />
      </div>
    </div>
  );
};

export default PatientDashboard;
