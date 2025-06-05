
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, FileText, Download, Eye } from "lucide-react";

const QCMixDesigns = () => {
  const mixDesigns = [
    {
      id: "MD-001",
      name: "Standard Wall Panel Mix",
      strength: "5000 PSI",
      slump: "4-6 inches",
      airContent: "6 ± 1%",
      lastUpdated: "2024-01-15",
      status: "active"
    },
    {
      id: "MD-002", 
      name: "Double Tee Mix Design",
      strength: "6000 PSI",
      slump: "3-5 inches",
      airContent: "5 ± 1%",
      lastUpdated: "2024-01-10",
      status: "active"
    },
    {
      id: "MD-003",
      name: "Architectural Precast Mix",
      strength: "4500 PSI",
      slump: "5-7 inches",
      airContent: "6 ± 1%",
      lastUpdated: "2024-01-08",
      status: "under_review"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "under_review":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Mix Designs</h2>
          <p className="text-gray-600">Manage all concrete mix designs and formulations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Mix Design
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search mix designs..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          Filter by Status
        </Button>
      </div>

      {/* Mix Designs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mix Design Library</CardTitle>
          <CardDescription>
            All approved and pending mix designs for various product types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Design ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Strength</TableHead>
                <TableHead>Slump</TableHead>
                <TableHead>Air Content</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mixDesigns.map((design) => (
                <TableRow key={design.id}>
                  <TableCell className="font-medium">{design.id}</TableCell>
                  <TableCell>{design.name}</TableCell>
                  <TableCell>{design.strength}</TableCell>
                  <TableCell>{design.slump}</TableCell>
                  <TableCell>{design.airContent}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(design.status)}>
                      {design.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{design.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
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
  );
};

export default QCMixDesigns;
