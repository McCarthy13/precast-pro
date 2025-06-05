
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Factory, Settings } from "lucide-react";
import DayView from "./DayView";
import { precastForms } from "@/data/productionForms";

const PrecastDetails = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Precast Production</h3>
          <p className="text-gray-600">Beams, panels, and structural elements</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Factory className="h-4 w-4 mr-2" />
          Schedule Production
        </Button>
      </div>

      <Tabs defaultValue="day-view" className="space-y-4">
        <TabsList>
          <TabsTrigger value="day-view">Day View</TabsTrigger>
          <TabsTrigger value="weekly-schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="form-management">Form Management</TabsTrigger>
        </TabsList>

        <TabsContent value="day-view">
          <DayView forms={precastForms} department="precast" />
        </TabsContent>

        <TabsContent value="weekly-schedule">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Production Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Weekly schedule view coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form-management">
          <Card>
            <CardHeader>
              <CardTitle>Form Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {precastForms.map((form) => (
                  <Card key={form.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{form.name}</h4>
                        <Badge variant={form.isActive ? "default" : "secondary"}>
                          {form.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Capacity: {form.capacity} pieces</p>
                      <p className="text-sm text-gray-600">Scheduled: {form.scheduledJobs.length} pieces</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrecastDetails;
