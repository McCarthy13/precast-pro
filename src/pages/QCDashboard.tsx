
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import QCMainDashboard from "@/components/qc/QCMainDashboard";

const QCDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <PageHeader 
        title="Quality Control Dashboard"
        subtitle="Comprehensive Quality Control Operations"
        backLink="/"
        backText="Back to Main Dashboard"
      />

      <div className="container mx-auto p-6">
        <QCMainDashboard />
      </div>
    </div>
  );
};

export default QCDashboard;
