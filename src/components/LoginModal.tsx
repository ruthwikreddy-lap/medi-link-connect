
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrustIndicator } from "@/components/TrustIndicator";
import { 
  Eye, EyeOff, User, Hospital, Lock, Mail, 
  ShieldCheck, LockKeyhole, Loader2,
  Fingerprint, Smartphone, Key
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'patient' | 'provider';
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, type }) => {
  const navigate = useNavigate();
  const { signIn, signUp, isLoading, setDemoMode } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState(type === 'provider' ? "provider@demo.com" : "patient@demo.com");
  const [loginPassword, setLoginPassword] = useState("demopassword");
  
  // Register form state
  const [fullName, setFullName] = useState(type === 'provider' ? "Demo Provider" : "Demo Patient");
  const [registerEmail, setRegisterEmail] = useState(type === 'provider' ? "provider@demo.com" : "patient@demo.com");
  const [registerPassword, setRegisterPassword] = useState("demopassword");
  const [confirmPassword, setConfirmPassword] = useState("demopassword");
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('strong');
  const [providerId, setProviderId] = useState(type === 'provider' ? "DEMO-12345" : "");
  
  // Options
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(true);

  // Reset form when modal opens or type changes
  useEffect(() => {
    if (isOpen) {
      setLoginEmail(type === 'provider' ? "provider@demo.com" : "patient@demo.com");
      setLoginPassword("demopassword");
      setFullName(type === 'provider' ? "Demo Provider" : "Demo Patient");
      setRegisterEmail(type === 'provider' ? "provider@demo.com" : "patient@demo.com");
      setRegisterPassword("demopassword");
      setConfirmPassword("demopassword");
      setProviderId(type === 'provider' ? "DEMO-12345" : "");
      setRememberMe(true);
      setAgreeToTerms(true);
    }
  }, [isOpen, type]);

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return null;
    
    // Simple password strength calculation
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);
    const isLongEnough = pass.length >= 8;
    
    const score = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars, isLongEnough].filter(Boolean).length;
    
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setRegisterPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword) || 'medium');
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': 
        return 'bg-red-500';
      case 'medium': 
        return 'bg-yellow-500';
      case 'strong': 
        return 'bg-green-500';
      default: 
        return 'bg-neutral-700';
    }
  };

  const getStrengthWidth = () => {
    switch (passwordStrength) {
      case 'weak': 
        return 'w-1/3';
      case 'medium': 
        return 'w-2/3';
      case 'strong': 
        return 'w-full';
      default: 
        return 'w-0';
    }
  };

  const handleDemoLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simply set the demo mode and close modal
    setDemoMode(type);
    onClose();
    
    toast.success('Demo Mode Activated', {
      description: `You are now using the app as a demo ${type}.`,
    });
  };
  
  const handleDemoRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simply set the demo mode and close modal
    setDemoMode(type);
    onClose();
    
    toast.success('Demo Mode Activated', {
      description: `You are now using the app as a demo ${type}.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-h-[90vh] overflow-y-auto rounded-lg p-0 bg-neutral-900 border border-neutral-800">
        <div className="bg-trustBlue-600 p-4 text-white">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-semibold tracking-tight">
              Demo Mode: {type === 'patient' ? 'Patient Portal' : 'Healthcare Provider Portal'}
            </DialogTitle>
            <DialogDescription className="text-white/80 mt-1 text-sm">
              This is a demo app. No real authentication required.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="flex items-center justify-center gap-2 -mt-2">
          <TrustIndicator type="encrypted" />
        </div>
        
        <Tabs 
          defaultValue={activeTab} 
          onValueChange={setActiveTab}
          className="px-4 py-3"
        >
          <TabsList className="grid grid-cols-2 mb-4 bg-neutral-800">
            <TabsTrigger value="login" className="data-[state=active]:bg-trustBlue-600 data-[state=active]:text-white">Demo Login</TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-trustBlue-600 data-[state=active]:text-white">Demo Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-3 mt-1">
            <Alert variant="trust" className="py-2 bg-yellow-900/30 border-yellow-600">
              <LockKeyhole className="h-4 w-4" />
              <AlertDescription className="text-xs">
                This is a demo app. Click the button below to try the {type} experience.
              </AlertDescription>
            </Alert>
            
            <form onSubmit={handleDemoLogin} className="space-y-3">
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-neutral-300 text-sm">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <Input 
                      id="email" 
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Enter your email" 
                      className="pl-10 bg-neutral-800 border-neutral-700 focus:border-trustBlue-600"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-neutral-300 text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter any password for demo" 
                      className="pl-10 pr-10 bg-neutral-800 border-neutral-700 focus:border-trustBlue-600"
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
                
                <Button 
                  type="submit" 
                  className="w-full bg-trustBlue-600 hover:bg-trustBlue-500 text-white transition-colors shadow-neon hover:shadow-neon-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      Loading Demo...
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4 mr-1" />
                      Enter {type === 'patient' ? 'Patient' : 'Provider'} Demo
                    </>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-3 mt-1">
            <Alert variant="trust" className="py-2 bg-yellow-900/30 border-yellow-600">
              <LockKeyhole className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Demo registration. No real data will be stored.
              </AlertDescription>
            </Alert>
            
            <form onSubmit={handleDemoRegister} className="space-y-3">
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="register-name" className="text-neutral-300 text-sm">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <Input 
                      id="register-name" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name" 
                      className="pl-10 bg-neutral-800 border-neutral-700 focus:border-trustBlue-600"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="register-email" className="text-neutral-300 text-sm">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <Input 
                      id="register-email" 
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="Enter your email" 
                      className="pl-10 bg-neutral-800 border-neutral-700 focus:border-trustBlue-600"
                    />
                  </div>
                </div>
                
                {type === 'provider' && (
                  <div className="space-y-1.5">
                    <Label htmlFor="provider-id" className="text-neutral-300 text-sm">Provider ID / License</Label>
                    <div className="relative">
                      <Hospital className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                      <Input 
                        id="provider-id" 
                        value={providerId}
                        onChange={(e) => setProviderId(e.target.value)}
                        placeholder="Any value for demo" 
                        className="pl-10 bg-neutral-800 border-neutral-700 focus:border-trustBlue-600"
                      />
                    </div>
                  </div>
                )}
                
                <Button 
                  type="submit"
                  className="w-full bg-trustBlue-600 hover:bg-trustBlue-500 text-white transition-colors shadow-neon hover:shadow-neon-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      Loading Demo...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 mr-1" />
                      Enter {type === 'patient' ? 'Patient' : 'Provider'} Demo
                    </>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
