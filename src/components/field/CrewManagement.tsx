
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, MapPin, Clock } from "lucide-react";

const CrewManagement = () => {
  const crews = [
    {
      name: "Team Alpha",
      members: 4,
      status: "active",
      location: "Downtown Office Complex",
      shift: "Day Shift (6:00 - 14:00)",
      supervisor: "John Smith"
    },
    {
      name: "Team Beta",
      members: 3,
      status: "available", 
      location: "Base Yard",
      shift: "Day Shift (6:00 - 14:00)",
      supervisor: "Sarah Johnson"
    },
    {
      name: "Team Gamma",
      members: 5,
      status: "active",
      location: "Retail Center",
      shift: "Day Shift (6:00 - 14:00)",
      supervisor: "Mike Chen"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Crew Management
          </CardTitle>
          <CardDescription>Manage field crews and their assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crews.map((crew, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{crew.name.split(' ')[1]?.charAt(0) || 'T'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{crew.name}</h4>
                      <p className="text-sm text-gray-600">{crew.members} members • {crew.supervisor}</p>
                    </div>
                  </div>
                  <Badge className={
                    crew.status === 'active' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }>
                    {crew.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {crew.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    {crew.shift}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrewManagement;
