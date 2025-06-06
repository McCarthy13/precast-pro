import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Filter out empty rows
      const validData = moistureData.filter(row => 
        row.date || row.binNumber || row.aggregate || row.wetWeight || row.dryWeight
      );

      if (validData.length === 0) {
        toast({
          title: "No Data to Submit",
          description: "Please fill in at least one row of moisture test data.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Create the moisture test record
      const record = {
        id: `MT-${Date.now()}`,
        departmentName: departmentName || "Unknown",
        submittedAt: new Date().toISOString(),
        testData: validData,
        notes: notes,
        status: 'completed'
      };

      // Store in localStorage for now (would be database in real implementation)
      const existingRecords = JSON.parse(localStorage.getItem('moistureTestRecords') || '[]');
      existingRecords.push(record);
      localStorage.setItem('moistureTestRecords', JSON.stringify(existingRecords));

      console.log('Moisture test record created:', record);

      toast({
        title: "Test Submitted Successfully",
        description: `Moisture test record ${record.id} has been created with ${validData.length} test entries.`,
      });

      // Navigate to moisture historical records
      const departmentRoute = departmentName ? departmentName.toLowerCase().replace(/\s+/g, '-') : 'precast';
      navigate(`/qc/${departmentRoute}`, { state: { showMoistureRecords: true } });

    } catch (error) {
      console.error('Error submitting moisture test:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting the moisture test. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handleCancel} className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter any observations, equipment calibration notes, or additional comments..."
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
};

export default MoistureTestCard;
