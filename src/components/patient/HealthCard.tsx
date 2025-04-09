
import React from "react";
import { Alert, Clock, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Patient } from "@/models/types";

interface HealthCardProps {
  patient: Patient;
}

export const HealthCard: React.FC<HealthCardProps> = ({ patient }) => {
  return (
    <Card className="shadow-sm border-l-4 border-l-red-500">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Alert className="text-red-500" size={16} />
            <h3 className="font-semibold">Emergency Health Card</h3>
          </div>
          <button className="text-xs text-medilink-600">View Full Card</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="text-sm">
            <p className="text-gray-500 text-xs">Blood Type</p>
            <div className="flex items-center mt-1">
              <Heart className="text-red-500 mr-2" size={14} />
              <p className="font-medium">{patient.bloodType}</p>
            </div>
          </div>
          
          <div className="text-sm">
            <p className="text-gray-500 text-xs">Conditions</p>
            <p className="mt-1 font-medium line-clamp-1">
              {patient.conditions.join(", ")}
            </p>
          </div>
          
          <div className="text-sm">
            <p className="text-gray-500 text-xs">Allergies</p>
            <p className="mt-1 font-medium line-clamp-1">
              {patient.allergies.join(", ")}
            </p>
          </div>
          
          <div className="text-sm">
            <p className="text-gray-500 text-xs">Emergency Contact</p>
            <div className="flex items-center mt-1">
              <Clock className="text-yellow-500 mr-2" size={14} />
              <p className="font-medium line-clamp-1">{patient.emergencyContact.name}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
