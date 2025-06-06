import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Search, Filter, Upload, Download, Share2, Eye, FolderOpen, File, Archive, Shield, AlertTriangle, CheckCircle, Clock, Factory, PenTool, Calculator, Truck, FlaskConical, Droplets } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DocumentManagement = () => {
  const [activeTab, setActiveTab] = useState("departments");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const navigate = useNavigate();

  const departments = [
    {
      id: "qc",
      name: "Quality Control",
      icon: Shield,
      color: "bg-blue-600",
      documents: 89,
      pending: 3,
      compliant: 98,
      forms: [
        { name: "Fresh Concrete Test", route: "/templates/fresh-concrete-test", icon: FlaskConical },
        { name: "Moisture Test", route: "/templates/moisture-test", icon: Droplets }
      ]
    },
    {
      id: "drafting",
      name: "Drafting & Engineering", 
      icon: PenTool,
      color: "bg-purple-600",
      documents: 245,
      pending: 5,
      compliant: 96
    },
    {
      id: "production",
      name: "Production",
      icon: Factory,
      color: "bg-green-600",
      documents: 156,
      pending: 2,
      compliant: 94
    },
    {
      id: "estimating",
      name: "Estimating & Sales",
      icon: Calculator,
      color: "bg-amber-600",
      documents: 78,
      pending: 1,
      compliant: 99
    },
    {
      id: "field",
      name: "Field Services",
      icon: Truck,
      color: "bg-orange-600",
      documents: 45,
      pending: 1,
      compliant: 92
    }
  ];

  const documents = [
    {
      id: "FORM-001",
      name: "Fresh Concrete Test Form",
      type: "Quality Form",
      department: "Quality Control",
      version: "Rev 1.0",
      isoCompliant: true,
      size: "Interactive Form",
      uploadDate: "2024-01-15",
      status: "current",
      uploadedBy: "QC Department",
      reviewedBy: "QC Manager",
      nextReview: "2024-07-15",
      isForm: true,
      route: "/templates/fresh-concrete-test"
    },
    {
      id: "FORM-002",
      name: "Moisture Test Form",
      type: "Quality Form", 
      department: "Quality Control",
      version: "Rev 1.0",
      isoCompliant: true,
      size: "Interactive Form",
      uploadDate: "2024-01-15",
      status: "current",
      uploadedBy: "QC Department",
      reviewedBy: "QC Manager",
      nextReview: "2024-07-15",
      isForm: true,
      route: "/templates/moisture-test"
    },
    {
      id: "DOC-001",
      name: "Project Alpha Specifications.pdf",
      type: "Specification",
      department: "Drafting & Engineering",
      version: "Rev 3.2",
      isoCompliant: true,
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      status: "approved",
      uploadedBy: "John Smith",
      reviewedBy: "Sarah Johnson",
      nextReview: "2024-04-15"
    },
    {
      id: "DOC-002", 
      name: "Material Test Reports.xlsx",
      type: "Report",
      department: "Quality Control",
      version: "Rev 1.0",
      isoCompliant: true,
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      status: "current",
      uploadedBy: "Sarah Johnson",
      reviewedBy: "Mike Chen",
      nextReview: "2024-02-14"
    },
    {
      id: "DOC-003",
      name: "Connection Calculations.docx",
      type: "Calculation",
      department: "Drafting & Engineering", 
      version: "Rev 2.1",
      isoCompliant: false,
      size: "856 KB",
      uploadDate: "2024-01-13",
      status: "pending_review",
      uploadedBy: "Mike Chen",
      reviewedBy: null,
      nextReview: "2024-01-20"
    },
    {
      id: "DOC-004",
      name: "Production Manual Rev2.pdf",
      type: "Manual",
      department: "Production",
      version: "Rev 2.0",
      isoCompliant: true,
      size: "5.2 MB",
      uploadDate: "2024-01-12",
      status: "approved",
      uploadedBy: "Emily Davis",
      reviewedBy: "John Smith",
      nextReview: "2024-07-12"
    }
  ];

  const handleViewDocuments = (departmentName: string) => {
    setSelectedDepartment(departmentName);
    setActiveTab("documents");
  };

  const handleFormAccess = (route: string) => {
    navigate(route);
  };

  const filteredDocuments = selectedDepartment 
    ? documents.filter(doc => doc.department === selectedDepartment)
    : documents;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending_review":
        return "bg-yellow-100 text-yellow-800";
      case "current":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending_review":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "current":
        return <FileText className="h-4 w-4 text-blue-600" />;
      default:
        return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="documents">All Documents</TabsTrigger>
          <TabsTrigger value="revisions">Revision Control</TabsTrigger>
          <TabsTrigger value="compliance">ISO Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => {
              const IconComponent = dept.icon;
              return (
                <Card key={dept.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <div className={`p-2 rounded-lg ${dept.color} mr-3`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      {dept.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{dept.documents}</p>
                        <p className="text-xs text-gray-600">Documents</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-yellow-600">{dept.pending}</p>
                        <p className="text-xs text-gray-600">Pending</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{dept.compliant}%</p>
                        <p className="text-xs text-gray-600">ISO Compliant</p>
                      </div>
                    </div>
                    
                    {dept.forms && dept.forms.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Quick Access Forms:</p>
                        <div className="flex flex-col gap-2">
                          {dept.forms.map((form, index) => {
                            const FormIcon = form.icon;
                            return (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="justify-start"
                                onClick={() => handleFormAccess(form.route)}
                              >
                                <FormIcon className="h-4 w-4 mr-2" />
                                {form.name}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleViewDocuments(dept.name)}
                    >
                      View All Documents
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documents by name, type, or department..."
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment || "all"} onValueChange={(value) => setSelectedDepartment(value === "all" ? null : value)}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Quality Control">Quality Control</SelectItem>
                <SelectItem value="Drafting & Engineering">Drafting & Engineering</SelectItem>
                <SelectItem value="Production">Production</SelectItem>
                <SelectItem value="Estimating & Sales">Estimating & Sales</SelectItem>
                <SelectItem value="Field Services">Field Services</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>

          {selectedDepartment && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                Filtered by: {selectedDepartment}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedDepartment(null)}
              >
                Clear filter
              </Button>
            </div>
          )}

          {/* Documents Table */}
          <Card>
            <CardHeader>
              <CardTitle>Document Library</CardTitle>
              <CardDescription>
                Centralized document management with revision control and ISO compliance tracking
                {selectedDepartment && ` - ${selectedDepartment} Department`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>ISO Status</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Review</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(doc.status)}
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-gray-500">{doc.type} • {doc.size}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{doc.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.version}</Badge>
                      </TableCell>
                      <TableCell>
                        {doc.isoCompliant ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Compliant
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Non-Compliant
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{doc.nextReview}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {doc.isForm ? (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleFormAccess(doc.route)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          ) : (
                            <>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
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

        <TabsContent value="revisions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revision Control</CardTitle>
              <CardDescription>Track document versions and change history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Revision control interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ISO Standards Compliance</CardTitle>
              <CardDescription>Monitor and ensure ISO compliance across all documents</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">ISO compliance dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentManagement;
