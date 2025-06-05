
import React from 'react';
import QCDepartmentModule from "@/components/qc/QCDepartmentModule";

const QCDoubleTees = () => {
  const doubleTeesMetrics = {
    totalInspections: 15,
    pendingInspections: 2,
    passedToday: 3,
    failedToday: 0,
    overdueInspections: 0,
    averagePassRate: 95.8,
    freshTestsToday: 5,
    moistureTestsToday: 2
  };

  return (
    <QCDepartmentModule 
      departmentName="Double Tees"
      departmentColor="red"
      metrics={doubleTeesMetrics}
    />
  );
};

export default QCDoubleTees;
