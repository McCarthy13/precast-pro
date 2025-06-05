
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, RefreshCw, Download } from "lucide-react";

const QCBatchReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Batch Reports</h2>
          <p className="text-gray-600">Integration with batch software systems across all production departments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync Reports
        </Button>
      </div>

      <Tabs defaultValue="precast" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="precast">Precast</TabsTrigger>
          <TabsTrigger value="extruded">Extruded</TabsTrigger>
          <TabsTrigger value="flexicore">Flexicore</TabsTrigger>
          <TabsTrigger value="wall-panels">Wall Panels</TabsTrigger>
        </TabsList>

        <TabsContent value="precast">
          <Card>
            <CardHeader>
              <CardTitle>Precast Batch Reports</CardTitle>
              <CardDescription>Automated batch data from precast production</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Precast batch integration coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extruded">
          <Card>
            <CardHeader>
              <CardTitle>Extruded Batch Reports</CardTitle>
              <CardDescription>Automated batch data from extruded production</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Extruded batch integration coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flexicore">
          <Card>
            <CardHeader>
              <CardTitle>Flexicore Batch Reports</CardTitle>
              <CardDescription>Automated batch data from flexicore production</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Flexicore batch integration coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wall-panels">
          <Card>
            <CardHeader>
              <CardTitle>Wall Panel Batch Reports</CardTitle>
              <CardDescription>Automated batch data from wall panel production</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Wall panel batch integration coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QCBatchReports;
