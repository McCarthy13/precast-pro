import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory, Play, Pause, CheckCircle, Clock, } from "lucide-react";
import DayView from "./DayView";
import { extrudedForms } from "@/data/productionForms";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import InventoryTracker from "./InventoryTracker";

const ExtrudedProduction = () => {

  const extrudedJobs = [
    {
      id: "EX-001",
      project: "Industrial Complex",
      productType: "Hollow Core Slabs",
      length: "40 ft",
      quantity: 16,
      completed: 12,
      status: "in-progress",
      line: "Extruder Line 1"
    },
    {
      id: "EX-002",
      project: "Office Building",
      productType: "Solid Slabs",
      length: "20 ft",
      quantity: 28,
      completed: 28,
      status: "completed",
      line: "Extruder Line 2"
    },
    {
      id: "EX-003",
      project: "Warehouse Project",
      productType: "Hollow Core Slabs",
      length: "60 ft",
      quantity: 20,
      completed: 8,
      status: "in-progress",
      line: "Extruder Line 1"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Play className="h-4 w-4 text-blue-600" />;
      case "paused":
        return <Pause className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Extruded Production</h3>
          <p className="text-gray-600">Hollow core and solid slab extrusion</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Factory className="h-4 w-4 mr-2" />
          Schedule Extrusion
        </Button>
      </div>

      <Tabs defaultValue="day-view" className="space-y-4">
        <TabsList>
          <TabsTrigger value="day-view">Day View</TabsTrigger>
          <TabsTrigger value="production-queue">Production Queue</TabsTrigger>
          <TabsTrigger value="extruder-controls">Extruder Controls</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="day-view">
          <DayView forms={extrudedForms} department="extruded" />
        </TabsContent>

        <TabsContent value="production-queue">
          <Card>
            <CardHeader>
              <CardTitle>Extruded Production Queue</CardTitle>
              <CardDescription>Hollow core and solid slab extrusion</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Length</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Line</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {extrudedJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.id}</TableCell>
                      <TableCell>{job.project}</TableCell>
                      <TableCell>{job.productType}</TableCell>
                      <TableCell>{job.length}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{job.completed}/{job.quantity}</span>
                            <span>{Math.round((job.completed / job.quantity) * 100)}%</span>
                          </div>
                          <Progress value={(job.completed / job.quantity) * 100} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{job.line}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(job.status)}
                          <Badge variant="outline">{job.status}</Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extruder-controls">
          <Card>
            <CardHeader>
              <CardTitle>Extruder Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Start Extrusion Run
              </Button>
              <Button variant="outline" className="w-full">
                Line Maintenance
              </Button>
              <Button variant="outline" className="w-full">
                Cut Schedules
              </Button>
              <Button variant="outline" className="w-full">
                Quality Monitoring
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryTracker department="extruded" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExtrudedProduction;
