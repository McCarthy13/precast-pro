
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter } from "lucide-react";
import JobTable from "./wall-panels/JobTable";
import QualityControlSection from "./wall-panels/QualityControlSection";
import ProductionPlanningForm from "./wall-panels/ProductionPlanningForm";
import InventoryTracker from "./InventoryTracker";

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
              <JobTable jobs={activeJobs} />
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
