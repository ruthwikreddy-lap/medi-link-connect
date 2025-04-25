
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { useAuth } from '@/contexts/AuthContext';

interface EmergencyQRCodeProps {
  size?: number;
  className?: string;
}

const EmergencyQRCode: React.FC<EmergencyQRCodeProps> = ({ 
  size = 128, 
  className = "" 
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const { profile } = useAuth();
  
  // Generate the emergency data to be encoded in QR format
  const emergencyData = {
    name: profile?.full_name || 'John Smith',
    id: profile?.id || 'DEMO-12345',
    userType: profile?.user_type || 'patient',
    emergencyInfo: {
      bloodType: 'O+',
      allergies: 'None',
      medications: 'None',
      emergencyContact: '+1 (555) 123-4567',
      preferredHospital: 'General Hospital',
      insuranceStatus: 'Valid',
      familyDoctor: 'Dr. Jane Watson',
    }
  };
  
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // Convert data to JSON string and encode as QR code
        const dataString = JSON.stringify(emergencyData);
        const dataUrl = await QRCode.toDataURL(dataString, {
          width: size,
          margin: 1,
          color: {
            dark: '#0f172a', // Dark color (navy blue)
            light: '#ffffff', // Light color (white)
          },
        });
        
        setQrDataUrl(dataUrl);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };
    
    generateQRCode();
  }, [profile, size]);
  
  if (!qrDataUrl) {
    return (
      <div 
        className={`bg-neutral-800 rounded-md flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="animate-pulse bg-neutral-700 w-3/4 h-3/4 rounded-md"></div>
      </div>
    );
  }
  
  return (
    <img 
      src={qrDataUrl} 
      alt="Emergency Information QR Code" 
      className={`rounded-md ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default EmergencyQRCode;
