
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QCDepartmentModule from "@/components/qc/QCDepartmentModule";
import QCMoistures from "@/components/qc/QCMoistures";
import DocumentCreator from "@/components/qc/DocumentCreator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const QCPrecast = () => {
  const location = useLocation();
  const [showMoistureRecords, setShowMoistureRecords] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

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
      setActiveTab("moisture");
    }
  }, [location.state]);

  if (showMoistureRecords && activeTab === "moisture") {
    return <QCMoistures departmentName="Precast" />;
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">QC Dashboard</TabsTrigger>
          <TabsTrigger value="document-creator">Document Creator</TabsTrigger>
          <TabsTrigger value="moisture">Moisture Records</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <QCDepartmentModule 
            departmentName="Precast"
            departmentColor="green"
            metrics={precastMetrics}
          />
        </TabsContent>

        <TabsContent value="document-creator">
          <DocumentCreator 
            departmentName="Precast"
            departmentCode="QC-PC"
          />
        </TabsContent>

        <TabsContent value="moisture">
          <QCMoistures departmentName="Precast" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QCPrecast;
