
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Job } from "@/types/production";

interface JobTableProps {
  jobs: Job[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "in-progress":
      return <Clock className="h-4 w-4 text-blue-600" />;
    case "quality-hold":
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const JobTable = ({ jobs }: JobTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job ID</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Type & Specs</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Crew</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-medium">{job.id}</TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{job.project}</p>
                <Badge variant="outline" className="text-xs">
                  {job.priority} priority
                </Badge>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <p><strong>{job.panelType}</strong></p>
                <p>{job.dimensions}</p>
                {job.concreteStrength && <p className="text-gray-500">{job.concreteStrength}</p>}
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{job.completed}/{job.quantity}</span>
                  <span>{Math.round((job.completed / job.quantity) * 100)}%</span>
                </div>
                <Progress value={(job.completed / job.quantity) * 100} className="h-2" />
              </div>
            </TableCell>
            <TableCell>{job.crew}</TableCell>
            <TableCell>{job.dueDate}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                {getStatusIcon(job.status)}
                <Badge variant="outline">{job.status}</Badge>
              </div>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm">Details</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JobTable;
