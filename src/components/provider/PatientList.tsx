
import React from "react";
import { ChevronRight, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Patient } from "@/models/types";

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
}

export const PatientList: React.FC<PatientListProps> = ({
  patients,
  onSelectPatient
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search patients"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="space-y-2">
        {filteredPatients.length > 0 ? (
          filteredPatients.map(patient => (
            <div
              key={patient.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelectPatient(patient)}
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-medilink-100 text-medilink-800">
                    {getInitials(patient.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-gray-500">DOB: {patient.dateOfBirth}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <User size={40} className="mx-auto text-gray-300" />
            <p className="mt-2 text-gray-500">No patients found</p>
          </div>
        )}
      </div>
    </div>
  );
};
