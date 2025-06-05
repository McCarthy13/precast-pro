
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, Plus, Save, FileText } from "lucide-react";

const EstimateBuilder = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              New Estimate
            </CardTitle>
            <CardDescription>Create detailed cost estimates for precast projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" placeholder="Enter project name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer">Customer</Label>
                  <Input id="customer" placeholder="Customer name" />
                </div>
                <div>
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input id="due-date" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Project Description</Label>
                <Input id="description" placeholder="Brief project description" />
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Estimate Items</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-2 text-sm font-medium">
                    <span>Item</span>
                    <span>Quantity</span>
                    <span>Unit Cost</span>
                    <span>Total</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <Input placeholder="Wall panels" />
                    <Input placeholder="24" />
                    <Input placeholder="$850" />
                    <div className="flex items-center text-sm font-medium">$20,400</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 bg-amber-600 hover:bg-amber-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Estimate
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estimate Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Cost Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Materials:</span>
                    <span className="font-medium">$45,600</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Labor:</span>
                    <span className="font-medium">$18,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equipment:</span>
                    <span className="font-medium">$8,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overhead (15%):</span>
                    <span className="font-medium">$10,830</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profit (20%):</span>
                    <span className="font-medium">$16,606</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total:</span>
                    <span>$99,636</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Cost per SF:</span>
                    <div className="font-medium">$42.50</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Margin:</span>
                    <div className="font-medium">20%</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EstimateBuilder;
