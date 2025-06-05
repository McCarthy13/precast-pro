
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QCDashboard from "./pages/QCDashboard";
import DraftingDashboard from "./pages/DraftingDashboard";
import SchedulingDashboard from "./pages/SchedulingDashboard";
import ProjectManagementDashboard from "./pages/ProjectManagementDashboard";
import EstimatingSalesDashboard from "./pages/EstimatingSalesDashboard";
import FieldServicesDashboard from "./pages/FieldServicesDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/qc" element={<QCDashboard />} />
        <Route path="/drafting" element={<DraftingDashboard />} />
        <Route path="/scheduling" element={<SchedulingDashboard />} />
        <Route path="/project-management" element={<ProjectManagementDashboard />} />
        <Route path="/estimating-sales" element={<EstimatingSalesDashboard />} />
        <Route path="/field-services" element={<FieldServicesDashboard />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
