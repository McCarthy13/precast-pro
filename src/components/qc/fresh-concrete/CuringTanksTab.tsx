
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CuringTanksTab = () => {
  const curingTankRecords = [
    {
      id: "CT-001",
      tankNumber: "Tank A",
      temperature: "73°F ± 3°F",
      lastCalibration: "2024-01-01",
      status: "active",
      samplesCount: 24
    },
    {
      id: "CT-002",
      tankNumber: "Tank B", 
      temperature: "74°F ± 3°F",
      lastCalibration: "2024-01-01",
      status: "active",
      samplesCount: 18
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Curing Tank Records</CardTitle>
        <CardDescription>Monitor curing tank conditions and sample storage</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tank ID</TableHead>
              <TableHead>Tank Number</TableHead>
              <TableHead>Temperature</TableHead>
              <TableHead>Last Calibration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Samples Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {curingTankRecords.map((tank) => (
              <TableRow key={tank.id}>
                <TableCell className="font-medium">{tank.id}</TableCell>
                <TableCell>{tank.tankNumber}</TableCell>
                <TableCell>{tank.temperature}</TableCell>
                <TableCell>{tank.lastCalibration}</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">{tank.status}</Badge>
                </TableCell>
                <TableCell>{tank.samplesCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CuringTanksTab;
