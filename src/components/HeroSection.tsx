
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LoginModal } from './LoginModal';
import { Badge } from "@/components/ui/badge";
import { TrustIndicator } from "@/components/TrustIndicator";
import { Calendar } from "@/components/ui/calendar";
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ChevronRight, Stethoscope, User, 
  ShieldCheck, LockKeyhole, Heart, 
  Smartphone, BarChart3, Star,
  Clock, ArrowRight, CheckCircle2,
  Calendar as CalendarIcon,
  LogOut
} from 'lucide-react';

export const HeroSection = () => {
  const { user, profile, signOut } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginType, setLoginType] = useState<'patient' | 'provider'>('patient');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleLoginClick = (type: 'patient' | 'provider') => {
    setLoginType(type);
    setLoginModalOpen(true);
  };

  return (
    <section className="relative min-h-screen pt-28 pb-20 flex items-center overflow-hidden bg-neutral-950">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 z-0"
        aria-hidden="true"
      />
      
      {/* Decorative elements */}
      <div 
        className="absolute top-40 -right-40 w-96 h-96 bg-trustBlue-900/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float"
        aria-hidden="true"
      />
      <div 
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-trustBlue-800/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Text content */}
          <div className="stagger-animation space-y-6 max-w-lg">
            
            <h1 className="font-bold tracking-tight text-white">
              <span className="block text-4xl md:text-5xl lg:text-6xl mb-3">Your Health,</span>
              <span className="gradient-text text-4xl md:text-5xl lg:text-6xl">Simplified</span>
            </h1>
            
            <p className="text-lg text-neutral-300 md:pr-10">
              MediLink brings together patients and healthcare providers in one secure platform, streamlining communication and centralizing medical records for better healthcare experiences.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <TrustIndicator type="encrypted" />
              <TrustIndicator type="secure" />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {user ? (
                <Link to={profile?.user_type === 'provider' ? '/provider' : '/dashboard'}>
                  <Button 
                    size="xl"
                    className="group bg-trustBlue-600 hover:bg-trustBlue-500 text-white rounded-lg transition-all duration-300 shadow-neon hover:shadow-neon-lg transform hover:-translate-y-1 flex items-center justify-center w-full"
                  >
                    <span>Go to {profile?.user_type === 'provider' ? 'Provider' : 'Patient'} Dashboard</span>
                    <ArrowRight className="w-5 h-5 ml-1 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  onClick={() => handleLoginClick('patient')}
                  size="xl"
                  className="group bg-trustBlue-600 hover:bg-trustBlue-500 text-white rounded-lg transition-all duration-300 shadow-neon hover:shadow-neon-lg transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5 ml-1 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all" />
                </Button>
              )}
              
              {user ? (
                <Button 
                  onClick={() => signOut()}
                  variant="trust"
                  size="xl"
                  className="group text-trustBlue-400 hover:text-white rounded-lg transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span>Sign Out</span>
                </Button>
              ) : (
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button 
                    variant="trust"
                    size="xl"
                    className="group text-trustBlue-400 hover:text-white rounded-lg transition-all duration-300 flex items-center justify-center w-full"
                  >
                    <User className="w-5 h-5 mr-2" />
                    <span>Patient Dashboard</span>
                  </Button>
                </Link>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {!user && (
                <Button 
                  onClick={() => handleLoginClick('provider')}
                  variant="outline"
                  size="xl"
                  className="group border-2 border-trustBlue-600 text-trustBlue-400 hover:bg-trustBlue-600/10 hover:text-white rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Stethoscope className="w-5 h-5 mr-2" />
                  <span>For Providers</span>
                </Button>
              )}
            </div>
            
            {/* Quick Access Features */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-lg p-4 transition-all hover:border-trustBlue-700 hover:bg-neutral-800/80">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-trustBlue-900/50 p-1.5 rounded-md">
                    <User className="h-4 w-4 text-trustBlue-400" />
                  </div>
                  <span className="text-sm font-medium text-white">Patient Portal</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Access your records & appointments
                </p>
              </div>
              
              <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-lg p-4 transition-all hover:border-trustBlue-700 hover:bg-neutral-800/80">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-trustBlue-900/50 p-1.5 rounded-md">
                    <CalendarIcon className="h-4 w-4 text-trustBlue-400" />
                  </div>
                  <span className="text-sm font-medium text-white">Scheduling</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Book & manage appointments easily
                </p>
              </div>
            </div>
            
            {/* Testimonial Snippet */}
            <div className="bg-neutral-900/40 backdrop-blur-sm rounded-lg p-4 border border-neutral-800 mt-3">
              <div className="flex items-start gap-3">
                <div className="text-warmAccent-400">
                  <Star className="h-5 w-5 fill-warmAccent-500 text-transparent" />
                </div>
                <div>
                  <p className="text-sm text-neutral-300 italic">
                    "MediLink transformed how I manage my healthcare. Everything I need in one secure place!"
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    — Jennifer K., Patient since 2021
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <p className="text-sm text-neutral-500">
                Trusted by leading healthcare institutions
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                <div className="flex items-center text-neutral-400 hover:text-trustBlue-300 transition-colors">
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  <span>Mayo Clinic</span>
                </div>
                <div className="flex items-center text-neutral-400 hover:text-trustBlue-300 transition-colors">
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  <span>Cleveland Clinic</span>
                </div>
                <div className="flex items-center text-neutral-400 hover:text-trustBlue-300 transition-colors">
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  <span>Johns Hopkins</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Hero image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-trustBlue-900/30 to-trustBlue-800/30 rounded-xl -rotate-2 transform scale-105" />
            <div className="relative glass-card-highlight overflow-hidden rounded-xl shadow-glass border border-trustBlue-800/40 animate-fade-in">
              <div className="flex flex-col">
                <div className="bg-gradient-to-r from-trustBlue-700 to-trustBlue-600 text-white p-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="ml-4 text-sm font-medium">MediLink Health Dashboard</div>
                    <div className="ml-auto">
                      <TrustIndicator type="secure" size="sm" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-neutral-900/90 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Patient Overview</h3>
                    <div className="tag-badge">Updated 2 hrs ago</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-neutral-800/80 p-4 rounded-lg border border-neutral-700/80">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-neutral-400">Upcoming Appointment</div>
                          <div className="font-medium text-white">Dr. Sarah Johnson</div>
                          <div className="text-sm text-neutral-300">Cardiology Consultation</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-trustBlue-400">Aug 15, 2023</div>
                          <div className="text-sm text-neutral-300">10:30 AM</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-800/80 p-4 rounded-lg border border-neutral-700/80">
                      <div className="text-sm text-neutral-400 flex items-center gap-1.5">
                        <Heart className="h-3.5 w-3.5 text-trustBlue-400" />
                        Medication Reminder
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Lisinopril 10mg</div>
                          <div className="text-sm text-neutral-300">1 tablet daily</div>
                        </div>
                        <Button size="sm" variant="trust" className="text-xs px-3">Take Now</Button>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-800/80 p-4 rounded-lg border border-neutral-700/80">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-neutral-400 flex items-center gap-1.5">
                          <CalendarIcon className="h-3.5 w-3.5 text-trustBlue-400" />
                          Appointment Calendar
                        </div>
                        <div className="text-xs text-neutral-500">Select date</div>
                      </div>
                      <div className="bg-neutral-900/60 rounded-lg p-2 border border-neutral-800/60 overflow-hidden">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="bg-transparent border-none shadow-none pointer-events-auto"
                          disabled={(date) => date < new Date()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-2 -bottom-2 flex flex-col gap-2">
              <div className="bg-neutral-900/80 rounded-lg p-2.5 border border-neutral-800 shadow-md flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-trustBlue-600 flex items-center justify-center">
                  <Smartphone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Mobile App</div>
                  <div className="text-sm text-white">Available Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        type={loginType}
      />
    </section>
  );
};
