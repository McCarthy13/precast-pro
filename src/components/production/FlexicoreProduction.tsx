
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory } from "lucide-react";
import DayView from "./DayView";
import { flexicoreForms } from "@/data/productionForms";
import InventoryTracker from "./InventoryTracker";
import FlexicoreProductionQueue from "./flexicore/FlexicoreProductionQueue";
import FlexicoreFormsStatus from "./flexicore/FlexicoreFormsStatus";
import FlexicoreControls from "./flexicore/FlexicoreControls";

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
          <FlexicoreProductionQueue jobs={flexicoreJobs} />
        </TabsContent>

        <TabsContent value="flexicore-forms">
          <FlexicoreFormsStatus jobs={flexicoreJobs} />
        </TabsContent>

        <TabsContent value="flexicore-controls">
          <FlexicoreControls />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryTracker department="flexicore" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlexicoreProduction;
