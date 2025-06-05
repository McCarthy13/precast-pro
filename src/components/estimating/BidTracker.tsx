
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Clock, CheckCircle, X } from "lucide-react";

const BidTracker = () => {
  const bids = [
    {
      project: "Downtown Office Complex",
      customer: "ABC Construction",
      value: "$125,000",
      status: "pending",
      submitted: "2024-01-10",
      decision: "2024-01-25"
    },
    {
      project: "Industrial Warehouse",
      customer: "XYZ Development",
      value: "$89,500",
      status: "won",
      submitted: "2024-01-08",
      decision: "2024-01-15"
    },
    {
      project: "Retail Center",
      customer: "DEF Properties",
      value: "$156,000",
      status: "lost",
      submitted: "2024-01-05",
      decision: "2024-01-12"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "won": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "lost": return <X className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "won": return "bg-green-100 text-green-800";
      case "lost": return "bg-red-100 text-red-800";
      default: return "bg-orange-100 text-orange-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Bid Tracker
          </CardTitle>
          <CardDescription>Track all submitted bids and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Decision Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bids.map((bid, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{bid.project}</TableCell>
                  <TableCell>{bid.customer}</TableCell>
                  <TableCell>{bid.value}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(bid.status)}
                      <Badge className={getStatusColor(bid.status)}>
                        {bid.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{bid.submitted}</TableCell>
                  <TableCell>{bid.decision}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BidTracker;
