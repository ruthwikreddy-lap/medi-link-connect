
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, RefreshCw, Filter, UserRound, AlertCircle, Droplet, Info } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

// Enhanced mock data for beds with saline status
const mockBedData = [
  { id: 'B-101', status: 'occupied', patient: 'James Wilson', age: 68, diagnosis: 'Myocardial Infarction', priority: 'critical', lastUpdated: '5 min ago', saline: { active: true, level: 72, type: '0.9% Normal Saline', rate: '100 mL/hr' } },
  { id: 'B-102', status: 'available', patient: null, age: null, diagnosis: null, priority: null, lastUpdated: null, saline: null },
  { id: 'B-103', status: 'occupied', patient: 'Maria Garcia', age: 35, diagnosis: 'Pneumonia', priority: 'high', lastUpdated: '22 min ago', saline: { active: true, level: 23, type: 'Lactated Ringers', rate: '120 mL/hr' } },
  { id: 'B-104', status: 'available', patient: null, age: null, diagnosis: null, priority: null, lastUpdated: null, saline: null },
  { id: 'B-105', status: 'occupied', patient: 'Elizabeth Chen', age: 42, diagnosis: 'Hypertension, Type 2 Diabetes', priority: 'medium', lastUpdated: '10 min ago', saline: null },
  { id: 'B-106', status: 'occupied', patient: 'Robert Johnson', age: 29, diagnosis: 'Fractured Tibia', priority: 'low', lastUpdated: '1 hour ago', saline: { active: true, level: 8, type: '0.9% Normal Saline', rate: '80 mL/hr' } },
  { id: 'B-107', status: 'available', patient: null, age: null, diagnosis: null, priority: null, lastUpdated: null, saline: null },
  { id: 'B-108', status: 'available', patient: null, age: null, diagnosis: null, priority: null, lastUpdated: null, saline: null },
  { id: 'B-201', status: 'occupied', patient: 'Sarah Thompson', age: 51, diagnosis: 'Chest Pain - Evaluation', priority: 'medium', lastUpdated: '34 min ago', saline: { active: true, level: 56, type: 'D5W', rate: '75 mL/hr' } },
  { id: 'B-202', status: 'available', patient: null, age: null, diagnosis: null, priority: null, lastUpdated: null, saline: null },
  { id: 'B-203', status: 'occupied', patient: 'David Lee', age: 63, diagnosis: 'COPD Exacerbation', priority: 'high', lastUpdated: '15 min ago', saline: { active: true, level: 42, type: '0.9% Normal Saline', rate: '110 mL/hr' } },
  { id: 'B-204', status: 'available', patient: null, age: null, diagnosis: null, priority: null, lastUpdated: null, saline: null },
  { id: 'B-205', status: 'occupied', patient: 'Jennifer Adams', age: 45, diagnosis: 'Acute Appendicitis', priority: 'high', lastUpdated: '40 min ago', saline: null },
  { id: 'B-206', status: 'available', patient: null, age: null, diagnosis: null, priority: null, lastUpdated: null, saline: null },
  { id: 'B-207', status: 'occupied', patient: 'Michael Brown', age: 72, diagnosis: 'Stroke', priority: 'critical', lastUpdated: '8 min ago', saline: { active: true, level: 15, type: 'Lactated Ringers', rate: '125 mL/hr' } },
  { id: 'B-208', status: 'available', patient: null, age: null, diagnosis: null, priority: null, lastUpdated: null, saline: null },
];

// Grouping beds by ward/section
const bedsBySection = {
  'General Ward - First Floor': mockBedData.slice(0, 8),
  'General Ward - Second Floor': mockBedData.slice(8, 16)
};

const BedManagement = () => {
  const [beds, setBeds] = useState(bedsBySection);
  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'occupied'>('all');
  const isMobile = useIsMobile();

  const handleFilter = (filter: 'all' | 'available' | 'occupied') => {
    setActiveFilter(filter);
  };

  const getTotalStats = () => {
    const allBeds = Object.values(beds).flat();
    const total = allBeds.length;
    const occupied = allBeds.filter(bed => bed.status === 'occupied').length;
    const available = total - occupied;
    const critical = allBeds.filter(bed => bed.priority === 'critical').length;
    
    return { total, occupied, available, critical };
  };

  // Helper function to get saline status color
  const getSalineStatusColor = (level: number | null) => {
    if (!level) return '';
    if (level < 20) return 'text-red-500';
    if (level < 50) return 'text-amber-500';
    return 'text-green-500';
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Bed Management</h2>
          <p className="text-xs sm:text-sm text-neutral-400">Monitor and manage patient beds across departments</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={activeFilter === 'all' ? 'trust' : 'outline'} 
            size={isMobile ? "sm" : "default"} 
            className={`${activeFilter !== 'all' ? "border-neutral-700 bg-neutral-800" : ""} px-3`}
            onClick={() => handleFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={activeFilter === 'available' ? 'trust' : 'outline'} 
            size={isMobile ? "sm" : "default"} 
            className={`${activeFilter !== 'available' ? "border-neutral-700 bg-neutral-800" : ""} px-3`}
            onClick={() => handleFilter('available')}
          >
            Available
          </Button>
          <Button 
            variant={activeFilter === 'occupied' ? 'trust' : 'outline'} 
            size={isMobile ? "sm" : "default"} 
            className={`${activeFilter !== 'occupied' ? "border-neutral-700 bg-neutral-800" : ""} px-3`}
            onClick={() => handleFilter('occupied')}
          >
            Occupied
          </Button>
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="border-neutral-700 bg-neutral-800 px-3">
            <RefreshCw className="h-4 w-4 sm:mr-2" />
            {!isMobile && <span>Refresh</span>}
          </Button>
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="border-neutral-700 bg-neutral-800 px-3">
            <Filter className="h-4 w-4 sm:mr-2" />
            {!isMobile && <span>Filters</span>}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-neutral-700/70">
                <Bed className="h-4 w-4 text-trustBlue-400" />
              </div>
              <div>
                <div className="text-xl font-semibold text-white">{stats.total}</div>
                <div className="text-xs text-neutral-400">Total beds</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800 border-neutral-700">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-neutral-700/70">
                <UserRound className="h-4 w-4 text-medilink-400" />
              </div>
              <div>
                <div className="text-xl font-semibold text-white">{stats.occupied}</div>
                <div className="text-xs text-neutral-400">Occupied</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800 border-neutral-700">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-green-900/30">
                <Bed className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <div className="text-xl font-semibold text-green-500">{stats.available}</div>
                <div className="text-xs text-neutral-400">Available</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800 border-neutral-700">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-red-900/30">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <div className="text-xl font-semibold text-red-500">{stats.critical}</div>
                <div className="text-xs text-neutral-400">Critical</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-neutral-800 border-neutral-700">
        <CardHeader className="pb-2 p-4">
          <CardTitle className="text-base sm:text-lg text-white">Department Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 pt-0">
          <div className="bg-neutral-700/30 p-3 rounded-lg">
            <h3 className="font-medium text-sm text-white">General Ward</h3>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-neutral-400">Occupancy:</p>
              <p className="text-xs text-white">68%</p>
            </div>
            <div className="w-full bg-neutral-600 rounded-full h-1.5 mt-1">
              <div className="bg-trustBlue-500 h-1.5 rounded-full" style={{ width: "68%" }}></div>
            </div>
          </div>
          <div className="bg-neutral-700/30 p-3 rounded-lg">
            <h3 className="font-medium text-sm text-white">ICU</h3>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-neutral-400">Occupancy:</p>
              <p className="text-xs text-white">85%</p>
            </div>
            <div className="w-full bg-neutral-600 rounded-full h-1.5 mt-1">
              <div className="bg-red-500 h-1.5 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>
          <div className="bg-neutral-700/30 p-3 rounded-lg">
            <h3 className="font-medium text-sm text-white">Pediatrics</h3>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-neutral-400">Occupancy:</p>
              <p className="text-xs text-white">42%</p>
            </div>
            <div className="w-full bg-neutral-600 rounded-full h-1.5 mt-1">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "42%" }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bed Layout */}
      {Object.entries(beds).map(([section, sectionBeds]) => {
        // Filter beds according to activeFilter
        const filteredBeds = activeFilter === 'all' 
          ? sectionBeds 
          : sectionBeds.filter(bed => bed.status === activeFilter);
        
        if (filteredBeds.length === 0) {
          return null;
        }

        return (
          <Card key={section} className="bg-neutral-800 border-neutral-700">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-base sm:text-lg text-white flex items-center gap-2">
                {section}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                      <Info className="h-3.5 w-3.5 text-neutral-400" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-neutral-800 border-neutral-700 text-white">
                    <p className="text-xs">Floor plan view of {section}</p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
                {filteredBeds.map(bed => (
                  <HoverCard key={bed.id} openDelay={isMobile ? 0 : 300} closeDelay={isMobile ? 0 : 200}>
                    <HoverCardTrigger asChild>
                      <div 
                        className={`
                          p-3 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors
                          ${bed.status === 'available' ? 'bg-green-900/20 hover:bg-green-900/30' : 'bg-neutral-700/30 hover:bg-neutral-700/50'}
                          relative
                        `}
                      >
                        <Bed 
                          className={`
                            h-8 w-8 sm:h-10 sm:w-10 mb-1
                            ${bed.status === 'available' ? 'text-green-500' : 'text-neutral-400'}
                          `} 
                        />
                        <p className="text-xs font-medium text-white">{bed.id}</p>
                        <Badge 
                          variant="outline" 
                          className={`
                            text-xs mt-1 px-1.5 py-0
                            ${bed.status === 'available' ? 'border-green-600 text-green-400' : 'border-neutral-600 text-neutral-400'}
                          `}
                        >
                          {bed.status === 'available' ? 'Available' : 'Occupied'}
                        </Badge>
                        
                        {/* Saline indicator if active */}
                        {bed.saline && bed.saline.active && (
                          <div className="absolute top-1 right-1 flex flex-col items-center">
                            <Droplet 
                              className={`h-3.5 w-3.5 ${getSalineStatusColor(bed.saline.level)}`} 
                              fill={bed.saline.level < 20 ? "#ef4444" : bed.saline.level < 50 ? "#f59e0b" : "#22c55e"}
                              strokeWidth={1}
                            />
                            <span className={`text-[10px] leading-tight ${getSalineStatusColor(bed.saline.level)}`}>
                              {bed.saline.level}%
                            </span>
                          </div>
                        )}
                        
                        {/* Priority indicator */}
                        {bed.priority === 'critical' && (
                          <div className="absolute bottom-1 right-1">
                            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    </HoverCardTrigger>
                    
                    {bed.status === 'occupied' && bed.patient && (
                      <HoverCardContent className="w-full max-w-xs bg-neutral-800 border-neutral-700 text-white">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <UserRound className="h-5 w-5 text-trustBlue-400" />
                              <h4 className="text-sm font-semibold">{bed.patient}</h4>
                            </div>
                            
                            {bed.priority === 'critical' && (
                              <Badge className="bg-red-600 text-white text-xs">Critical</Badge>
                            )}
                            {bed.priority === 'high' && (
                              <Badge className="bg-amber-600 text-white text-xs">High Priority</Badge>
                            )}
                          </div>
                          
                          <div className="text-xs text-neutral-400 flex justify-between">
                            <span>Age: {bed.age}y</span>
                            <span>Bed: {bed.id}</span>
                          </div>
                          
                          <div className="bg-neutral-700/40 p-2 rounded">
                            <h5 className="text-xs font-medium text-neutral-300">Diagnosis:</h5>
                            <p className="text-sm text-white">{bed.diagnosis}</p>
                          </div>
                          
                          {bed.saline && bed.saline.active && (
                            <div className="bg-neutral-700/40 p-2 rounded">
                              <div className="flex justify-between items-center">
                                <h5 className="text-xs font-medium text-neutral-300">IV Fluid:</h5>
                                <span className={`text-xs font-medium ${getSalineStatusColor(bed.saline.level)}`}>
                                  {bed.saline.level < 20 ? 'Low' : bed.saline.level < 50 ? 'Medium' : 'Good'}
                                </span>
                              </div>
                              <p className="text-xs text-white">{bed.saline.type} at {bed.saline.rate}</p>
                              <div className="mt-1">
                                <Progress 
                                  value={bed.saline.level} 
                                  className="h-1.5 bg-neutral-700" 
                                  indicatorClassName={
                                    bed.saline.level < 20 ? "bg-red-500" : 
                                    bed.saline.level < 50 ? "bg-amber-500" : 
                                    "bg-green-500"
                                  }
                                  aria-label="Saline Level"
                                />
                              </div>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center pt-1">
                            <span className="text-xs text-neutral-400">Last updated: {bed.lastUpdated}</span>
                            <Button variant="outline" size="sm" className="h-7 text-xs border-neutral-700">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </HoverCardContent>
                    )}
                    
                    {bed.status === 'available' && (
                      <HoverCardContent className="bg-neutral-800 border-neutral-700 text-white">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-green-400">Available Bed</h4>
                          <p className="text-xs text-neutral-300">ID: {bed.id}</p>
                          <div className="flex flex-col xs:flex-row gap-2 pt-1">
                            <Button variant="outline" size="sm" className="h-7 text-xs border-neutral-700">
                              Assign Patient
                            </Button>
                            <Button variant="outline" size="sm" className="h-7 text-xs border-neutral-700">
                              Mark Unavailable
                            </Button>
                          </div>
                        </div>
                      </HoverCardContent>
                    )}
                  </HoverCard>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Mobile-friendly action buttons */}
      <div className="fixed bottom-4 right-4 sm:hidden flex flex-col gap-2">
        <Button size="icon" className="h-12 w-12 rounded-full bg-trustBlue-600 shadow-neon">
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default BedManagement;
