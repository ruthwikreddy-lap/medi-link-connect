
import React from "react";
import { Activity, ArrowRight, Flask, Pill } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HealthUpdate } from "@/models/types";
import { format } from "date-fns";

interface HealthUpdatesListProps {
  updates: HealthUpdate[];
  limit?: number;
}

export const HealthUpdatesList: React.FC<HealthUpdatesListProps> = ({ 
  updates, 
  limit 
}) => {
  const sortedUpdates = [...updates]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  const displayUpdates = limit ? sortedUpdates.slice(0, limit) : sortedUpdates;

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'vital':
        return <Activity className="text-green-500" size={18} />;
      case 'lab':
        return <Flask className="text-blue-500" size={18} />;
      case 'medication':
        return <Pill className="text-purple-500" size={18} />;
      default:
        return <Activity className="text-gray-500" size={18} />;
    }
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Recent Health Updates
          </CardTitle>
          <button className="text-medilink-600 text-sm flex items-center">
            View All <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2">
        {displayUpdates.map((update) => (
          <div 
            key={update.id}
            className="py-2 border-b last:border-b-0 flex items-start"
          >
            <div className="mr-3 mt-1">
              {getUpdateIcon(update.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{update.title}</h4>
                <span className="text-xs text-gray-500">
                  {format(new Date(update.date), "MMM d")}
                </span>
              </div>
              <p className="text-sm text-gray-600">{update.description}</p>
              {update.value && (
                <p className="text-sm font-medium mt-1">
                  {update.value} {update.unit}
                </p>
              )}
              {update.status && (
                <p className="text-xs text-medilink-600 mt-1">
                  {update.status}
                </p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
