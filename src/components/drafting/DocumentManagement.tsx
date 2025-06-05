
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Filter, Upload, Download, Share2, Eye, FolderOpen, File, Archive } from "lucide-react";

const DocumentManagement = () => {
  const documents = [
    {
      id: "DOC-001",
      name: "Project Alpha Specifications.pdf",
      type: "Specification",
      category: "Technical",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      status: "current",
      uploadedBy: "John Smith"
    },
    {
      id: "DOC-002",
      name: "Material Test Reports.xlsx",
      type: "Report",
      category: "QC",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      status: "current",
      uploadedBy: "Sarah Johnson"
    },
    {
      id: "DOC-003",
      name: "Connection Calculations.docx",
      type: "Calculation",
      category: "Engineering",
      size: "856 KB",
      uploadDate: "2024-01-13",
      status: "archived",
      uploadedBy: "Mike Chen"
    },
    {
      id: "DOC-004",
      name: "Erection Manual Rev2.pdf",
      type: "Manual",
      category: "Installation",
      size: "5.2 MB",
      uploadDate: "2024-01-12",
      status: "current",
      uploadedBy: "Emily Davis"
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "specification":
      case "manual":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "report":
        return <File className="h-4 w-4 text-green-600" />;
      case "calculation":
        return <File className="h-4 w-4 text-purple-600" />;
      default:
        return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "technical":
        return "bg-blue-100 text-blue-800";
      case "qc":
        return "bg-green-100 text-green-800";
      case "engineering":
        return "bg-purple-100 text-purple-800";
      case "installation":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Upload and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search documents by name, type, or category..."
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="qc">QC</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="installation">Installation</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Folder Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Folder Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <FolderOpen className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Project Alpha</span>
                <Badge variant="outline" className="ml-auto text-xs">12</Badge>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer ml-4">
                <FolderOpen className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Drawings</span>
                <Badge variant="outline" className="ml-auto text-xs">45</Badge>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer ml-4">
                <FolderOpen className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Specifications</span>
                <Badge variant="outline" className="ml-auto text-xs">8</Badge>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer ml-4">
                <FolderOpen className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Reports</span>
                <Badge variant="outline" className="ml-auto text-xs">15</Badge>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <FolderOpen className="h-4 w-4 text-green-600" />
                <span className="text-sm">Project Beta</span>
                <Badge variant="outline" className="ml-auto text-xs">8</Badge>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <Archive className="h-4 w-4 text-gray-600" />
                <span className="text-sm">Archive</span>
                <Badge variant="outline" className="ml-auto text-xs">23</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Document Library</CardTitle>
              <CardDescription>
                Manage project documents, specifications, and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getFileIcon(doc.type)}
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(doc.category)}>
                          {doc.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{doc.uploadedBy}</TableCell>
                      <TableCell>
                        <Badge 
                          className={doc.status === 'current' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                        >
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
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
        </div>
      </div>

      {/* Document Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-blue-600">127</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-green-600">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Archive className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Archived</p>
                <p className="text-2xl font-bold text-gray-600">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FolderOpen className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-purple-600">45GB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentManagement;
