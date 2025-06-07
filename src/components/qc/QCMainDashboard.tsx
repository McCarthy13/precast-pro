
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Factory, FlaskConical, Droplets, BarChart3, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const QCMainDashboard = () => {
  const overallMetrics = {
    totalInspections: 156,
    pendingInspections: 23,
    passedToday: 18,
    failedToday: 2,
    overdueInspections: 5,
    averagePassRate: 94.2,
    freshTestsToday: 42,
    moistureTestsToday: 18
  };

  const firstPassQualityStats = [
    {
      name: "Wall Panels",
      route: "/qc/wall-panels",
      color: "blue",
      stats: {
        last7Days: { passRate: 96.8, totalPieces: 245, failedPieces: 8 },
        last30Days: { passRate: 95.2, totalPieces: 1024, failedPieces: 49 },
        last90Days: { passRate: 94.7, totalPieces: 3150, failedPieces: 167 },
        last12Months: { passRate: 94.1, totalPieces: 12890, failedPieces: 761 }
      }
    },
    {
      name: "Precast", 
      route: "/qc/precast",
      color: "green", 
      stats: {
        last7Days: { passRate: 94.5, totalPieces: 189, failedPieces: 10 },
        last30Days: { passRate: 93.8, totalPieces: 782, failedPieces: 48 },
        last90Days: { passRate: 93.1, totalPieces: 2456, failedPieces: 169 },
        last12Months: { passRate: 92.8, totalPieces: 9874, failedPieces: 711 }
      }
    },
    {
      name: "Extruded",
      route: "/qc/extruded", 
      color: "purple",
      stats: {
        last7Days: { passRate: 97.2, totalPieces: 324, failedPieces: 9 },
        last30Days: { passRate: 96.1, totalPieces: 1356, failedPieces: 53 },
        last90Days: { passRate: 95.4, totalPieces: 4120, failedPieces: 189 },
        last12Months: { passRate: 94.9, totalPieces: 16480, failedPieces: 841 }
      }
    },
    {
      name: "Flexicore",
      route: "/qc/flexicore",
      color: "orange",
      stats: {
        last7Days: { passRate: 92.8, totalPieces: 167, failedPieces: 12 },
        last30Days: { passRate: 91.5, totalPieces: 689, failedPieces: 59 },
        last90Days: { passRate: 90.9, totalPieces: 2134, failedPieces: 194 },
        last12Months: { passRate: 90.3, totalPieces: 8567, failedPieces: 831 }
      }
    },
    {
      name: "Double Tees",
      route: "/qc/double-tees",
      color: "red", 
      stats: {
        last7Days: { passRate: 98.1, totalPieces: 124, failedPieces: 2 },
        last30Days: { passRate: 97.4, totalPieces: 487, failedPieces: 13 },
        last90Days: { passRate: 96.8, totalPieces: 1456, failedPieces: 47 },
        last12Months: { passRate: 96.2, totalPieces: 5892, failedPieces: 224 }
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overall QC Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="module-card-hover border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <div className="text-center">
              <Factory className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{overallMetrics.pendingInspections}</div>
              <div className="text-xs text-gray-600">Total Pending</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="module-card-hover border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{overallMetrics.averagePassRate}%</div>
              <div className="text-xs text-gray-600">Overall Pass Rate</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="module-card-hover border-l-4 border-l-purple-600">
          <CardContent className="p-4">
            <div className="text-center">
              <FlaskConical className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">{overallMetrics.freshTestsToday}</div>
              <div className="text-xs text-gray-600">Fresh Tests Today</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="module-card-hover border-l-4 border-l-orange-600">
          <CardContent className="p-4">
            <div className="text-center">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-orange-600">{overallMetrics.overdueInspections}</div>
              <div className="text-xs text-gray-600">Overdue Items</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* First Pass Quality Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>First Pass Quality Statistics by Department</CardTitle>
          <CardDescription>Quality performance metrics across different time periods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {firstPassQualityStats.map((dept) => (
              <Card key={dept.name} className={`border-l-4 border-l-${dept.color}-600`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <Link to={dept.route}>
                      <Button size="sm" className={`bg-${dept.color}-600 hover:bg-${dept.color}-700`}>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Last 7 Days */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-600 mb-2">Last 7 Days</div>
                      <div className={`text-2xl font-bold text-${dept.color}-600 mb-1`}>
                        {dept.stats.last7Days.passRate}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {dept.stats.last7Days.totalPieces} pieces | {dept.stats.last7Days.failedPieces} failed
                      </div>
                    </div>

                    {/* Last 30 Days */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-600 mb-2">Last 30 Days</div>
                      <div className={`text-2xl font-bold text-${dept.color}-600 mb-1`}>
                        {dept.stats.last30Days.passRate}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {dept.stats.last30Days.totalPieces} pieces | {dept.stats.last30Days.failedPieces} failed
                      </div>
                    </div>

                    {/* Last 90 Days */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-600 mb-2">Last 90 Days</div>
                      <div className={`text-2xl font-bold text-${dept.color}-600 mb-1`}>
                        {dept.stats.last90Days.passRate}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {dept.stats.last90Days.totalPieces} pieces | {dept.stats.last90Days.failedPieces} failed
                      </div>
                    </div>

                    {/* Last 12 Months */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-600 mb-2">Last 12 Months</div>
                      <div className={`text-2xl font-bold text-${dept.color}-600 mb-1`}>
                        {dept.stats.last12Months.passRate}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {dept.stats.last12Months.totalPieces} pieces | {dept.stats.last12Months.failedPieces} failed
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
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
    </div>
  );
};

export default QCMainDashboard;
