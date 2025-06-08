import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QCDashboard from "./pages/QCDashboard";
import QCWallPanels from "./pages/QCWallPanels";
import QCPrecast from "./pages/QCPrecast";
import QCExtruded from "./pages/QCExtruded";
import QCFlexicore from "./pages/QCFlexicore";
import QCDoubleTees from "./pages/QCDoubleTees";
import DraftingDashboard from "./pages/DraftingDashboard";
import SchedulingDashboard from "./pages/SchedulingDashboard";
import ProjectManagementDashboard from "./pages/ProjectManagementDashboard";
import EstimatingSalesDashboard from "./pages/EstimatingSalesDashboard";
import FieldServicesDashboard from "./pages/FieldServicesDashboard";
import ProductionDashboard from "./pages/ProductionDashboard";
import PurchasingReceivingDashboard from "./pages/PurchasingReceivingDashboard";
import DispatchDeliveryDashboard from "./pages/DispatchDeliveryDashboard";
import YardManagementDashboard from "./pages/YardManagementDashboard";
import MaintenanceDashboard from "./pages/MaintenanceDashboard";
import DocumentManagementDashboard from "./pages/DocumentManagementDashboard";
import ContactManagementDashboard from "./pages/ContactManagementDashboard";
import ClientPortalDashboard from "./pages/ClientPortalDashboard";
import ResearchDevelopmentDashboard from "./pages/ResearchDevelopmentDashboard";
import FreshConcreteTestFormPage from "./pages/FreshConcreteTestFormPage";
import WallPanelsFreshConcreteTestFormPage from "./pages/WallPanelsFreshConcreteTestFormPage";
import ExtrudedFreshConcreteTestFormPage from "./pages/ExtrudedFreshConcreteTestFormPage";
import FlexicoreFreshConcreteTestFormPage from "./pages/FlexicoreFreshConcreteTestFormPage";
import DoubleTeesFreshConcreteTestFormPage from "./pages/DoubleTeesFreshConcreteTestFormPage";
import MoistureTestForm from "./components/templates/MoistureTestForm";
import QCWorkspaceSelector from "./components/qc/QCWorkspaceSelector";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/qc" element={<QCDashboard />} />
        <Route path="/qc/wall-panels" element={<QCWallPanels />} />
        <Route path="/qc/precast" element={<QCPrecast />} />
        <Route path="/qc/extruded" element={<QCExtruded />} />
        <Route path="/qc/flexicore" element={<QCFlexicore />} />
        <Route path="/qc/double-tees" element={<QCDoubleTees />} />
        
        {/* QC Department Section Routes */}
        <Route path="/qc/wall-panels/workspace" element={<QCWorkspaceSelector department="Wall Panels" />} />
        <Route path="/qc/wall-panels/fresh-concrete" element={<WallPanelsFreshConcreteTestFormPage />} />
        <Route path="/qc/wall-panels/aggregate" element={<div>Wall Panels Aggregate Info - Coming Soon</div>} />
        <Route path="/qc/wall-panels/resources" element={<div>Wall Panels Resources - Coming Soon</div>} />
        <Route path="/qc/wall-panels/calibrations" element={<div>Wall Panels Calibrations - Coming Soon</div>} />
        <Route path="/qc/wall-panels/mix-designs" element={<div>Wall Panels Mix Designs - Coming Soon</div>} />
        
        <Route path="/qc/precast/workspace" element={<QCWorkspaceSelector department="Precast" />} />
        <Route path="/qc/precast/fresh-concrete" element={<FreshConcreteTestFormPage />} />
        <Route path="/qc/precast/aggregate" element={<div>Precast Aggregate Info - Coming Soon</div>} />
        <Route path="/qc/precast/resources" element={<div>Precast Resources - Coming Soon</div>} />
        <Route path="/qc/precast/calibrations" element={<div>Precast Calibrations - Coming Soon</div>} />
        <Route path="/qc/precast/mix-designs" element={<div>Precast Mix Designs - Coming Soon</div>} />
        
        <Route path="/qc/extruded/workspace" element={<QCWorkspaceSelector department="Extruded" />} />
        <Route path="/qc/extruded/fresh-concrete" element={<ExtrudedFreshConcreteTestFormPage />} />
        <Route path="/qc/extruded/aggregate" element={<div>Extruded Aggregate Info - Coming Soon</div>} />
        <Route path="/qc/extruded/resources" element={<div>Extruded Resources - Coming Soon</div>} />
        <Route path="/qc/extruded/calibrations" element={<div>Extruded Calibrations - Coming Soon</div>} />
        <Route path="/qc/extruded/mix-designs" element={<div>Extruded Mix Designs - Coming Soon</div>} />
        
        <Route path="/qc/flexicore/workspace" element={<QCWorkspaceSelector department="Flexicore" />} />
        <Route path="/qc/flexicore/fresh-concrete" element={<FlexicoreFreshConcreteTestFormPage />} />
        <Route path="/qc/flexicore/aggregate" element={<div>Flexicore Aggregate Info - Coming Soon</div>} />
        <Route path="/qc/flexicore/resources" element={<div>Flexicore Resources - Coming Soon</div>} />
        <Route path="/qc/flexicore/calibrations" element={<div>Flexicore Calibrations - Coming Soon</div>} />
        <Route path="/qc/flexicore/mix-designs" element={<div>Flexicore Mix Designs - Coming Soon</div>} />
        
        <Route path="/qc/double-tees/workspace" element={<QCWorkspaceSelector department="Double Tees" />} />
        <Route path="/qc/double-tees/fresh-concrete" element={<DoubleTeesFreshConcreteTestFormPage />} />
        <Route path="/qc/double-tees/aggregate" element={<div>Double Tees Aggregate Info - Coming Soon</div>} />
        <Route path="/qc/double-tees/resources" element={<div>Double Tees Resources - Coming Soon</div>} />
        <Route path="/qc/double-tees/calibrations" element={<div>Double Tees Calibrations - Coming Soon</div>} />
        <Route path="/qc/double-tees/mix-designs" element={<div>Double Tees Mix Designs - Coming Soon</div>} />
        
        <Route path="/drafting" element={<DraftingDashboard />} />
        <Route path="/scheduling" element={<SchedulingDashboard />} />
        <Route path="/project-management" element={<ProjectManagementDashboard />} />
        <Route path="/estimating-sales" element={<EstimatingSalesDashboard />} />
        <Route path="/field-services" element={<FieldServicesDashboard />} />
        <Route path="/production" element={<ProductionDashboard />} />
        <Route path="/purchasing-receiving" element={<PurchasingReceivingDashboard />} />
        <Route path="/dispatch-delivery" element={<DispatchDeliveryDashboard />} />
        <Route path="/yard-management" element={<YardManagementDashboard />} />
        <Route path="/maintenance" element={<MaintenanceDashboard />} />
        <Route path="/document-management" element={<DocumentManagementDashboard />} />
        <Route path="/contact-management" element={<ContactManagementDashboard />} />
        <Route path="/client-portal" element={<ClientPortalDashboard />} />
        <Route path="/research-development" element={<ResearchDevelopmentDashboard />} />
        <Route path="/templates/fresh-concrete-test" element={<FreshConcreteTestFormPage />} />
        <Route path="/templates/wall-panels-fresh-concrete-test" element={<WallPanelsFreshConcreteTestFormPage />} />
        <Route path="/templates/extruded-fresh-concrete-test" element={<ExtrudedFreshConcreteTestFormPage />} />
        <Route path="/templates/flexicore-fresh-concrete-test" element={<FlexicoreFreshConcreteTestFormPage />} />
        <Route path="/templates/double-tees-fresh-concrete-test" element={<DoubleTeesFreshConcreteTestFormPage />} />
        <Route path="/templates/moisture-test" element={<MoistureTestForm />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
