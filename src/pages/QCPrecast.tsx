
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QCDepartmentModule from "@/components/qc/QCDepartmentModule";
import QCMoistures from "@/components/qc/QCMoistures";

const QCPrecast = () => {
  const location = useLocation();
  const [showMoistureRecords, setShowMoistureRecords] = useState(false);

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

  useEffect(() => {
    // Check if we should show moisture records based on navigation state
    if (location.state?.showMoistureRecords) {
      setShowMoistureRecords(true);
    }
  }, [location.state]);

  if (showMoistureRecords) {
    return <QCMoistures departmentName="Precast" />;
  }

  return (
    <QCDepartmentModule 
      departmentName="Precast"
      departmentColor="green"
      metrics={precastMetrics}
    />
  );
};

export default QCPrecast;
