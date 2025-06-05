
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Database } from "lucide-react";

const CostDatabase = () => {
  const costItems = [
    { item: "Precast Wall Panel", unit: "SF", cost: "$42.50", category: "Structural" },
    { item: "Concrete (5000 PSI)", unit: "CY", cost: "$125.00", category: "Materials" },
    { item: "Rebar #5", unit: "TON", cost: "$850.00", category: "Materials" },
    { item: "Installation Labor", unit: "HR", cost: "$65.00", category: "Labor" },
    { item: "Crane Operation", unit: "HR", cost: "$185.00", category: "Equipment" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Cost Database
          </CardTitle>
          <CardDescription>Historical cost data for accurate estimating</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search cost items..." className="pl-10" />
            </div>
            
            <div className="space-y-3">
              {costItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{item.item}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{item.category}</Badge>
                      <span className="text-sm text-gray-600">per {item.unit}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{item.cost}</div>
                    <div className="text-xs text-gray-500">Updated: Jan 2024</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostDatabase;
