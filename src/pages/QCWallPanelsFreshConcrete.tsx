
import React from 'react';
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QCFreshConcreteTests from "@/components/qc/QCFreshConcreteTests";

const QCWallPanelsFreshConcrete = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="construction-gradient text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/qc/wall-panels">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Wall Panels QC
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Fresh Concrete Test Data</h1>
                <p className="text-blue-100 mt-1">Wall Panels Department - Fresh Concrete Testing</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <QCFreshConcreteTests />
      </div>
    </div>
  );
};

export default QCWallPanelsFreshConcrete;
