
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, User, Stethoscope } from "lucide-react";
import { toast } from "sonner";

const Login: React.FC = () => {
  const { setDemoMode, profile } = useAuth();
  const navigate = useNavigate();
  
  // If already logged in, redirect to appropriate dashboard
  React.useEffect(() => {
    if (profile) {
      const redirectPath = profile.user_type === 'patient' ? '/dashboard' : '/provider';
      navigate(redirectPath);
    }
  }, [profile, navigate]);

  const handleDemoLogin = (role: "patient" | "provider") => {
    setDemoMode(role);
    toast.success(`Demo Mode: ${role}`, {
      description: `You are now using the app as a ${role} in demo mode.`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="medilink-gradient py-16 px-4 flex-grow flex flex-col items-center justify-center text-white">
        <div className="flex items-center mb-4">
          <Heart size={32} className="mr-2" strokeWidth={2.5} />
          <h1 className="text-3xl font-bold">MediLink</h1>
        </div>
        <p className="text-center mb-8 max-w-md">
          Your comprehensive healthcare management platform connecting patients and providers
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-gray-800">
          <div className="space-y-4">
            <p className="text-lg font-semibold text-center text-gray-700 mb-4">
              Demo Application
            </p>
            <p className="text-sm text-center text-gray-500 mb-4">
              Try out the system without creating an account
            </p>
            
            <button
              onClick={() => handleDemoLogin("patient")}
              className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <User className="text-trustBlue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">Patient Demo</h3>
                  <p className="text-sm text-gray-500">Access the patient dashboard</p>
                </div>
              </div>
              <ArrowRight className="text-gray-400" />
            </button>
            
            <button
              onClick={() => handleDemoLogin("provider")}
              className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-3">
                  <Stethoscope className="text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">Provider Demo</h3>
                  <p className="text-sm text-gray-500">Access the healthcare provider dashboard</p>
                </div>
              </div>
              <ArrowRight className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      
      <footer className="bg-white py-4 text-center text-sm text-gray-500">
        © 2025 MediLink - Secure Healthcare Connection
      </footer>
    </div>
  );
};

export default Login;
