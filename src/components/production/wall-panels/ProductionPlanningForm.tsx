
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProductionPlanningForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Production Planning & Scheduling</CardTitle>
        <CardDescription>Plan upcoming wall panel production</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="project-name">Project Name</Label>
            <Input id="project-name" placeholder="Enter project name" />
            
            <Label htmlFor="panel-type">Panel Type</Label>
            <select className="w-full p-2 border rounded-md">
              <option>Architectural</option>
              <option>Standard</option>
              <option>Insulated</option>
              <option>Load-bearing</option>
            </select>
            
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" placeholder="Number of panels" />
            
            <Label htmlFor="dimensions">Dimensions</Label>
            <Input id="dimensions" placeholder="Length x Width x Thickness" />
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="concrete-strength">Concrete Strength (PSI)</Label>
            <Input id="concrete-strength" placeholder="e.g., 4000" />
            
            <Label htmlFor="finish-type">Finish Type</Label>
            <select className="w-full p-2 border rounded-md">
              <option>Smooth</option>
              <option>Textured</option>
              <option>Exposed Aggregate</option>
              <option>Sandblasted</option>
            </select>
            
            <Label htmlFor="due-date">Due Date</Label>
            <Input id="due-date" type="date" />
            
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Schedule Production
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductionPlanningForm;
