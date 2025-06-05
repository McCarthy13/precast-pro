
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";

interface QualityControlSectionProps {
  qualityCheckpoints: string[];
}

const QualityControlSection = ({ qualityCheckpoints }: QualityControlSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wall Panel Quality Control</CardTitle>
        <CardDescription>Quality checkpoints and inspection protocols</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Quality Checkpoints</h4>
            <div className="space-y-2">
              {qualityCheckpoints.map((checkpoint, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{checkpoint}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Recent Quality Issues</h4>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="font-medium text-sm">Concrete strength below spec</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Job WP-2024-001 - Panel #15</p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="font-medium text-sm">Embedment misalignment</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Job WP-2024-003 - Panel #8</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityControlSection;
