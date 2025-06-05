
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, XCircle, Search, Plus, Filter, Clock, Camera, FileText, Settings, TrendingUp, ArrowLeft, Factory, FlaskConical, Shield, Database, Calendar, BookOpen, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import QCInspectionList from "@/components/qc/QCInspectionList";
import QCWorkflowManager from "@/components/qc/QCWorkflowManager";
import QCAnalytics from "@/components/qc/QCAnalytics";
import QCChecklistManager from "@/components/qc/QCChecklistManager";
import QCWorkspaceSelector from "@/components/qc/QCWorkspaceSelector";
import QCMixDesigns from "@/components/qc/QCMixDesigns";
import QCFreshConcreteTests from "@/components/qc/QCFreshConcreteTests";
import QCAudits from "@/components/qc/QCAudits";
import QCBatchReports from "@/components/qc/QCBatchReports";
import QCResources from "@/components/qc/QCResources";
import QCStrand from "@/components/qc/QCStrand";
import QCMoistures from "@/components/qc/QCMoistures";
import QCAggregateInfo from "@/components/qc/QCAggregateInfo";
import QCCalibration from "@/components/qc/QCCalibration";
import QCCerts from "@/components/qc/QCCerts";

const QCDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const qcMetrics = {
    totalInspections: 156,
    pendingInspections: 23,
    passedToday: 18,
    failedToday: 2,
    overdueInspections: 5,
    averagePassRate: 94.2
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="construction-gradient text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Quality Control</h1>
                <p className="text-blue-100 mt-1">Comprehensive QC Management & Documentation System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Pass Rate: {qcMetrics.averagePassRate}%
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
        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <Card className="module-card-hover">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{qcMetrics.totalInspections}</div>
                <div className="text-xs text-gray-600">Total Inspections</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="module-card-hover">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{qcMetrics.pendingInspections}</div>
                <div className="text-xs text-gray-600">Pending</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="module-card-hover">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{qcMetrics.passedToday}</div>
                <div className="text-xs text-gray-600">Passed Today</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="module-card-hover">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{qcMetrics.failedToday}</div>
                <div className="text-xs text-gray-600">Failed Today</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="module-card-hover">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{qcMetrics.overdueInspections}</div>
                <div className="text-xs text-gray-600">Overdue</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="module-card-hover">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{qcMetrics.averagePassRate}%</div>
                <div className="text-xs text-gray-600">Pass Rate</div>
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
                  placeholder="Search across all QC modules..."
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
            <TabsList className="grid grid-cols-8 lg:grid-cols-16 min-w-max">
              <TabsTrigger value="workspace-inspections" className="flex items-center text-xs px-3">
                <Factory className="h-4 w-4 mr-1" />
                Workspaces
              </TabsTrigger>
              <TabsTrigger value="inspections" className="flex items-center text-xs px-3">
                <CheckCircle className="h-4 w-4 mr-1" />
                Inspections
              </TabsTrigger>
              <TabsTrigger value="mix-designs" className="flex items-center text-xs px-3">
                <FlaskConical className="h-4 w-4 mr-1" />
                Mix Designs
              </TabsTrigger>
              <TabsTrigger value="fresh-concrete" className="flex items-center text-xs px-3">
                <Database className="h-4 w-4 mr-1" />
                Fresh Concrete
              </TabsTrigger>
              <TabsTrigger value="audits" className="flex items-center text-xs px-3">
                <Shield className="h-4 w-4 mr-1" />
                Audits
              </TabsTrigger>
              <TabsTrigger value="batch-reports" className="flex items-center text-xs px-3">
                <FileText className="h-4 w-4 mr-1" />
                Batch Reports
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center text-xs px-3">
                <BookOpen className="h-4 w-4 mr-1" />
                Resources
              </TabsTrigger>
              <TabsTrigger value="strand" className="flex items-center text-xs px-3">
                <Zap className="h-4 w-4 mr-1" />
                Strand
              </TabsTrigger>
              <TabsTrigger value="moistures" className="flex items-center text-xs px-3">
                <Database className="h-4 w-4 mr-1" />
                Moistures
              </TabsTrigger>
              <TabsTrigger value="aggregates" className="flex items-center text-xs px-3">
                <Database className="h-4 w-4 mr-1" />
                Aggregates
              </TabsTrigger>
              <TabsTrigger value="calibration" className="flex items-center text-xs px-3">
                <Calendar className="h-4 w-4 mr-1" />
                Calibration
              </TabsTrigger>
              <TabsTrigger value="certs" className="flex items-center text-xs px-3">
                <FileText className="h-4 w-4 mr-1" />
                Certs
              </TabsTrigger>
              <TabsTrigger value="workflows" className="flex items-center text-xs px-3">
                <Settings className="h-4 w-4 mr-1" />
                Workflows
              </TabsTrigger>
              <TabsTrigger value="checklists" className="flex items-center text-xs px-3">
                <FileText className="h-4 w-4 mr-1" />
                Checklists
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center text-xs px-3">
                <TrendingUp className="h-4 w-4 mr-1" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="workspace-inspections">
            <QCWorkspaceSelector />
          </TabsContent>

          <TabsContent value="inspections">
            <QCInspectionList searchTerm={searchTerm} filter={activeFilter} />
          </TabsContent>

          <TabsContent value="mix-designs">
            <QCMixDesigns />
          </TabsContent>

          <TabsContent value="fresh-concrete">
            <QCFreshConcreteTests />
          </TabsContent>

          <TabsContent value="audits">
            <QCAudits />
          </TabsContent>

          <TabsContent value="batch-reports">
            <QCBatchReports />
          </TabsContent>

          <TabsContent value="resources">
            <QCResources />
          </TabsContent>

          <TabsContent value="strand">
            <QCStrand />
          </TabsContent>

          <TabsContent value="moistures">
            <QCMoistures />
          </TabsContent>

          <TabsContent value="aggregates">
            <QCAggregateInfo />
          </TabsContent>

          <TabsContent value="calibration">
            <QCCalibration />
          </TabsContent>

          <TabsContent value="certs">
            <QCCerts />
          </TabsContent>

          <TabsContent value="workflows">
            <QCWorkflowManager />
          </TabsContent>

          <TabsContent value="checklists">
            <QCChecklistManager />
          </TabsContent>

          <TabsContent value="analytics">
            <QCAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QCDashboard;
