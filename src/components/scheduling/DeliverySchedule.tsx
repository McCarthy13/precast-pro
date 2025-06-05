
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, MapPin, Clock, Route } from "lucide-react";

const DeliverySchedule = () => {
  const deliveries = [
    {
      id: "DEL-001",
      project: "Project Alpha",
      destination: "Downtown Construction Site",
      driver: "Mike Johnson",
      departure: "08:00",
      arrival: "09:30",
      status: "in-transit",
      items: 12
    },
    {
      id: "DEL-002",
      project: "Project Beta",
      destination: "North Industrial Park",
      driver: "Sarah Wilson",
      departure: "10:00",
      arrival: "11:15",
      status: "scheduled",
      items: 8
    },
    {
      id: "DEL-003",
      project: "Project Gamma",
      destination: "Suburban Office Complex",
      driver: "Tom Brown",
      departure: "13:00",
      arrival: "14:45",
      status: "scheduled",
      items: 16
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Delivery Schedule</CardTitle>
            <CardDescription>
              Today's delivery routes and truck assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-medium">{delivery.project}</TableCell>
                    <TableCell>{delivery.destination}</TableCell>
                    <TableCell>{delivery.driver}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Depart: {delivery.departure}</div>
                        <div>Arrive: {delivery.arrival}</div>
                      </div>
                    </TableCell>
                    <TableCell>{delivery.items} pieces</TableCell>
                    <TableCell>
                      <Badge 
                        className={delivery.status === 'in-transit' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}
                      >
                        {delivery.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <MapPin className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Route className="h-4 w-4" />
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
            <CardTitle>Delivery Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
              <Truck className="h-4 w-4 mr-2" />
              Schedule Delivery
            </Button>
            <Button variant="outline" className="w-full">
              <Route className="h-4 w-4 mr-2" />
              Optimize Routes
            </Button>
            <Button variant="outline" className="w-full">
              <MapPin className="h-4 w-4 mr-2" />
              Track Vehicles
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliverySchedule;
