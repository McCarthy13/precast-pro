
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Layers, Settings, Users, Calculator, GitBranch, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DrawingManagement from "@/components/drafting/DrawingManagement";
import ModelViewer from "@/components/drafting/ModelViewer";
import EngineeringCalcs from "@/components/drafting/EngineeringCalcs";
import RevisionControl from "@/components/drafting/RevisionControl";

const DraftingDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-50">
      <PageHeader 
        title="Drafting & Engineering Dashboard"
        subtitle="Design Documentation & Engineering Analysis"
        backLink="/"
        backText="Back to Main Dashboard"
      />

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Drawings</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Active projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revisions</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Pending approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Engineers & drafters</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="drawings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="drawings" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Drawings</span>
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center space-x-2">
              <Layers className="h-4 w-4" />
              <span>3D Models</span>
            </TabsTrigger>
            <TabsTrigger value="calculations" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Calculations</span>
            </TabsTrigger>
            <TabsTrigger value="revisions" className="flex items-center space-x-2">
              <GitBranch className="h-4 w-4" />
              <span>Revisions</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drawings">
            <DrawingManagement />
          </TabsContent>

          <TabsContent value="models">
            <ModelViewer />
          </TabsContent>

          <TabsContent value="calculations">
            <EngineeringCalcs />
          </TabsContent>

          <TabsContent value="revisions">
            <RevisionControl />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DraftingDashboard;
