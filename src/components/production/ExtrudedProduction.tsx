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
  // Updated jobs to follow proper Job # and Mark # format
  const extrudedJobs = [
    {
      jobNumber: "25-5020",
      shorthand: "5020",
      project: "Industrial Complex",
      productType: "Hollow Core Slabs",
      marks: ["H0001", "H0002", "H0003"], // Hollow Core marks
      length: "40 ft",
      quantity: 16,
      completed: 12,
      status: "in-progress",
      line: "EXT1" // Using proper extruder form naming
    },
    {
      jobNumber: "25-5021", 
      shorthand: "5021",
      project: "Office Building",
      productType: "Solid Slabs",
      marks: ["SS001", "SS002"], // Solid Slab marks
      length: "20 ft", 
      quantity: 28,
      completed: 28,
      status: "completed",
      line: "EXT2"
    },
    {
      jobNumber: "25-5022",
      shorthand: "5022", 
      project: "Warehouse Project",
      productType: "Hollow Core Slabs",
      marks: ["H0004", "H0005"],
      length: "60 ft",
      quantity: 20,
      completed: 8,
      status: "in-progress", 
      line: "EXT1"
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
          <TabsTrigger value="extruder-forms">Extruder Forms</TabsTrigger>
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
              <div className="space-y-4">
                {extrudedJobs.map((job) => (
                  <Card key={job.jobNumber} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">Job #{job.shorthand}</h4>
                          <p className="text-sm text-gray-600">Full: {job.jobNumber}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(job.status)}
                          <Badge variant="outline">{job.status}</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm"><strong>Project:</strong> {job.project}</p>
                          <p className="text-sm"><strong>Product:</strong> {job.productType}</p>
                          <p className="text-sm"><strong>Length:</strong> {job.length}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm"><strong>Progress:</strong> {job.completed}/{job.quantity}</p>
                          <p className="text-sm"><strong>Extruder:</strong> {job.line}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${(job.completed / job.quantity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm">
                            <strong>Mark #s:</strong>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {job.marks.map((mark) => (
                                <Badge key={mark} variant="outline" className="text-xs">
                                  {mark}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extruder-forms">
          <Card>
            <CardHeader>
              <CardTitle>Extruder Forms Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {["EXT1", "EXT2", "EXT3", "EXT4", "EXT5", "EXT6", "EXT7", "EXT8"].map((formName) => {
                  const assignedJob = extrudedJobs.find(job => job.line === formName);
                  
                  return (
                    <Card key={formName} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{formName}</h4>
                          <Badge variant={assignedJob ? "secondary" : "default"}>
                            {assignedJob ? "In Use" : "Available"}
                          </Badge>
                        </div>
                        {assignedJob ? (
                          <div className="text-sm text-gray-600">
                            <p>Job #{assignedJob.shorthand}</p>
                            <p>{assignedJob.productType}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">Ready for assignment</p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
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
