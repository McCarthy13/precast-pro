
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

      {/* Department Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>QC by Department</CardTitle>
          <CardDescription>Access quality control operations for each production department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departmentStats.map((dept) => {
              const IconComponent = dept.icon;
              return (
                <Card key={dept.name} className={`module-card-hover border-l-4 border-l-${dept.color}-600 cursor-pointer hover:shadow-lg transition-shadow`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <IconComponent className={`h-6 w-6 text-${dept.color}-600`} />
                        <h3 className="font-semibold text-lg">{dept.name}</h3>
                      </div>
                      <Badge className={`bg-${dept.color}-100 text-${dept.color}-800`}>
                        {dept.passRate}%
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Inspections Today:</span>
                        <span className="font-medium">{dept.inspections}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Fresh Tests:</span>
                        <span className="font-medium">{dept.freshTests}</span>
                      </div>
                    </div>
                    
                    <Link to={dept.route}>
                      <Button className={`w-full bg-${dept.color}-600 hover:bg-${dept.color}-700`}>
                        Enter {dept.name} QC
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
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
