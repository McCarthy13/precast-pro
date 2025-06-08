
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Factory, CheckCircle, FlaskConical, AlertTriangle } from "lucide-react";

interface OverallMetrics {
  totalInspections: number;
  pendingInspections: number;
  passedToday: number;
  failedToday: number;
  overdueInspections: number;
  averagePassRate: number;
  freshTestsToday: number;
  moistureTestsToday: number;
}

interface QCOverallMetricsProps {
  metrics: OverallMetrics;
}

const QCOverallMetrics: React.FC<QCOverallMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="module-card-hover border-l-4 border-l-blue-600">
        <CardContent className="p-4">
          <div className="text-center">
            <Factory className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-600">{metrics.pendingInspections}</div>
            <div className="text-xs text-gray-600">Total Pending</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="module-card-hover border-l-4 border-l-green-600">
        <CardContent className="p-4">
          <div className="text-center">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-600">{metrics.averagePassRate}%</div>
            <div className="text-xs text-gray-600">Overall Pass Rate</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="module-card-hover border-l-4 border-l-purple-600">
        <CardContent className="p-4">
          <div className="text-center">
            <FlaskConical className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-600">{metrics.freshTestsToday}</div>
            <div className="text-xs text-gray-600">Fresh Tests Today</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="module-card-hover border-l-4 border-l-orange-600">
        <CardContent className="p-4">
          <div className="text-center">
            <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-orange-600">{metrics.overdueInspections}</div>
            <div className="text-xs text-gray-600">Overdue Items</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QCOverallMetrics;
