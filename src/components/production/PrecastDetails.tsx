

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Factory } from "lucide-react";
import DayView from "./DayView";
import { precastForms } from "@/data/productionForms";
import InventoryTracker from "./InventoryTracker";

const PrecastDetails = () => {
  // Sample jobs following proper Job # format (25-5XXX for 2025)
  const activeJobs = [
    {
      jobNumber: "25-5014",
      shorthand: "5014",
      project: "Office Complex Alpha",
      marks: ["B0001", "B0002", "C0003", "C0004"], // Beam and Column marks
      form: "BL1",
      status: "in-progress",
      crew: "Team A"
    },
    {
      jobNumber: "25-5015", 
      shorthand: "5015",
      project: "Warehouse Beta",
      marks: ["B0005", "B0006", "B0007"],
      form: "BL2", 
      status: "scheduled",
      crew: "Team B"
    },
    {
      jobNumber: "25-5016",
      shorthand: "5016", 
      project: "School Building",
      marks: ["C0008", "C0009", "M0001"], // Column and Stadia/Riser marks
      form: "COL",
      status: "completed",
      crew: "Team C"
    }
  ];

  // Precast forms with their actual names
  const precastFormsList = ["BL1", "BL2", "BL3", "BL6", "COL", "STAD", "EPB-E", "EPB-W", "WPB-E", "WPB-W", "MS"];

  const getFormTypeDescription = (formName: string) => {
    if (formName.startsWith('BL')) return 'Beam Line';
    if (formName === 'COL') return 'Column';
    if (formName === 'STAD') return 'Stadia/Riser';
    if (formName.includes('PB')) return 'Panel Bed';
    return 'Miscellaneous';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Precast Production</h3>
          <p className="text-gray-600">Beams, columns, and structural elements</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Factory className="h-4 w-4 mr-2" />
          Schedule Production
        </Button>
      </div>

      <Tabs defaultValue="day-view" className="space-y-4">
        <TabsList>
          <TabsTrigger value="day-view">Day View</TabsTrigger>
          <TabsTrigger value="active-jobs">Active Jobs</TabsTrigger>
          <TabsTrigger value="form-management">Form Management</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="day-view">
          <DayView forms={precastForms} department="precast" />
        </TabsContent>

        <TabsContent value="active-jobs">
          <Card>
            <CardHeader>
              <CardTitle>Current Precast Jobs</CardTitle>
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
                      
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Project:</strong> {job.project}</p>
                        <p className="text-sm"><strong>Form:</strong> {job.form}</p>
                        <p className="text-sm"><strong>Crew:</strong> {job.crew}</p>
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form-management">
          <Card>
            <CardHeader>
              <CardTitle>Precast Forms Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {precastFormsList.map((formName) => (
                  <Card key={formName} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{formName}</h4>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Form Type: {getFormTypeDescription(formName)}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        Current Job: {activeJobs.find(j => j.form === formName)?.shorthand || 'Available'}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryTracker department="precast" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrecastDetails;

