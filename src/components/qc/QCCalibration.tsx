
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Calendar, Settings } from "lucide-react";

const QCCalibration = () => {
  const equipmentRecords = [
    {
      id: "EQ-001",
      equipment: "Compression Machine #1",
      lastCalibration: "2024-01-15",
      nextDue: "2024-07-15",
      status: "current",
      technician: "John Smith"
    },
    {
      id: "EQ-002",
      equipment: "Scale #3",
      lastCalibration: "2023-12-20",
      nextDue: "2024-06-20",
      status: "due_soon",
      technician: "Sarah Johnson"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-green-100 text-green-800";
      case "due_soon":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Calibration Records & Calendar</h2>
          <p className="text-gray-600">Equipment calibration tracking for compression machines, scales, meters, and testing equipment</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Record Calibration
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search calibration records..."
          className="pl-10"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Equipment Calibration Records
          </CardTitle>
          <CardDescription>Calibration tracking for all QC testing equipment</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment ID</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Last Calibration</TableHead>
                <TableHead>Next Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Technician</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipmentRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>{record.equipment}</TableCell>
                  <TableCell>{record.lastCalibration}</TableCell>
                  <TableCell>{record.nextDue}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.technician}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QCCalibration;
