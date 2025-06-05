
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Plus } from "lucide-react";

const TaskManagement = () => {
  const tasks = [
    { id: 1, title: "Design Review", project: "Project Alpha", priority: "high", status: "completed", assignee: "John Smith" },
    { id: 2, title: "Material Procurement", project: "Project Beta", priority: "medium", status: "in-progress", assignee: "Sarah Johnson" },
    { id: 3, title: "Quality Inspection", project: "Project Alpha", priority: "high", status: "pending", assignee: "Mike Chen" },
    { id: 4, title: "Installation Planning", project: "Project Gamma", priority: "low", status: "pending", assignee: "Emily Davis" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <AlertCircle className="h-4 w-4 text-orange-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Task Management</h3>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(task.status)}
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.project} • {task.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {task.priority}
                  </Badge>
                  <Badge variant="outline">{task.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
