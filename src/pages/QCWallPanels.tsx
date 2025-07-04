
import React from 'react';
import { Calendar, TestTube, Database, BookOpen, Settings, Beaker } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QCWallPanels = () => {
  const navigate = useNavigate();

  const qcSections = [
    {
      title: "Today's Work",
      description: "QC Workspace Inspection - Pre-pour and Post-pour inspections",
      icon: Calendar,
      color: "blue",
      onClick: () => navigate('/qc/wall-panels/workspace')
    },
    {
      title: "Fresh Concrete Test Data",
      description: "Record and manage fresh concrete test results",
      icon: TestTube,
      color: "green",
      onClick: () => navigate('/qc/wall-panels/fresh-concrete')
    },
    {
      title: "Aggregate Info",
      description: "Supplier information, petrograph analyses, ASTM C33 reports",
      icon: Database,
      color: "purple",
      onClick: () => navigate('/qc/wall-panels/aggregate')
    },
    {
      title: "Resources",
      description: "PCI, ACI, ASTM standards and documentation",
      icon: BookOpen,
      color: "orange",
      onClick: () => navigate('/qc/wall-panels/resources')
    },
    {
      title: "Calibrations",
      description: "Equipment calibration tracking and records",
      icon: Settings,
      color: "red",
      onClick: () => navigate('/qc/wall-panels/calibrations')
    },
    {
      title: "Mix Designs",
      description: "Concrete mix design specifications and approvals",
      icon: Beaker,
      color: "indigo",
      onClick: () => navigate('/qc/wall-panels/mix-designs')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <PageHeader 
        title="Wall Panels QC"
        subtitle="Quality Control Operations - Wall Panels Department"
        backLink="/qc"
        backText="Back to QC Dashboard"
      />

      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">QC Sections</h2>
            <p className="text-gray-600 mt-2">Select a section to access Wall Panels QC operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qcSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Card 
                  key={section.title}
                  className={`cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-${section.color}-600 hover:scale-105`}
                  onClick={section.onClick}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center space-x-3">
                      <IconComponent className={`h-6 w-6 text-${section.color}-600`} />
                      <span>{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QCWallPanels;
