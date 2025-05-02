
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, ArrowRight, Heart, Mail, Lock, User, Stethoscope, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

const Login: React.FC = () => {
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  // Register state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState<"patient" | "provider">("patient");
  const [registerError, setRegisterError] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, setDemoMode, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to home
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
    } catch (err: any) {
      setLoginError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    
    if (registerPassword !== confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signUp(registerEmail, registerPassword, {
        full_name: fullName,
        user_type: userType
      });
      
      if (error) throw error;
      
      // Clear form on success
      setRegisterEmail("");
      setRegisterPassword("");
      setConfirmPassword("");
      setFullName("");
      
      toast.success("Account created successfully!", {
        description: "Please check your email for verification instructions."
      });
      
    } catch (err: any) {
      setRegisterError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: "patient" | "provider") => {
    setDemoMode(role);
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
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="demo">Quick Demo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {loginError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full bg-trustBlue-600 hover:bg-trustBlue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="full-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                      <Input
                        id="full-name"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>Account Type</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Button
                        type="button"
                        variant={userType === "patient" ? "default" : "outline"}
                        className={`flex items-center justify-center ${
                          userType === "patient" ? "bg-trustBlue-600" : ""
                        }`}
                        onClick={() => setUserType("patient")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Patient
                      </Button>
                      <Button
                        type="button"
                        variant={userType === "provider" ? "default" : "outline"}
                        className={`flex items-center justify-center ${
                          userType === "provider" ? "bg-green-600" : ""
                        }`}
                        onClick={() => setUserType("provider")}
                      >
                        <Stethoscope className="mr-2 h-4 w-4" />
                        Healthcare Provider
                      </Button>
                    </div>
                  </div>
                  
                  {registerError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{registerError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full bg-trustBlue-600 hover:bg-trustBlue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="demo">
              <div className="space-y-4">
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
