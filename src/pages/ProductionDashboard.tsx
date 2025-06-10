
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import ProductionOverview from "@/components/production/ProductionOverview";

const ProductionDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50">
      <PageHeader 
        title="Production Dashboard"
        subtitle="Manufacturing Operations & Production Management"
        backLink="/"
        backText="Back to Main Dashboard"
      />

      <div className="container mx-auto p-6">
        <ProductionOverview />
      </div>
    </div>
  );
};

export default ProductionDashboard;
