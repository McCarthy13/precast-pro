
import React from 'react';
import QCDepartmentModule from "@/components/qc/QCDepartmentModule";

const QCPrecast = () => {
  const precastMetrics = {
    totalInspections: 28,
    pendingInspections: 5,
    passedToday: 3,
    failedToday: 1,
    overdueInspections: 2,
    averagePassRate: 93.8,
    freshTestsToday: 12,
    moistureTestsToday: 4
  };

  return (
    <QCDepartmentModule 
      departmentName="Precast"
      departmentColor="green"
      metrics={precastMetrics}
    />
  );
};

export default QCPrecast;
