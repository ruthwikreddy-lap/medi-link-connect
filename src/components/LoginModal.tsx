
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrustIndicator } from "@/components/TrustIndicator";
import { 
  User, Hospital, 
  ShieldCheck, LockKeyhole, Loader2
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
  const { isLoading, setDemoMode } = useAuth();

  const handleDemoLogin = async () => {
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
        
        <div className="px-4 py-3 space-y-3 mt-1">
          <Alert variant="trust" className="py-2 bg-yellow-900/30 border-yellow-600">
            <LockKeyhole className="h-4 w-4" />
            <AlertDescription className="text-xs">
              This is a demo app. Click the button below to try the {type} experience.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-3">
            <Button 
              onClick={handleDemoLogin}
              className="w-full bg-trustBlue-600 hover:bg-trustBlue-500 text-white transition-colors shadow-neon hover:shadow-neon-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Loading Demo...
                </>
              ) : (
                <>
                  {type === 'patient' ? (
                    <User className="w-4 h-4 mr-1" />
                  ) : (
                    <Hospital className="w-4 h-4 mr-1" />
                  )}
                  Enter {type === 'patient' ? 'Patient' : 'Provider'} Demo
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
