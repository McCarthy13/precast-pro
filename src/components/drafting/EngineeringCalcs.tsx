
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, FileText, Download, Share2, Plus, Save, Clipboard } from "lucide-react";

const EngineeringCalcs = () => {
  const calculations = [
    {
      id: "CALC-001",
      name: "Wall Panel Load Analysis",
      type: "Structural",
      project: "Project Alpha",
      lastModified: "2024-01-15",
      status: "verified",
      engineer: "Sarah Johnson"
    },
    {
      id: "CALC-002",
      name: "Connection Design - Beam to Column",
      type: "Connection",
      project: "Project Alpha", 
      lastModified: "2024-01-14",
      status: "draft",
      engineer: "Mike Chen"
    },
    {
      id: "CALC-003",
      name: "Foundation Bearing Capacity",
      type: "Foundation",
      project: "Project Beta",
      lastModified: "2024-01-13",
      status: "verified",
      engineer: "Emily Davis"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Calculation Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Engineering Calculator
            </CardTitle>
            <CardDescription>
              Perform standard precast engineering calculations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="calc-type">Calculation Type</Label>
                <select 
                  id="calc-type"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                >
                  <option>Flexural Strength</option>
                  <option>Shear Capacity</option>
                  <option>Connection Design</option>
                  <option>Bearing Capacity</option>
                  <option>Deflection Analysis</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fc">f'c (psi)</Label>
                  <Input id="fc" placeholder="5000" />
                </div>
                <div>
                  <Label htmlFor="fy">fy (psi)</Label>
                  <Input id="fy" placeholder="60000" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Width (in)</Label>
                  <Input id="width" placeholder="12" />
                </div>
                <div>
                  <Label htmlFor="height">Height (in)</Label>
                  <Input id="height" placeholder="24" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="load">Applied Load (kips)</Label>
                <Input id="load" placeholder="150" />
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
                <Button variant="outline">
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calculation Results */}
        <Card>
          <CardHeader>
            <CardTitle>Calculation Results</CardTitle>
            <CardDescription>
              Results and safety factors for current calculation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Flexural Strength Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Nominal Moment (Mn):</span>
                    <span className="font-medium">485 kip-ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Design Moment (φMn):</span>
                    <span className="font-medium">437 kip-ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Applied Moment (Mu):</span>
                    <span className="font-medium">320 kip-ft</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Safety Factor:</span>
                    <span className="text-green-600">1.37</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Code References</h4>
                <div className="text-sm text-gray-600">
                  <p>• ACI 318-19: Section 22.2</p>
                  <p>• PCI Design Handbook 8th Ed.</p>
                  <p>• ASCE 7-16: Chapter 12</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Clipboard className="h-4 w-4 mr-2" />
                  Copy Results
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Calculations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Saved Calculations</CardTitle>
              <CardDescription>
                Browse and manage engineering calculations for all projects
              </CardDescription>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Calculation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {calculations.map((calc) => (
              <div key={calc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{calc.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Badge variant="outline">{calc.type}</Badge>
                      <span>•</span>
                      <span>{calc.project}</span>
                      <span>•</span>
                      <span>Modified {calc.lastModified}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    className={calc.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  >
                    {calc.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calculation Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Calculation Templates</CardTitle>
          <CardDescription>
            Pre-configured templates for common precast calculations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium mb-2">Wall Panel Design</h4>
              <p className="text-sm text-gray-600 mb-3">
                Complete structural analysis for precast wall panels including flexure, shear, and connections
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Use Template
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium mb-2">Beam Analysis</h4>
              <p className="text-sm text-gray-600 mb-3">
                Structural design for precast beams with standard loading conditions and deflection checks
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Use Template
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium mb-2">Connection Design</h4>
              <p className="text-sm text-gray-600 mb-3">
                Standard connection calculations for beam-to-column and panel-to-panel connections
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Use Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngineeringCalcs;
