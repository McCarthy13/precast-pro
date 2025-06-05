
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, CheckCircle, Clock } from "lucide-react";

const PrecastProduction = () => {
  const precastJobs = [
    {
      id: "PC-001",
      project: "Bridge Construction",
      elementType: "Beams",
      quantity: 12,
      completed: 8,
      status: "in-progress",
      crew: "Precast Team A",
      dueDate: "2024-06-12"
    },
    {
      id: "PC-002",
      project: "Stadium Project",
      elementType: "Columns",
      quantity: 24,
      completed: 24,
      status: "completed",
      crew: "Precast Team B",
      dueDate: "2024-06-05"
    },
    {
      id: "PC-003",
      project: "Parking Garage",
      elementType: "Slabs",
      quantity: 18,
      completed: 4,
      status: "in-progress",
      crew: "Precast Team C",
      dueDate: "2024-06-18"
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Precast Production Queue</CardTitle>
            <CardDescription>Current precast element manufacturing</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Element Type</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Crew</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {precastJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.id}</TableCell>
                    <TableCell>{job.project}</TableCell>
                    <TableCell>{job.elementType}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Precast Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Start Precast Job
            </Button>
            <Button variant="outline" className="w-full">
              Concrete Testing
            </Button>
            <Button variant="outline" className="w-full">
              Curing Schedule
            </Button>
            <Button variant="outline" className="w-full">
              Element Tracking
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrecastProduction;
