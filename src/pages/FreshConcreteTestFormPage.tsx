
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import FreshConcreteTestForm from '@/components/templates/FreshConcreteTestForm';

const FreshConcreteTestFormPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50">
      <PageHeader 
        title="Fresh Concrete Test Form"
        subtitle="Precast Department - Fresh Concrete Testing Data Entry"
        backLink="/qc/precast/fresh-concrete"
        backText="Back to Fresh Concrete Tests"
      />
      
      <div className="container mx-auto p-6">
        <FreshConcreteTestForm />
      </div>
    </div>
  );
};

export default FreshConcreteTestFormPage;
