
import React from "react";
import { ChevronLeft, Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showNotifications?: boolean;
  showSettings?: boolean;
  showAvatar?: boolean;
  avatarSrc?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showNotifications = false,
  showSettings = false,
  showAvatar = false,
  avatarSrc,
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {showBackButton && (
          <button 
            onClick={() => navigate(-1)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        {showNotifications && (
          <button 
            onClick={() => navigate("/notifications")}
            className="p-1 rounded-full hover:bg-gray-100 relative"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        )}
        
        {showSettings && (
          <button 
            onClick={() => navigate("/settings")}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Settings size={20} />
          </button>
        )}
        
        {showAvatar && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarSrc} alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        )}
      </div>
    </header>
  );
};
