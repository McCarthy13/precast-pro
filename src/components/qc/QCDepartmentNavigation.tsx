
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Factory } from "lucide-react";
import { Link } from "react-router-dom";

interface DepartmentStats {
  name: string;
  route: string;
  icon: typeof Factory;
  color: string;
  inspections: number;
  passRate: number;
  freshTests: number;
  status: string;
}

interface QCDepartmentNavigationProps {
  departmentStats: DepartmentStats[];
}

const QCDepartmentNavigation: React.FC<QCDepartmentNavigationProps> = ({ departmentStats }) => {
  return (
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
  );
};

export default QCDepartmentNavigation;
