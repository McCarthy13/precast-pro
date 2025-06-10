
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import QCFreshConcreteTests from "@/components/qc/QCFreshConcreteTests";

const QCDoubleTeeFreshConcrete = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-50">
      <PageHeader 
        title="Fresh Concrete Test Data"
        subtitle="Double Tees Department - Fresh Concrete Testing"
        backLink="/qc/double-tees"
        backText="Back to Double Tees QC"
      />

      <div className="container mx-auto p-6">
        <QCFreshConcreteTests />
      </div>
    </div>
  );
};

export default QCDoubleTeeFreshConcrete;
