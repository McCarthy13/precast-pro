
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Wrench, Truck, AlertTriangle, Settings } from "lucide-react";
import InstallationTracking from "@/components/field/InstallationTracking";
import ServiceRequests from "@/components/field/ServiceRequests";
import CrewManagement from "@/components/field/CrewManagement";
import FieldReporting from "@/components/field/FieldReporting";

const FieldServicesDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/10">
                <a href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </a>
              </Button>
              <Separator orientation="vertical" className="h-6 bg-white/20" />
              <div>
                <h1 className="text-3xl font-bold">Field Services</h1>
                <p className="text-orange-100 mt-1">Installation, Service & Crew Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                6 Active Crews
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                3 Service Calls
              </Badge>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Installs</p>
                  <p className="text-2xl font-bold text-orange-600">12</p>
                  <p className="text-xs text-gray-500">across 4 sites</p>
                </div>
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Service Requests</p>
                  <p className="text-2xl font-bold text-blue-600">7</p>
                  <p className="text-xs text-gray-500">3 urgent</p>
                </div>
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Crews Available</p>
                  <p className="text-2xl font-bold text-green-600">4</p>
                  <p className="text-xs text-gray-500">of 6 total</p>
                </div>
                <Truck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Safety Incidents</p>
                  <p className="text-2xl font-bold text-red-600">0</p>
                  <p className="text-xs text-gray-500">this month</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Field Services Workspace</CardTitle>
            <CardDescription>
              Manage installations, service requests, crew assignments, and field operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="installations" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="installations">Installations</TabsTrigger>
                <TabsTrigger value="service">Service</TabsTrigger>
                <TabsTrigger value="crews">Crews</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="installations">
                <InstallationTracking />
              </TabsContent>

              <TabsContent value="service">
                <ServiceRequests />
              </TabsContent>

              <TabsContent value="crews">
                <CrewManagement />
              </TabsContent>

              <TabsContent value="reports">
                <FieldReporting />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FieldServicesDashboard;
