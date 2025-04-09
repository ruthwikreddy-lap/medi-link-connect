
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MobileLayout } from "./components/layout/MobileLayout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MedicalRecordsPage from "./pages/records/MedicalRecordsPage";
import MessagesPage from "./pages/messages/MessagesPage";
import AppointmentsCalendar from "./pages/calendar/AppointmentsCalendar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes inside mobile layout */}
            <Route element={<MobileLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/records" element={<MedicalRecordsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/appointments" element={<AppointmentsCalendar />} />
              <Route path="/schedule" element={<AppointmentsCalendar />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
