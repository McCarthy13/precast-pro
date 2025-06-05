
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, CheckCircle, Clock } from "lucide-react";

const DoubleTeesProduction = () => {
  const doubleTeeJobs = [
    {
      id: "DT-001",
      project: "Warehouse Complex",
      teeType: "24-inch Double Tee",
      span: "60 ft",
      quantity: 12,
      completed: 8,
      status: "in-progress",
      bed: "Long Bed 1"
    },
    {
      id: "DT-002",
      project: "Manufacturing Plant",
      teeType: "32-inch Double Tee",
      span: "80 ft",
      quantity: 8,
      completed: 8,
      status: "completed",
      bed: "Long Bed 2"
    },
    {
      id: "DT-003",
      project: "Distribution Center",
      teeType: "28-inch Double Tee",
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Double Tee Production Queue</CardTitle>
            <CardDescription>Large span double tee production</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Span</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Bed</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doubleTeeJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.id}</TableCell>
                    <TableCell>{job.project}</TableCell>
                    <TableCell>{job.teeType}</TableCell>
                    <TableCell>{job.span}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{job.completed}/{job.quantity}</span>
                          <span>{Math.round((job.completed / job.quantity) * 100)}%</span>
                        </div>
                        <Progress value={(job.completed / job.quantity) * 100} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>{job.bed}</TableCell>
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
    </div>
  );
};

export default DoubleTeesProduction;
