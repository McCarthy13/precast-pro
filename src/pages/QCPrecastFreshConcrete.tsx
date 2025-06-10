import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import QCFreshConcreteTests from "@/components/qc/QCFreshConcreteTests";
const QCPrecastFreshConcrete = () => {
  return <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50">
      <PageHeader title="Fresh Concrete Test Data" subtitle="Precast Department - Fresh Concrete Testing" backLink="/qc/precast" backText="Back to Precast QC" />

      <div className="container mx-auto p-6 px-0">
        <QCFreshConcreteTests />
      </div>
    </div>;
};
export default QCPrecastFreshConcrete;