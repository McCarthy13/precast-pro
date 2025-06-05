
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, Calendar } from "lucide-react";

const TeamCollaboration = () => {
  const teamMembers = [
    { name: "John Smith", role: "Project Manager", status: "online", projects: 3 },
    { name: "Sarah Johnson", role: "Engineer", status: "away", projects: 2 },
    { name: "Mike Chen", role: "QC Inspector", status: "online", projects: 4 },
    { name: "Emily Davis", role: "Designer", status: "offline", projects: 1 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={
                      member.status === 'online' ? 'bg-green-100 text-green-800' :
                      member.status === 'away' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {member.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{member.projects} projects</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <p><strong>John Smith</strong> updated Project Alpha timeline</p>
                <p className="text-gray-500">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p><strong>Sarah Johnson</strong> completed design review</p>
                <p className="text-gray-500">4 hours ago</p>
              </div>
              <div className="text-sm">
                <p><strong>Mike Chen</strong> added QC inspection notes</p>
                <p className="text-gray-500">6 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamCollaboration;
