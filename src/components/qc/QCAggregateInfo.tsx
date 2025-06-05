
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Database, BarChart3 } from "lucide-react";

const QCAggregateInfo = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Aggregate Information</h2>
          <p className="text-gray-600">Supplier information, petrograph analyses, ASTM C33 reports, and gradations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Aggregate Data
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search aggregate information..."
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="supplier-info" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="supplier-info">Supplier Info</TabsTrigger>
          <TabsTrigger value="test-reports">Test Reports</TabsTrigger>
          <TabsTrigger value="gradations">Gradations</TabsTrigger>
        </TabsList>

        <TabsContent value="supplier-info">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Supplier Information
              </CardTitle>
              <CardDescription>Aggregate supplier data and specifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Supplier information management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test-reports">
          <Card>
            <CardHeader>
              <CardTitle>Test Reports</CardTitle>
              <CardDescription>Petrograph analyses, ASTM C33 reports, specific gravity, absorption, and more</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Test report library coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gradations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Gradations
              </CardTitle>
              <CardDescription>Sieve analyses and gradation curves</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Gradation analysis interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QCAggregateInfo;
