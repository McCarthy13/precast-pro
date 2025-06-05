
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calculator, TrendingUp, Users2, FileText, Settings } from "lucide-react";
import EstimateBuilder from "@/components/estimating/EstimateBuilder";
import BidTracker from "@/components/estimating/BidTracker";
import CostDatabase from "@/components/estimating/CostDatabase";
import SalesAnalytics from "@/components/estimating/SalesAnalytics";

const EstimatingSalesDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      <header className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-6 shadow-lg">
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
                <h1 className="text-3xl font-bold">Estimating & Sales</h1>
                <p className="text-amber-100 mt-1">Bid Management, Cost Analysis & Sales Tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                15 Active Bids
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                $2.4M Pipeline
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
          <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Estimates</p>
                  <p className="text-2xl font-bold text-amber-600">15</p>
                  <p className="text-xs text-gray-500">$2.4M total value</p>
                </div>
                <Calculator className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Win Rate</p>
                  <p className="text-2xl font-bold text-green-600">68%</p>
                  <p className="text-xs text-gray-500">last 6 months</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Prospects</p>
                  <p className="text-2xl font-bold text-blue-600">42</p>
                  <p className="text-xs text-gray-500">new this month</p>
                </div>
                <Users2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Proposals</p>
                  <p className="text-2xl font-bold text-purple-600">8</p>
                  <p className="text-xs text-gray-500">pending review</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Estimating & Sales Workspace</CardTitle>
            <CardDescription>
              Create estimates, track bids, manage costs, and analyze sales performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="estimates" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="estimates">Estimates</TabsTrigger>
                <TabsTrigger value="bids">Bid Tracker</TabsTrigger>
                <TabsTrigger value="costs">Cost Database</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="estimates">
                <EstimateBuilder />
              </TabsContent>

              <TabsContent value="bids">
                <BidTracker />
              </TabsContent>

              <TabsContent value="costs">
                <CostDatabase />
              </TabsContent>

              <TabsContent value="analytics">
                <SalesAnalytics />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EstimatingSalesDashboard;
