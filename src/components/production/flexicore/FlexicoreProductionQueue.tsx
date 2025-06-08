
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FlexicoreJobCard from "./FlexicoreJobCard";

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

interface FlexicoreProductionQueueProps {
  jobs: FlexicoreJob[];
}

const FlexicoreProductionQueue = ({ jobs }: FlexicoreProductionQueueProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Flexicore Production Queue</CardTitle>
          <CardDescription>Flexible concrete deck production</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((job) => (
              <FlexicoreJobCard key={job.jobNumber} job={job} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlexicoreProductionQueue;
