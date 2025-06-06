import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileText, Folder, Search, Settings, Eye } from "lucide-react";
import DocumentManagement from "@/components/drafting/DocumentManagement";
import { useState } from "react";
import ExampleForm from "@/components/templates/ExampleForm";
import FreshConcreteTestForm from "@/components/templates/FreshConcreteTestForm";

const DocumentManagementDashboard = () => {
  const [showTemplate, setShowTemplate] = useState(false);
  const [showFreshConcreteTest, setShowFreshConcreteTest] = useState(false);

  if (showFreshConcreteTest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowFreshConcreteTest(false)}
                  className="text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Document Management
                </Button>
                <Separator orientation="vertical" className="h-6 bg-white/20" />
                <div>
                  <h1 className="text-3xl font-bold">Fresh Concrete Test Data Form</h1>
                  <p className="text-indigo-100 mt-1">QC-FCT-001 - Rev 1.0</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container mx-auto p-6">
          <FreshConcreteTestForm />
        </div>
      </div>
    );
  }

  if (showTemplate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowTemplate(false)}
                  className="text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Document Management
                </Button>
                <Separator orientation="vertical" className="h-6 bg-white/20" />
                <div>
                  <h1 className="text-3xl font-bold">Document Template Example</h1>
                  <p className="text-indigo-100 mt-1">Preview of standardized document template</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container mx-auto p-6">
          <ExampleForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
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
                <h1 className="text-3xl font-bold">Document Management</h1>
                <p className="text-indigo-100 mt-1">Centralized document storage, revision control, and ISO compliance</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <FileText className="h-4 w-4 mr-1" />
                2,847 Documents
              </Badge>
              <Button 
                variant="outline" 
                onClick={() => setShowFreshConcreteTest(true)}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <FileText className="h-4 w-4 mr-2" />
                Fresh Concrete Test Form
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowTemplate(true)}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Template Example
              </Button>
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
          <Card className="border-l-4 border-l-indigo-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold text-indigo-600">2,847</p>
                </div>
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Departments</p>
                  <p className="text-2xl font-bold text-purple-600">15</p>
                </div>
                <Folder className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ISO Compliant</p>
                  <p className="text-2xl font-bold text-blue-600">94%</p>
                </div>
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📋</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <Search className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <DocumentManagement />
      </div>
    </div>
  );
};

export default DocumentManagementDashboard;
