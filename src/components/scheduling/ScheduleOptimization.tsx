
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Clock, Zap } from "lucide-react";

const ScheduleOptimization = () => {
  const optimizations = [
    {
      title: "Production Efficiency",
      current: "78%",
      optimized: "92%",
      improvement: "+14%",
      description: "Reorder production sequence to minimize setup time"
    },
    {
      title: "Delivery Routes",
      current: "6.5 hrs",
      optimized: "4.8 hrs",
      improvement: "-26%",
      description: "Optimize delivery routes to reduce travel time"
    },
    {
      title: "Resource Utilization",
      current: "83%",
      optimized: "95%",
      improvement: "+12%",
      description: "Better crew allocation across production shifts"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-600" />
              AI Schedule Optimization
            </CardTitle>
            <CardDescription>
              AI-powered recommendations to improve scheduling efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optimizations.map((opt, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{opt.title}</h4>
                    <Badge className="bg-green-100 text-green-800">
                      {opt.improvement}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{opt.description}</p>
                  <div className="flex justify-between text-sm">
                    <span>Current: <strong>{opt.current}</strong></span>
                    <span>Optimized: <strong className="text-green-600">{opt.optimized}</strong></span>
                  </div>
                </div>
              ))}
              
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Zap className="h-4 w-4 mr-2" />
                Apply Optimizations
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Performance Metrics
            </CardTitle>
            <CardDescription>
              Key performance indicators for schedule optimization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">92%</div>
                <div className="text-sm text-gray-600">Overall Efficiency</div>
                <div className="text-xs text-green-600">+8% this month</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4.2</div>
                  <div className="text-xs text-gray-600">Avg Setup Time (hrs)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">96%</div>
                  <div className="text-xs text-gray-600">On-Time Delivery</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Production Efficiency</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Resource Utilization</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Schedule Adherence</span>
                  <span className="font-medium">88%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleOptimization;
