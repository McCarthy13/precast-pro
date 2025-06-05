import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Calendar, Cloud, Users, Settings, AlertCircle, TrendingUp, Shield, PenTool, FolderOpen, Calculator, Truck, Factory, Package, Truck as TruckIcon, Warehouse, Wrench, FileText, Users as UsersIcon, Globe, Flask } from "lucide-react";
import QCStatusOverview from "./QCStatusOverview";

const Dashboard = () => {
  const modules = [
    {
      title: "Quality Control",
      description: "Inspection management, checklists, workflow automation, and analytics",
      icon: Shield,
      href: "/qc",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700"
    },
    {
      title: "Drafting & Engineering",
      description: "CAD drawings, 3D models, document management, and calculations",
      icon: PenTool,
      href: "/drafting",
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700"
    },
    {
      title: "Scheduling & Planning",
      description: "Production scheduling, delivery planning, and resource optimization",
      icon: Calendar,
      href: "/scheduling",
      color: "bg-cyan-600",
      hoverColor: "hover:bg-cyan-700"
    },
    {
      title: "Project Management",
      description: "Task tracking, team collaboration, progress monitoring, and reporting",
      icon: FolderOpen,
      href: "/project-management",
      color: "bg-emerald-600",
      hoverColor: "hover:bg-emerald-700"
    },
    {
      title: "Estimating & Sales",
      description: "Cost estimation, bid tracking, sales analytics, and proposal generation",
      icon: Calculator,
      href: "/estimating-sales",
      color: "bg-amber-600",
      hoverColor: "hover:bg-amber-700"
    },
    {
      title: "Field Services",
      description: "Installation tracking, service requests, crew management, and field reporting",
      icon: Truck,
      href: "/field-services",
      color: "bg-orange-600",
      hoverColor: "hover:bg-orange-700"
    },
    {
      title: "Production Department",
      description: "Wall Panels, Precast, Extruded, Flexicore, Double Tees production",
      icon: Factory,
      href: "/production",
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700"
    },
    {
      title: "Purchasing & Receiving",
      description: "Material procurement, vendor management, and inventory tracking",
      icon: Package,
      href: "/purchasing-receiving",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600"
    },
    {
      title: "Dispatch & Delivery",
      description: "Fleet management, route optimization, and delivery coordination",
      icon: TruckIcon,
      href: "/dispatch-delivery",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      title: "Yard Management",
      description: "Storage optimization, inventory tracking, and yard operations",
      icon: Warehouse,
      href: "/yard-management",
      color: "bg-gray-600",
      hoverColor: "hover:bg-gray-700"
    },
    {
      title: "Maintenance",
      description: "Equipment maintenance, work orders, and facility management",
      icon: Wrench,
      href: "/maintenance",
      color: "bg-red-600",
      hoverColor: "hover:bg-red-700"
    },
    {
      title: "Document Management",
      description: "Centralized document storage, version control, and collaboration",
      icon: FileText,
      href: "/document-management",
      color: "bg-indigo-600",
      hoverColor: "hover:bg-indigo-700"
    },
    {
      title: "Contact Management (CRM)",
      description: "Customer relationship management and contact database",
      icon: UsersIcon,
      href: "/contact-management",
      color: "bg-teal-600",
      hoverColor: "hover:bg-teal-700"
    },
    {
      title: "Client Portal",
      description: "Customer self-service portal and project visibility",
      icon: Globe,
      href: "/client-portal",
      color: "bg-violet-600",
      hoverColor: "hover:bg-violet-700"
    },
    {
      title: "Research & Development",
      description: "Innovation tracking, testing protocols, and product development",
      icon: Flask,
      href: "/research-development",
      color: "bg-amber-500",
      hoverColor: "hover:bg-amber-600"
    }
  ];

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

        {/* QC Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <QCStatusOverview />
          </div>
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

        {/* All Modules Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Department Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {modules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Card key={module.title} className="module-card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center text-sm">
                      <IconComponent className="h-5 w-5 mr-2" />
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-xs">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      asChild
                    >
                      <a href={module.href}>Open Module</a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
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
