
import React from "react";
import { Pill, Bell, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Medication } from "@/models/types";

interface MedicationListProps {
  medications: Medication[];
  limit?: number;
}

export const MedicationList: React.FC<MedicationListProps> = ({ 
  medications, 
  limit 
}) => {
  const displayMeds = limit ? medications.slice(0, limit) : medications;
  
  const needsRefill = (med: Medication) => {
    return med.refillInfo && med.refillInfo.remaining <= 5;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Pill className="mr-2 text-medilink-600" size={18} />
            Medications
          </CardTitle>
          <button className="text-medilink-600 text-sm flex items-center">
            View All <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2">
        {displayMeds.map((medication) => (
          <div 
            key={medication.id}
            className="py-2 border-b last:border-b-0 flex items-center justify-between"
          >
            <div>
              <div className="flex items-center">
                <h4 className="font-medium">{medication.name}</h4>
                {needsRefill(medication) && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    Refill Soon
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {medication.dosage}, {medication.frequency}
              </p>
            </div>
            
            <Bell 
              size={16} 
              className="text-medilink-600 cursor-pointer hover:text-medilink-700" 
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
