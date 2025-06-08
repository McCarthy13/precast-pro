
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { batchTickets, scheduledPieces, getFormsByDepartment } from './mockData';
import BasicInformationSection from './BasicInformationSection';
import FormsSelectionSection from './FormsSelectionSection';
import TestResultsSection from './TestResultsSection';
import NotesSection from './NotesSection';

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

const FreshConcreteTestCard: React.FC<FreshConcreteTestCardProps> = ({ departmentName = "Precast" }) => {
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

  // Get department-specific forms with proper normalization
  const normalizedDept = departmentName.toLowerCase().replace(/\s+/g, '-');
  const departmentForms = getFormsByDepartment(normalizedDept);

  console.log('FreshConcreteTestCard - Department:', departmentName, 'Normalized:', normalizedDept);
  console.log('FreshConcreteTestCard - Forms:', departmentForms);

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
      const allFormNames = departmentForms.map(form => form.name);
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
    // Navigate to specific department QC page instead of using navigate(-1)
    const departmentRoute = departmentName ? departmentName.toLowerCase().replace(/\s+/g, '-') : 'precast';
    navigate(`/qc/${departmentRoute}`);
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
          <CardTitle>Fresh Concrete Test Data Entry - {departmentName}</CardTitle>
          <CardDescription>Record fresh concrete test measurements for {departmentName.toLowerCase()} production</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <BasicInformationSection
              testData={testData}
              updateField={updateField}
            />

            <FormsSelectionSection
              selectedForms={selectedForms}
              selectedPieces={selectedPieces}
              handleSelectAllForms={handleSelectAllForms}
              handleFormToggle={handleFormToggle}
              handlePieceToggle={handlePieceToggle}
              departmentName={departmentName}
            />

            <TestResultsSection
              testData={testData}
              updateField={updateField}
            />
          </div>
          
          <div className="mt-6 text-sm text-gray-600 space-y-1">
            <p>• Record all measurements according to ASTM standards</p>
            <p>• Slump flow should be measured immediately after mixing</p>
            <p>• Air content and unit weight tests should be performed on fresh concrete</p>
          </div>
        </CardContent>
      </Card>

      <NotesSection notes={notes} setNotes={setNotes} />

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
