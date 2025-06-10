
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import QCFreshConcreteTests from "@/components/qc/QCFreshConcreteTests";

const QCWallPanelsFreshConcrete = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <PageHeader 
        title="Fresh Concrete Test Data"
        subtitle="Wall Panels Department - Fresh Concrete Testing"
        backLink="/qc/wall-panels"
        backText="Back to Wall Panels QC"
      />

      <div className="container mx-auto p-6">
        <QCFreshConcreteTests />
      </div>
    </div>
  );
};

export default QCWallPanelsFreshConcrete;
