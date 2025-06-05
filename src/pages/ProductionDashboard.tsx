
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Factory, Settings, BarChart3 } from "lucide-react";
import WallPanelsProduction from "@/components/production/WallPanelsProduction";
import PrecastProduction from "@/components/production/PrecastProduction";
import ExtrudedProduction from "@/components/production/ExtrudedProduction";
import FlexicoreProduction from "@/components/production/FlexicoreProduction";
import DoubleTeesProduction from "@/components/production/DoubleTeesProduction";

const ProductionDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 shadow-lg">
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
                <h1 className="text-3xl font-bold">Production Department</h1>
                <p className="text-blue-100 mt-1">Wall Panels, Precast, Extruded, Flexicore & Double Tees</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                156 Pieces Today
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                94% Efficiency
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Wall Panels</p>
                <p className="text-2xl font-bold text-green-600">45</p>
                <p className="text-xs text-gray-500">pieces today</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Precast</p>
                <p className="text-2xl font-bold text-blue-600">32</p>
                <p className="text-xs text-gray-500">pieces today</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Extruded</p>
                <p className="text-2xl font-bold text-purple-600">28</p>
                <p className="text-xs text-gray-500">pieces today</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Flexicore</p>
                <p className="text-2xl font-bold text-orange-600">36</p>
                <p className="text-xs text-gray-500">pieces today</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Double Tees</p>
                <p className="text-2xl font-bold text-red-600">15</p>
                <p className="text-xs text-gray-500">pieces today</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Factory className="h-6 w-6 mr-2" />
              Production Management
            </CardTitle>
            <CardDescription>
              Manage production across all five subdepartments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="wall-panels" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="wall-panels">Wall Panels</TabsTrigger>
                <TabsTrigger value="precast">Precast</TabsTrigger>
                <TabsTrigger value="extruded">Extruded</TabsTrigger>
                <TabsTrigger value="flexicore">Flexicore</TabsTrigger>
                <TabsTrigger value="double-tees">Double Tees</TabsTrigger>
              </TabsList>

              <TabsContent value="wall-panels">
                <WallPanelsProduction />
              </TabsContent>

              <TabsContent value="precast">
                <PrecastProduction />
              </TabsContent>

              <TabsContent value="extruded">
                <ExtrudedProduction />
              </TabsContent>

              <TabsContent value="flexicore">
                <FlexicoreProduction />
              </TabsContent>

              <TabsContent value="double-tees">
                <DoubleTeesProduction />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductionDashboard;
