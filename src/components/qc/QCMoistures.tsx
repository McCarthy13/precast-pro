
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Droplets } from "lucide-react";

const QCMoistures = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Moisture Tests</h2>
          <p className="text-gray-600">Historical record of all moisture test data</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Moisture Test
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search moisture test records..."
          className="pl-10"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Droplets className="h-5 w-5 mr-2" />
            Moisture Test Records
          </CardTitle>
          <CardDescription>All historical moisture test data with fillable forms</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Moisture test interface and forms coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QCMoistures;
