
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, CheckCircle, Clock } from "lucide-react";

const WallPanelsProduction = () => {
  const wallPanelJobs = [
    {
      id: "WP-001",
      project: "Office Complex Alpha",
      panelType: "Architectural",
      quantity: 24,
      completed: 18,
      status: "in-progress",
      crew: "Team A",
      dueDate: "2024-06-10"
    },
    {
      id: "WP-002", 
      project: "Warehouse Beta",
      panelType: "Standard",
      quantity: 36,
      completed: 36,
      status: "completed",
      crew: "Team B",
      dueDate: "2024-06-08"
    },
    {
      id: "WP-003",
      project: "School Building",
      panelType: "Insulated",
      quantity: 48,
      completed: 0,
      status: "scheduled",
      crew: "Team C",
      dueDate: "2024-06-15"
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
            <CardTitle>Wall Panel Production Queue</CardTitle>
            <CardDescription>Current and upcoming wall panel projects</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Crew</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wallPanelJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.id}</TableCell>
                    <TableCell>{job.project}</TableCell>
                    <TableCell>{job.panelType}</TableCell>
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
            <CardTitle>Wall Panel Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Start New Panel Job
            </Button>
            <Button variant="outline" className="w-full">
              Panel Quality Check
            </Button>
            <Button variant="outline" className="w-full">
              View Panel Specifications
            </Button>
            <Button variant="outline" className="w-full">
              Production Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WallPanelsProduction;
