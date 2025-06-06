
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink } from "lucide-react";
import MoistureTestTable from './MoistureTestTable';

interface MoistureTestData {
  date: Date | undefined;
  binNumber: string;
  aggregate: string;
  wetWeight: string;
  dryWeight: string;
}

interface MoistureTestCardProps {
  departmentName?: string;
}

const MoistureTestCard: React.FC<MoistureTestCardProps> = ({ departmentName = "" }) => {
  const [moistureData, setMoistureData] = useState<MoistureTestData[]>(
    Array(10).fill(null).map(() => ({
      date: undefined,
      binNumber: '',
      aggregate: '',
      wetWeight: '',
      dryWeight: ''
    }))
  );

  const absorptionValues: { [key: string]: number } = {
    "3/8\" Pea Gravel": 2.5,
    "Fine Sand": 3.3,
    "3/4\" Stone": 1.5,
    "1/2\" Stone": 1.5,
    "Coarse Sand": 2.8,
    "1\" Stone": 1.2,
    "Mason Sand": 3.0,
    "#57 Stone": 1.8
  };

  const updateRow = (index: number, field: keyof MoistureTestData, value: any) => {
    const newData = [...moistureData];
    newData[index] = { ...newData[index], [field]: value };
    setMoistureData(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <a href="/templates/moisture-test" className="flex items-center">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Full Template
          </a>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Moisture Test Data Entry{departmentName && ` - ${departmentName}`}</CardTitle>
          <CardDescription>Record moisture test measurements for aggregate materials</CardDescription>
        </CardHeader>
        <CardContent>
          <MoistureTestTable
            moistureData={moistureData}
            onUpdateRow={updateRow}
            absorptionValues={absorptionValues}
          />
          
          <div className="mt-4 text-sm text-gray-600">
            <p>• Total Moisture = ((Wet Weight - Dry Weight) / Dry Weight) × 100</p>
            <p>• Free Moisture = Total Moisture - Absorption</p>
            <p>• Absorption values are automatically retrieved from material database</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes and Observations</CardTitle>
          <CardDescription>Additional comments and observations</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Enter any observations, equipment calibration notes, or additional comments..."
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <div className="flex space-x-4">
          <Button variant="outline">Save Draft</Button>
          <Button>Submit for Review</Button>
        </div>
      </div>
    </div>
  );
};

export default MoistureTestCard;
