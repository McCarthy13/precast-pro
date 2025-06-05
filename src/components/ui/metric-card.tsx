
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  valueColor?: string;
}

const MetricCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  iconColor = "text-blue-600",
  valueColor = "text-blue-600" 
}: MetricCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
            {description && (
              <p className="text-xs text-gray-600 mt-1">{description}</p>
            )}
          </div>
          {Icon && <Icon className={`h-8 w-8 ${iconColor}`} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
