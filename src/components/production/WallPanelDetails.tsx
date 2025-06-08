
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter } from "lucide-react";
import JobTable from "./wall-panels/JobTable";
import QualityControlSection from "./wall-panels/QualityControlSection";
import ProductionPlanningForm from "./wall-panels/ProductionPlanningForm";
import InventoryTracker from "./InventoryTracker";
import { Badge } from "@/components/ui/badge";

const WallPanelDetails = () => {
  // Updated to follow proper Job # and Mark # format
  const activeJobs = [
    {
      jobNumber: "25-5017",
      shorthand: "5017", 
      project: "Office Complex Alpha",
      panelType: "Architectural",
      dimensions: "10' x 20'",
      marks: ["W0001", "W0002", "W0003"], // Wall Panel marks
      form: "WP1",
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
      jobNumber: "25-5018",
      shorthand: "5018",
      project: "Warehouse Beta", 
      panelType: "Standard",
      dimensions: "8' x 16'",
      marks: ["W0004", "W0005", "W0006"],
      form: "WP2",
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
      jobNumber: "25-5019",
      shorthand: "5019",
      project: "School Building",
      panelType: "Insulated", 
      dimensions: "12' x 24'",
      marks: ["W0007", "W0008", "W0009"],
      form: "WP3",
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
          <TabsTrigger value="forms-status">Forms Status</TabsTrigger>
          <TabsTrigger value="quality-control">Quality Control</TabsTrigger>
          <TabsTrigger value="production-planning">Production Planning</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
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
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <Card key={job.jobNumber} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">Job #{job.shorthand}</h4>
                          <p className="text-sm text-gray-600">Full: {job.jobNumber}</p>
                        </div>
                        <Badge variant={
                          job.status === "completed" ? "default" :
                          job.status === "in-progress" ? "secondary" : "outline"
                        }>
                          {job.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm"><strong>Project:</strong> {job.project}</p>
                          <p className="text-sm"><strong>Form:</strong> {job.form}</p>
                          <p className="text-sm"><strong>Panel Type:</strong> {job.panelType}</p>
                          <p className="text-sm"><strong>Dimensions:</strong> {job.dimensions}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm"><strong>Progress:</strong> {job.completed}/{job.quantity}</p>
                          <p className="text-sm"><strong>Crew:</strong> {job.crew}</p>
                          <p className="text-sm"><strong>Priority:</strong> {job.priority}</p>
                          <p className="text-sm"><strong>Due:</strong> {job.dueDate}</p>
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
                          <p className="text-sm"><strong>Concrete:</strong> {job.concreteStrength}</p>
                          <p className="text-sm"><strong>Finish:</strong> {job.finishType}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms-status">
          <Card>
            <CardHeader>
              <CardTitle>Wall Panel Forms Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 24 }, (_, i) => {
                  const formName = `WP${i + 1}`;
                  const assignedJob = activeJobs.find(job => job.form === formName);
                  
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
                            <p>{assignedJob.project}</p>
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

        <TabsContent value="quality-control">
          <QualityControlSection qualityCheckpoints={qualityCheckpoints} />
        </TabsContent>

        <TabsContent value="production-planning">
          <ProductionPlanningForm />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryTracker department="wall-panels" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WallPanelDetails;
