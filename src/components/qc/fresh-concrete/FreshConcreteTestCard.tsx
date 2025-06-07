import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mixDesigns, batchTickets, scheduledPieces, precastForms } from './mockData';

interface FreshConcreteTestData {
  date: string;
  time: string;
  forms: string[];
  mixDesign: string;
  batchTicket: string;
  pieces: string[];
  slumpFlow: string;
  airContent: string;
  ambientTemp: string;
  concreteTemp: string;
  unitWeight: string;
  releaseRequired: string;
  strengthRequired: string;
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
  const [selectedForms, setSelectedForms] = useState<Set<string>>(new Set());
  const [testData, setTestData] = useState<FreshConcreteTestData>({
    date: '',
    time: '',
    forms: [],
    mixDesign: '',
    batchTicket: '',
    pieces: [],
    slumpFlow: '',
    airContent: '',
    ambientTemp: '',
    concreteTemp: '',
    unitWeight: '',
    releaseRequired: '',
    strengthRequired: '',
    yield: '',
    relativeYield: '',
    t20: '',
    jRing: '',
    staticSegregation: ''
  });

  const updateField = (field: keyof FreshConcreteTestData, value: string | string[]) => {
    setTestData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate relative yield when batch ticket changes
  useEffect(() => {
    if (testData.batchTicket) {
      const selectedBatch = batchTickets.find(batch => batch.id === testData.batchTicket);
      if (selectedBatch) {
        updateField('yield', selectedBatch.yield);
        const relativeYield = parseFloat(selectedBatch.yield) / (27 * parseFloat(selectedBatch.batchSize));
        updateField('relativeYield', relativeYield.toFixed(3));
      }
    }
  }, [testData.batchTicket]);

  // Update forms array when selection changes
  useEffect(() => {
    const formsArray = Array.from(selectedForms);
    updateField('forms', formsArray);
  }, [selectedForms]);

  // Update pieces array when selection changes
  useEffect(() => {
    const piecesArray = Array.from(selectedPieces);
    updateField('pieces', piecesArray);
  }, [selectedPieces]);

  const handleSelectAllForms = (checked: boolean) => {
    if (checked) {
      const allFormNames = precastForms.map(form => form.name);
      setSelectedForms(new Set(allFormNames));
      
      // Also select all pieces from all forms
      const allPieceIds = Object.values(scheduledPieces).flat().map(piece => piece.id);
      setSelectedPieces(new Set(allPieceIds));
    } else {
      setSelectedForms(new Set());
      setSelectedPieces(new Set());
    }
  };

  const handleFormToggle = (formName: string, checked: boolean) => {
    const newSelection = new Set(selectedForms);
    if (checked) {
      newSelection.add(formName);
      // Auto-select all pieces from this form
      const formPieces = scheduledPieces[formName] || [];
      const newPieceSelection = new Set(selectedPieces);
      formPieces.forEach(piece => {
        newPieceSelection.add(piece.id);
      });
      setSelectedPieces(newPieceSelection);
    } else {
      newSelection.delete(formName);
      // Also remove all pieces from this form
      const formPieces = scheduledPieces[formName] || [];
      const newPieceSelection = new Set(selectedPieces);
      formPieces.forEach(piece => {
        newPieceSelection.delete(piece.id);
      });
      setSelectedPieces(newPieceSelection);
    }
    setSelectedForms(newSelection);
  };

  const handlePieceToggle = (pieceId: string, checked: boolean) => {
    const newSelection = new Set(selectedPieces);
    if (checked) {
      newSelection.add(pieceId);
    } else {
      newSelection.delete(pieceId);
    }
    setSelectedPieces(newSelection);
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

      // Extract job numbers and piece IDs from selected pieces
      const allPieces = Object.values(scheduledPieces).flat();
      const selectedPieceData = Array.from(selectedPieces).map(pieceId => {
        const piece = allPieces.find(p => p.id === pieceId);
        return piece ? { jobNumber: piece.jobNumber, pieceId: piece.pieceId } : null;
      }).filter(Boolean);

      // Group pieces by job number
      const piecesByJob = selectedPieceData.reduce((acc, piece) => {
        if (!piece) return acc;
        if (!acc[piece.jobNumber]) {
          acc[piece.jobNumber] = [];
        }
        acc[piece.jobNumber].push(piece.pieceId);
        return acc;
      }, {} as Record<string, string[]>);

      // Generate a unique form submission ID
      const formSubmissionId = `FSI-${Date.now()}`;

      // Create separate records for each job
      const records = Object.entries(piecesByJob).map(([jobNumber, pieceIds]) => ({
        id: `FCT-${Date.now()}-${jobNumber}`,
        formSubmissionId: formSubmissionId,
        departmentName: departmentName || "Unknown",
        submittedAt: new Date().toISOString(),
        testData: {
          ...testData,
          job: jobNumber,
          pieces: pieceIds.join(', ')
        },
        notes: notes,
        status: 'completed'
      }));

      const existingRecords = JSON.parse(localStorage.getItem('freshConcreteTestRecords') || '[]');
      existingRecords.push(...records);
      localStorage.setItem('freshConcreteTestRecords', JSON.stringify(existingRecords));

      console.log('Fresh concrete test records created:', records);

      toast({
        title: "Test Submitted Successfully",
        description: `${records.length} fresh concrete test record(s) have been created.`,
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
          <div className="space-y-6">
            {/* Basic Information Section */}
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

              {/* Forms/Workspaces Selection with 4-Column Layout */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base font-medium">Select Forms/Workspaces and Pieces</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="selectAllForms"
                      checked={selectedForms.size === precastForms.length}
                      onCheckedChange={(checked) => handleSelectAllForms(checked as boolean)}
                    />
                    <Label htmlFor="selectAllForms" className="text-sm cursor-pointer font-medium">
                      Select All
                    </Label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {precastForms.map((form) => {
                    const formPieces = scheduledPieces[form.name] || [];
                    const isFormSelected = selectedForms.has(form.name);
                    
                    return (
                      <div key={form.id} className="border rounded-md p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            id={form.name}
                            checked={isFormSelected}
                            onCheckedChange={(checked) => handleFormToggle(form.name, checked as boolean)}
                          />
                          <Label htmlFor={form.name} className="text-sm cursor-pointer font-medium">
                            {form.name}
                          </Label>
                          <span className="text-xs text-muted-foreground">
                            ({formPieces.length})
                          </span>
                        </div>
                        
                        {/* Always show pieces for each form */}
                        {formPieces.length > 0 && (
                          <div className="ml-5 space-y-1 border-l border-border pl-2">
                            {formPieces.map((piece) => (
                              <div key={piece.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={piece.id}
                                  checked={selectedPieces.has(piece.id)}
                                  onCheckedChange={(checked) => handlePieceToggle(piece.id, checked as boolean)}
                                />
                                <Label htmlFor={piece.id} className="text-xs cursor-pointer">
                                  {piece.pieceId}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {formPieces.length === 0 && (
                          <div className="ml-5 text-xs text-muted-foreground italic">
                            No pieces scheduled
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
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
                  <Label htmlFor="releaseRequired">Release Required (psi)</Label>
                  <Input
                    id="releaseRequired"
                    type="number"
                    value={testData.releaseRequired}
                    onChange={(e) => updateField('releaseRequired', e.target.value)}
                    placeholder="e.g., 3500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="strengthRequired">28-Day Strength Required (psi)</Label>
                  <Input
                    id="strengthRequired"
                    type="number"
                    value={testData.strengthRequired}
                    onChange={(e) => updateField('strengthRequired', e.target.value)}
                    placeholder="e.g., 5000"
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
