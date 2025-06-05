
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, Zap } from "lucide-react";

const ProductionOverview = () => {
  const productionMetrics = {
    totalPieces: 156,
    completedToday: 45,
    inProgress: 89,
    qualityIssues: 3,
    efficiency: 94,
    onTimeDelivery: 98
  };

  const departmentStatus = [
    { name: "Wall Panels", target: 50, completed: 45, efficiency: 90, status: "on-track" },
    { name: "Precast", target: 35, completed: 32, efficiency: 91, status: "on-track" },
    { name: "Extruded", target: 30, completed: 28, efficiency: 93, status: "on-track" },
    { name: "Flexicore", target: 40, completed: 36, efficiency: 90, status: "on-track" },
    { name: "Double Tees", target: 20, completed: 15, efficiency: 75, status: "behind" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Daily Production</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{productionMetrics.completedToday}</div>
            <p className="text-xs text-gray-600">of {productionMetrics.totalPieces} total pieces</p>
            <Progress value={(productionMetrics.completedToday / productionMetrics.totalPieces) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{productionMetrics.efficiency}%</div>
            <div className="flex items-center mt-2">
              <Zap className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-gray-600">Above target</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quality Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{productionMetrics.qualityIssues}</div>
            <div className="flex items-center mt-2">
              <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />
              <span className="text-xs text-gray-600">Require attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Real-time production status across all subdepartments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentStatus.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {dept.status === "on-track" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-orange-500" />
                  )}
                  <div>
                    <p className="font-medium">{dept.name}</p>
                    <p className="text-sm text-gray-600">{dept.completed}/{dept.target} pieces</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={dept.status === "on-track" ? "default" : "destructive"}>
                    {dept.efficiency}% efficiency
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionOverview;
