import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory, FlaskConical, Droplets, BarChart3, TrendingUp, AlertTriangle, CheckCircle, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import QCWorkspaceSelector from "./QCWorkspaceSelector";
import QCFreshConcreteTests from "./QCFreshConcreteTests";
import MoistureTestCard from "./moisture/MoistureTestCard";

interface QCMetrics {
  totalInspections: number;
  pendingInspections: number;
  passedToday: number;
  failedToday: number;
  overdueInspections: number;
  averagePassRate: number;
  freshTestsToday: number;
  moistureTestsToday: number;
}

interface QCDepartmentModuleProps {
  departmentName: string;
  departmentColor: string;
  metrics: QCMetrics;
}

const QCDepartmentModule: React.FC<QCDepartmentModuleProps> = ({
  departmentName,
  departmentColor,
  metrics
}) => {
  // Department-specific scheduled pieces
  const getDepartmentScheduledPieces = (dept: string) => {
    switch (dept?.toLowerCase()) {
      case 'wall panels':
        return {
          "Form WP-1": [
            { id: "WP1-001", name: "Wall Panel WP1-001" },
            { id: "WP1-002", name: "Wall Panel WP1-002" },
            { id: "WP1-003", name: "Wall Panel WP1-003" }
          ],
          "Form WP-2": [
            { id: "WP2-001", name: "Wall Panel WP2-001" },
            { id: "WP2-002", name: "Wall Panel WP2-002" }
          ],
          "Form WP-3": [
            { id: "WP3-001", name: "Wall Panel WP3-001" },
            { id: "WP3-002", name: "Wall Panel WP3-002" },
            { id: "WP3-003", name: "Wall Panel WP3-003" },
            { id: "WP3-004", name: "Wall Panel WP3-004" }
          ]
        };
      
      case 'precast':
        return {
          "Beam Line 1": [
            { id: "BL1-001", name: "Beam BL1-001" },
            { id: "BL1-002", name: "Beam BL1-002" }
          ],
          "Beam Line 2": [
            { id: "BL2-001", name: "Beam BL2-001" },
            { id: "BL2-002", name: "Beam BL2-002" },
            { id: "BL2-003", name: "Beam BL2-003" }
          ],
          "West Panel Bed": [
            { id: "WPB-001", name: "Panel WPB-001" },
            { id: "WPB-002", name: "Panel WPB-002" }
          ]
        };
      
      case 'extruded':
        return {
          "Extruder Line 1": [
            { id: "EXT1-001", name: "Hollow Core EXT1-001" },
            { id: "EXT1-002", name: "Hollow Core EXT1-002" }
          ],
          "Extruder Line 2": [
            { id: "EXT2-001", name: "Solid Slab EXT2-001" },
            { id: "EXT2-002", name: "Solid Slab EXT2-002" },
            { id: "EXT2-003", name: "Solid Slab EXT2-003" }
          ]
        };
      
      case 'flexicore':
        return {
          "Flexicore Bed 1": [
            { id: "FC1-001", name: "Flexicore FC1-001" },
            { id: "FC1-002", name: "Flexicore FC1-002" }
          ],
          "Flexicore Bed 2": [
            { id: "FC2-001", name: "Flexicore FC2-001" },
            { id: "FC2-002", name: "Flexicore FC2-002" },
            { id: "FC2-003", name: "Flexicore FC2-003" }
          ]
        };
      
      case 'double tees':
        return {
          "Double Tee Bed 1": [
            { id: "DT1-001", name: "Double Tee DT1-001" },
            { id: "DT1-002", name: "Double Tee DT1-002" }
          ],
          "Double Tee Bed 2": [
            { id: "DT2-001", name: "Double Tee DT2-001" },
            { id: "DT2-002", name: "Double Tee DT2-002" },
            { id: "DT2-003", name: "Double Tee DT2-003" }
          ]
        };
      
      default:
        return {};
    }
  };

  const scheduledPieces = getDepartmentScheduledPieces(departmentName);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className={`bg-gradient-to-r from-${departmentColor}-600 to-blue-600 text-white p-6 shadow-lg`}>
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
                <h1 className="text-3xl font-bold">{departmentName} Quality Control</h1>
                <p className="text-blue-100 mt-1">Comprehensive QC operations for {departmentName.toLowerCase()} production</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="space-y-6">
          {/* Department QC Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="module-card-hover border-l-4 border-l-blue-600">
              <CardContent className="p-4">
                <div className="text-center">
                  <Factory className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-blue-600">{metrics.pendingInspections}</div>
                  <div className="text-xs text-gray-600">Pending Inspections</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="module-card-hover border-l-4 border-l-green-600">
              <CardContent className="p-4">
                <div className="text-center">
                  <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-green-600">{metrics.averagePassRate}%</div>
                  <div className="text-xs text-gray-600">Pass Rate</div>
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

          <Tabs defaultValue="workspace-inspection" className="space-y-6">
            <TabsList>
              <TabsTrigger value="workspace-inspection">Workspace Inspection</TabsTrigger>
              <TabsTrigger value="fresh-concrete">Fresh Concrete Tests</TabsTrigger>
              <TabsTrigger value="moisture-tests">Moisture Tests</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="workspace-inspection">
              <QCWorkspaceSelector department={departmentName} />
            </TabsContent>

            <TabsContent value="fresh-concrete">
              <QCFreshConcreteTests />
            </TabsContent>

            <TabsContent value="moisture-tests">
              <MoistureTestCard departmentName={departmentName} />
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>{departmentName} QC Analytics</CardTitle>
                  <CardDescription>Performance metrics and trends for {departmentName.toLowerCase()} quality control</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Analytics dashboard coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>{departmentName} QC Reports</CardTitle>
                  <CardDescription>Generate and view quality control reports for {departmentName.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Reports section coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default QCDepartmentModule;
