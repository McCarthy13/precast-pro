
import React from 'react';
import QCDepartmentModule from "@/components/qc/QCDepartmentModule";

const QCExtruded = () => {
  const extrudedMetrics = {
    totalInspections: 24,
    pendingInspections: 4,
    passedToday: 5,
    failedToday: 0,
    overdueInspections: 1,
    averagePassRate: 94.5,
    freshTestsToday: 10,
    moistureTestsToday: 5
  };

  return (
    <QCDepartmentModule 
      departmentName="Extruded"
      departmentColor="purple"
      metrics={extrudedMetrics}
    />
  );
};

export default QCExtruded;
