
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import QCFreshConcreteTests from "@/components/qc/QCFreshConcreteTests";

const QCFlexicoreFreshConcrete = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50">
      <PageHeader 
        title="Fresh Concrete Test Data"
        subtitle="Flexicore Department - Fresh Concrete Testing"
        backLink="/qc/flexicore"
        backText="Back to Flexicore QC"
      />

      <div className="container mx-auto p-6">
        <QCFreshConcreteTests />
      </div>
    </div>
  );
};

export default QCFlexicoreFreshConcrete;
