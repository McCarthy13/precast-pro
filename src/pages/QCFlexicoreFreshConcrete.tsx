
import React from 'react';
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QCFreshConcreteTests from "@/components/qc/QCFreshConcreteTests";

const QCFlexicoreFreshConcrete = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50">
      {/* Header */}
      <header className="construction-gradient text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/qc/flexicore">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Flexicore QC
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Fresh Concrete Test Data</h1>
                <p className="text-blue-100 mt-1">Flexicore Department - Fresh Concrete Testing</p>
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

export default QCFlexicoreFreshConcrete;
