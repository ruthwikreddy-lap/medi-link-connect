
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrustIndicator } from "@/components/TrustIndicator";
import EmergencyQRCode from './EmergencyQRCode';
import { 
  User, Phone, Hospital, AlertTriangle, 
  ShieldCheck, Stethoscope, Droplet, Pill, 
  Phone as PhoneIcon, Building, AlertCircle
} from 'lucide-react';

const EmergencyCard: React.FC = () => {
  const { profile } = useAuth();
  
  // Demo emergency data
  const emergencyInfo = {
    patientId: 'MED-8734-1129',
    bloodType: 'O+',
    allergies: 'None',
    medications: 'None',
    emergencyContact: '+1 (555) 123-4567',
    preferredHospital: 'General Hospital',
    insuranceStatus: 'Valid',
    familyDoctor: 'Dr. Jane Watson',
    emergencyHotlines: {
      police: '911',
      ambulance: '911',
      fire: '911'
    }
  };
  
  return (
    <Card className="neo-card bg-neutral-900 border-neutral-800 overflow-hidden">
      <CardHeader className="pb-2 px-4 pt-4 border-b border-neutral-800">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base text-white">Emergency Information</CardTitle>
          <TrustIndicator type="secure" size="sm" />
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left column: Patient info and QR code */}
          <div className="flex-1 bg-neutral-800 p-4 rounded-lg border border-neutral-700">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-16 w-16 border-2 border-trustBlue-500">
                <AvatarImage src="https://randomuser.me/api/portraits/women/42.jpg" alt="Patient photo" />
                <AvatarFallback className="bg-trustBlue-950 text-trustBlue-200">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="text-lg font-bold text-white">{profile?.full_name || 'Jane Smith'}</h3>
                <div className="text-xs text-neutral-400 mb-1">ID: {emergencyInfo.patientId}</div>
                <Badge variant="secure" className="text-xs h-5">
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  Valid
                </Badge>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center bg-neutral-900 p-4 rounded-lg border border-neutral-700">
              <EmergencyQRCode size={180} className="mb-2" />
              <div className="text-xs text-neutral-400 text-center">
                Scan for complete medical information
              </div>
            </div>
          </div>
          
          {/* Right column: Medical details */}
          <div className="flex-1 bg-neutral-800 p-4 rounded-lg border border-neutral-700">
            <h3 className="text-sm font-medium text-white mb-3">Medical Information</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Hospital className="h-4 w-4 text-trustBlue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs text-neutral-300">Preferred Hospital:</span> 
                  <span className="text-xs text-white ml-1">{emergencyInfo.preferredHospital}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warmAccent-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs text-neutral-300">Allergies:</span> 
                  <span className="text-xs text-white ml-1">{emergencyInfo.allergies}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs text-neutral-300">Insurance Status:</span> 
                  <span className="text-xs text-white ml-1">{emergencyInfo.insuranceStatus}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Stethoscope className="h-4 w-4 text-trustBlue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs text-neutral-300">Family Doctor:</span> 
                  <span className="text-xs text-white ml-1">{emergencyInfo.familyDoctor}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Droplet className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs text-neutral-300">Blood Type:</span> 
                  <span className="text-xs text-white ml-1">{emergencyInfo.bloodType}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Pill className="h-4 w-4 text-trustBlue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs text-neutral-300">Current Medication:</span> 
                  <span className="text-xs text-white ml-1">{emergencyInfo.medications}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <PhoneIcon className="h-4 w-4 text-warmAccent-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs text-neutral-300">Emergency Contact:</span> 
                  <span className="text-xs text-white ml-1">{emergencyInfo.emergencyContact}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-neutral-700">
              <h4 className="text-xs font-medium text-white mb-2">Emergency Hotlines</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                  <span className="text-xs text-neutral-300">Police:</span>
                  <span className="text-xs text-white">{emergencyInfo.emergencyHotlines.police}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-trustBlue-400" />
                  <span className="text-xs text-neutral-300">Ambulance:</span>
                  <span className="text-xs text-white">{emergencyInfo.emergencyHotlines.ambulance}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-warmAccent-500" />
                  <span className="text-xs text-neutral-300">Fire:</span>
                  <span className="text-xs text-white">{emergencyInfo.emergencyHotlines.fire}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyCard;
