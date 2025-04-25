
import React from 'react';
import { 
  FileText, 
  MessageSquare, 
  Calendar, 
  Pill, 
  Package2, 
  ShieldCheck 
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="neo-card group hover:shadow-glass transition-all duration-300 rounded-xl overflow-hidden">
      <div className="flex flex-col items-center text-center p-8">
        <div className="bg-trustBlue-900/20 text-trustBlue-400 p-4 rounded-xl mb-5 group-hover:bg-trustBlue-600 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-neutral-300">{description}</p>
      </div>
    </div>
  );
};

export const FeatureSection = () => {
  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Centralized Medical Records",
      description: "Access your complete medical history, including diagnoses, medications, and test results securely in one place."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Seamless Communication",
      description: "Connect with healthcare providers through messaging and video consultations for efficient care coordination."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Appointment Management",
      description: "Easily schedule, manage, and receive reminders for your medical appointments to never miss a visit."
    },
    {
      icon: <Pill className="w-6 h-6" />,
      title: "Medication Management",
      description: "Track medications, set reminders, and manage refills effortlessly through the platform."
    },
    {
      icon: <Package2 className="w-6 h-6" />,
      title: "Resource Management",
      description: "Healthcare facilities can efficiently monitor and optimize inventory levels and bed occupancy."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Data Security",
      description: "Your health information is protected with advanced encryption and security measures for privacy."
    }
  ];

  return (
    <section id="features" className="section-padding bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto stagger-animation">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-trustBlue-900/30 text-trustBlue-400 border border-trustBlue-700/30 mb-4">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Key Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Transforming Healthcare Management
          </h2>
          <p className="text-lg text-neutral-300">
            MediLink provides comprehensive tools for both patients and healthcare providers, 
            designed to streamline the healthcare experience and improve outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
