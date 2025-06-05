
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
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
  Shield, 
  Wrench, 
  ShoppingCart, 
  FlaskConical, 
  Phone, 
  FileArchive, 
  Globe 
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Estimating/Sales",
    url: "/estimating-sales",
    icon: DollarSign,
  },
  {
    title: "Drafting/Engineering",
    url: "/drafting",
    icon: FileText,
  },
  {
    title: "Scheduling",
    url: "/scheduling",
    icon: Calendar,
  },
  {
    title: "Production",
    url: "/production",
    icon: Factory,
  },
  {
    title: "Quality Control",
    url: "/qc",
    icon: CheckCircle,
  },
  {
    title: "Yard Management",
    url: "/yard-management",
    icon: Truck,
  },
  {
    title: "Dispatch/Delivery",
    url: "/dispatch-delivery",
    icon: Truck,
  },
  {
    title: "Project Management",
    url: "/project-management",
    icon: Briefcase,
  },
  {
    title: "Field Services",
    url: "/field-services",
    icon: Users,
  },
  {
    title: "Maintenance",
    url: "/maintenance",
    icon: Wrench,
  },
  {
    title: "Purchasing & Receiving",
    url: "/purchasing-receiving",
    icon: ShoppingCart,
  },
  {
    title: "Research & Development",
    url: "/research-development",
    icon: FlaskConical,
  },
  {
    title: "Contact Management",
    url: "/contact-management",
    icon: Phone,
  },
  {
    title: "Document Management",
    url: "/document-management",
    icon: FileArchive,
  },
  {
    title: "Client Portal",
    url: "/client-portal",
    icon: Globe,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Departments</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
