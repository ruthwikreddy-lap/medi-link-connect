import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Demo profiles for the application
const DEMO_PROFILES = {
  patient: {
    id: "demo-patient-id",
    user_type: 'patient' as const,
    full_name: 'Demo Patient',
  },
  provider: {
    id: "demo-provider-id",
    user_type: 'provider' as const,
    full_name: 'Demo Provider',
  }
};

interface Profile {
  id: string;
  user_type: 'patient' | 'provider';
  full_name: string | null;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userData: { full_name: string, user_type: 'patient' | 'provider' }) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  setDemoMode: (userType: 'patient' | 'provider') => void;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true); // Default to demo mode
  const navigate = useNavigate();

  useEffect(() => {
    // Set demo patient profile by default
    setProfile(DEMO_PROFILES.patient);
  }, []);

  const setDemoMode = (userType: 'patient' | 'provider') => {
    setProfile(userType === 'patient' ? DEMO_PROFILES.patient : DEMO_PROFILES.provider);
    
    // Navigate to the appropriate dashboard
    const destination = userType === 'provider' ? '/provider' : '/dashboard';
    navigate(destination);
    
    toast.success(`Switched to ${userType} demo mode`, {
      description: `You are now viewing the app as a demo ${userType}.`,
    });
  };

  // Keep these methods for compatibility, but they'll just switch to demo mode
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Determine user type based on email for demo purposes
      const userType = email.includes('provider') ? 'provider' : 'patient';
      setDemoMode(userType);
      
      return { error: null };
    } catch (error: any) {
      toast.error('Demo Mode Active', {
        description: 'Authentication is disabled in demo mode.',
      });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userData: { full_name: string, user_type: 'patient' | 'provider' }
  ) => {
    setIsLoading(true);
    
    try {
      // Set demo mode based on selected user type
      setDemoMode(userData.user_type);
      
      return { error: null };
    } catch (error: any) {
      toast.error('Demo Mode Active', {
        description: 'Authentication is disabled in demo mode.',
      });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    
    try {
      // Reset to patient demo by default
      setProfile(DEMO_PROFILES.patient);
      navigate('/');
      toast.success('Returned to demo home');
    } catch (error: any) {
      toast.error('Error', {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    setDemoMode,
    isDemoMode
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
