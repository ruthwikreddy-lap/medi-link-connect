import { useEffect } from 'react';
import { NavBar } from '@/components/NavBar';
import { HeroSection } from '@/components/HeroSection';
import { FeatureSection } from '@/components/FeatureSection';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrustIndicator } from '@/components/TrustIndicator';
import { 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Hospital,
  Calendar,
  Pill,
  MessageSquare,
  BarChart3,
  Clock,
  Users,
  LockKeyhole
} from 'lucide-react';

const Index = () => {
  // Smooth scroll functionality
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.href.includes(window.location.pathname)) {
        e.preventDefault();
        
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80, // Offset for fixed header
            behavior: 'smooth'
          });
          
          // Update URL
          history.pushState(null, '', anchor.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Animation on scroll functionality
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll('.stagger-animation > *');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        
        {/* Presentation Section */}
        <section id="presentation" className="section-padding bg-gradient-to-b from-neutral-900 to-neutral-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 stagger-animation">
              <Badge variant="trust" className="mb-4">
                <BarChart3 className="h-3.5 w-3.5 mr-1" />
                Our Pitch
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                MediLink Presentation
              </h2>
              <p className="text-lg text-neutral-300 mb-8">
                Discover the future of healthcare management with MediLink through our comprehensive pitch presentation.
              </p>
              <a 
                href="https://www.canva.com/design/DAGUe8WfBgA/2U3God0vmkgpuqSahYUBCw/view?utm_content=DAGUe8WfBgA&utm_campaign=designshare&utm_medium=embeds&utm_source=link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-trustBlue-600 text-white rounded-md hover:bg-trustBlue-500 transition-colors shadow-neon hover:shadow-neon-lg inline-flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                View Presentation
              </a>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="glass-card-highlight" style={{ position: 'relative', width: '100%', height: '0', paddingTop: '56.25%', paddingBottom: '0', boxShadow: '0 8px 32px rgba(30, 136, 229, 0.2)', marginTop: '1.6em', marginBottom: '0.9em', overflow: 'hidden', borderRadius: '12px' }}>
                <iframe 
                  loading="lazy" 
                  style={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0', border: 'none', padding: '0', margin: '0' }}
                  src="https://www.canva.com/design/DAGUe8WfBgA/2U3God0vmkgpuqSahYUBCw/view?embed" 
                  allowFullScreen={true}
                  title="MediLink Presentation"
                />
              </div>
              <div className="text-center text-neutral-400 text-sm mt-2">
                <a 
                  href="https://www.canva.com/design/DAGUe8WfBgA/2U3God0vmkgpuqSahYUBCw/view?utm_content=DAGUe8WfBgA&utm_campaign=designshare&utm_medium=embeds&utm_source=link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-trustBlue-400 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> 
                  MediLink Presentation by Ruthwik Reddy
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Solutions Section */}
        <section id="solutions" className="section-padding bg-neutral-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 stagger-animation">
              <Badge variant="trust" className="mb-4">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Our Solutions
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Tailored for Every Healthcare Need
              </h2>
              <p className="text-lg text-neutral-300">
                MediLink offers specialized solutions for various stakeholders in the healthcare ecosystem, 
                from individual patients to large hospital networks.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="glass-card p-8 shadow-glass border border-trustBlue-900/30 rounded-xl">
                <div className="flex items-center gap-2 mb-5">
                  <div className="bg-trustBlue-600/20 text-trustBlue-500 p-2 rounded-lg">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">For Patients</h3>
                  <TrustIndicator type="certified" className="ml-auto" />
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-trustBlue-900/30 text-trustBlue-400 p-1 rounded-full mr-3 mt-1">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-white">Personal Health Records</span>
                      <p className="text-neutral-400 text-sm">Access and manage your complete medical history.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-trustBlue-900/30 text-trustBlue-400 p-1 rounded-full mr-3 mt-1">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-white">Appointment Scheduling</span>
                      <p className="text-neutral-400 text-sm">Book and manage medical appointments easily.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-trustBlue-900/30 text-trustBlue-400 p-1 rounded-full mr-3 mt-1">
                      <Pill className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-white">Medication Tracking</span>
                      <p className="text-neutral-400 text-sm">Set reminders and track your medication schedule.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-trustBlue-900/30 text-trustBlue-400 p-1 rounded-full mr-3 mt-1">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-white">Provider Communication</span>
                      <p className="text-neutral-400 text-sm">Securely message your healthcare providers.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="glass-card p-8 shadow-glass border border-trustBlue-900/30 rounded-xl">
                <div className="flex items-center gap-2 mb-5">
                  <div className="bg-trustBlue-600/20 text-trustBlue-500 p-2 rounded-lg">
                    <Hospital className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">For Healthcare Providers</h3>
                  <TrustIndicator type="certified" className="ml-auto" />
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-trustBlue-900/30 text-trustBlue-400 p-1 rounded-full mr-3 mt-1">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-white">Patient Management</span>
                      <p className="text-neutral-400 text-sm">Track patient data and manage care efficiently.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-trustBlue-900/30 text-trustBlue-400 p-1 rounded-full mr-3 mt-1">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-white">Resource Optimization</span>
                      <p className="text-neutral-400 text-sm">Manage inventory, staff, and facility resources.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-trustBlue-900/30 text-trustBlue-400 p-1 rounded-full mr-3 mt-1">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-white">Scheduling System</span>
                      <p className="text-neutral-400 text-sm">Efficiently manage appointments and staff schedules.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-trustBlue-900/30 text-trustBlue-400 p-1 rounded-full mr-3 mt-1">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-white">Analytics & Reporting</span>
                      <p className="text-neutral-400 text-sm">Gain insights from data-driven reports and analytics.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="section-padding bg-gradient-to-b from-neutral-950 to-neutral-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 stagger-animation">
              <Badge variant="trust" className="mb-4">
                <Hospital className="h-3.5 w-3.5 mr-1" />
                About MediLink
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Vision for Healthcare
              </h2>
              <p className="text-lg text-neutral-300">
                MediLink was founded with a mission to transform healthcare management through 
                innovative technology solutions that prioritize patient care and provider efficiency.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Bridging Gaps in Healthcare
                </h3>
                <p className="text-neutral-300 mb-6">
                  Our journey began with identifying the critical challenges in modern healthcare: 
                  fragmented medical records, poor communication, resource mismanagement, 
                  data security concerns, and appointment hassles.
                </p>
                <p className="text-neutral-300 mb-6">
                  We developed MediLink as a comprehensive solution that addresses these 
                  challenges head-on, creating a seamless healthcare management experience 
                  for both patients and providers.
                </p>
                <p className="text-neutral-300">
                  Today, MediLink is trusted by leading healthcare institutions and thousands 
                  of patients nationwide, transforming how healthcare is managed and delivered.
                </p>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  <TrustIndicator type="certified" />
                  <TrustIndicator type="encrypted" />
                  <TrustIndicator type="certified" />
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="glass-card rounded-xl overflow-hidden shadow-glass-lg border border-trustBlue-800/30">
                  <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                    <div className="p-8 flex items-center justify-center h-full bg-gradient-to-r from-trustBlue-700 to-trustBlue-600 text-white text-center">
                      <div>
                        <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-white/90" />
                        <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                        <p className="text-xl opacity-90">
                          To create a healthcare ecosystem where information flows seamlessly, 
                          empowering better decisions and improved patient outcomes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-3 -bottom-3 bg-trustBlue-900/80 rounded-lg p-3 border border-trustBlue-700/50 shadow-neon">
                  <Badge variant="trust">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    Serving since 2018
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="section-padding bg-neutral-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 stagger-animation">
              <Badge variant="trust" className="mb-4">
                <MessageSquare className="h-3.5 w-3.5 mr-1" />
                Get in Touch
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Healthcare Experience?
              </h2>
              <p className="text-lg text-neutral-300">
                Contact us to learn more about MediLink and how it can benefit you or your healthcare organization.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-8 border border-trustBlue-900/20 rounded-xl shadow-glass">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <TrustIndicator type="secure" />
                  <TrustIndicator type="encrypted" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="enhanced-input"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="enhanced-input"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="enhanced-input"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="enhanced-input"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="enhanced-input"
                        placeholder="Please provide details about your inquiry..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Button
                    type="submit"
                    className="px-8 py-3 bg-trustBlue-600 hover:bg-trustBlue-500 text-white rounded-lg transition-colors shadow-neon hover:shadow-neon-lg flex items-center justify-center mx-auto gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send Message
                  </Button>
                  <p className="text-neutral-500 text-sm mt-3 flex items-center justify-center gap-1.5">
                    <LockKeyhole className="w-3.5 h-3.5 text-trustBlue-500" />
                    Your information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
