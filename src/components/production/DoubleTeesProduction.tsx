
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, CheckCircle, Clock } from "lucide-react";
import InventoryTracker from "./InventoryTracker";

const DoubleTeesProduction = () => {
  // Updated jobs to follow proper Job # and Mark # format
  const doubleTeeJobs = [
    {
      jobNumber: "25-5026",
      shorthand: "5026",
      project: "Warehouse Complex",
      teeType: "24-inch Double Tee",
      marks: ["T0001", "T0002"], // Double Tee marks
      span: "60 ft",
      quantity: 12,
      completed: 8,
      status: "in-progress",
      bed: "Long Bed 1"
    },
    {
      jobNumber: "25-5027",
      shorthand: "5027", 
      project: "Manufacturing Plant",
      teeType: "32-inch Double Tee",
      marks: ["T0003", "T0004"],
      span: "80 ft",
      quantity: 8,
      completed: 8,
      status: "completed",
      bed: "Long Bed 2"
    },
    {
      jobNumber: "25-5028",
      shorthand: "5028",
      project: "Distribution Center",
      teeType: "28-inch Double Tee",
      marks: ["T0005", "T0006"],
      span: "70 ft", 
      quantity: 16,
      completed: 2,
      status: "in-progress",
      bed: "Long Bed 3"
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
          <h3 className="text-2xl font-bold">Double Tee Production</h3>
          <p className="text-gray-600">Large span double tee production</p>
        </div>
      </div>

      <Tabs defaultValue="production-queue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="production-queue">Production Queue</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="production-queue">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Double Tee Production Queue</CardTitle>
                <CardDescription>Large span double tee production</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doubleTeeJobs.map((job) => (
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-sm"><strong>Project:</strong> {job.project}</p>
                            <p className="text-sm"><strong>Type:</strong> {job.teeType}</p>
                            <p className="text-sm"><strong>Span:</strong> {job.span}</p>
                            <p className="text-sm"><strong>Bed:</strong> {job.bed}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm"><strong>Progress:</strong> {job.completed}/{job.quantity}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-red-600 h-2 rounded-full" 
                                style={{ width: `${(job.completed / job.quantity) * 100}%` }}
                              ></div>
                            </div>
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

            <Card>
              <CardHeader>
                <CardTitle>Double Tee Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Start Double Tee Pour
                </Button>
                <Button variant="outline" className="w-full">
                  Pre-stress Setup
                </Button>
                <Button variant="outline" className="w-full">
                  Strand Tensioning
                </Button>
                <Button variant="outline" className="w-full">
                  Release Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="controls">
          <Card>
            <CardHeader>
              <CardTitle>Double Tee Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Start Double Tee Pour
              </Button>
              <Button variant="outline" className="w-full">
                Pre-stress Setup
              </Button>
              <Button variant="outline" className="w-full">
                Strand Tensioning
              </Button>
              <Button variant="outline" className="w-full">
                Release Schedule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryTracker department="double-tees" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoubleTeesProduction;
