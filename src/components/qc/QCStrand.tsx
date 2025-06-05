
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Zap, FileText } from "lucide-react";

const QCStrand = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Strand Information</h2>
          <p className="text-gray-600">ASTM A1081 strand bond tests, usage tracking, and documentation</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Strand Record
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search strand records..."
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              ASTM A1081 Tests
            </CardTitle>
            <CardDescription>Strand bond test results</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Bond test records coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Strand Usage
            </CardTitle>
            <CardDescription>Track strand consumption by project</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Usage tracking coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Badge className="h-5 w-5 mr-2" />
              Inventory
            </CardTitle>
            <CardDescription>Current strand inventory levels</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Inventory management coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QCStrand;
