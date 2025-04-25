
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Pill, Calendar, AlertCircle, Clock, ChevronRight, 
  Repeat, FileMinus, Plus, CheckCircle2, RefreshCw, 
  Settings, Phone, Download, Printer
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const PrescriptionsContent = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Demo prescriptions data
  const prescriptions = [
    {
      id: 'RX-5461',
      name: 'Lisinopril',
      dosage: '10mg',
      instructions: '1 tablet, once daily in the morning with food',
      prescribedBy: 'Dr. Sarah Johnson',
      prescribedDate: 'January 5, 2024',
      refillsRemaining: 2,
      daysSupplyLeft: 15,
      status: 'active',
      pharmacy: 'Neighborhood Pharmacy',
      nextRefillDate: 'March 15, 2024',
      notes: 'For blood pressure management',
      interactions: [],
      sideEffects: ['Dizziness', 'Cough'],
      timing: 'Morning'
    },
    {
      id: 'RX-5462',
      name: 'Atorvastatin',
      dosage: '20mg',
      instructions: '1 tablet, once daily in the evening',
      prescribedBy: 'Dr. Sarah Johnson',
      prescribedDate: 'January 5, 2024',
      refillsRemaining: 2,
      daysSupplyLeft: 5,
      status: 'active',
      pharmacy: 'Neighborhood Pharmacy',
      nextRefillDate: 'March 5, 2024',
      notes: 'For cholesterol management',
      interactions: ['Grapefruit juice'],
      sideEffects: ['Muscle pain'],
      timing: 'Evening'
    },
    {
      id: 'RX-4872',
      name: 'Metformin',
      dosage: '500mg',
      instructions: '1 tablet, twice daily with meals',
      prescribedBy: 'Dr. Michael Lee',
      prescribedDate: 'December 10, 2023',
      refillsRemaining: 0,
      daysSupplyLeft: 0,
      status: 'expired',
      pharmacy: 'Central Pharmacy',
      nextRefillDate: 'N/A',
      notes: 'For blood sugar management',
      interactions: ['Alcohol'],
      sideEffects: ['Nausea', 'Diarrhea'],
      timing: 'Morning & Evening'
    },
    {
      id: 'RX-5601',
      name: 'Multivitamin',
      dosage: '1 tablet',
      instructions: '1 tablet daily with breakfast',
      prescribedBy: 'Dr. Sarah Johnson',
      prescribedDate: 'February 20, 2024',
      refillsRemaining: 5,
      daysSupplyLeft: 45,
      status: 'active',
      pharmacy: 'Neighborhood Pharmacy',
      nextRefillDate: 'April 15, 2024',
      notes: 'For general health',
      interactions: [],
      sideEffects: [],
      timing: 'Morning'
    }
  ];

  const filteredPrescriptions = activeFilter === 'all' 
    ? prescriptions 
    : prescriptions.filter(p => p.status === activeFilter);

  const getStatusIndicator = (status: string, daysLeft: number) => {
    if (status === 'expired') {
      return (
        <Badge variant="outline" className="text-red-500 border-red-500/30">
          <AlertCircle className="mr-1 h-3 w-3" />
          Expired
        </Badge>
      );
    }
    
    if (daysLeft <= 5) {
      return (
        <Badge variant="outline" className="text-amber-500 border-amber-500/30">
          <AlertCircle className="mr-1 h-3 w-3" />
          Refill Soon
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="text-green-500 border-green-500/30">
        <CheckCircle2 className="mr-1 h-3 w-3" />
        Active
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Prescriptions</h2>
          <p className="text-sm text-neutral-400">Manage your medications and refills</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-neutral-700 hover:bg-neutral-700">
            <Phone className="mr-1.5 h-4 w-4" />
            Contact Pharmacy
          </Button>
          <Button variant="trust" size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Request Refill
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="neo-card bg-neutral-900 border-neutral-800">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-base text-white">Today's Medications</CardTitle>
            <CardDescription className="text-xs">Your daily medication schedule</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-trustBlue-900/50 flex items-center justify-center">
                      <Pill className="h-3.5 w-3.5 text-trustBlue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Lisinopril 10mg</div>
                      <div className="text-xs text-neutral-400">1 tablet, once daily</div>
                    </div>
                  </div>
                  <Button variant="trust" size="sm" className="h-7 text-xs">Take Now</Button>
                </div>
                <div className="flex items-center justify-between mt-1.5 text-xs">
                  <div className="flex items-center gap-1 text-neutral-300">
                    <Clock className="h-3 w-3" />
                    <span>Morning with food</span>
                  </div>
                  <Badge variant="outline" className="text-xs h-5">
                    <FileMinus className="mr-1 h-3 w-3" />
                    Refill: 15 days left
                  </Badge>
                </div>
              </div>
              
              <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-trustBlue-900/50 flex items-center justify-center">
                      <Pill className="h-3.5 w-3.5 text-trustBlue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Atorvastatin 20mg</div>
                      <div className="text-xs text-neutral-400">1 tablet, once daily</div>
                    </div>
                  </div>
                  <div className="flex items-center text-green-500 text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                    Taken
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1.5 text-xs">
                  <div className="flex items-center gap-1 text-neutral-300">
                    <Clock className="h-3 w-3" />
                    <span>Evening</span>
                  </div>
                  <Badge variant="outline" className="text-xs h-5">
                    <FileMinus className="mr-1 h-3 w-3" />
                    Refill: 5 days left
                  </Badge>
                </div>
              </div>
              
              <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-trustBlue-900/50 flex items-center justify-center">
                      <Pill className="h-3.5 w-3.5 text-trustBlue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Multivitamin</div>
                      <div className="text-xs text-neutral-400">1 tablet daily</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs border-neutral-700">Take Now</Button>
                </div>
                <div className="flex items-center justify-between mt-1.5 text-xs">
                  <div className="flex items-center gap-1 text-neutral-300">
                    <Clock className="h-3 w-3" />
                    <span>Morning with breakfast</span>
                  </div>
                  <Badge variant="outline" className="text-xs h-5">
                    <FileMinus className="mr-1 h-3 w-3" />
                    Refill: 45 days left
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="neo-card bg-neutral-900 border-neutral-800">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-base text-white">Refill Status</CardTitle>
            <CardDescription className="text-xs">Upcoming medication refills</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-white">Atorvastatin 20mg</span>
                  <span className="text-xs text-amber-400">5 days left</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-white">Lisinopril 10mg</span>
                  <span className="text-xs text-neutral-400">15 days left</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-white">Multivitamin</span>
                  <span className="text-xs text-neutral-400">45 days left</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="pt-2 mt-2 border-t border-neutral-800">
                <Button variant="outline" size="sm" className="w-full justify-center text-xs border-neutral-700 hover:bg-neutral-700">
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                  Request All Refills
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="neo-card bg-neutral-900 border-neutral-800">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-base text-white">Medication Settings</CardTitle>
            <CardDescription className="text-xs">Reminders and preferences</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-neutral-700 hover:bg-neutral-700">
                <Settings className="mr-1.5 h-4 w-4 text-trustBlue-400" />
                Reminder Settings
              </Button>
              
              <Button variant="outline" className="w-full justify-start border-neutral-700 hover:bg-neutral-700">
                <Phone className="mr-1.5 h-4 w-4 text-trustBlue-400" />
                Pharmacy Contacts
              </Button>
              
              <Button variant="outline" className="w-full justify-start border-neutral-700 hover:bg-neutral-700">
                <AlertCircle className="mr-1.5 h-4 w-4 text-trustBlue-400" />
                Interaction Alerts
              </Button>
              
              <Button variant="outline" className="w-full justify-start border-neutral-700 hover:bg-neutral-700">
                <Download className="mr-1.5 h-4 w-4 text-trustBlue-400" />
                Export Medication List
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="neo-card bg-neutral-900 border-neutral-800">
        <CardHeader className="pb-2 px-4 pt-4 border-b border-neutral-800">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base text-white">All Prescriptions</CardTitle>
            <div className="flex gap-1 bg-neutral-800 rounded-md p-0.5">
              <Button 
                variant={activeFilter === 'all' ? "trust" : "ghost"} 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setActiveFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={activeFilter === 'active' ? "trust" : "ghost"} 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setActiveFilter('active')}
              >
                Active
              </Button>
              <Button 
                variant={activeFilter === 'expired' ? "trust" : "ghost"} 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setActiveFilter('expired')}
              >
                Expired
              </Button>
            </div>
          </div>
          <CardDescription className="text-xs">Showing {filteredPrescriptions.length} prescriptions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-neutral-800">
            {filteredPrescriptions.map((prescription) => (
              <div key={prescription.id} className="p-4 hover:bg-neutral-800/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-trustBlue-900/50 flex items-center justify-center mt-1">
                      <Pill className="h-5 w-5 text-trustBlue-400" />
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-white">
                          {prescription.name} {prescription.dosage}
                        </h3>
                        {getStatusIndicator(prescription.status, prescription.daysSupplyLeft)}
                      </div>
                      
                      <p className="text-xs text-neutral-400 mb-2">{prescription.instructions}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          Prescribed: {prescription.prescribedDate}
                        </div>
                        <div className="flex items-center">
                          <Repeat className="mr-1 h-3 w-3" />
                          Refills: {prescription.refillsRemaining}
                        </div>
                        {prescription.status !== 'expired' && (
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            Next refill: {prescription.nextRefillDate}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-2 md:mt-0">
                    {prescription.status === 'active' && (
                      <Button variant="trust" size="sm" className="h-8 px-3 text-xs">
                        <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                        Refill
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionsContent;
