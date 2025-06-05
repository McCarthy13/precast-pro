
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Filter, Eye, Edit, Download, Share2, Clock, CheckCircle, AlertCircle } from "lucide-react";

const DrawingManagement = () => {
  const drawings = [
    {
      id: "DWG-001",
      title: "Wall Panel Series A - Plan View",
      project: "Project Alpha",
      type: "Architectural",
      status: "approved",
      lastModified: "2024-01-15",
      version: "Rev 3",
      assignee: "John Smith"
    },
    {
      id: "DWG-002", 
      title: "Precast Beam Details - Section B",
      project: "Project Alpha",
      type: "Structural",
      status: "review",
      lastModified: "2024-01-14",
      version: "Rev 1",
      assignee: "Sarah Johnson"
    },
    {
      id: "DWG-003",
      title: "Connection Details - Typ.",
      project: "Project Beta",
      type: "Detail",
      status: "draft",
      lastModified: "2024-01-13",
      version: "Rev 0",
      assignee: "Mike Chen"
    },
    {
      id: "DWG-004",
      title: "Foundation Plan",
      project: "Project Beta",
      type: "Structural",
      status: "approved",
      lastModified: "2024-01-12",
      version: "Rev 2",
      assignee: "Emily Davis"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "review":
        return <Clock className="h-4 w-4 text-orange-600" />;
      case "draft":
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "review":
        return "bg-orange-100 text-orange-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search drawings by title, project, or ID..."
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="review">Under Review</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="architectural">Architectural</SelectItem>
            <SelectItem value="structural">Structural</SelectItem>
            <SelectItem value="detail">Detail</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <FileText className="h-4 w-4 mr-2" />
          New Drawing
        </Button>
      </div>

      {/* Drawings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Drawing Library</CardTitle>
          <CardDescription>
            Manage and organize all project drawings and technical documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Drawing ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drawings.map((drawing) => (
                <TableRow key={drawing.id}>
                  <TableCell className="font-medium">{drawing.id}</TableCell>
                  <TableCell>{drawing.title}</TableCell>
                  <TableCell>{drawing.project}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{drawing.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(drawing.status)}
                      <Badge className={getStatusColor(drawing.status)}>
                        {drawing.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{drawing.version}</TableCell>
                  <TableCell>{drawing.assignee}</TableCell>
                  <TableCell>{drawing.lastModified}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
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

      {/* Drawing Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-orange-600">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-2xl font-bold text-gray-600">13</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-blue-600">45</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DrawingManagement;
