
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, XCircle, Search, Plus, Filter, Clock, Camera, FileText, Settings, TrendingUp, ArrowLeft, Factory, FlaskConical, Shield, Database, Calendar, BookOpen, Zap, Droplets, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import QCInspectionList from "./QCInspectionList";
import QCWorkflowManager from "./QCWorkflowManager";
import QCAnalytics from "./QCAnalytics";
import QCChecklistManager from "./QCChecklistManager";
import QCWorkspaceSelector from "./QCWorkspaceSelector";
import QCMixDesigns from "./QCMixDesigns";
import QCFreshConcreteTests from "./QCFreshConcreteTests";
import QCAudits from "./QCAudits";
import QCBatchReports from "./QCBatchReports";
import QCResources from "./QCResources";
import QCStrand from "./QCStrand";
import QCMoistures from "./QCMoistures";
import QCAggregateInfo from "./QCAggregateInfo";
import QCCalibration from "./QCCalibration";
import QCCerts from "./QCCerts";

interface QCDepartmentModuleProps {
  departmentName: string;
  departmentColor: string;
  metrics: {
    totalInspections: number;
    pendingInspections: number;
    passedToday: number;
    failedToday: number;
    overdueInspections: number;
    averagePassRate: number;
    freshTestsToday: number;
    moistureTestsToday: number;
  };
}

const QCDepartmentModule = ({ departmentName, departmentColor, metrics }: QCDepartmentModuleProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
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
                <h1 className="text-3xl font-bold">{departmentName} Quality Control</h1>
                <p className="text-blue-100 mt-1">QC Operations & Inspection Management for {departmentName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Pass Rate: {metrics.averagePassRate}%
              </Badge>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Plus className="h-4 w-4 mr-2" />
                New Inspection
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Department-Specific Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className={`module-card-hover border-l-4 border-l-${departmentColor}-600`}>
            <CardContent className="p-4">
              <div className="text-center">
                <Factory className={`h-6 w-6 mx-auto mb-2 text-${departmentColor}-600`} />
                <div className={`text-2xl font-bold text-${departmentColor}-600`}>{metrics.pendingInspections}</div>
                <div className="text-xs text-gray-600">Pending Inspections</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="module-card-hover border-l-4 border-l-green-600">
            <CardContent className="p-4">
              <div className="text-center">
                <FlaskConical className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-600">{metrics.freshTestsToday}</div>
                <div className="text-xs text-gray-600">Fresh Tests Today</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="module-card-hover border-l-4 border-l-purple-600">
            <CardContent className="p-4">
              <div className="text-center">
                <Droplets className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-600">{metrics.moistureTestsToday}</div>
                <div className="text-xs text-gray-600">Moisture Tests Today</div>
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

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={`Search ${departmentName} inspections, tests, and QC data...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={activeFilter === "all" ? "default" : "outline"}
                  onClick={() => setActiveFilter("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={activeFilter === "pending" ? "default" : "outline"}
                  onClick={() => setActiveFilter("pending")}
                  size="sm"
                >
                  Pending
                </Button>
                <Button
                  variant={activeFilter === "overdue" ? "default" : "outline"}
                  onClick={() => setActiveFilter("overdue")}
                  size="sm"
                >
                  Overdue
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="workspace-inspections" className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid grid-cols-6 lg:grid-cols-12 min-w-max">
              {/* Primary Daily Operations */}
              <TabsTrigger value="workspace-inspections" className="flex items-center text-xs px-3 bg-blue-50">
                <Factory className="h-4 w-4 mr-1" />
                Inspections
              </TabsTrigger>
              <TabsTrigger value="fresh-concrete" className="flex items-center text-xs px-3 bg-green-50">
                <FlaskConical className="h-4 w-4 mr-1" />
                Fresh Tests
              </TabsTrigger>
              <TabsTrigger value="moistures" className="flex items-center text-xs px-3 bg-purple-50">
                <Droplets className="h-4 w-4 mr-1" />
                Moistures
              </TabsTrigger>
              <TabsTrigger value="aggregates" className="flex items-center text-xs px-3 bg-orange-50">
                <BarChart3 className="h-4 w-4 mr-1" />
                Gradations
              </TabsTrigger>
              
              {/* Secondary Operations */}
              <TabsTrigger value="mix-designs" className="flex items-center text-xs px-3">
                <Database className="h-4 w-4 mr-1" />
                Mix Designs
              </TabsTrigger>
              <TabsTrigger value="batch-reports" className="flex items-center text-xs px-3">
                <FileText className="h-4 w-4 mr-1" />
                Batch Reports
              </TabsTrigger>
              <TabsTrigger value="calibration" className="flex items-center text-xs px-3">
                <Settings className="h-4 w-4 mr-1" />
                Calibration
              </TabsTrigger>
              <TabsTrigger value="certs" className="flex items-center text-xs px-3">
                <FileText className="h-4 w-4 mr-1" />
                Certs
              </TabsTrigger>
              <TabsTrigger value="strand" className="flex items-center text-xs px-3">
                <Zap className="h-4 w-4 mr-1" />
                Strand
              </TabsTrigger>
              <TabsTrigger value="audits" className="flex items-center text-xs px-3">
                <Shield className="h-4 w-4 mr-1" />
                Audits
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center text-xs px-3">
                <TrendingUp className="h-4 w-4 mr-1" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center text-xs px-3">
                <BookOpen className="h-4 w-4 mr-1" />
                Resources
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent value="workspace-inspections">
            <QCWorkspaceSelector />
          </TabsContent>

          <TabsContent value="fresh-concrete">
            <QCFreshConcreteTests />
          </TabsContent>

          <TabsContent value="moistures">
            <QCMoistures />
          </TabsContent>

          <TabsContent value="aggregates">
            <QCAggregateInfo />
          </TabsContent>

          <TabsContent value="mix-designs">
            <QCMixDesigns />
          </TabsContent>

          <TabsContent value="batch-reports">
            <QCBatchReports />
          </TabsContent>

          <TabsContent value="calibration">
            <QCCalibration />
          </TabsContent>

          <TabsContent value="certs">
            <QCCerts />
          </TabsContent>

          <TabsContent value="strand">
            <QCStrand />
          </TabsContent>

          <TabsContent value="audits">
            <QCAudits />
          </TabsContent>

          <TabsContent value="analytics">
            <QCAnalytics />
          </TabsContent>

          <TabsContent value="resources">
            <QCResources />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QCDepartmentModule;
