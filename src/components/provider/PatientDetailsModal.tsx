
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PatientPriorityIndicator } from "@/components/TrustIndicator";
import {
  FileText,
  Heart,
  Activity,
  Calendar,
  ClipboardList,
  MessageSquare,
  Pill,
  ChevronRight,
  Star,
  Clipboard,
  AlertCircle,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  CheckCircle2,
  MoreHorizontal
} from "lucide-react";

interface PatientDetailsModalProps {
  open: boolean;
  onClose: () => void;
  patient: {
    id: string;
    name: string;
    status: string;
    priority: string;
    age: number;
    room: string;
    lastUpdated: string;
    diagnosis: string;
  };
}

const PatientDetailsModal: React.FC<PatientDetailsModalProps> = ({ 
  open, 
  onClose, 
  patient 
}) => {
  // Demo patient details data
  const patientDetails = {
    personalInfo: {
      dateOfBirth: "May 12, 1981",
      gender: "Female",
      phone: "+1 (555) 876-5432",
      email: "elizabeth.chen@example.com",
      address: "1234 Oak Street, Cityville, NY 10001",
      insurance: "BlueShield Health, #BSH-98765432",
      primaryCare: "Dr. Michael Wilson",
    },
    vitalSigns: {
      bloodPressure: "138/85 mmHg",
      heartRate: "78 bpm",
      temperature: "98.6°F",
      respiratoryRate: "16 breaths/min",
      oxygen: "98%",
      weight: "165 lbs",
      height: "5'6\"",
      bmi: "26.8",
      lastUpdated: "Today, 9:45 AM"
    },
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", purpose: "Hypertension" },
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", purpose: "Type 2 Diabetes" },
      { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", purpose: "Cholesterol" }
    ],
    allergies: ["Penicillin", "Shellfish"],
    labs: [
      { name: "HbA1c", value: "7.2%", reference: "< 5.7%", date: "June 15, 2023", status: "high" },
      { name: "LDL Cholesterol", value: "110 mg/dL", reference: "< 100 mg/dL", date: "June 15, 2023", status: "high" },
      { name: "eGFR", value: "75 mL/min", reference: "> 60 mL/min", date: "June 15, 2023", status: "normal" },
      { name: "Potassium", value: "4.2 mmol/L", reference: "3.5-5.0 mmol/L", date: "June 15, 2023", status: "normal" }
    ]
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-trustBlue-800 flex items-center justify-center">
                <User className="h-5 w-5 text-trustBlue-300" />
              </div>
              <div>
                <DialogTitle className="text-xl">{patient.name}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-neutral-400">{patient.id}</span>
                  <span className="text-xs text-neutral-400">•</span>
                  <span className="text-xs text-neutral-400">{patient.age} years</span>
                  <PatientPriorityIndicator level={patient.priority as any} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={patient.room.includes('ICU') ? "destructive" : "outline"}>
                {patient.room}
              </Badge>
              <Button variant="outline" size="sm" className="h-8 border-neutral-700">
                <Activity className="h-4 w-4 mr-1" />
                Vitals
              </Button>
              <Button variant="clinical" size="sm" className="h-8">
                <Clipboard className="h-4 w-4 mr-1" />
                Chart
              </Button>
            </div>
          </div>

          <DialogDescription className="text-neutral-400">
            <div className="flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
              <span className="text-amber-500 font-medium mr-2">Diagnosis:</span>
              <span>{patient.diagnosis}</span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="summary" className="mt-2">
          <TabsList className="bg-neutral-800 border border-neutral-700">
            <TabsTrigger 
              value="summary" 
              className="data-[state=active]:bg-trustBlue-900 data-[state=active]:text-white"
            >
              Summary
            </TabsTrigger>
            <TabsTrigger 
              value="records" 
              className="data-[state=active]:bg-trustBlue-900 data-[state=active]:text-white"
            >
              Records
            </TabsTrigger>
            <TabsTrigger 
              value="medications" 
              className="data-[state=active]:bg-trustBlue-900 data-[state=active]:text-white"
            >
              Medications
            </TabsTrigger>
            <TabsTrigger 
              value="labs" 
              className="data-[state=active]:bg-trustBlue-900 data-[state=active]:text-white"
            >
              Labs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Heart className="h-4 w-4 mr-1.5 text-red-500" />
                  Vital Signs
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-neutral-400">Blood Pressure</div>
                    <div className="text-sm font-medium flex items-center">
                      {patientDetails.vitalSigns.bloodPressure}
                      <AlertCircle className="h-3.5 w-3.5 ml-1 text-amber-500" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">Heart Rate</div>
                    <div className="text-sm font-medium">
                      {patientDetails.vitalSigns.heartRate}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">Temperature</div>
                    <div className="text-sm font-medium">
                      {patientDetails.vitalSigns.temperature}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">Respiratory Rate</div>
                    <div className="text-sm font-medium">
                      {patientDetails.vitalSigns.respiratoryRate}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">O₂ Saturation</div>
                    <div className="text-sm font-medium">
                      {patientDetails.vitalSigns.oxygen}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">Weight</div>
                    <div className="text-sm font-medium">
                      {patientDetails.vitalSigns.weight}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-neutral-400 mt-3 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Last updated: {patientDetails.vitalSigns.lastUpdated}
                </div>
              </div>

              <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <User className="h-4 w-4 mr-1.5 text-trustBlue-400" />
                  Personal Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-3.5 w-3.5 text-neutral-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-neutral-400">Date of Birth</div>
                      <div className="text-sm">{patientDetails.personalInfo.dateOfBirth} ({patient.age}y)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-3.5 w-3.5 text-neutral-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-neutral-400">Phone</div>
                      <div className="text-sm">{patientDetails.personalInfo.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-3.5 w-3.5 text-neutral-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-neutral-400">Email</div>
                      <div className="text-sm">{patientDetails.personalInfo.email}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-neutral-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-neutral-400">Address</div>
                      <div className="text-sm">{patientDetails.personalInfo.address}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-3.5 w-3.5 text-neutral-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-neutral-400">Insurance</div>
                      <div className="text-sm">{patientDetails.personalInfo.insurance}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Pill className="h-4 w-4 mr-1.5 text-trustBlue-400" />
                  Current Medications
                </h3>
                <div className="space-y-2">
                  {patientDetails.medications.map((med, index) => (
                    <div key={index} className="border border-neutral-700 rounded-md p-2">
                      <div className="flex justify-between">
                        <div className="font-medium text-sm">{med.name} {med.dosage}</div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="text-xs text-neutral-400">{med.frequency}</div>
                      <div className="text-xs text-neutral-500 mt-1">For: {med.purpose}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-right">
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    View all
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1.5 text-red-500" />
                  Allergies & Warnings
                </h3>
                <div className="space-y-2">
                  {patientDetails.allergies.length > 0 ? (
                    patientDetails.allergies.map((allergy, index) => (
                      <Badge key={index} variant="outline" className="mr-2 border-red-800/40 text-red-400">
                        {allergy}
                      </Badge>
                    ))
                  ) : (
                    <div className="text-sm">No known allergies</div>
                  )}
                </div>
                
                <h3 className="text-sm font-medium mt-4 mb-2 flex items-center">
                  <Activity className="h-4 w-4 mr-1.5 text-amber-500" />
                  Latest Lab Results
                </h3>
                <div className="space-y-2">
                  {patientDetails.labs.slice(0, 2).map((lab, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="text-sm">{lab.name}</div>
                        <div className="flex items-center">
                          <span className={`text-xs ${lab.status === 'high' ? 'text-red-400' : 'text-green-400'}`}>
                            {lab.value}
                          </span>
                          <span className="text-xs text-neutral-500 mx-1">|</span>
                          <span className="text-xs text-neutral-500">{lab.reference}</span>
                        </div>
                      </div>
                      {lab.status === 'high' && (
                        <AlertCircle className="h-4 w-4 text-red-400" />
                      )}
                      {lab.status === 'normal' && (
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-right">
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    View all
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="records">
            <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-1.5 text-trustBlue-400" />
                  Medical Records
                </h3>
                <Button variant="outline" size="sm" className="h-8 border-neutral-700">
                  <FileText className="h-4 w-4 mr-1" />
                  New Note
                </Button>
              </div>
              
              <div className="text-center py-8 text-neutral-400">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="mb-2">Medical records will be displayed here</p>
                <Button variant="trust" size="sm">Load Records</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="medications">
            <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium flex items-center">
                  <Pill className="h-4 w-4 mr-1.5 text-trustBlue-400" />
                  Medication Management
                </h3>
                <Button variant="outline" size="sm" className="h-8 border-neutral-700">
                  <Pill className="h-4 w-4 mr-1" />
                  Prescribe
                </Button>
              </div>
              
              <div className="text-center py-8 text-neutral-400">
                <Pill className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="mb-2">Medication management will be displayed here</p>
                <Button variant="trust" size="sm">View Medications</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="labs">
            <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium flex items-center">
                  <Activity className="h-4 w-4 mr-1.5 text-trustBlue-400" />
                  Laboratory Results
                </h3>
                <Button variant="outline" size="sm" className="h-8 border-neutral-700">
                  <Activity className="h-4 w-4 mr-1" />
                  Order Test
                </Button>
              </div>
              
              <div className="text-center py-8 text-neutral-400">
                <Activity className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="mb-2">Laboratory results will be displayed here</p>
                <Button variant="trust" size="sm">View Results</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between border-t border-neutral-800 pt-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9 border-neutral-700">
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button variant="outline" size="sm" className="h-9 border-neutral-700">
              <Calendar className="h-4 w-4 mr-1" />
              Schedule
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="destructive" size="sm" className="h-9">
              Report Issue
            </Button>
            <Button variant="clinical" size="sm" className="h-9">
              <Star className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsModal;
