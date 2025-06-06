
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Database, AlertCircle, TrendingUp } from "lucide-react";
import { BatchMaterial, BatchUsageData, BatchIntegrationStatus } from "@/types/batch-integration";

const BatchMaterialTracker = () => {
  // Sample data - in production this would come from batch software API
  const integrationStatus: BatchIntegrationStatus = {
    isConnected: true,
    lastSync: "2024-06-05 09:15:00",
    status: "online"
  };

  const batchMaterials: BatchMaterial[] = [
    {
      id: "1",
      name: "Portland Cement Type I",
      type: "cement",
      supplier: "LafargeHolcim",
      unitCost: 95.50,
      unit: "ton",
      lastUpdated: "2024-06-05 08:30"
    },
    {
      id: "2", 
      name: "3/4\" Crushed Stone",
      type: "aggregate",
      supplier: "Local Quarry",
      unitCost: 28.75,
      unit: "ton",
      lastUpdated: "2024-06-05 08:30"
    },
    {
      id: "3",
      name: "Fine Sand",
      type: "aggregate", 
      supplier: "Sand Co.",
      unitCost: 22.50,
      unit: "ton",
      lastUpdated: "2024-06-05 08:30"
    },
    {
      id: "4",
      name: "Water Reducer",
      type: "admix",
      supplier: "BASF",
      unitCost: 2.85,
      unit: "gallon",
      lastUpdated: "2024-06-05 08:30"
    },
    {
      id: "5",
      name: "Class F Fly Ash",
      type: "fly-ash",
      supplier: "Power Plant Supply",
      unitCost: 45.00,
      unit: "ton",
      lastUpdated: "2024-06-05 08:30"
    },
    {
      id: "6",
      name: "Mix Water",
      type: "water",
      supplier: "Municipal",
      unitCost: 0.05,
      unit: "gallon",
      lastUpdated: "2024-06-05 08:30"
    }
  ];

  const recentUsage: BatchUsageData[] = [
    {
      materialId: "1",
      materialName: "Portland Cement Type I",
      quantityUsed: 15.5,
      unit: "ton",
      cost: 1480.25,
      batchId: "B-2024-1205",
      mixDesign: "4000 PSI Standard",
      timestamp: "2024-06-05 07:45",
      department: "wall-panels"
    },
    {
      materialId: "2",
      materialName: "3/4\" Crushed Stone", 
      quantityUsed: 45.2,
      unit: "ton",
      cost: 1299.50,
      batchId: "B-2024-1205",
      mixDesign: "4000 PSI Standard",
      timestamp: "2024-06-05 07:45",
      department: "wall-panels"
    },
    {
      materialId: "4",
      materialName: "Water Reducer",
      quantityUsed: 125,
      unit: "gallon", 
      cost: 356.25,
      batchId: "B-2024-1206",
      mixDesign: "5000 PSI High Strength",
      timestamp: "2024-06-05 08:15",
      department: "precast"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'offline': return 'text-red-600';
      case 'syncing': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    const iconMap = {
      'cement': '🏗️',
      'aggregate': '🪨',
      'admix': '⚗️',
      'fly-ash': '🌫️',
      'water': '💧'
    };
    return iconMap[type as keyof typeof iconMap] || '📦';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">Batch Software Integration</h3>
          <p className="text-gray-600">Real-time material usage and cost tracking</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Database className={`h-4 w-4 ${getStatusColor(integrationStatus.status)}`} />
            <Badge variant={integrationStatus.isConnected ? "default" : "destructive"}>
              {integrationStatus.status.toUpperCase()}
            </Badge>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Now
          </Button>
        </div>
      </div>

      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Sync</p>
              <p className="text-lg font-semibold">{integrationStatus.lastSync}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-gray-600">Batch System Connected</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="materials" className="space-y-4">
        <TabsList>
          <TabsTrigger value="materials">Material Costs</TabsTrigger>
          <TabsTrigger value="usage">Recent Usage</TabsTrigger>
          <TabsTrigger value="analytics">Cost Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <CardTitle>Raw Material Costs</CardTitle>
              <CardDescription>Current pricing from batch software integration</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Unit Cost</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchMaterials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getTypeIcon(material.type)}</span>
                          <span>{material.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{material.type}</Badge>
                      </TableCell>
                      <TableCell>{material.supplier}</TableCell>
                      <TableCell className="font-semibold">
                        ${material.unitCost.toFixed(2)} / {material.unit}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {material.lastUpdated}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>Recent Material Usage</CardTitle>
              <CardDescription>Material consumption from batch production</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Quantity Used</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Mix Design</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsage.map((usage, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{usage.materialName}</TableCell>
                      <TableCell>{usage.quantityUsed} {usage.unit}</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        ${usage.cost.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{usage.batchId}</Badge>
                      </TableCell>
                      <TableCell>{usage.mixDesign}</TableCell>
                      <TableCell>
                        <Badge>{usage.department}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {usage.timestamp}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Daily Material Costs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500">Cost analytics charts would be displayed here</p>
                  <p className="text-sm text-gray-400">Integration with batch software provides real-time cost data</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Today's Material Cost</span>
                    <span className="font-semibold text-lg">$3,136.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Week</span>
                    <span className="font-semibold">$18,750.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="font-semibold">$75,200.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BatchMaterialTracker;
