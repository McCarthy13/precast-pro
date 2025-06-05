
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, Plus, Settings, AlertTriangle, CheckCircle } from "lucide-react";

const QCCalibration = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Calibration Records & Calendar</h2>
          <p className="text-gray-600">Equipment calibration tracking and scheduling</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Calibration
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search equipment..."
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Compression Machines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Machine #1</span>
                <Badge className="bg-green-100 text-green-800">Current</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Machine #2</span>
                <Badge className="bg-yellow-100 text-yellow-800">Due Soon</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Scales & Balances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Scale calibration tracking coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Testing Equipment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Air meters, slump cones, thermometers...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QCCalibration;
