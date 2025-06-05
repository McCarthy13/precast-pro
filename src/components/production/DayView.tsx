
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Users } from "lucide-react";
import { ProductionForm } from "@/types/production";

interface DayViewProps {
  forms: ProductionForm[];
  department: string;
  date?: string;
}

const DayView: React.FC<DayViewProps> = ({ forms, department, date = new Date().toLocaleDateString() }) => {
  const activeForms = forms.filter(form => form.isActive && form.scheduledJobs.length > 0);
  const totalCapacity = forms.reduce((sum, form) => sum + form.capacity, 0);
  const totalScheduled = forms.reduce((sum, form) => sum + form.scheduledJobs.length, 0);
  const utilizationRate = totalCapacity > 0 ? (totalScheduled / totalCapacity) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Day View - {date}</h3>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-sm">
            {activeForms.length} Active Forms
          </Badge>
          <Badge variant="outline" className="text-sm">
            {utilizationRate.toFixed(0)}% Capacity
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {forms.map((form) => (
          <Card key={form.id} className={`${form.scheduledJobs.length > 0 ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                {form.name}
                <Badge variant={form.scheduledJobs.length > 0 ? "default" : "secondary"} className="text-xs">
                  {form.scheduledJobs.length}/{form.capacity}
                </Badge>
              </CardTitle>
              {form.dimensions && (
                <CardDescription className="text-xs">{form.dimensions}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress 
                value={(form.scheduledJobs.length / form.capacity) * 100} 
                className="h-2"
              />
              
              {form.scheduledJobs.length > 0 ? (
                <div className="space-y-2">
                  {form.scheduledJobs.slice(0, 3).map((job, index) => (
                    <div key={job.id} className="text-xs p-2 bg-white rounded border">
                      <div className="font-medium truncate">{job.project}</div>
                      <div className="text-gray-500 flex items-center justify-between">
                        <span>#{job.id}</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {job.startDate}
                        </span>
                      </div>
                    </div>
                  ))}
                  {form.scheduledJobs.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{form.scheduledJobs.length - 3} more pieces
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-400 text-xs py-4">
                  No pieces scheduled
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DayView;
