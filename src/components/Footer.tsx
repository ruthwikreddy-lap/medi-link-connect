
import React from 'react';
import { Mail, Phone, MapPin, HeartPulse, ArrowRight, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-black border-t border-gray-800 text-gray-300 pt-10 pb-6">
      <div className="container mx-auto px-4">
        {/* Top Section with CTA */}
        <div className="relative glass-card p-6 mb-10 overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-white">Ready to transform your healthcare management?</h3>
              <p className="text-gray-400 max-w-md">Join thousands of healthcare professionals who have already made the switch to MediLink.</p>
            </div>
            <Button variant="trust" size="lg" className="flex items-center gap-2 animate-pulse-soft">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-trustBlue-900/40 to-trustBlue-700/10 opacity-40"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
          {/* Company Info */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="mb-4 flex items-center">
              <a href="/" className="text-2xl font-bold flex items-center gap-2">
                <HeartPulse className="h-6 w-6 text-medilink-400" />
                <span className="text-medilink-400">Medi</span>
                <span className="gradient-text">Link</span>
              </a>
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Transforming healthcare management through innovative technology solutions.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-trustBlue-900 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-trustBlue-900 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-trustBlue-900 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.628 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-trustBlue-900 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-400 text-sm hover:text-medilink-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-medilink-400" />
                  About
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 text-sm hover:text-medilink-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-medilink-400" />
                  Features
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-gray-400 text-sm hover:text-medilink-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-medilink-400" />
                  Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 text-sm hover:text-medilink-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-medilink-400" />
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 text-sm hover:text-medilink-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-medilink-400" />
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 text-sm hover:text-medilink-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-medilink-400" />
                  Support
                </a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 text-sm hover:text-medilink-400 transition-colors">Patient Management</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 text-sm hover:text-medilink-400 transition-colors">Electronic Health Records</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 text-sm hover:text-medilink-400 transition-colors">Appointment Scheduling</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 text-sm hover:text-medilink-400 transition-colors">Telemedicine Solutions</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 text-sm hover:text-medilink-400 transition-colors">Healthcare Analytics</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-500 text-xs mb-4 sm:mb-0">
            © {new Date().getFullYear()} MediLink. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-gray-500 hover:text-medilink-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-medilink-400 transition-colors">Terms of Service</a>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-neutral-800 text-gray-400 hover:bg-trustBlue-900 hover:text-white"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
