
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Database, Filter } from "lucide-react";

const QCAggregateInfo = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Aggregate Information</h2>
          <p className="text-gray-600">Supplier data, test results, and aggregate specifications</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Aggregate
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search aggregates..."
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="supplier-info" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="supplier-info">Supplier Info</TabsTrigger>
          <TabsTrigger value="gradations">Gradations</TabsTrigger>
          <TabsTrigger value="test-results">Test Results</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
        </TabsList>

        <TabsContent value="supplier-info">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Information</CardTitle>
              <CardDescription>Aggregate supplier details and contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Supplier management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gradations">
          <Card>
            <CardHeader>
              <CardTitle>Gradations</CardTitle>
              <CardDescription>Sieve analyses and gradation curves</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Gradation tracking coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test-results">
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>ASTM C33 reports, specific gravity, absorption, and other test data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Test results database coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications">
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
              <CardDescription>Aggregate specifications and quality requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Specification management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QCAggregateInfo;
