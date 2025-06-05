
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const InstallationTracking = () => {
  const installations = [
    {
      project: "Downtown Office Complex",
      location: "123 Main St",
      crew: "Team Alpha",
      progress: 75,
      status: "active",
      startDate: "2024-01-15",
      estimatedCompletion: "2024-01-20"
    },
    {
      project: "Industrial Warehouse",
      location: "456 Industrial Blvd",
      crew: "Team Beta",
      progress: 100,
      status: "completed",
      startDate: "2024-01-10",
      estimatedCompletion: "2024-01-18"
    },
    {
      project: "Retail Center",
      location: "789 Commerce Dr",
      crew: "Team Gamma",
      progress: 45,
      status: "delayed",
      startDate: "2024-01-12",
      estimatedCompletion: "2024-01-25"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "active": return <Clock className="h-4 w-4 text-blue-600" />;
      case "delayed": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <MapPin className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Installation Tracking
          </CardTitle>
          <CardDescription>Monitor active installations and crew progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Crew</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Est. Completion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {installations.map((install, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{install.project}</TableCell>
                  <TableCell>{install.location}</TableCell>
                  <TableCell>{install.crew}</TableCell>
                  <TableCell>{install.progress}%</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(install.status)}
                      <Badge className={
                        install.status === 'completed' ? 'bg-green-100 text-green-800' :
                        install.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {install.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{install.startDate}</TableCell>
                  <TableCell>{install.estimatedCompletion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstallationTracking;
