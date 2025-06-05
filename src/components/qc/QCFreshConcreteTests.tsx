
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Thermometer, FlaskConical, Database } from "lucide-react";

const QCFreshConcreteTests = () => {
  const freshTests = [
    {
      id: "FCT-001",
      date: "2024-01-15",
      mixDesign: "MD-001",
      batchNumber: "B-2024-0115-01",
      slump: "5.5 inches",
      airContent: "6.2%",
      temperature: "68°F",
      unitWeight: "145.2 lb/ft³",
      technician: "John Smith"
    },
    {
      id: "FCT-002",
      date: "2024-01-15",
      mixDesign: "MD-002",
      batchNumber: "B-2024-0115-02",
      slump: "4.0 inches",
      airContent: "5.8%",
      temperature: "72°F",
      unitWeight: "147.8 lb/ft³",
      technician: "Sarah Johnson"
    }
  ];

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Fresh Concrete Test Data</h2>
          <p className="text-gray-600">Record and track all fresh concrete tests, curing tanks, and neoprene pad usage</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Test Record
        </Button>
      </div>

      <Tabs defaultValue="fresh-tests" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fresh-tests" className="flex items-center">
            <FlaskConical className="h-4 w-4 mr-2" />
            Fresh Tests
          </TabsTrigger>
          <TabsTrigger value="curing-tanks" className="flex items-center">
            <Thermometer className="h-4 w-4 mr-2" />
            Curing Tanks
          </TabsTrigger>
          <TabsTrigger value="neoprene-pads" className="flex items-center">
            <Database className="h-4 w-4 mr-2" />
            Neoprene Pads
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fresh-tests" className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search fresh concrete tests..."
              className="pl-10"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fresh Concrete Test Records</CardTitle>
              <CardDescription>Historical record of all fresh concrete tests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Mix Design</TableHead>
                    <TableHead>Batch #</TableHead>
                    <TableHead>Slump</TableHead>
                    <TableHead>Air Content</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Unit Weight</TableHead>
                    <TableHead>Technician</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {freshTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.id}</TableCell>
                      <TableCell>{test.date}</TableCell>
                      <TableCell>{test.mixDesign}</TableCell>
                      <TableCell>{test.batchNumber}</TableCell>
                      <TableCell>{test.slump}</TableCell>
                      <TableCell>{test.airContent}</TableCell>
                      <TableCell>{test.temperature}</TableCell>
                      <TableCell>{test.unitWeight}</TableCell>
                      <TableCell>{test.technician}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curing-tanks" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="neoprene-pads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Neoprene Pad Usage Logs</CardTitle>
              <CardDescription>Track neoprene pad usage and replacement schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Neoprene pad usage tracking interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QCFreshConcreteTests;
