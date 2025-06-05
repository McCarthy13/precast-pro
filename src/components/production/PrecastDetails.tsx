
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertTriangle, Thermometer, Zap } from "lucide-react";

const PrecastDetails = () => {
  const precastJobs = [
    {
      id: "PC-2024-001",
      project: "Bridge Construction",
      elementType: "I-Beams",
      specifications: "36\" deep x 60' long",
      quantity: 12,
      completed: 8,
      status: "curing",
      strandTension: "270 ksi",
      concreteStrength: "6000 PSI",
      releaseStrength: "4500 PSI",
      curingMethod: "Steam",
      expectedRelease: "2024-06-12"
    },
    {
      id: "PC-2024-002",
      project: "Stadium Project",
      elementType: "Columns",
      specifications: "24\" x 24\" x 30'",
      quantity: 24,
      completed: 24,
      status: "released",
      strandTension: "270 ksi",
      concreteStrength: "5000 PSI",
      releaseStrength: "4000 PSI",
      curingMethod: "Ambient",
      expectedRelease: "2024-06-05"
    }
  ];

  const curingSchedule = [
    { time: "0-2 hours", temperature: "140°F", humidity: "95%", status: "active" },
    { time: "2-6 hours", temperature: "160°F", humidity: "90%", status: "completed" },
    { time: "6-12 hours", temperature: "180°F", humidity: "85%", status: "scheduled" },
    { time: "12-18 hours", temperature: "160°F", humidity: "80%", status: "scheduled" }
  ];

  const strandLayout = [
    { layer: "Bottom", strands: 12, diameter: "0.5\"", position: "2\" from bottom" },
    { layer: "Middle", strands: 8, diameter: "0.5\"", position: "18\" from bottom" },
    { layer: "Top", strands: 6, diameter: "0.5\"", position: "34\" from bottom" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Precast Production</h3>
          <p className="text-gray-600">Prestressed concrete element manufacturing</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          New Precast Element
        </Button>
      </div>

      <Tabs defaultValue="active-jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active-jobs">Active Jobs</TabsTrigger>
          <TabsTrigger value="curing-schedule">Curing Schedule</TabsTrigger>
          <TabsTrigger value="strand-management">Strand Management</TabsTrigger>
          <TabsTrigger value="quality-testing">Quality Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="active-jobs">
          <Card>
            <CardHeader>
              <CardTitle>Current Precast Elements</CardTitle>
              <CardDescription>Prestressed concrete production status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Element Type</TableHead>
                    <TableHead>Specifications</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Concrete Strength</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expected Release</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {precastJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{job.elementType}</p>
                          <p className="text-sm text-gray-600">{job.project}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{job.specifications}</p>
                          <p className="text-gray-500">Tension: {job.strandTension}</p>
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
                      <TableCell>
                        <Badge variant="outline">
                          {job.concreteStrength}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {job.status === "released" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : job.status === "curing" ? (
                            <Thermometer className="h-4 w-4 text-orange-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-blue-600" />
                          )}
                          <Badge variant="outline">{job.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{job.expectedRelease}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curing-schedule">
          <Card>
            <CardHeader>
              <CardTitle>Steam Curing Schedule</CardTitle>
              <CardDescription>Temperature and humidity control for optimal strength development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {curingSchedule.map((phase, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    phase.status === "active" ? "bg-blue-50 border-blue-200" :
                    phase.status === "completed" ? "bg-green-50 border-green-200" :
                    "bg-gray-50 border-gray-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {phase.status === "active" ? (
                          <Thermometer className="h-5 w-5 text-blue-600" />
                        ) : phase.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-gray-600" />
                        )}
                        <div>
                          <p className="font-medium">{phase.time}</p>
                          <p className="text-sm text-gray-600">
                            Temperature: {phase.temperature} | Humidity: {phase.humidity}
                          </p>
                        </div>
                      </div>
                      <Badge variant={
                        phase.status === "active" ? "default" :
                        phase.status === "completed" ? "outline" : "secondary"
                      }>
                        {phase.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strand-management">
          <Card>
            <CardHeader>
              <CardTitle>Prestressing Strand Layout</CardTitle>
              <CardDescription>Strand positioning and tensioning configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Strand Configuration</h4>
                    <div className="space-y-3">
                      {strandLayout.map((layer, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{layer.layer} Layer</p>
                              <p className="text-sm text-gray-600">{layer.position}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{layer.strands} strands</p>
                              <p className="text-sm text-gray-600">{layer.diameter}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Tensioning Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <span>Initial Tension Applied</span>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <span>Concrete Pour Complete</span>
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <span>Awaiting Release Strength</span>
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality-testing">
          <Card>
            <CardHeader>
              <CardTitle>Quality Testing Protocols</CardTitle>
              <CardDescription>Concrete strength and prestress verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Concrete Testing</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Cylinder Break Test</span>
                        <Badge className="bg-green-100 text-green-800">5,980 PSI</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Target: 6,000 PSI</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Release Strength</span>
                        <Badge className="bg-blue-100 text-blue-800">4,520 PSI</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Target: 4,500 PSI</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Prestress Verification</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Strand Tension</span>
                        <Badge className="bg-purple-100 text-purple-800">270 ksi</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Within specification</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Elongation Check</span>
                        <Badge className="bg-green-100 text-green-800">Passed</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">2.8" measured vs 2.75" calculated</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrecastDetails;
