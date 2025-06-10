
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import DoubleTeesFreshConcreteTestForm from '@/components/templates/DoubleTeesFreshConcreteTestForm';

const DoubleTeesFreshConcreteTestFormPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50">
      <PageHeader 
        title="Fresh Concrete Test Form"
        subtitle="Double Tees Department - Fresh Concrete Testing Data Entry"
        backLink="/qc/double-tees/fresh-concrete"
        backText="Back to Fresh Concrete Tests"
      />
      
      <div className="container mx-auto p-6">
        <DoubleTeesFreshConcreteTestForm />
      </div>
    </div>
  );
};

export default DoubleTeesFreshConcreteTestFormPage;
