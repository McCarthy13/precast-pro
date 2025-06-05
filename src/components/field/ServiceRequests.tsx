
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wrench, Clock, AlertTriangle, Plus } from "lucide-react";

const ServiceRequests = () => {
  const requests = [
    {
      id: "SR-001",
      project: "Downtown Office Complex",
      issue: "Minor crack in panel joint",
      priority: "medium",
      status: "assigned",
      requestDate: "2024-01-16",
      assignedTo: "Team Alpha"
    },
    {
      id: "SR-002",
      project: "Industrial Warehouse", 
      issue: "Sealant replacement needed",
      priority: "low",
      status: "completed",
      requestDate: "2024-01-14",
      assignedTo: "Team Beta"
    },
    {
      id: "SR-003",
      project: "Retail Center",
      issue: "Panel alignment issue",
      priority: "high",
      status: "pending",
      requestDate: "2024-01-17",
      assignedTo: "Unassigned"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Service Requests</h3>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Wrench className="h-5 w-5 text-orange-600" />
                  <div>
                    <h4 className="font-medium">{request.id} - {request.issue}</h4>
                    <p className="text-sm text-gray-600">{request.project} • {request.requestDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={
                    request.priority === 'high' ? 'bg-red-100 text-red-800' :
                    request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {request.priority}
                  </Badge>
                  <Badge variant="outline">{request.status}</Badge>
                  <span className="text-sm text-gray-600">{request.assignedTo}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceRequests;
