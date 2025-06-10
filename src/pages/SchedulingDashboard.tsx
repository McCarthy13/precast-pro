
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import { Calendar, Users, Factory, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SchedulingDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gray-50">
      <PageHeader 
        title="Scheduling Dashboard"
        subtitle="Production Planning & Resource Scheduling"
        backLink="/"
        backText="Back to Main Dashboard"
      />

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Jobs</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Active production jobs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crew Utilization</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Current efficiency</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Forms Active</CardTitle>
              <Factory className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Out of 23 total forms</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Cycle Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2h</div>
              <p className="text-xs text-muted-foreground">Per production cycle</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduling Dashboard Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Advanced scheduling features including resource planning, production optimization, 
                and delivery coordination will be available here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchedulingDashboard;
