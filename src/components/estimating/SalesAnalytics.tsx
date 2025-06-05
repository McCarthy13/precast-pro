
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, Award } from "lucide-react";

const SalesAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Win Rate</p>
                <p className="text-2xl font-bold text-green-600">68%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                <p className="text-2xl font-bold text-blue-600">$2.4M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Bids</p>
                <p className="text-2xl font-bold text-purple-600">15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Margin</p>
                <p className="text-2xl font-bold text-amber-600">22%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Sales metrics for the current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Bids Submitted:</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span>Bids Won:</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span>Revenue Generated:</span>
                <span className="font-medium">$485,000</span>
              </div>
              <div className="flex justify-between">
                <span>Average Bid Value:</span>
                <span className="font-medium">$95,200</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Most valuable customers by project value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>ABC Construction</span>
                <span className="font-medium">$285,000</span>
              </div>
              <div className="flex justify-between">
                <span>XYZ Development</span>
                <span className="font-medium">$156,000</span>
              </div>
              <div className="flex justify-between">
                <span>DEF Properties</span>
                <span className="font-medium">$125,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesAnalytics;
