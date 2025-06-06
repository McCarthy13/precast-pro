
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FreshConcreteTestData {
  date: Date | undefined;
  mixDesign: string;
  batchNumber: string;
  slump: string;
  airContent: string;
  temperature: string;
  unitWeight: string;
}

interface FreshConcreteTestCardProps {
  departmentName?: string;
}

const FreshConcreteTestCard: React.FC<FreshConcreteTestCardProps> = ({ departmentName = "" }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testData, setTestData] = useState<FreshConcreteTestData[]>(
    Array(10).fill(null).map(() => ({
      date: undefined,
      mixDesign: '',
      batchNumber: '',
      slump: '',
      airContent: '',
      temperature: '',
      unitWeight: ''
    }))
  );

  const updateRow = (index: number, field: keyof FreshConcreteTestData, value: any) => {
    const newData = [...testData];
    newData[index] = { ...newData[index], [field]: value };
    setTestData(newData);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const validData = testData.filter(row => 
        row.date || row.mixDesign || row.batchNumber || row.slump || row.airContent || row.temperature || row.unitWeight
      );

      if (validData.length === 0) {
        toast({
          title: "No Data to Submit",
          description: "Please fill in at least one row of test data.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const record = {
        id: `FCT-${Date.now()}`,
        departmentName: departmentName || "Unknown",
        submittedAt: new Date().toISOString(),
        testData: validData,
        notes: notes,
        status: 'completed'
      };

      const existingRecords = JSON.parse(localStorage.getItem('freshConcreteTestRecords') || '[]');
      existingRecords.push(record);
      localStorage.setItem('freshConcreteTestRecords', JSON.stringify(existingRecords));

      console.log('Fresh concrete test record created:', record);

      toast({
        title: "Test Submitted Successfully",
        description: `Fresh concrete test record ${record.id} has been created with ${validData.length} test entries.`,
      });

      const departmentRoute = departmentName ? departmentName.toLowerCase().replace(/\s+/g, '-') : 'precast';
      navigate(`/qc/${departmentRoute}`, { state: { showFreshConcreteRecords: true } });

    } catch (error) {
      console.error('Error submitting fresh concrete test:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting the test. Please try again.",
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
          <a href="/templates/fresh-concrete-test" className="flex items-center">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Full Template
          </a>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fresh Concrete Test Data Entry{departmentName && ` - ${departmentName}`}</CardTitle>
          <CardDescription>Record fresh concrete test measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-2 text-left">Date</th>
                    <th className="border border-gray-300 p-2 text-left">Mix Design</th>
                    <th className="border border-gray-300 p-2 text-left">Batch #</th>
                    <th className="border border-gray-300 p-2 text-left">Slump (in)</th>
                    <th className="border border-gray-300 p-2 text-left">Air Content (%)</th>
                    <th className="border border-gray-300 p-2 text-left">Temperature (°F)</th>
                    <th className="border border-gray-300 p-2 text-left">Unit Weight (lb/ft³)</th>
                  </tr>
                </thead>
                <tbody>
                  {testData.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="date"
                          value={row.date ? new Date(row.date).toISOString().split('T')[0] : ''}
                          onChange={(e) => updateRow(index, 'date', e.target.value ? new Date(e.target.value) : undefined)}
                          className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          value={row.mixDesign}
                          onChange={(e) => updateRow(index, 'mixDesign', e.target.value)}
                          className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                          placeholder="Mix design"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="text"
                          value={row.batchNumber}
                          onChange={(e) => updateRow(index, 'batchNumber', e.target.value)}
                          className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                          placeholder="Batch #"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="number"
                          step="0.25"
                          value={row.slump}
                          onChange={(e) => updateRow(index, 'slump', e.target.value)}
                          className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                          placeholder="0.0"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="number"
                          step="0.1"
                          value={row.airContent}
                          onChange={(e) => updateRow(index, 'airContent', e.target.value)}
                          className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                          placeholder="0.0"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="number"
                          value={row.temperature}
                          onChange={(e) => updateRow(index, 'temperature', e.target.value)}
                          className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                          placeholder="70"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input
                          type="number"
                          step="0.1"
                          value={row.unitWeight}
                          onChange={(e) => updateRow(index, 'unitWeight', e.target.value)}
                          className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                          placeholder="0.0"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>• Record all measurements according to ASTM standards</p>
            <p>• Slump should be measured immediately after mixing</p>
            <p>• Air content and unit weight tests should be performed on fresh concrete</p>
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

export default FreshConcreteTestCard;
