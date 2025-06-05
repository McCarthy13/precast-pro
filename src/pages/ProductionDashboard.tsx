
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Factory, Settings } from "lucide-react";
import ProductionOverview from "@/components/production/ProductionOverview";
import WallPanelDetails from "@/components/production/WallPanelDetails";
import PrecastDetails from "@/components/production/PrecastDetails";
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
                <p className="text-blue-100 mt-1">Comprehensive manufacturing management across all production lines</p>
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
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="wall-panels">Wall Panels</TabsTrigger>
            <TabsTrigger value="precast">Precast</TabsTrigger>
            <TabsTrigger value="extruded">Extruded</TabsTrigger>
            <TabsTrigger value="flexicore">Flexicore</TabsTrigger>
            <TabsTrigger value="double-tees">Double Tees</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ProductionOverview />
          </TabsContent>

          <TabsContent value="wall-panels">
            <WallPanelDetails />
          </TabsContent>

          <TabsContent value="precast">
            <PrecastDetails />
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
      </div>
    </div>
  );
};

export default ProductionDashboard;
