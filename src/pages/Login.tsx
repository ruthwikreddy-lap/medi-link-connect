
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, ArrowRight, Heart, MailOpen, Stethoscope } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, setDemoMode } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: "patient" | "provider") => {
    setUserRole(role);
    navigate("/");
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
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="demo">Quick Demo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  
                  {error && (
                    <div className="flex items-center text-red-500 text-sm">
                      <AlertCircle size={16} className="mr-1" />
                      {error}
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full bg-medilink-600 hover:bg-medilink-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                  
                  <p className="text-sm text-center text-gray-500">
                    Use demo accounts: <br />
                    Patient: jane@example.com / password <br />
                    Provider: doctor@example.com / password
                  </p>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="demo">
              <div className="space-y-4">
                <button
                  onClick={() => handleDemoLogin("patient")}
                  className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-3">
                      <MailOpen size={24} className="text-medilink-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Patient Demo</h3>
                      <p className="text-sm text-gray-500">Access the patient dashboard</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-gray-400" />
                </button>
                
                <button
                  onClick={() => handleDemoLogin("provider")}
                  className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-3">
                      <Stethoscope size={24} className="text-green-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Provider Demo</h3>
                      <p className="text-sm text-gray-500">Access the healthcare provider dashboard</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-gray-400" />
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <footer className="bg-white py-4 text-center text-sm text-gray-500">
        © 2025 MediLink - Secure Healthcare Connection
      </footer>
    </div>
  );
};

export default Login;
