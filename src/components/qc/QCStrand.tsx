
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Zap } from "lucide-react";

const QCStrand = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Strand Information</h2>
          <p className="text-gray-600">ASTM A1081 strand bond test results, strand usage, and related data</p>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Strand Records
          </CardTitle>
          <CardDescription>All strand-related information including ASTM A1081 bond test results</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Strand management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QCStrand;
