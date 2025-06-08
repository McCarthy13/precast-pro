import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory, Play, Pause, CheckCircle, Clock } from "lucide-react";
import DayView from "./DayView";
import { flexicoreForms } from "@/data/productionForms";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import InventoryTracker from "./InventoryTracker";

const FlexicoreProduction = () => {
  // Updated jobs to follow proper Job # and Mark # format, and use proper Flexicore form naming
  const flexicoreJobs = [
    {
      jobNumber: "25-5023",
      shorthand: "5023",
      project: "Shopping Center",
      panelType: "8-inch Flexicore",
      dimensions: "32 ft", 
      marks: ["H0006", "H0007"], // Using Hollow Core marks for flexicore
      quantity: 24,
      completed: 20,
      status: "in-progress",
      crew: "Bed A",
      startDate: "2024-06-15",
      dueDate: "2024-06-22",
      priority: "medium",
      formId: "FL8x24" // Updated to use proper Flexicore form naming
    },
    {
      jobNumber: "25-5024",
      shorthand: "5024", 
      project: "Hospital Wing",
      panelType: "10-inch Flexicore",
      dimensions: "28 ft",
      marks: ["H0008", "H0009"],
      quantity: 18,
      completed: 18,
      status: "completed",
      crew: "Bed B", 
      startDate: "2024-06-10",
      dueDate: "2024-06-17",
      priority: "high",
      formId: "FL12x24"
    },
    {
      jobNumber: "25-5025",
      shorthand: "5025",
      project: "School Addition",
      panelType: "6-inch Flexicore", 
      dimensions: "24 ft",
      marks: ["H0010", "H0011"],
      quantity: 32,
      completed: 8,
      status: "in-progress",
      crew: "Bed C",
      startDate: "2024-06-20",
      dueDate: "2024-06-27",
      priority: "low",
      formId: "FL12x16"
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
          <h3 className="text-2xl font-bold">Flexicore Production</h3>
          <p className="text-gray-600">Flexible concrete deck production</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Factory className="h-4 w-4 mr-2" />
          Schedule Flexicore
        </Button>
      </div>

      <Tabs defaultValue="day-view" className="space-y-4">
        <TabsList>
          <TabsTrigger value="day-view">Day View</TabsTrigger>
          <TabsTrigger value="production-queue">Production Queue</TabsTrigger>
          <TabsTrigger value="flexicore-forms">Flexicore Forms</TabsTrigger>
          <TabsTrigger value="flexicore-controls">Flexicore Controls</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="day-view">
          <DayView forms={flexicoreForms} department="flexicore" />
        </TabsContent>

        <TabsContent value="production-queue">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Flexicore Production Queue</CardTitle>
                <CardDescription>Flexible concrete deck production</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flexicoreJobs.map((job) => (
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
                            <p className="text-sm"><strong>Type:</strong> {job.panelType}</p>
                            <p className="text-sm"><strong>Span:</strong> {job.dimensions}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm"><strong>Progress:</strong> {job.completed}/{job.quantity}</p>
                            <p className="text-sm"><strong>Form:</strong> {job.formId}</p>
                            <p className="text-sm"><strong>Crew:</strong> {job.crew}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-orange-600 h-2 rounded-full" 
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
                            <p className="text-sm"><strong>Due:</strong> {job.dueDate}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="flexicore-forms">
          <Card>
            <CardHeader>
              <CardTitle>Flexicore Forms Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "FL12x24", quantity: 20, type: "12x24" },
                  { name: "FL8x24", quantity: 20, type: "8x24" },
                  { name: "FL12x16", quantity: 3, type: "12x16" },
                  { name: "FL8x16", quantity: 3, type: "8x16" }
                ].map((form) => {
                  const assignedJob = flexicoreJobs.find(job => job.formId === form.name);
                  
                  return (
                    <Card key={form.name} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{form.name}</h4>
                          <Badge variant={assignedJob ? "secondary" : "default"}>
                            {assignedJob ? "In Use" : "Available"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Size: {form.type} | Qty: {form.quantity}
                        </p>
                        {assignedJob ? (
                          <div className="text-sm text-gray-600 mt-2">
                            <p>Job #{assignedJob.shorthand}</p>
                            <p>{assignedJob.project}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 mt-2">Ready for assignment</p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flexicore-controls">
          <Card>
            <CardHeader>
              <CardTitle>Flexicore Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Start Flexicore Pour
              </Button>
              <Button variant="outline" className="w-full">
                Bed Preparation
              </Button>
              <Button variant="outline" className="w-full">
                Reinforcement Setup
              </Button>
              <Button variant="outline" className="w-full">
                Stress Monitoring
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryTracker department="flexicore" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlexicoreProduction;
