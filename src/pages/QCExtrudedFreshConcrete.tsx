
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import QCFreshConcreteTests from "@/components/qc/QCFreshConcreteTests";

const QCExtrudedFreshConcrete = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gray-50">
      <PageHeader 
        title="Fresh Concrete Test Data"
        subtitle="Extruded Department - Fresh Concrete Testing"
        backLink="/qc/extruded"
        backText="Back to Extruded QC"
      />

      <div className="container mx-auto p-6">
        <QCFreshConcreteTests />
      </div>
    </div>
  );
};

export default QCExtrudedFreshConcrete;
