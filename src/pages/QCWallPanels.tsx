
import React from 'react';
import QCDepartmentModule from "@/components/qc/QCDepartmentModule";

const QCWallPanels = () => {
  const wallPanelMetrics = {
    totalInspections: 32,
    pendingInspections: 6,
    passedToday: 4,
    failedToday: 0,
    overdueInspections: 1,
    averagePassRate: 96.2,
    freshTestsToday: 8,
    moistureTestsToday: 3
  };

  return (
    <QCDepartmentModule 
      departmentName="Wall Panels"
      departmentColor="blue"
      metrics={wallPanelMetrics}
    />
  );
};

export default QCWallPanels;
