
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, Truck, Users, Settings } from "lucide-react";
import ProductionSchedule from "@/components/scheduling/ProductionSchedule";
import DeliverySchedule from "@/components/scheduling/DeliverySchedule";
import ResourcePlanning from "@/components/scheduling/ResourcePlanning";
import ScheduleOptimization from "@/components/scheduling/ScheduleOptimization";

const SchedulingDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 shadow-lg">
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
                <h1 className="text-3xl font-bold">Scheduling & Planning</h1>
                <p className="text-blue-100 mt-1">Production, Delivery & Resource Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                12 Active Projects
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                5 Deliveries Today
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
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Production</p>
                  <p className="text-2xl font-bold text-blue-600">24</p>
                  <p className="text-xs text-gray-500">pieces scheduled</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-cyan-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Deliveries</p>
                  <p className="text-2xl font-bold text-cyan-600">8</p>
                  <p className="text-xs text-gray-500">trucks scheduled</p>
                </div>
                <Truck className="h-8 w-8 text-cyan-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">On Schedule</p>
                  <p className="text-2xl font-bold text-green-600">92%</p>
                  <p className="text-xs text-gray-500">efficiency rate</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Crew Utilization</p>
                  <p className="text-2xl font-bold text-orange-600">85%</p>
                  <p className="text-xs text-gray-500">capacity used</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Scheduling Workspace</CardTitle>
            <CardDescription>
              Manage production schedules, deliveries, and resource allocation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="production" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="production">Production</TabsTrigger>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="optimization">Optimization</TabsTrigger>
              </TabsList>

              <TabsContent value="production">
                <ProductionSchedule />
              </TabsContent>

              <TabsContent value="delivery">
                <DeliverySchedule />
              </TabsContent>

              <TabsContent value="resources">
                <ResourcePlanning />
              </TabsContent>

              <TabsContent value="optimization">
                <ScheduleOptimization />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchedulingDashboard;
