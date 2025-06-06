import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, ShoppingCart, TruckIcon, Settings } from "lucide-react";
import BatchMaterialTracker from "@/components/purchasing/BatchMaterialTracker";

const PurchasingReceivingDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <header className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/10">
                <a href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </a>
              </Button>
              <Separator orientation="vertical" className="h-6 bg-white/20" />
              <div>
                <h1 className="text-3xl font-bold">Purchasing & Receiving</h1>
                <p className="text-orange-100 mt-1">Material procurement and inventory management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Package className="h-4 w-4 mr-1" />
                15 Orders Pending
              </Badge>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open POs</p>
                  <p className="text-2xl font-bold text-orange-600">28</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Deliveries Today</p>
                  <p className="text-2xl font-bold text-green-600">7</p>
                </div>
                <TruckIcon className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Spend</p>
                  <p className="text-2xl font-bold text-blue-600">$248K</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Vendors</p>
                  <p className="text-2xl font-bold text-purple-600">42</p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-lg">🏢</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Purchasing & Receiving Management</CardTitle>
            <CardDescription>Manage procurement, vendors, and material receiving</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="batch-integration" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="batch-integration">Batch Integration</TabsTrigger>
                <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
                <TabsTrigger value="receiving">Receiving</TabsTrigger>
                <TabsTrigger value="vendors">Vendors</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
              </TabsList>

              <TabsContent value="batch-integration">
                <BatchMaterialTracker />
              </TabsContent>

              <TabsContent value="purchase-orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Purchase Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Purchase order management interface would go here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="receiving">
                <Card>
                  <CardHeader>
                    <CardTitle>Material Receiving</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Material receiving and inspection interface would go here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vendors">
                <Card>
                  <CardHeader>
                    <CardTitle>Vendor Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Vendor database and performance tracking would go here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inventory">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Inventory tracking and reorder management would go here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PurchasingReceivingDashboard;
