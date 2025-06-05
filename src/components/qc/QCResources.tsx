
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, BookOpen, FileText, Download } from "lucide-react";

const QCResources = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">QC Resources</h2>
          <p className="text-gray-600">PCI Manuals, ACI Test Procedures, ASTM Standards, and industry resources</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search resources and standards..."
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="pci-manuals" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pci-manuals">PCI Manuals</TabsTrigger>
          <TabsTrigger value="aci-procedures">ACI Procedures</TabsTrigger>
          <TabsTrigger value="astm-standards">ASTM Standards</TabsTrigger>
          <TabsTrigger value="other-resources">Other Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="pci-manuals">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                PCI Manuals
              </CardTitle>
              <CardDescription>Precast/Prestressed Concrete Institute manuals and guidelines</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">PCI manual library coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aci-procedures">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                ACI Test Procedures
              </CardTitle>
              <CardDescription>American Concrete Institute test procedures and methods</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">ACI procedure library coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="astm-standards">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                ASTM Standards
              </CardTitle>
              <CardDescription>ASTM International standards and specifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">ASTM standards library coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other-resources">
          <Card>
            <CardHeader>
              <CardTitle>Other Industry Resources</CardTitle>
              <CardDescription>Additional resources and references</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Additional resources coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QCResources;
