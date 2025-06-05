
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GitBranch, Clock, User, FileText, Eye, Download, RotateCcw, CheckCircle, AlertCircle } from "lucide-react";

const RevisionControl = () => {
  const revisions = [
    {
      id: "REV-001",
      drawing: "DWG-001",
      title: "Wall Panel Series A - Plan View",
      version: "Rev 3",
      date: "2024-01-15",
      author: "John Smith",
      changes: "Updated connection details and panel dimensions",
      status: "approved",
      approver: "Mike Johnson"
    },
    {
      id: "REV-002",
      drawing: "DWG-002", 
      title: "Precast Beam Details - Section B",
      version: "Rev 1",
      date: "2024-01-14",
      author: "Sarah Johnson",
      changes: "Initial release with structural calculations",
      status: "review",
      approver: "Pending"
    },
    {
      id: "REV-003",
      drawing: "DWG-001",
      title: "Wall Panel Series A - Plan View",
      version: "Rev 2",
      date: "2024-01-10",
      author: "John Smith",
      changes: "Corrected reinforcement layout per QC feedback",
      status: "superseded",
      approver: "Mike Johnson"
    },
    {
      id: "REV-004",
      drawing: "DWG-003",
      title: "Connection Details - Typ.",
      version: "Rev 0",
      date: "2024-01-13",
      author: "Mike Chen",
      changes: "Initial draft for review",
      status: "draft",
      approver: "Pending"
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
      case "superseded":
        return <RotateCcw className="h-4 w-4 text-red-600" />;
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
      case "superseded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Revision Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
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
        
        <Card className="border-l-4 border-l-orange-500">
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

        <Card className="border-l-4 border-l-gray-500">
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

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RotateCcw className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Superseded</p>
                <p className="text-2xl font-bold text-red-600">31</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revision History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GitBranch className="h-5 w-5 mr-2" />
            Revision History
          </CardTitle>
          <CardDescription>
            Track all drawing revisions, changes, and approval status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Drawing</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Changes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approver</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revisions.map((revision) => (
                <TableRow key={revision.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{revision.drawing}</p>
                      <p className="text-sm text-gray-500">{revision.title}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{revision.version}</Badge>
                  </TableCell>
                  <TableCell>{revision.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{revision.author}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm truncate" title={revision.changes}>
                      {revision.changes}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(revision.status)}
                      <Badge className={getStatusColor(revision.status)}>
                        {revision.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{revision.approver}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      {revision.status !== 'approved' && (
                        <Button variant="ghost" size="sm">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Revision Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Revision Workflow</CardTitle>
          <CardDescription>
            Standard approval process for drawing revisions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-bold">1</span>
                </div>
                <span className="text-sm font-medium">Draft Created</span>
              </div>
              <div className="h-px w-12 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-sm font-bold">2</span>
                </div>
                <span className="text-sm font-medium">Under Review</span>
              </div>
              <div className="h-px w-12 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">3</span>
                </div>
                <span className="text-sm font-medium">Approved</span>
              </div>
              <div className="h-px w-12 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-bold">4</span>
                </div>
                <span className="text-sm font-medium">Released</span>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h4 className="font-medium mb-2">Automatic Notifications</h4>
              <p className="text-sm text-gray-600">Team members are notified when revisions require their attention</p>
            </div>
            <div className="text-center">
              <h4 className="font-medium mb-2">Version Control</h4>
              <p className="text-sm text-gray-600">All versions are preserved with complete change history</p>
            </div>
            <div className="text-center">
              <h4 className="font-medium mb-2">Digital Approval</h4>
              <p className="text-sm text-gray-600">Electronic signatures and approval timestamps</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevisionControl;
