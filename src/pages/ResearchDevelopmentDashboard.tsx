
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlaskConical, Target, TrendingUp, Settings } from "lucide-react";

const ResearchDevelopmentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <PageHeader 
        title="Research & Development"
        subtitle="Innovation tracking, testing protocols, and product development"
        backLink="/"
        backText="Back to Main Dashboard"
      >
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <FlaskConical className="h-4 w-4 mr-1" />
            8 Active Projects
          </Badge>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </PageHeader>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-amber-600">8</p>
                </div>
                <FlaskConical className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Prototypes</p>
                  <p className="text-2xl font-bold text-orange-600">15</p>
                </div>
                <Target className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-green-600">87%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Patents Filed</p>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                </div>
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📋</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Research & Development Management</CardTitle>
            <CardDescription>Innovation tracking, testing protocols, and product development tools</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Research & Development management interface would be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResearchDevelopmentDashboard;
