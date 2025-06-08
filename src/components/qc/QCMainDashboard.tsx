
import React from 'react';
import { Factory } from "lucide-react";
import QCDepartmentNavigation from "./QCDepartmentNavigation";
import QCQuickActions from "./QCQuickActions";

const QCMainDashboard = () => {
  const departmentStats = [
    {
      name: "Wall Panels",
      route: "/qc/wall-panels",
      icon: Factory,
      color: "blue",
      inspections: 32,
      passRate: 96.2,
      freshTests: 8,
      status: "active"
    },
    {
      name: "Precast", 
      route: "/qc/precast",
      icon: Factory,
      color: "green", 
      inspections: 28,
      passRate: 93.8,
      freshTests: 12,
      status: "active"
    },
    {
      name: "Extruded",
      route: "/qc/extruded", 
      icon: Factory,
      color: "purple",
      inspections: 24,
      passRate: 94.5,
      freshTests: 10,
      status: "active"
    },
    {
      name: "Flexicore",
      route: "/qc/flexicore",
      icon: Factory, 
      color: "orange",
      inspections: 19,
      passRate: 92.1,
      freshTests: 7,
      status: "active"
    },
    {
      name: "Double Tees",
      route: "/qc/double-tees",
      icon: Factory,
      color: "red", 
      inspections: 15,
      passRate: 95.8,
      freshTests: 5,
      status: "active"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Department Navigation */}
      <QCDepartmentNavigation departmentStats={departmentStats} />

      {/* Quick Actions */}
      <QCQuickActions />
    </div>
  );
};

export default QCMainDashboard;
