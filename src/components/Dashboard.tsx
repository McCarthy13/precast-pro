
import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  DollarSign, 
  FileText, 
  Calendar, 
  Factory, 
  CheckCircle, 
  Truck, 
  Briefcase, 
  Users, 
  Wrench, 
  ShoppingCart, 
  FlaskConical, 
  Phone, 
  FileArchive, 
  Globe 
} from "lucide-react";

const departmentCards = [
  {
    title: "Estimating/Sales",
    description: "Bid management, cost estimation, and sales tracking",
    icon: DollarSign,
    link: "/estimating-sales",
    status: "Active",
    color: "bg-green-500"
  },
  {
    title: "Drafting/Engineering",
    description: "Technical drawings, CAD management, and engineering calculations",
    icon: FileText,
    link: "/drafting",
    status: "Active",
    color: "bg-blue-500"
  },
  {
    title: "Scheduling",
    description: "Production scheduling, resource planning, and timeline management",
    icon: Calendar,
    link: "/scheduling",
    status: "Active",
    color: "bg-purple-500"
  },
  {
    title: "Production",
    description: "Manufacturing oversight, workflow management, and production tracking",
    icon: Factory,
    link: "/production",
    status: "Active",
    color: "bg-orange-500"
  },
  {
    title: "Quality Control",
    description: "Inspection management, testing protocols, and quality assurance",
    icon: CheckCircle,
    link: "/qc",
    status: "Active",
    color: "bg-red-500"
  },
  {
    title: "Yard Management",
    description: "Inventory tracking, storage optimization, and yard logistics",
    icon: Truck,
    link: "/yard-management",
    status: "Active",
    color: "bg-yellow-500"
  },
  {
    title: "Dispatch/Delivery",
    description: "Shipping coordination, delivery tracking, and logistics management",
    icon: Truck,
    link: "/dispatch-delivery",
    status: "Active",
    color: "bg-indigo-500"
  },
  {
    title: "Project Management",
    description: "Project oversight, milestone tracking, and team coordination",
    icon: Briefcase,
    link: "/project-management",
    status: "Active",
    color: "bg-pink-500"
  },
  {
    title: "Field Services",
    description: "Installation support, field reporting, and service requests",
    icon: Users,
    link: "/field-services",
    status: "Active",
    color: "bg-teal-500"
  },
  {
    title: "Maintenance",
    description: "Equipment maintenance, repair scheduling, and asset management",
    icon: Wrench,
    link: "/maintenance",
    status: "Active",
    color: "bg-gray-500"
  },
  {
    title: "Purchasing & Receiving",
    description: "Procurement management, vendor relations, and inventory receiving",
    icon: ShoppingCart,
    link: "/purchasing-receiving",
    status: "Active",
    color: "bg-emerald-500"
  },
  {
    title: "Research & Development",
    description: "Innovation projects, testing protocols, and product development",
    icon: FlaskConical,
    link: "/research-development",
    status: "Active",
    color: "bg-violet-500"
  },
  {
    title: "Contact Management",
    description: "Customer relations, vendor management, and CRM operations",
    icon: Phone,
    link: "/contact-management",
    status: "Active",
    color: "bg-cyan-500"
  },
  {
    title: "Document Management",
    description: "File organization, document control, and information systems",
    icon: FileArchive,
    link: "/document-management",
    status: "Active",
    color: "bg-amber-500"
  },
  {
    title: "Client Portal",
    description: "Customer access, project visibility, and client communications",
    icon: Globe,
    link: "/client-portal",
    status: "Active",
    color: "bg-rose-500"
  }
];

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-xl font-semibold">Construction Management Dashboard</h1>
          </div>
          
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Welcome to ConCrete Solutions</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">15 Active Departments</Badge>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {departmentCards.map((department) => (
                <Card key={department.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {department.title}
                    </CardTitle>
                    <div className={`h-8 w-8 rounded-full ${department.color} flex items-center justify-center`}>
                      <department.icon className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs mb-3">
                      {department.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {department.status}
                      </Badge>
                      <Button asChild size="sm" variant="outline">
                        <Link to={department.link}>
                          Open
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
