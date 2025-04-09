
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type UserRole = "patient" | "provider";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Mock patient data
const MOCK_PATIENT: User = {
  id: "p1",
  name: "Jane Smith",
  email: "jane@example.com",
  role: "patient",
  avatar: "https://i.pravatar.cc/150?img=44",
};

// Mock provider data
const MOCK_PROVIDER: User = {
  id: "d1",
  name: "Dr. Michael Johnson",
  email: "dr.johnson@example.com",
  role: "provider",
  avatar: "https://i.pravatar.cc/150?img=52",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for stored authentication
    const savedUser = localStorage.getItem("medilink-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Demo login logic - in a real app, this would verify with a server
      if (email === "jane@example.com" && password === "password") {
        setUser(MOCK_PATIENT);
        localStorage.setItem("medilink-user", JSON.stringify(MOCK_PATIENT));
        toast.success("Logged in as patient");
      } else if (email === "doctor@example.com" && password === "password") {
        setUser(MOCK_PROVIDER);
        localStorage.setItem("medilink-user", JSON.stringify(MOCK_PROVIDER));
        toast.success("Logged in as healthcare provider");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed: Invalid email or password");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("medilink-user");
    toast.info("You have been logged out");
  };

  const setUserRole = (role: UserRole) => {
    if (role === "patient") {
      setUser(MOCK_PATIENT);
      localStorage.setItem("medilink-user", JSON.stringify(MOCK_PATIENT));
    } else {
      setUser(MOCK_PROVIDER);
      localStorage.setItem("medilink-user", JSON.stringify(MOCK_PROVIDER));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
