
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PatientDashboard from "./patient/PatientDashboard";
import ProviderDashboard from "./provider/ProviderDashboard";

const Index: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-xl font-semibold text-medilink-600">Loading MediLink...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Return appropriate dashboard based on user role
  return user.role === "patient" ? <PatientDashboard /> : <ProviderDashboard />;
};

export default Index;
