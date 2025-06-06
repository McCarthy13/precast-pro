
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FreshConcreteTestData {
  date: string;
  time: string;
  mixDesign: string;
  batchTicket: string;
  pieces: string;
  slumpFlow: string;
  airContent: string;
  ambientTemp: string;
  concreteTemp: string;
  unitWeight: string;
  yield: string;
  relativeYield: string;
  t20: string;
  jRing: string;
  staticSegregation: string;
  technician: string;
}

interface FreshConcreteTestCardProps {
  departmentName?: string;
}

const FreshConcreteTestCard: React.FC<FreshConcreteTestCardProps> = ({ departmentName = "" }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testData, setTestData] = useState<FreshConcreteTestData>({
    date: '',
    time: '',
    mixDesign: '',
    batchTicket: '',
    pieces: '',
    slumpFlow: '',
    airContent: '',
    ambientTemp: '',
    concreteTemp: '',
    unitWeight: '',
    yield: '',
    relativeYield: '',
    t20: '',
    jRing: '',
    staticSegregation: '',
    technician: ''
  });

  const updateField = (field: keyof FreshConcreteTestData, value: string) => {
    setTestData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Check if at least some required fields are filled
      if (!testData.date || !testData.mixDesign || !testData.slumpFlow) {
        toast({
          title: "Missing Required Fields",
          description: "Please fill in at least Date, Mix Design, and Slump Flow.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const record = {
        id: `FCT-${Date.now()}`,
        departmentName: departmentName || "Unknown",
        submittedAt: new Date().toISOString(),
        testData: testData,
        notes: notes,
        status: 'completed'
      };

      const existingRecords = JSON.parse(localStorage.getItem('freshConcreteTestRecords') || '[]');
      existingRecords.push(record);
      localStorage.setItem('freshConcreteTestRecords', JSON.stringify(existingRecords));

      console.log('Fresh concrete test record created:', record);

      toast({
        title: "Test Submitted Successfully",
        description: `Fresh concrete test record ${record.id} has been created.`,
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={testData.date}
                onChange={(e) => updateField('date', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={testData.time}
                onChange={(e) => updateField('time', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mixDesign">Mix Design</Label>
              <Input
                id="mixDesign"
                value={testData.mixDesign}
                onChange={(e) => updateField('mixDesign', e.target.value)}
                placeholder="e.g., MD-001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="batchTicket">Batch Ticket</Label>
              <Input
                id="batchTicket"
                value={testData.batchTicket}
                onChange={(e) => updateField('batchTicket', e.target.value)}
                placeholder="e.g., BT-2024-0115-001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pieces">Pieces</Label>
              <Input
                id="pieces"
                value={testData.pieces}
                onChange={(e) => updateField('pieces', e.target.value)}
                placeholder="e.g., WP1-001, WP1-002"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slumpFlow">Slump Flow (in)</Label>
              <Input
                id="slumpFlow"
                type="number"
                step="0.25"
                value={testData.slumpFlow}
                onChange={(e) => updateField('slumpFlow', e.target.value)}
                placeholder="e.g., 5.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="airContent">Air Content (%)</Label>
              <Input
                id="airContent"
                type="number"
                step="0.1"
                value={testData.airContent}
                onChange={(e) => updateField('airContent', e.target.value)}
                placeholder="e.g., 6.2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ambientTemp">Ambient Temperature (°F)</Label>
              <Input
                id="ambientTemp"
                type="number"
                value={testData.ambientTemp}
                onChange={(e) => updateField('ambientTemp', e.target.value)}
                placeholder="e.g., 72"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="concreteTemp">Concrete Temperature (°F)</Label>
              <Input
                id="concreteTemp"
                type="number"
                value={testData.concreteTemp}
                onChange={(e) => updateField('concreteTemp', e.target.value)}
                placeholder="e.g., 68"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unitWeight">Unit Weight (lb/ft³)</Label>
              <Input
                id="unitWeight"
                type="number"
                step="0.1"
                value={testData.unitWeight}
                onChange={(e) => updateField('unitWeight', e.target.value)}
                placeholder="e.g., 145.2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yield">Yield (ft³/yd³)</Label>
              <Input
                id="yield"
                type="number"
                step="0.1"
                value={testData.yield}
                onChange={(e) => updateField('yield', e.target.value)}
                placeholder="e.g., 27.0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="relativeYield">Relative Yield</Label>
              <Input
                id="relativeYield"
                type="number"
                step="0.01"
                value={testData.relativeYield}
                onChange={(e) => updateField('relativeYield', e.target.value)}
                placeholder="e.g., 1.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="t20">T-20 (sec)</Label>
              <Input
                id="t20"
                type="number"
                step="0.1"
                value={testData.t20}
                onChange={(e) => updateField('t20', e.target.value)}
                placeholder="e.g., 12.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jRing">J-Ring</Label>
              <Input
                id="jRing"
                value={testData.jRing}
                onChange={(e) => updateField('jRing', e.target.value)}
                placeholder="Pass/Fail"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="staticSegregation">Static Segregation</Label>
              <Input
                id="staticSegregation"
                value={testData.staticSegregation}
                onChange={(e) => updateField('staticSegregation', e.target.value)}
                placeholder="Pass/Fail"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technician">Technician</Label>
              <Input
                id="technician"
                value={testData.technician}
                onChange={(e) => updateField('technician', e.target.value)}
                placeholder="Technician name"
              />
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-600 space-y-1">
            <p>• Record all measurements according to ASTM standards</p>
            <p>• Slump flow should be measured immediately after mixing</p>
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
