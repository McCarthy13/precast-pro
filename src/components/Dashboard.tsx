
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Calendar, Cloud, Users, Settings, AlertCircle, TrendingUp } from "lucide-react";
import QCStatusOverview from "./QCStatusOverview";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="construction-gradient text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PrecastPro</h1>
              <p className="text-blue-100 mt-1">Integrated Construction Management Platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Live Weather: 72°F
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
        {/* AI Query Interface */}
        <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              Platform AI Assistant
            </CardTitle>
            <CardDescription>
              Ask questions across all modules in plain language. Try: "Show me pieces with indentations poured on form 7, section B"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3">
              <Input 
                placeholder="Ask AI about production, quality, weather, or any platform data..."
                className="flex-1 border-blue-200 focus:border-blue-400"
              />
              <Button className="construction-gradient">
                Analyze
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="module-card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-3xl font-bold text-blue-600">24</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="module-card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pieces in Production</p>
                  <p className="text-3xl font-bold text-green-600">156</p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">⚡</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="module-card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">QC Inspections</p>
                  <p className="text-3xl font-bold text-orange-600">89</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="module-card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Weather Alerts</p>
                  <p className="text-3xl font-bold text-purple-600">2</p>
                </div>
                <Cloud className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QC Status Overview and Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* QC Status Overview - takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <QCStatusOverview />
          </div>

          {/* Quality Control Module */}
          <Card className="module-card-hover border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-700">
                <AlertCircle className="h-5 w-5 mr-2" />
                Quality Control
              </CardTitle>
              <CardDescription>Inspections, testing, and compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Today's Tests</span>
                  <Badge variant="outline">15</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pass Rate</span>
                  <Badge className="bg-green-100 text-green-800">96%</Badge>
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <a href="/qc">Open QC Module</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Estimating/Sales */}
          <Card className="module-card-hover border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Calendar className="h-5 w-5 mr-2" />
                Estimating/Sales
              </CardTitle>
              <CardDescription>Bid management and customer relations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Bids</span>
                  <Badge variant="outline">12</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Win Rate</span>
                  <Badge className="bg-green-100 text-green-800">78%</Badge>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Open Module
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Drafting/Engineering */}
          <Card className="module-card-hover border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <div className="h-5 w-5 mr-2 bg-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">3D</span>
                </div>
                Drafting/Engineering
              </CardTitle>
              <CardDescription>3D models, drawings, and document management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Drawings</span>
                  <Badge variant="outline">45</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pending Approval</span>
                  <Badge className="bg-orange-100 text-orange-800">8</Badge>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Open Module
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Production */}
          <Card className="module-card-hover border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <div className="h-5 w-5 mr-2 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">⚡</span>
                </div>
                Production
              </CardTitle>
              <CardDescription>Wall Panels, Precast, Extruded, Flexicore</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Daily Output</span>
                  <Badge className="bg-green-100 text-green-800">23 pieces</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Efficiency</span>
                  <Badge className="bg-blue-100 text-blue-800">94%</Badge>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Open Module
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Project Management */}
          <Card className="module-card-hover border-l-4 border-l-indigo-500">
            <CardHeader>
              <CardTitle className="flex items-center text-indigo-700">
                <Users className="h-5 w-5 mr-2" />
                Project Management
              </CardTitle>
              <CardDescription>Tasks, timelines, and team coordination</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Open Tasks</span>
                  <Badge variant="outline">67</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">On Schedule</span>
                  <Badge className="bg-green-100 text-green-800">21/24</Badge>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Open Module
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Weather Integration */}
          <Card className="module-card-hover border-l-4 border-l-sky-500">
            <CardHeader>
              <CardTitle className="flex items-center text-sky-700">
                <Cloud className="h-5 w-5 mr-2" />
                Weather & Environment
              </CardTitle>
              <CardDescription>Real-time conditions and historical data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Temp</span>
                  <Badge className="bg-sky-100 text-sky-800">72°F</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Humidity</span>
                  <Badge variant="outline">65%</Badge>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Platform Activity</CardTitle>
            <CardDescription>Cross-module updates and AI insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">AI Alert: Correlation detected between Form 7, Section B and indentation defects</p>
                  <p className="text-xs text-gray-500">Quality Control • 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Weather conditions optimal for concrete pours today</p>
                  <p className="text-xs text-gray-500">Weather Module • 3 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
                <div className="h-2 w-2 bg-orange-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Drawing revision released: Project Alpha Wall Panel Series</p>
                  <p className="text-xs text-gray-500">Drafting/Engineering • 5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
