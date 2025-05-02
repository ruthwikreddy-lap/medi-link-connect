import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Search, 
  ChevronDown,
  User,
  Stethoscope,
  ShieldCheck,
  LockKeyhole,
  LogOut
} from "lucide-react";
import { LoginModal } from './LoginModal';
import { Badge } from "@/components/ui/badge";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { TrustIndicator } from "@/components/TrustIndicator";
import { Link, useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const { session, profile, isDemoMode, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginType, setLoginType] = useState<'patient' | 'provider'>('patient');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  // Recent searches mock data
  const recentSearches = [
    'Medical records', 
    'Cardiology appointment', 
    'Insurance details',
    'Prescription refill'
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLoginClick = (type: 'patient' | 'provider') => {
    setLoginType(type);
    setLoginModalOpen(true);
  };
  
  const handleDashboardClick = () => {
    if (profile?.user_type === 'provider') {
      navigate('/provider');
    } else {
      navigate('/dashboard');
    }
  };

  const isAuthenticated = session || isDemoMode;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-md shadow-soft border-b border-gray-800 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-2xl font-bold flex items-center"
              >
                <span className="text-trustBlue-400">Medi</span>
                <span className="gradient-text">Link</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className="bg-transparent text-gray-300 hover:text-trustBlue-400 hover:bg-trustBlue-950/50"
                    >
                      Features
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="#features"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-trustBlue-950/50 hover:text-trustBlue-400"
                            >
                              <div className="flex items-center">
                                <User className="h-4 w-4 text-trustBlue-400 mr-2" />
                                <div className="text-sm font-medium">Patient Portal</div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                                Manage your health records, appointments, and prescriptions
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="#features"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-trustBlue-950/50 hover:text-trustBlue-400"
                            >
                              <div className="flex items-center">
                                <Stethoscope className="h-4 w-4 text-trustBlue-400 mr-2" />
                                <div className="text-sm font-medium">Provider Tools</div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                                Streamline patient care, scheduling, and resource management
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="#features"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-trustBlue-950/50 hover:text-trustBlue-400"
                            >
                              <div className="flex items-center">
                                <ShieldCheck className="h-4 w-4 text-trustBlue-400 mr-2" />
                                <div className="text-sm font-medium">Security Features</div>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="#features"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-trustBlue-950/50 hover:text-trustBlue-400"
                            >
                              <div className="flex items-center">
                                <LockKeyhole className="h-4 w-4 text-trustBlue-400 mr-2" />
                                <div className="text-sm font-medium">Privacy Controls</div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                                Full control over who can access your medical information
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="#solutions"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-gray-300 hover:text-trustBlue-400 hover:bg-trustBlue-950/50"
                      )}
                    >
                      Solutions
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="#about"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-gray-300 hover:text-trustBlue-400 hover:bg-trustBlue-950/50"
                      )}
                    >
                      About
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="#contact"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-gray-300 hover:text-trustBlue-400 hover:bg-trustBlue-950/50"
                      )}
                    >
                      Contact
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Search Bar */}
              <div className="relative" ref={searchRef}>
                <button
                  className="flex items-center gap-2 text-gray-300 hover:text-trustBlue-400 transition-colors p-2 rounded-lg hover:bg-trustBlue-950/50"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden lg:inline">Search</span>
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-neutral-900 border border-neutral-800 rounded-lg shadow-soft p-3 animate-fade-in z-50">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search for records, prescriptions..."
                        className="w-full py-2 pl-10 pr-4 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-trustBlue-500 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    {recentSearches.length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs text-neutral-500 mb-2">Recent Searches</div>
                        <ul className="space-y-1">
                          {recentSearches.map((search, index) => (
                            <li key={index}>
                              <button 
                                className="w-full text-left px-2 py-1.5 rounded hover:bg-trustBlue-950/50 text-sm text-neutral-300 hover:text-trustBlue-400 transition-colors flex items-center"
                                onClick={() => setSearchQuery(search)}
                              >
                                <Search className="w-3.5 h-3.5 mr-2 text-neutral-500" />
                                {search}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Login/Register Buttons or User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Button 
                    onClick={handleDashboardClick}
                    variant="trust" 
                    className="text-trustBlue-300 hover:text-white"
                  >
                    {profile?.user_type === 'provider' ? (
                      <>
                        <Stethoscope className="h-4 w-4 mr-2" />
                        Provider Dashboard
                      </>
                    ) : (
                      <>
                        <User className="h-4 w-4 mr-2" />
                        Patient Dashboard
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={() => signOut()}
                    variant="outline" 
                    className="border-trustBlue-800 text-trustBlue-300 hover:bg-trustBlue-950"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => handleLoginClick('patient')}
                    variant="outline" 
                    className="border-trustBlue-600 text-trustBlue-400 hover:bg-trustBlue-600 hover:text-black button-hover-effect"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Patient Login
                  </Button>
                  <Button 
                    onClick={() => handleLoginClick('provider')}
                    className="bg-trustBlue-600 text-black hover:bg-trustBlue-500 button-hover-effect"
                  >
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Provider Login
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-trustBlue-400" />
              ) : (
                <Menu className="h-6 w-6 text-trustBlue-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-gray-800 mt-3 animate-fade-in">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search MediLink..."
                  className="w-full py-2 pl-10 pr-4 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-trustBlue-500 text-white"
                />
              </div>
              
              <nav className="flex flex-col space-y-4">
                <a 
                  href="#features" 
                  className="text-gray-300 hover:text-trustBlue-400 transition-colors font-medium py-2 flex items-center justify-between"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Features</span>
                  <ChevronDown className="h-4 w-4" />
                </a>
                <a 
                  href="#solutions" 
                  className="text-gray-300 hover:text-trustBlue-400 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Solutions
                </a>
                <a 
                  href="#about" 
                  className="text-gray-300 hover:text-trustBlue-400 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="#contact" 
                  className="text-gray-300 hover:text-trustBlue-400 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
                
                <div className="flex flex-col space-y-3 pt-3 border-t border-gray-800">
                  {isAuthenticated ? (
                    <>
                      <Button 
                        onClick={() => {
                          handleDashboardClick();
                          setIsMenuOpen(false);
                        }}
                        variant="trust" 
                        className="w-full justify-center text-trustBlue-300 hover:text-white"
                      >
                        {profile?.user_type === 'provider' ? (
                          <>
                            <Stethoscope className="h-4 w-4 mr-2" />
                            Provider Dashboard
                          </>
                        ) : (
                          <>
                            <User className="h-4 w-4 mr-2" />
                            Patient Dashboard
                          </>
                        )}
                      </Button>
                      <Button 
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        variant="outline" 
                        className="w-full justify-center border-trustBlue-800 text-trustBlue-300 hover:bg-trustBlue-950"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        onClick={() => {
                          handleLoginClick('patient');
                          setIsMenuOpen(false);
                        }}
                        variant="outline" 
                        className="w-full border-trustBlue-600 text-trustBlue-400 hover:bg-trustBlue-600 hover:text-black"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Patient Login
                      </Button>
                      <Button 
                        onClick={() => {
                          handleLoginClick('provider');
                          setIsMenuOpen(false);
                        }}
                        className="w-full bg-trustBlue-600 text-black hover:bg-trustBlue-500"
                      >
                        <Stethoscope className="h-4 w-4 mr-2" />
                        Provider Login
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        type={loginType}
      />
    </>
  );
};

export default NavBar;
