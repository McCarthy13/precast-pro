
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileText, Folder, Upload, Download, Share2, Settings } from "lucide-react";
import DrawingManagement from "@/components/drafting/DrawingManagement";
import ModelViewer from "@/components/drafting/ModelViewer";
import DocumentManagement from "@/components/drafting/DocumentManagement";
import RevisionControl from "@/components/drafting/RevisionControl";
import EngineeringCalcs from "@/components/drafting/EngineeringCalcs";

const DraftingDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 shadow-lg">
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
                <h1 className="text-3xl font-bold">Drafting & Engineering</h1>
                <p className="text-purple-100 mt-1">3D Models, Drawings & Document Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                45 Active Drawings
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                8 Pending Approval
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
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Drawing</p>
                  <Button size="sm" className="mt-2 bg-purple-600 hover:bg-purple-700">
                    <FileText className="h-4 w-4 mr-2" />
                    Create
                  </Button>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Import Model</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 text-xs font-bold">3D</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Export Package</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <Folder className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Share Project</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                <Share2 className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Drafting & Engineering Workspace</CardTitle>
            <CardDescription>
              Manage drawings, 3D models, documents, and engineering calculations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="drawings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="drawings">Drawings</TabsTrigger>
                <TabsTrigger value="models">3D Models</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="revisions">Revisions</TabsTrigger>
                <TabsTrigger value="calculations">Calculations</TabsTrigger>
              </TabsList>

              <TabsContent value="drawings">
                <DrawingManagement />
              </TabsContent>

              <TabsContent value="models">
                <ModelViewer />
              </TabsContent>

              <TabsContent value="documents">
                <DocumentManagement />
              </TabsContent>

              <TabsContent value="revisions">
                <RevisionControl />
              </TabsContent>

              <TabsContent value="calculations">
                <EngineeringCalcs />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DraftingDashboard;
