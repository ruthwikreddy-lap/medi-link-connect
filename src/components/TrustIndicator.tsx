
import React from 'react';
import { LockKeyhole, Shield, ShieldCheck, FileWarning, AlertTriangle, Clock, UserCheck, BadgeAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type TrustIndicatorProps = {
  type: 'encrypted' | 'secure' | 'certified' | 'warning' | 'urgent' | 'verified' | 'restricted';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
};

export const TrustIndicator = ({ 
  type, 
  className,
  size = 'md',
  showIcon = true
}: TrustIndicatorProps) => {
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-3',
    lg: 'text-base py-1.5 px-4'
  };
  
  const getContent = () => {
    switch (type) {
      case 'encrypted':
        return {
          icon: <LockKeyhole className="w-3.5 h-3.5" />,
          text: 'Data Encrypted',
          classes: 'bg-trustBlue-900/30 text-trustBlue-300 border-trustBlue-700/30'
        };
      case 'secure':
        return {
          icon: <ShieldCheck className="w-3.5 h-3.5" />,
          text: 'Secure Connection',
          classes: 'bg-trustBlue-900/30 text-trustBlue-300 border-trustBlue-700/30'
        };
      case 'certified':
        return {
          icon: <ShieldCheck className="w-3.5 h-3.5" />,
          text: 'Medical Certified',
          classes: 'bg-trustBlue-900/30 text-trustBlue-300 border-trustBlue-700/30'
        };
      case 'warning':
        return {
          icon: <FileWarning className="w-3.5 h-3.5" />,
          text: 'Requires Authorization',
          classes: 'bg-warmAccent-900/30 text-warmAccent-300 border-warmAccent-700/30'
        };
      case 'urgent':
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          text: 'Urgent',
          classes: 'bg-red-900/30 text-red-300 border-red-700/30'
        };
      case 'verified':
        return {
          icon: <UserCheck className="w-3.5 h-3.5" />,
          text: 'Provider Verified',
          classes: 'bg-green-900/30 text-green-300 border-green-700/30'
        };
      case 'restricted':
        return {
          icon: <BadgeAlert className="w-3.5 h-3.5" />,
          text: 'Access Restricted',
          classes: 'bg-amber-900/30 text-amber-300 border-amber-700/30'
        };
      default:
        return {
          icon: <Shield className="w-3.5 h-3.5" />,
          text: 'Protected',
          classes: 'bg-trustBlue-900/30 text-trustBlue-300 border-trustBlue-700/30'
        };
    }
  };
  
  const content = getContent();
  
  return (
    <div className={cn(
      "flex items-center gap-1.5 rounded-full border shadow-trust animate-trust-pulse",
      content.classes,
      sizeClasses[size],
      className
    )}>
      {showIcon && content.icon}
      <span className="font-medium">{content.text}</span>
    </div>
  );
};

export const EncryptedDataIndicator = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="encrypted-data group relative">
      {children}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-neutral-900 text-xs text-white px-2 py-1 rounded">
        Data encrypted
      </span>
    </span>
  );
};

export const PatientPriorityIndicator = ({ 
  level,
  className 
}: { 
  level: 'low' | 'medium' | 'high' | 'critical'; 
  className?: string;
}) => {
  const getLevelContent = () => {
    switch (level) {
      case 'low':
        return {
          color: 'bg-green-500',
          text: 'Routine',
        };
      case 'medium':
        return {
          color: 'bg-blue-500',
          text: 'Priority',
        };
      case 'high':
        return {
          color: 'bg-amber-500',
          text: 'Urgent',
        };
      case 'critical':
        return {
          color: 'bg-red-500',
          text: 'Critical',
        };
      default:
        return {
          color: 'bg-green-500',
          text: 'Routine',
        };
    }
  };

  const content = getLevelContent();
  
  return (
    <div className={cn(
      "flex items-center gap-2",
      className
    )}>
      <span className={cn(
        "w-2 h-2 rounded-full animate-pulse", 
        content.color
      )} />
      <span className="text-xs font-medium">{content.text}</span>
    </div>
  );
};
