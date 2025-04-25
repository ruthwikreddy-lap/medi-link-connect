
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: 'patient' | 'provider' | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  userType = null 
}) => {
  const { profile, isLoading, setDemoMode } = useAuth();
  const location = useLocation();

  // If still loading, show loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-trustBlue-500 mx-auto" />
          <p className="mt-4 text-neutral-400">Loading demo...</p>
        </div>
      </div>
    );
  }

  // In demo mode, if userType is provided and doesn't match current profile,
  // set the appropriate demo mode
  if (userType && profile && profile.user_type !== userType) {
    setDemoMode(userType);
  }

  // Always render the children in demo mode
  return <>{children}</>;
};

export default ProtectedRoute;
