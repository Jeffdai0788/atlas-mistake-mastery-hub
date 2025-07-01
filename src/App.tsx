
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SubjectProvider } from "@/contexts/SubjectContext";
import Welcome from "./pages/Welcome";
import SubjectSelection from "./pages/SubjectSelection";
import Dashboard from "./pages/Dashboard";
import Logbook from "./pages/Logbook";
import Review from "./pages/Review";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SubjectProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/subject-selection" element={<SubjectSelection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logbook" element={<Logbook />} />
            <Route path="/review" element={<Review />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SubjectProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
