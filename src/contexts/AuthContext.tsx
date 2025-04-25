
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
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
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userData: { full_name: string, user_type: 'patient' | 'provider' }) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: Partial<Profile>) => Promise<{ error: any | null }>;
  isDemoMode: boolean;
  setDemoMode: (userType: 'patient' | 'provider') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          setProfile(profile);
          setIsDemoMode(false);
        } else {
          setProfile(null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      setProfile(data);
      setIsDemoMode(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (!error) {
        toast.success('Signed in successfully');
        navigate('/');
      } else {
        toast.error('Sign in failed', {
          description: error.message
        });
      }
      
      setIsLoading(false);
      return { error };
    } catch (error) {
      setIsLoading(false);
      return { error };
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userData: { full_name: string, user_type: 'patient' | 'provider' }
  ) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (!error) {
        toast.success('Account created successfully!', {
          description: 'You can now sign in with your credentials.'
        });
      } else {
        toast.error('Sign up failed', {
          description: error.message
        });
      }
      
      setIsLoading(false);
      return { error };
    } catch (error) {
      setIsLoading(false);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setIsDemoMode(false);
      setProfile(null);
      setUser(null);
      setSession(null);
      navigate('/');
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error('Error signing out', {
        description: error.message
      });
    }
  };
  
  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!user) return { error: new Error('User not authenticated') };
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);
        
      if (!error) {
        // Update local profile state
        setProfile(prev => prev ? { ...prev, ...profileData } : null);
        toast.success('Profile updated successfully');
      } else {
        toast.error('Failed to update profile', {
          description: error.message
        });
      }
      
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const setDemoMode = (userType: 'patient' | 'provider') => {
    // Clear any real authentication
    if (session) {
      signOut();
    }
    
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
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
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
