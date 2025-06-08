
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Play, Pause, Clock } from "lucide-react";

interface FlexicoreJob {
  jobNumber: string;
  shorthand: string;
  project: string;
  panelType: string;
  dimensions: string;
  marks: string[];
  quantity: number;
  completed: number;
  status: string;
  crew: string;
  startDate: string;
  dueDate: string;
  priority: string;
  formId: string;
}

interface FlexicoreJobCardProps {
  job: FlexicoreJob;
}

const FlexicoreJobCard = ({ job }: FlexicoreJobCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Play className="h-4 w-4 text-blue-600" />;
      case "paused":
        return <Pause className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Card className="border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-semibold">Job #{job.shorthand}</h4>
            <p className="text-sm text-gray-600">Full: {job.jobNumber}</p>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(job.status)}
            <Badge variant="outline">{job.status}</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm"><strong>Project:</strong> {job.project}</p>
            <p className="text-sm"><strong>Type:</strong> {job.panelType}</p>
            <p className="text-sm"><strong>Span:</strong> {job.dimensions}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm"><strong>Progress:</strong> {job.completed}/{job.quantity}</p>
            <p className="text-sm"><strong>Form:</strong> {job.formId}</p>
            <p className="text-sm"><strong>Crew:</strong> {job.crew}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-600 h-2 rounded-full" 
                style={{ width: `${(job.completed / job.quantity) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm">
              <strong>Mark #s:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {job.marks.map((mark) => (
                  <Badge key={mark} variant="outline" className="text-xs">
                    {mark}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="text-sm"><strong>Due:</strong> {job.dueDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlexicoreJobCard;
