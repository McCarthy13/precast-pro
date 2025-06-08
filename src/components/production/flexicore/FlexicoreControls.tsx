
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FlexicoreControls = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Flexicore Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full bg-orange-600 hover:bg-orange-700">
          Start Flexicore Pour
        </Button>
        <Button variant="outline" className="w-full">
          Bed Preparation
        </Button>
        <Button variant="outline" className="w-full">
          Reinforcement Setup
        </Button>
        <Button variant="outline" className="w-full">
          Stress Monitoring
        </Button>
      </CardContent>
    </Card>
  );
};

export default FlexicoreControls;
