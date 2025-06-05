
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Filter, AlertCircle, CheckCircle, Clock } from "lucide-react";

const WallPanelDetails = () => {
  const activeJobs = [
    {
      id: "WP-2024-001",
      project: "Office Complex Alpha",
      panelType: "Architectural",
      dimensions: "10' x 20'",
      quantity: 24,
      completed: 18,
      status: "in-progress",
      crew: "Team A",
      startDate: "2024-06-01",
      dueDate: "2024-06-10",
      priority: "high",
      concreteStrength: "4000 PSI",
      embedments: ["Electrical conduits", "HVAC brackets"],
      finishType: "Smooth",
      reinforcement: "6x6 WWF"
    },
    {
      id: "WP-2024-002", 
      project: "Warehouse Beta",
      panelType: "Standard",
      dimensions: "8' x 16'",
      quantity: 36,
      completed: 36,
      status: "completed",
      crew: "Team B",
      startDate: "2024-05-28",
      dueDate: "2024-06-08",
      priority: "medium",
      concreteStrength: "3500 PSI",
      embedments: ["Lifting inserts"],
      finishType: "Standard",
      reinforcement: "4x4 WWF"
    },
    {
      id: "WP-2024-003",
      project: "School Building",
      panelType: "Insulated",
      dimensions: "12' x 24'",
      quantity: 48,
      completed: 0,
      status: "scheduled",
      crew: "Team C",
      startDate: "2024-06-12",
      dueDate: "2024-06-20",
      priority: "low",
      concreteStrength: "4500 PSI",
      embedments: ["Window frames", "Insulation anchors"],
      finishType: "Textured",
      reinforcement: "8x8 WWF"
    }
  ];

  const qualityCheckpoints = [
    "Concrete strength verification",
    "Reinforcement placement check",
    "Embedment positioning",
    "Surface finish inspection",
    "Dimensional accuracy",
    "Lifting insert installation"
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "quality-hold":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Wall Panel Production</h3>
          <p className="text-gray-600">Architectural and standard wall panel manufacturing</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          New Panel Job
        </Button>
      </div>

      <Tabs defaultValue="active-jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active-jobs">Active Jobs</TabsTrigger>
          <TabsTrigger value="quality-control">Quality Control</TabsTrigger>
          <TabsTrigger value="production-planning">Production Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="active-jobs">
          <Card>
            <CardHeader>
              <CardTitle>Current Wall Panel Jobs</CardTitle>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search jobs..." className="pl-10" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Type & Specs</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Crew</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{job.project}</p>
                          <Badge variant="outline" className="text-xs">
                            {job.priority} priority
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p><strong>{job.panelType}</strong></p>
                          <p>{job.dimensions}</p>
                          <p className="text-gray-500">{job.concreteStrength}</p>
                        </div>
                      </TableCell>
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
                      <TableCell>{job.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(job.status)}
                          <Badge variant="outline">{job.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality-control">
          <Card>
            <CardHeader>
              <CardTitle>Wall Panel Quality Control</CardTitle>
              <CardDescription>Quality checkpoints and inspection protocols</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Quality Checkpoints</h4>
                  <div className="space-y-2">
                    {qualityCheckpoints.map((checkpoint, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{checkpoint}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Recent Quality Issues</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="font-medium text-sm">Concrete strength below spec</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Job WP-2024-001 - Panel #15</p>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="font-medium text-sm">Embedment misalignment</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Job WP-2024-003 - Panel #8</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="production-planning">
          <Card>
            <CardHeader>
              <CardTitle>Production Planning & Scheduling</CardTitle>
              <CardDescription>Plan upcoming wall panel production</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input id="project-name" placeholder="Enter project name" />
                  
                  <Label htmlFor="panel-type">Panel Type</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Architectural</option>
                    <option>Standard</option>
                    <option>Insulated</option>
                    <option>Load-bearing</option>
                  </select>
                  
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="Number of panels" />
                  
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input id="dimensions" placeholder="Length x Width x Thickness" />
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="concrete-strength">Concrete Strength (PSI)</Label>
                  <Input id="concrete-strength" placeholder="e.g., 4000" />
                  
                  <Label htmlFor="finish-type">Finish Type</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Smooth</option>
                    <option>Textured</option>
                    <option>Exposed Aggregate</option>
                    <option>Sandblasted</option>
                  </select>
                  
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input id="due-date" type="date" />
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Schedule Production
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WallPanelDetails;
