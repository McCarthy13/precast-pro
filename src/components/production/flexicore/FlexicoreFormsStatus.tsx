
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface FlexicoreFormsStatusProps {
  jobs: FlexicoreJob[];
}

const FlexicoreFormsStatus = ({ jobs }: FlexicoreFormsStatusProps) => {
  const forms = [
    { name: "FL12x24", quantity: 20, type: "12x24" },
    { name: "FL8x24", quantity: 20, type: "8x24" },
    { name: "FL12x16", quantity: 3, type: "12x16" },
    { name: "FL8x16", quantity: 3, type: "8x16" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flexicore Forms Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form) => {
            const assignedJob = jobs.find(job => job.formId === form.name);
            
            return (
              <Card key={form.name} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{form.name}</h4>
                    <Badge variant={assignedJob ? "secondary" : "default"}>
                      {assignedJob ? "In Use" : "Available"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Size: {form.type} | Qty: {form.quantity}
                  </p>
                  {assignedJob ? (
                    <div className="text-sm text-gray-600 mt-2">
                      <p>Job #{assignedJob.shorthand}</p>
                      <p>{assignedJob.project}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">Ready for assignment</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlexicoreFormsStatus;
