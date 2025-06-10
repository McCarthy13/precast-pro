
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import { FileText, Layers, Settings, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Drafting & Engineering Dashboard Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Advanced drafting tools, 3D modeling capabilities, engineering calculations, 
                and collaborative design features will be available here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DraftingDashboard;
