
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, FileText, Plus, Calendar } from "lucide-react";

const QCAudits = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">QC Audits</h2>
          <p className="text-gray-600">PCI, QSM, and internal audit records with nonconformance tracking</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Audit
        </Button>
      </div>

      <Tabs defaultValue="pci-audits" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pci-audits">PCI Audits</TabsTrigger>
          <TabsTrigger value="qsm-audits">QSM Audits</TabsTrigger>
          <TabsTrigger value="plant-audits">Plant Audits</TabsTrigger>
        </TabsList>

        <TabsContent value="pci-audits">
          <Card>
            <CardHeader>
              <CardTitle>PCI Audits</CardTitle>
              <CardDescription>Precast/Prestressed Concrete Institute audit records</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">PCI audit dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qsm-audits">
          <Card>
            <CardHeader>
              <CardTitle>QSM Audits</CardTitle>
              <CardDescription>Quality System Manual internal audits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">QSM audit tracking coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plant-audits">
          <Card>
            <CardHeader>
              <CardTitle>Plant Audits</CardTitle>
              <CardDescription>Internal plant audit records and findings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Plant audit management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QCAudits;
