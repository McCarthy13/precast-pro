
import React from 'react';
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Warehouse, Package, MapPin, Settings } from "lucide-react";

const YardManagementDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50">
      <PageHeader 
        title="Yard Management"
        subtitle="Storage, inventory, and yard operations"
        backLink="/"
        backText="Back to Main Dashboard"
      >
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <Package className="h-4 w-4 mr-1" />
            342 Items in Yard
          </Badge>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </PageHeader>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-gray-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Inventory</p>
                  <p className="text-2xl font-bold text-gray-600">342</p>
                </div>
                <Warehouse className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ready to Ship</p>
                  <p className="text-2xl font-bold text-green-600">87</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Yard Capacity</p>
                  <p className="text-2xl font-bold text-blue-600">76%</p>
                </div>
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Movements Today</p>
                  <p className="text-2xl font-bold text-orange-600">45</p>
                </div>
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-lg">📦</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Yard Management Operations</CardTitle>
            <CardDescription>Inventory tracking, storage optimization, and yard logistics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Yard management interface would be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default YardManagementDashboard;
