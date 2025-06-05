
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
  const flexicoreJobs = [
    {
      id: "FC-001",
      project: "Shopping Center",
      panelType: "8-inch Flexicore",
      dimensions: "32 ft",
      quantity: 24,
      completed: 20,
      status: "in-progress",
      crew: "Bed A",
      startDate: "2024-06-15",
      dueDate: "2024-06-22",
      priority: "medium",
      formId: "12x24-1"
    },
    {
      id: "FC-002",
      project: "Hospital Wing",
      panelType: "10-inch Flexicore",
      dimensions: "28 ft",
      quantity: 18,
      completed: 18,
      status: "completed",
      crew: "Bed B",
      startDate: "2024-06-10",
      dueDate: "2024-06-17",
      priority: "high",
      formId: "8x24-2"
    },
    {
      id: "FC-003",
      project: "School Addition",
      panelType: "6-inch Flexicore",
      dimensions: "24 ft",
      quantity: 32,
      completed: 8,
      status: "in-progress",
      crew: "Bed C",
      startDate: "2024-06-20",
      dueDate: "2024-06-27",
      priority: "low",
      formId: "12x16-1"
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
          <TabsTrigger value="flexicore-controls">Flexicore Controls</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="day-view">
          <DayView forms={flexicoreForms} department="flexicore" />
        </TabsContent>

        <TabsContent value="production-queue">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Flexicore Production Queue</CardTitle>
                  <CardDescription>Flexible concrete deck production</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job ID</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Span</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Bed</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {flexicoreJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.id}</TableCell>
                          <TableCell>{job.project}</TableCell>
                          <TableCell>{job.panelType}</TableCell>
                          <TableCell>{job.dimensions}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{job.completed}/{job.quantity}</span>
                                <span>{Math.round((job.completed / job.quantity) * 100)}%</span>
                              </div>
                              <Progress value={(job.completed / job.quantity) * 100} className="h-2" />
                            </div>
                          </TableCell>
                          <TableCell>{job.crew}</TableCell>
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
            </div>
          </div>
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
