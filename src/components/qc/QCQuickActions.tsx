
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertTriangle, BarChart3 } from "lucide-react";

const QCQuickActions: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="module-card-hover">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold">Daily Summary</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">View today's overall QC performance across all departments</p>
          <Button variant="outline" className="w-full">View Summary</Button>
        </CardContent>
      </Card>

      <Card className="module-card-hover">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <h4 className="font-semibold">Critical Issues</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">Address urgent quality issues requiring immediate attention</p>
          <Button variant="outline" className="w-full">View Issues</Button>
        </CardContent>
      </Card>

      <Card className="module-card-hover">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <BarChart3 className="h-5 w-5 text-green-600" />
            <h4 className="font-semibold">Analytics Dashboard</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">Comprehensive QC metrics and performance trends</p>
          <Button variant="outline" className="w-full">View Analytics</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QCQuickActions;
