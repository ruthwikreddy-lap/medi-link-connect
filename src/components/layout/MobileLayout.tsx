// For MobileLayout.tsx, use the session property instead of user
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const { session, profile, isDemoMode, signOut } = useAuth();
  // Update any code that was using user to use session or profile instead
  const isAuthenticated = session || isDemoMode;
  
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2 rounded-md">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:w-64 bg-neutral-950 text-neutral-50">
          <SheetHeader className="text-left mt-6 mb-4">
            <SheetTitle>
              <div className="inline-flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback>{profile?.full_name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                {profile?.full_name || "Guest User"}
              </div>
            </SheetTitle>
            <SheetDescription>
              {profile?.email || "No email available"}
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2">
            <Link to="/" className="block px-4 py-2 hover:bg-neutral-800 rounded">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-neutral-800 rounded">
                  Dashboard
                </Link>
                <Button variant="ghost" className="justify-start px-4 py-2 hover:bg-neutral-800 rounded" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/login" className="block px-4 py-2 hover:bg-neutral-800 rounded">
                Login
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <main className="md:hidden">{children}</main>
    </div>
  );
};

export default MobileLayout;
