
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Play, Pause, CheckCircle } from "lucide-react";

const ProductionSchedule = () => {
  const scheduleItems = [
    {
      id: "PROD-001",
      product: "Wall Panel Series A",
      project: "Project Alpha",
      quantity: 24,
      startTime: "06:00",
      endTime: "14:00",
      status: "in-progress",
      crew: "Team A"
    },
    {
      id: "PROD-002",
      product: "Precast Beams",
      project: "Project Beta",
      quantity: 12,
      startTime: "14:00",
      endTime: "22:00",
      status: "scheduled",
      crew: "Team B"
    },
    {
      id: "PROD-003",
      product: "Foundation Elements",
      project: "Project Gamma",
      quantity: 8,
      startTime: "22:00",
      endTime: "06:00",
      status: "scheduled",
      crew: "Team C"
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
            <CardTitle>Production Schedule</CardTitle>
            <CardDescription>
              Today's production lineup and crew assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Crew</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduleItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.project}</TableCell>
                    <TableCell>{item.quantity} pieces</TableCell>
                    <TableCell>{item.startTime} - {item.endTime}</TableCell>
                    <TableCell>{item.crew}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        <Badge variant="outline">{item.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Pause className="h-4 w-4" />
                        </Button>
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
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule New Production
            </Button>
            <Button variant="outline" className="w-full">
              <Clock className="h-4 w-4 mr-2" />
              Adjust Time Slots
            </Button>
            <Button variant="outline" className="w-full">
              View Weekly Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductionSchedule;
