
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Upload, Download, RotateCcw, ZoomIn, ZoomOut, Move3D, Eye, Settings, Share2 } from "lucide-react";

const ModelViewer = () => {
  const models = [
    {
      id: "MDL-001",
      name: "Wall Panel Assembly A1",
      project: "Project Alpha",
      format: "STEP",
      size: "12.4 MB",
      lastModified: "2024-01-15",
      status: "current"
    },
    {
      id: "MDL-002", 
      name: "Precast Beam Section B",
      project: "Project Alpha",
      format: "IFC",
      size: "8.7 MB",
      lastModified: "2024-01-14",
      status: "archived"
    },
    {
      id: "MDL-003",
      name: "Connection Detail Type C",
      project: "Project Beta", 
      format: "STEP",
      size: "3.2 MB",
      lastModified: "2024-01-13",
      status: "current"
    }
  ];

  return (
    <div className="space-y-6">
      {/* 3D Viewer */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>3D Model Viewer</CardTitle>
              <CardDescription>
                Interactive 3D visualization of precast components and assemblies
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Model
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mock 3D Viewer */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl font-bold">3D</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">3D Model Viewer</h3>
              <p className="text-gray-500 mb-4">Select a model from the library to view in 3D</p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Upload className="h-4 w-4 mr-2" />
                Load Model
              </Button>
            </div>
          </div>

          {/* Viewer Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset View
              </Button>
              <Button variant="outline" size="sm">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Move3D className="h-4 w-4 mr-2" />
                Pan
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Options
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Library */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Model Library</CardTitle>
            <CardDescription>
              Browse and manage 3D models for all projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {models.map((model) => (
                <div key={model.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-xs font-bold">3D</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{model.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{model.project}</span>
                        <Separator orientation="vertical" className="h-3" />
                        <Badge variant="outline" className="text-xs">{model.format}</Badge>
                        <Separator orientation="vertical" className="h-3" />
                        <span>{model.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      className={model.status === 'current' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    >
                      {model.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Model Properties */}
        <Card>
          <CardHeader>
            <CardTitle>Model Properties</CardTitle>
            <CardDescription>
              Technical specifications and metadata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Geometric Properties</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Length:</span>
                    <span className="ml-2 font-medium">24'-0"</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Width:</span>
                    <span className="ml-2 font-medium">8'-0"</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Height:</span>
                    <span className="ml-2 font-medium">10'-0"</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Weight:</span>
                    <span className="ml-2 font-medium">12,500 lbs</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Material Properties</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Concrete Strength:</span>
                    <span className="ml-2 font-medium">5000 PSI</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Reinforcement:</span>
                    <span className="ml-2 font-medium">Grade 60</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Surface Finish:</span>
                    <span className="ml-2 font-medium">Smooth</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">File Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Format:</span>
                    <span className="ml-2 font-medium">STEP AP214</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Created:</span>
                    <span className="ml-2 font-medium">2024-01-10</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Version:</span>
                    <span className="ml-2 font-medium">1.3</span>
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

export default ModelViewer;
