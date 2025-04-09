
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, Calendar, FileText, MessageSquare, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const MobileLayout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow pb-16 overflow-y-auto">
        <Outlet />
      </div>
      
      <nav className="medilink-bottom-nav">
        {user?.role === "patient" ? (
          // Patient Navigation
          <>
            <button
              onClick={() => navigate("/")}
              className={`medilink-bottom-nav-item ${isActive("/") ? "active" : ""}`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            
            <button
              onClick={() => navigate("/appointments")}
              className={`medilink-bottom-nav-item ${isActive("/appointments") ? "active" : ""}`}
            >
              <Calendar size={20} />
              <span>Calendar</span>
            </button>
            
            <button
              onClick={() => navigate("/records")}
              className={`medilink-bottom-nav-item ${isActive("/records") ? "active" : ""}`}
            >
              <FileText size={20} />
              <span>Records</span>
            </button>
            
            <button
              onClick={() => navigate("/messages")}
              className={`medilink-bottom-nav-item ${isActive("/messages") ? "active" : ""}`}
            >
              <MessageSquare size={20} />
              <span>Messages</span>
            </button>
            
            <button
              onClick={() => navigate("/more")}
              className={`medilink-bottom-nav-item ${isActive("/more") ? "active" : ""}`}
            >
              <Menu size={20} />
              <span>More</span>
            </button>
          </>
        ) : (
          // Provider Navigation
          <>
            <button
              onClick={() => navigate("/")}
              className={`medilink-bottom-nav-item ${isActive("/") ? "active" : ""}`}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => navigate("/schedule")}
              className={`medilink-bottom-nav-item ${isActive("/schedule") ? "active" : ""}`}
            >
              <Calendar size={20} />
              <span>Schedule</span>
            </button>
            
            <button
              onClick={() => navigate("/patients")}
              className={`medilink-bottom-nav-item ${isActive("/patients") ? "active" : ""}`}
            >
              <FileText size={20} />
              <span>Patients</span>
            </button>
            
            <button
              onClick={() => navigate("/messages")}
              className={`medilink-bottom-nav-item ${isActive("/messages") ? "active" : ""}`}
            >
              <MessageSquare size={20} />
              <span>Messages</span>
            </button>
            
            <button
              onClick={() => navigate("/more")}
              className={`medilink-bottom-nav-item ${isActive("/more") ? "active" : ""}`}
            >
              <Menu size={20} />
              <span>More</span>
            </button>
          </>
        )}
      </nav>
    </div>
  );
};
