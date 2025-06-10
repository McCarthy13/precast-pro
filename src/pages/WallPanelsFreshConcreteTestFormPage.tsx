
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import WallPanelsFreshConcreteTestForm from '@/components/templates/WallPanelsFreshConcreteTestForm';

const WallPanelsFreshConcreteTestFormPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <PageHeader 
        title="Fresh Concrete Test Form"
        subtitle="Wall Panels Department - Fresh Concrete Testing Data Entry"
        backLink="/qc/wall-panels/fresh-concrete"
        backText="Back to Fresh Concrete Tests"
      />
      
      <div className="container mx-auto p-6">
        <WallPanelsFreshConcreteTestForm />
      </div>
    </div>
  );
};

export default WallPanelsFreshConcreteTestFormPage;
