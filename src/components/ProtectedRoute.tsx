
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: 'patient' | 'provider' | null;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  userType = null,
  requireAuth = true
}) => {
  const { profile, isLoading, isDemoMode, setDemoMode } = useAuth();
  const location = useLocation();

  // If still loading, show loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-trustBlue-500 mx-auto" />
          <p className="mt-4 text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If auth is required but user is not in demo mode
  if (requireAuth && !profile) {
    // Redirect to login page but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If userType is specified and doesn't match current profile in demo mode,
  // update the demo mode
  if (isDemoMode && userType && profile && profile.user_type !== userType) {
    setDemoMode(userType);
    return <>{children}</>;
  }
  
  // If userType is specified and doesn't match current profile,
  // redirect to appropriate dashboard
  if (profile && userType && profile.user_type !== userType) {
    const redirectPath = profile.user_type === 'patient' ? '/dashboard' : '/provider';
    return <Navigate to={redirectPath} replace />;
  }

  // Allow access to the protected route
  return <>{children}</>;
};

export default ProtectedRoute;
