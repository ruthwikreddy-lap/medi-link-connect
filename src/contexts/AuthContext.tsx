
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Profile {
  id: string;
  user_type: 'patient' | 'provider';
  full_name: string | null;
  avatar_url: string | null;
  date_of_birth: string | null;
  blood_type: string | null;
  allergies: string[] | null;
  medical_conditions: string[] | null;
  phone: string | null;
  address: string | null;
  email: string | null;
  emergency_contact: string | null;
}

interface AuthContextType {
  profile: Profile | null;
  isLoading: boolean;
  isDemoMode: boolean;
  setDemoMode: (userType: 'patient' | 'provider') => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      setIsDemoMode(false);
      setProfile(null);
      navigate('/');
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error('Error signing out', {
        description: error.message
      });
    }
  };

  const setDemoMode = (userType: 'patient' | 'provider') => {
    // Set demo profile
    setProfile({
      id: userType === 'patient' ? 'demo-patient' : 'demo-provider',
      user_type: userType,
      full_name: userType === 'patient' ? 'Demo Patient' : 'Demo Provider',
      avatar_url: null,
      date_of_birth: userType === 'patient' ? '1985-05-15' : null,
      blood_type: userType === 'patient' ? 'O+' : null,
      allergies: userType === 'patient' ? ['Penicillin'] : null,
      medical_conditions: userType === 'patient' ? ['Hypertension'] : null,
      phone: '555-123-4567',
      address: '123 Health St, Medical City',
      email: userType === 'patient' ? 'patient@demo.com' : 'provider@demo.com',
      emergency_contact: userType === 'patient' ? 'Jane Doe (Spouse) 555-987-6543' : null
    });
    
    setIsDemoMode(true);
    const destination = userType === 'provider' ? '/provider' : '/dashboard';
    navigate(destination);
    
    toast.success(`Demo Mode: ${userType}`, {
      description: `You are viewing the app as a ${userType} in demo mode.`
    });
  };

  const value = {
    profile,
    isLoading,
    isDemoMode,
    setDemoMode,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
