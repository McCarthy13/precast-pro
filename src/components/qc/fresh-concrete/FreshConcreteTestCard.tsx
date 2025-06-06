
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PieceSelection from '../PieceSelection';

interface FreshConcreteTestData {
  date: string;
  time: string;
  mixDesign: string;
  batchTicket: string;
  pieces: string[];
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
}

interface FreshConcreteTestCardProps {
  departmentName?: string;
}

const FreshConcreteTestCard: React.FC<FreshConcreteTestCardProps> = ({ departmentName = "" }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPieces, setSelectedPieces] = useState<Set<string>>(new Set());
  const [testData, setTestData] = useState<FreshConcreteTestData>({
    date: '',
    time: '',
    mixDesign: '',
    batchTicket: '',
    pieces: [],
    slumpFlow: '',
    airContent: '',
    ambientTemp: '',
    concreteTemp: '',
    unitWeight: '',
    yield: '',
    relativeYield: '',
    t20: '',
    jRing: '',
    staticSegregation: ''
  });

  // Mock data for mix designs from QC module
  const mixDesigns = [
    { id: 'MD-001', name: 'Standard Wall Panel Mix - 5000 PSI', department: departmentName },
    { id: 'MD-002', name: 'Double Tee Mix Design - 6000 PSI', department: departmentName },
    { id: 'MD-003', name: 'Architectural Precast Mix - 4500 PSI', department: departmentName },
  ];

  // Mock data for batch tickets from batching software integration
  const batchTickets = [
    { id: 'BT-2024-0115-001', mixDesign: 'MD-001', yield: '27.0', batchSize: '1.0' },
    { id: 'BT-2024-0115-002', mixDesign: 'MD-002', yield: '26.8', batchSize: '1.5' },
    { id: 'BT-2024-0115-003', mixDesign: 'MD-001', yield: '27.2', batchSize: '2.0' },
  ];

  // Mock scheduled pieces data
  const scheduledPieces = {
    'Form A': [
      { id: 'WP1-001', name: 'Wall Panel 1' },
      { id: 'WP1-002', name: 'Wall Panel 2' },
    ],
    'Form B': [
      { id: 'DT2-001', name: 'Double Tee 1' },
      { id: 'DT2-002', name: 'Double Tee 2' },
    ],
  };

  const updateField = (field: keyof FreshConcreteTestData, value: string | string[]) => {
    setTestData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate relative yield when batch ticket changes
  useEffect(() => {
    if (testData.batchTicket) {
      const selectedBatch = batchTickets.find(batch => batch.id === testData.batchTicket);
      if (selectedBatch) {
        // Set yield from batch ticket
        updateField('yield', selectedBatch.yield);
        
        // Calculate relative yield: Yield / (27 * Batch size)
        const relativeYield = parseFloat(selectedBatch.yield) / (27 * parseFloat(selectedBatch.batchSize));
        updateField('relativeYield', relativeYield.toFixed(3));
      }
    }
  }, [testData.batchTicket]);

  // Update pieces array when selection changes
  useEffect(() => {
    const piecesArray = Array.from(selectedPieces);
    updateField('pieces', piecesArray);
  }, [selectedPieces]);

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
          {/* Basic Information Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
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
                  <Select value={testData.mixDesign} onValueChange={(value) => updateField('mixDesign', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mix design" />
                    </SelectTrigger>
                    <SelectContent>
                      {mixDesigns.map((design) => (
                        <SelectItem key={design.id} value={design.id}>
                          {design.id} - {design.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="batchTicket">Batch Ticket</Label>
                  <Select value={testData.batchTicket} onValueChange={(value) => updateField('batchTicket', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select batch ticket" />
                    </SelectTrigger>
                    <SelectContent>
                      {batchTickets
                        .filter(batch => !testData.mixDesign || batch.mixDesign === testData.mixDesign)
                        .map((batch) => (
                        <SelectItem key={batch.id} value={batch.id}>
                          {batch.id} (Yield: {batch.yield}, Size: {batch.batchSize})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Pieces Selection */}
              <PieceSelection
                scheduledPieces={scheduledPieces}
                selectedPieces={selectedPieces}
                onSelectionChange={setSelectedPieces}
              />
            </div>

            {/* Test Results Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Test Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    placeholder="Auto-filled from batch"
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relativeYield">Relative Yield</Label>
                  <Input
                    id="relativeYield"
                    type="number"
                    step="0.001"
                    value={testData.relativeYield}
                    onChange={(e) => updateField('relativeYield', e.target.value)}
                    placeholder="Auto-calculated"
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>

              {/* Additional Specifications */}
              <div className="mt-6 border-t pt-6">
                <h4 className="text-md font-medium mb-4">Additional Specifications:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <Select value={testData.jRing} onValueChange={(value) => updateField('jRing', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select result" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pass">Pass</SelectItem>
                        <SelectItem value="Fail">Fail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="staticSegregation">Static Segregation</Label>
                    <Select value={testData.staticSegregation} onValueChange={(value) => updateField('staticSegregation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select result" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pass">Pass</SelectItem>
                        <SelectItem value="Fail">Fail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
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
