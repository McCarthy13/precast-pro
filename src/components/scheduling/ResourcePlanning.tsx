
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Wrench, Truck, HardHat } from "lucide-react";

const ResourcePlanning = () => {
  const resources = [
    {
      type: "Production Crew",
      total: 24,
      assigned: 20,
      available: 4,
      utilization: 83,
      icon: Users
    },
    {
      type: "Equipment",
      total: 12,
      assigned: 10,
      available: 2,
      utilization: 83,
      icon: Wrench
    },
    {
      type: "Delivery Trucks",
      total: 8,
      assigned: 6,
      available: 2,
      utilization: 75,
      icon: Truck
    },
    {
      type: "Crane Operators",
      total: 6,
      assigned: 5,
      available: 1,
      utilization: 83,
      icon: HardHat
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => {
          const IconComponent = resource.icon;
          return (
            <Card key={resource.type}>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <IconComponent className="h-5 w-5 mr-2 text-blue-600" />
                  {resource.type}
                </CardTitle>
                <CardDescription>
                  Resource allocation and utilization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Utilization</span>
                    <Badge variant="outline">{resource.utilization}%</Badge>
                  </div>
                  <Progress value={resource.utilization} className="h-2" />
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{resource.total}</p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{resource.assigned}</p>
                      <p className="text-xs text-gray-500">Assigned</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">{resource.available}</p>
                      <p className="text-xs text-gray-500">Available</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ResourcePlanning;
