
import React from 'react';
import { ArrowLeft, Calendar, TestTube, Database, BookOpen, Settings, Beaker } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QCPrecast = () => {
  const navigate = useNavigate();

  const qcSections = [
    {
      title: "Today's Work",
      description: "QC Workspace Inspection - Pre-pour and Post-pour inspections",
      icon: Calendar,
      color: "green",
      onClick: () => navigate('/qc/precast/workspace')
    },
    {
      title: "Fresh Concrete Test Data",
      description: "Record and manage fresh concrete test results",
      icon: TestTube,
      color: "blue",
      onClick: () => navigate('/qc/precast/fresh-concrete')
    },
    {
      title: "Aggregate Info",
      description: "Supplier information, petrograph analyses, ASTM C33 reports",
      icon: Database,
      color: "purple",
      onClick: () => navigate('/qc/precast/aggregate')
    },
    {
      title: "Resources",
      description: "PCI, ACI, ASTM standards and documentation",
      icon: BookOpen,
      color: "orange",
      onClick: () => navigate('/qc/precast/resources')
    },
    {
      title: "Calibrations",
      description: "Equipment calibration tracking and records",
      icon: Settings,
      color: "red",
      onClick: () => navigate('/qc/precast/calibrations')
    },
    {
      title: "Mix Designs",
      description: "Concrete mix design specifications and approvals",
      icon: Beaker,
      color: "indigo",
      onClick: () => navigate('/qc/precast/mix-designs')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50">
      {/* Header */}
      <header className="construction-gradient text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/qc">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to QC Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Precast QC</h1>
                <p className="text-blue-100 mt-1">Quality Control Operations - Precast Department</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">QC Sections</h2>
            <p className="text-gray-600 mt-2">Select a section to access Precast QC operations</p>
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

export default QCPrecast;
