
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import ExtrudedFreshConcreteTestForm from '@/components/templates/ExtrudedFreshConcreteTestForm';

const ExtrudedFreshConcreteTestFormPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gray-50">
      <PageHeader 
        title="Fresh Concrete Test Form"
        subtitle="Extruded Department - Fresh Concrete Testing Data Entry"
        backLink="/qc/extruded/fresh-concrete"
        backText="Back to Fresh Concrete Tests"
      />
      
      <div className="container mx-auto p-6">
        <ExtrudedFreshConcreteTestForm />
      </div>
    </div>
  );
};

export default ExtrudedFreshConcreteTestFormPage;
