
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Package, Plus, Minus, ArrowUpDown } from "lucide-react";
import { InventoryItem, MaterialConsumption, InventoryTransaction } from "@/types/inventory";

interface InventoryTrackerProps {
  department: 'wall-panels' | 'precast' | 'extruded' | 'flexicore' | 'double-tees';
}

const InventoryTracker = ({ department }: InventoryTrackerProps) => {
  // Sample data - in a real app this would come from an API
  const inventoryItems: InventoryItem[] = [
    {
      id: "1",
      name: "Concrete Mix",
      category: "raw-material",
      quantity: 150,
      unit: "cubic yards",
      location: `${department} storage`,
      lastUpdated: "2024-06-05 08:30",
      minStock: 50,
      maxStock: 200,
      cost: 120
    },
    {
      id: "2",
      name: "Rebar #4",
      category: "raw-material",
      quantity: 85,
      unit: "tons",
      location: `${department} yard`,
      lastUpdated: "2024-06-05 07:15",
      minStock: 20,
      maxStock: 100,
      cost: 650
    },
    {
      id: "3",
      name: "Finished Panels",
      category: "finished-goods",
      quantity: 24,
      unit: "pieces",
      location: `${department} finished area`,
      lastUpdated: "2024-06-05 16:45",
      minStock: 0,
      maxStock: 50,
      cost: 1200
    }
  ];

  const recentConsumption: MaterialConsumption[] = [
    {
      itemId: "1",
      itemName: "Concrete Mix",
      quantityUsed: 12,
      unit: "cubic yards",
      jobId: "WP-2024-001",
      date: "2024-06-05"
    },
    {
      itemId: "2",
      itemName: "Rebar #4",
      quantityUsed: 2.5,
      unit: "tons",
      jobId: "WP-2024-001",
      date: "2024-06-05"
    }
  ];

  const getStockStatusColor = (item: InventoryItem) => {
    if (item.minStock && item.quantity <= item.minStock) return "text-red-600";
    if (item.maxStock && item.quantity >= item.maxStock * 0.9) return "text-orange-600";
    return "text-green-600";
  };

  const getStockStatusBadge = (item: InventoryItem) => {
    if (item.minStock && item.quantity <= item.minStock) return "Low Stock";
    if (item.maxStock && item.quantity >= item.maxStock * 0.9) return "High Stock";
    return "Normal";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">Inventory Tracking</h3>
          <p className="text-gray-600">{department} department inventory management</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Transfer
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current-inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current-inventory">Current Inventory</TabsTrigger>
          <TabsTrigger value="consumption">Material Consumption</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="current-inventory">
          <Card>
            <CardHeader>
              <CardTitle>Current Inventory Levels</CardTitle>
              <CardDescription>Real-time inventory status for {department}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell className={getStockStatusColor(item)}>
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={item.minStock && item.quantity <= item.minStock ? "destructive" : "default"}
                        >
                          {getStockStatusBadge(item)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">{item.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consumption">
          <Card>
            <CardHeader>
              <CardTitle>Material Consumption</CardTitle>
              <CardDescription>Recent material usage by production jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Quantity Used</TableHead>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentConsumption.map((consumption, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{consumption.itemName}</TableCell>
                      <TableCell>{consumption.quantityUsed} {consumption.unit}</TableCell>
                      <TableCell>{consumption.jobId}</TableCell>
                      <TableCell>{consumption.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Inventory movements and adjustments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500 py-8">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No recent transactions to display</p>
                <p className="text-sm">Inventory transactions will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryTracker;
