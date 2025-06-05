
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, Calendar, DollarSign, Users } from "lucide-react";

const ProjectOverview = () => {
  const projects = [
    {
      name: "Project Alpha",
      status: "active",
      progress: 75,
      budget: "$1.2M",
      team: 8,
      deadline: "2024-03-15"
    },
    {
      name: "Project Beta", 
      status: "active",
      progress: 45,
      budget: "$850K",
      team: 6,
      deadline: "2024-04-20"
    },
    {
      name: "Project Gamma",
      status: "planning",
      progress: 15,
      budget: "$2.1M",
      team: 12,
      deadline: "2024-06-30"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FolderOpen className="h-5 w-5 mr-2 text-emerald-600" />
                {project.name}
              </CardTitle>
              <CardDescription>
                <Badge className={project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                  {project.status}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                    {project.budget}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-blue-600" />
                    {project.team} members
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1 text-orange-600" />
                  Due: {project.deadline}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectOverview;
