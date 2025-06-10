
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import FlexicoreFreshConcreteTestForm from '@/components/templates/FlexicoreFreshConcreteTestForm';

const FlexicoreFreshConcreteTestFormPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50">
      <PageHeader 
        title="Fresh Concrete Test Form"
        subtitle="Flexicore Department - Fresh Concrete Testing Data Entry"
        backLink="/qc/flexicore/fresh-concrete"
        backText="Back to Fresh Concrete Tests"
      />
      
      <div className="container mx-auto p-6">
        <FlexicoreFreshConcreteTestForm />
      </div>
    </div>
  );
};

export default FlexicoreFreshConcreteTestFormPage;
