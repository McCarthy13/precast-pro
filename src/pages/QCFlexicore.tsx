
import React from 'react';
import QCDepartmentModule from "@/components/qc/QCDepartmentModule";

const QCFlexicore = () => {
  const flexicoreMetrics = {
    totalInspections: 19,
    pendingInspections: 3,
    passedToday: 2,
    failedToday: 1,
    overdueInspections: 1,
    averagePassRate: 92.1,
    freshTestsToday: 7,
    moistureTestsToday: 3
  };

  return (
    <QCDepartmentModule 
      departmentName="Flexicore"
      departmentColor="orange"
      metrics={flexicoreMetrics}
    />
  );
};

export default QCFlexicore;
