import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FreshTest {
  id: string;
  date: string;
  time: string;
  job: string;
  mixDesign: string;
  batchTicket: string;
  pieces: string;
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
  technician: string;
  status: string;
  submitted?: boolean;
  formSubmissionId?: string;
}

interface Column {
  key: string;
  label: string;
}

interface FreshConcreteTestsTableProps {
  tests: FreshTest[];
  columns: Column[];
  strengthData: Record<string, any>;
  updateStrengthData: (testId: string, field: string, value: string) => void;
  calculateAverage: (testId: string) => string;
}

const FreshConcreteTestsTable = ({
  tests,
  columns,
  strengthData,
  updateStrengthData,
  calculateAverage
}: FreshConcreteTestsTableProps) => {
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const measureRef = useRef<HTMLDivElement>(null);

  // Calculate optimal column widths based on content
  useEffect(() => {
    const calculateColumnWidths = () => {
      if (!measureRef.current) return;

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;

      // Set font to match table styling
      context.font = '12px system-ui, -apple-system, sans-serif';

      const widths: Record<string, number> = {};

      // Define all columns with their data and headers
      const columnData = [
        { key: 'date', header: 'Date', samples: tests.map(t => formatDate(t.date) || '00/00/00') },
        { key: 'time', header: 'Time', samples: tests.map(t => getFieldValue(t, 'time') || '00:00') },
        { key: 'mixDesign', header: 'Mix ID', samples: tests.map(t => getFieldValue(t, 'mixDesign') || 'MD-000') },
        { key: 'batchTicket', header: 'Batch #', samples: tests.map(t => getFieldValue(t, 'batchTicket') || '0000000') },
        { key: 'form', header: 'Form', samples: tests.map(t => getFormIdentifier(t)) },
        { key: 'job', header: 'Job', samples: tests.map(t => getFieldValue(t, 'job') || '0000') },
        { key: 'pieces', header: 'Pieces', samples: tests.map(t => getFieldValue(t, 'pieces') || 'C00, C00, B0') },
        { key: 'slumpFlow', header: 'Slump (Flow) (in)', samples: tests.map(t => getFieldValue(t, 'slumpFlow') || '00.00') },
        { key: 'airContent', header: 'Air (%)', samples: tests.map(t => getFieldValue(t, 'airContent') || '00.0') },
        { key: 'ambientTemp', header: 'Amb Temp (°F)', samples: tests.map(t => getFieldValue(t, 'ambientTemp') || '000') },
        { key: 'concreteTemp', header: 'Conc Temp (°F)', samples: tests.map(t => getFieldValue(t, 'concreteTemp') || '000') },
        { key: 'unitWeight', header: 'Unit Wt (lb/ft³)', samples: tests.map(t => getFieldValue(t, 'unitWeight') || '000.0') },
        { key: 'yield', header: 'Yield (ft³)', samples: tests.map(t => getFieldValue(t, 'yield') || '00.0') },
        { key: 'relativeYield', header: 'Rel Yield', samples: tests.map(t => getFieldValue(t, 'relativeYield') || '0.000') },
        { key: 'release', header: 'Release', samples: ['00000'] },
        { key: 'releaseRequired', header: 'Required', samples: ['0000'] },
        { key: 'releaseSubmit', header: 'Submit Release', samples: ['Submit'] },
        { key: 'strength1', header: '28-Day #1', samples: ['00000'] },
        { key: 'strength2', header: '28-Day #2', samples: ['00000'] },
        { key: 'strength3', header: '28-Day #3', samples: ['00000'] },
        { key: 'average', header: 'Average', samples: ['00000'] },
        { key: 'strengthRequired', header: 'Required', samples: ['0000'] },
        { key: 'strengthSubmit', header: 'Submit 28-Day', samples: ['Submit'] },
        { key: 't20', header: 'T-20 (sec)', samples: tests.map(t => getFieldValue(t, 't20') || '00.0') },
        { key: 'jRing', header: 'J-Ring', samples: tests.map(t => getFieldValue(t, 'jRing') || 'Pass') },
        { key: 'staticSegregation', header: 'Static Seg', samples: tests.map(t => getFieldValue(t, 'staticSegregation') || 'Pass') }
      ];

      columnData.forEach(({ key, header, samples }) => {
        // Measure header width
        let maxWidth = context.measureText(header).width;

        // Measure all sample data widths
        samples.forEach(sample => {
          const width = context.measureText(sample).width;
          maxWidth = Math.max(maxWidth, width);
        });

        // Add padding for input fields and cells (24px total padding)
        widths[key] = Math.max(maxWidth + 24, 60); // minimum 60px width
      });

      setColumnWidths(widths);
    };

    calculateColumnWidths();
  }, [tests, strengthData]);

  // Group tests by form submission ID to sync 28-day strength data
  const getFormSubmissionGroup = (testId: string) => {
    const test = tests.find(t => t.id === testId);
    if (!test?.formSubmissionId) return [testId];
    
    return tests
      .filter(t => t.formSubmissionId === test.formSubmissionId)
      .map(t => t.id);
  };

  // Enhanced update function that syncs 28-day strength data across form submission groups
  const handleStrengthDataUpdate = (testId: string, field: string, value: string) => {
    if (field.startsWith('strength') || field === 'strengthSubmitted') {
      // For 28-day strength fields, update all records in the same form submission group
      const groupIds = getFormSubmissionGroup(testId);
      groupIds.forEach(id => {
        updateStrengthData(id, field, value);
      });
    } else {
      // For release data, update only the specific record
      updateStrengthData(testId, field, value);
    }
  };

  // New function to handle main test data updates
  const handleTestDataUpdate = (testId: string, field: string, value: string) => {
    // Store test data updates in strengthData for simplicity
    updateStrengthData(testId, field, value);
  };

  // Helper function to get the current value for a field (either from strengthData or original test data)
  const getFieldValue = (test: FreshTest, field: string) => {
    return strengthData[test.id]?.[field] || test[field as keyof FreshTest] || '';
  };

  // Format date to MM/DD/YY
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid
    
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    
    return `${month}/${day}/${year}`;
  };

  const getReleaseColor = (testId: string, releaseRequired: string) => {
    const releaseData = strengthData[testId]?.release || '';
    if (!releaseData || !releaseRequired) return '';
    
    let actualValue = releaseData;
    if (releaseData.includes('/')) {
      actualValue = releaseData.split('/')[0];
    }
    
    const actual = parseFloat(actualValue);
    const required = parseFloat(releaseRequired);
    
    if (isNaN(actual) || isNaN(required)) return '';
    
    if (actual >= required) {
      return 'text-green-600 font-semibold';
    } else if (actual >= required - 300) {
      return 'text-yellow-600 font-semibold';
    } else {
      return 'text-red-600 font-semibold';
    }
  };

  const getAverageColor = (testId: string, strengthRequired: string) => {
    const average = calculateAverage(testId);
    if (!average || !strengthRequired) return '';
    
    const averageValue = parseFloat(average);
    const required = parseFloat(strengthRequired);
    
    if (isNaN(averageValue) || isNaN(required)) return '';
    
    if (averageValue >= required) {
      return 'text-green-600 font-semibold';
    } else if (averageValue >= required - 300) {
      return 'text-yellow-600 font-semibold';
    } else {
      return 'text-red-600 font-semibold';
    }
  };

  const formatReleaseValue = (testId: string, releaseRequired: string) => {
    const releaseActual = strengthData[testId]?.release || '';
    if (!releaseActual) {
      return `/${releaseRequired || '3500'}`;
    }
    return `${releaseActual}/${releaseRequired || '3500'}`;
  };

  const formatAverageValue = (testId: string, strengthRequired: string) => {
    const average = calculateAverage(testId);
    if (!average) {
      return `/${strengthRequired || '5000'}`;
    }
    return `${average}/${strengthRequired || '5000'}`;
  };

  const handleSubmitRelease = (testId: string) => {
    updateStrengthData(testId, 'releaseSubmitted', 'true');
    console.log(`Release data for ${testId} submitted for finalization`);
  };

  const handleSubmit28Day = (testId: string) => {
    // Submit 28-day data for all records in the same form submission group
    const groupIds = getFormSubmissionGroup(testId);
    groupIds.forEach(id => {
      updateStrengthData(id, 'strengthSubmitted', 'true');
    });
    console.log(`28-day strength data for group containing ${testId} submitted for finalization`);
  };

  const isReleaseComplete = (testId: string) => {
    const data = strengthData[testId];
    return data?.release;
  };

  const is28DayComplete = (testId: string) => {
    const data = strengthData[testId];
    return data?.strength1 && data?.strength2 && data?.strength3;
  };

  const isReleaseSubmitted = (testId: string) => {
    return strengthData[testId]?.releaseSubmitted === 'true';
  };

  const is28DaySubmitted = (testId: string) => {
    return strengthData[testId]?.strengthSubmitted === 'true';
  };

  // Helper function to get the form identifier
  const getFormIdentifier = (test: FreshTest) => {
    if (test.formSubmissionId) {
      // Extract a more readable form identifier from the submission ID
      const parts = test.formSubmissionId.split('-');
      if (parts.length >= 2) {
        return `Form ${parts[0]}-${parts[1]}`;
      }
      return `Form ${test.formSubmissionId.slice(0, 8)}`;
    }
    // Fallback to using first part of test ID
    return `Form ${test.id.split('-')[1] || 'Unknown'}`;
  };

  return (
    <div ref={measureRef}>
      <ScrollArea className="w-full rounded-md border">
        <Table className="table-fixed min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.date || 80}px`}}>Date</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.time || 60}px`}}>Time</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.mixDesign || 60}px`}}>Mix<br/>ID</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.batchTicket || 70}px`}}>Batch<br/>#</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.form || 80}px`}}>Form</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.job || 60}px`}}>Job</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.pieces || 100}px`}}>Pieces</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.slumpFlow || 80}px`}}>Slump<br/>(Flow)<br/>(in)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.airContent || 60}px`}}>Air<br/>(%)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.ambientTemp || 70}px`}}>Amb<br/>Temp<br/>(°F)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.concreteTemp || 70}px`}}>Conc<br/>Temp<br/>(°F)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.unitWeight || 80}px`}}>Unit<br/>Wt<br/>(lb/ft³)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.yield || 70}px`}}>Yield<br/>(ft³)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.relativeYield || 70}px`}}>Rel<br/>Yield</TableHead>
              <TableHead className="text-center font-semibold bg-blue-50 text-xs px-2 py-2 whitespace-nowrap" colSpan={3}>
                RELEASE RESULTS
              </TableHead>
              <TableHead className="text-center font-semibold bg-purple-50 text-xs px-2 py-2 whitespace-nowrap" colSpan={6}>
                28-DAY STRENGTH RESULTS
              </TableHead>
              <TableHead className="text-center font-semibold bg-gray-50 text-xs px-2 py-2 whitespace-nowrap" colSpan={3}>
                ADDITIONAL SPECS
              </TableHead>
            </TableRow>
            <TableRow>
              {/* Spacer cells for main columns */}
              {Array.from({length: 14}, (_, i) => (
                <TableHead key={i} className="p-0 h-0"></TableHead>
              ))}
              
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.release || 80}px`}}>Release</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.releaseRequired || 70}px`}}>Required</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.releaseSubmit || 80}px`}}>Submit<br/>Release</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strength1 || 80}px`}}>28-Day<br/>#1</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strength2 || 80}px`}}>28-Day<br/>#2</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strength3 || 80}px`}}>28-Day<br/>#3</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.average || 80}px`}}>Average</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strengthRequired || 70}px`}}>Required</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strengthSubmit || 80}px`}}>Submit<br/>28-Day</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.t20 || 70}px`}}>T-20<br/>(sec)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.jRing || 70}px`}}>J-Ring</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.staticSegregation || 70}px`}}>Static<br/>Seg</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.map((test) => (
              <TableRow 
                key={test.id} 
                id={`test-row-${test.id}`}
                className={
                  (isReleaseSubmitted(test.id) && is28DaySubmitted(test.id)) ? 'bg-green-50' : ''
                }
              >
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.date || 80}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent w-full"
                    value={formatDate(getFieldValue(test, 'date'))}
                    onChange={(e) => handleTestDataUpdate(test.id, 'date', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.time || 60}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent w-full"
                    value={getFieldValue(test, 'time')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'time', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.mixDesign || 60}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent w-full"
                    value={getFieldValue(test, 'mixDesign')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'mixDesign', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.batchTicket || 70}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent w-full"
                    value={getFieldValue(test, 'batchTicket')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'batchTicket', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.form || 80}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent font-medium w-full"
                    value={getFormIdentifier(test)}
                    onChange={(e) => handleTestDataUpdate(test.id, 'form', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.job || 60}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent font-medium w-full"
                    value={getFieldValue(test, 'job')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'job', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.pieces || 100}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent w-full"
                    value={getFieldValue(test, 'pieces')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'pieces', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.slumpFlow || 80}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'slumpFlow')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'slumpFlow', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.airContent || 60}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'airContent')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'airContent', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.ambientTemp || 70}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'ambientTemp')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'ambientTemp', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.concreteTemp || 70}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'concreteTemp')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'concreteTemp', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.unitWeight || 80}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'unitWeight')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'unitWeight', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.yield || 70}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'yield')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'yield', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.relativeYield || 70}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'relativeYield')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'relativeYield', e.target.value)}
                  />
                </TableCell>
                
                {/* Release Results */}
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.release || 80}px`}}>
                  <Input
                    className={`text-xs px-1 text-center w-full ${getReleaseColor(test.id, getFieldValue(test, 'releaseRequired'))}`}
                    placeholder="5171"
                    value={strengthData[test.id]?.release || ''}
                    disabled={isReleaseSubmitted(test.id)}
                    onChange={(e) => handleStrengthDataUpdate(test.id, 'release', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.releaseRequired || 70}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'releaseRequired')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'releaseRequired', e.target.value)}
                    placeholder="3500"
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.releaseSubmit || 80}px`}}>
                  {isReleaseSubmitted(test.id) ? (
                    <Badge className="bg-green-100 text-green-800 flex items-center gap-1 text-xs px-1 py-0 h-6 w-full justify-center">
                      <CheckCircle className="h-2 w-2" />
                      Done
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      className="h-6 text-xs px-2 w-full"
                      disabled={!isReleaseComplete(test.id)}
                      onClick={() => handleSubmitRelease(test.id)}
                    >
                      Submit
                    </Button>
                  )}
                </TableCell>

                {/* 28-Day Strength Results */}
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strength1 || 80}px`}}>
                  <Input
                    className="text-xs text-center px-1 w-full"
                    placeholder="8674"
                    value={strengthData[test.id]?.strength1 || ''}
                    disabled={is28DaySubmitted(test.id)}
                    maxLength={5}
                    onChange={(e) => handleStrengthDataUpdate(test.id, 'strength1', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strength2 || 80}px`}}>
                  <Input
                    className="text-xs text-center px-1 w-full"
                    placeholder="8491"
                    value={strengthData[test.id]?.strength2 || ''}
                    disabled={is28DaySubmitted(test.id)}
                    maxLength={5}
                    onChange={(e) => handleStrengthDataUpdate(test.id, 'strength2', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strength3 || 80}px`}}>
                  <Input
                    className="text-xs text-center px-1 w-full"
                    placeholder="8532"
                    value={strengthData[test.id]?.strength3 || ''}
                    disabled={is28DaySubmitted(test.id)}
                    maxLength={5}
                    onChange={(e) => handleStrengthDataUpdate(test.id, 'strength3', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.average || 80}px`}}>
                  <div className={`h-6 flex items-center justify-center text-sm font-medium bg-gray-50 rounded border px-1 w-full ${getAverageColor(test.id, getFieldValue(test, 'strengthRequired'))}`}>
                    {calculateAverage(test.id) || '--'}
                  </div>
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strengthRequired || 70}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'strengthRequired')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'strengthRequired', e.target.value)}
                    placeholder="5000"
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strengthSubmit || 80}px`}}>
                  {is28DaySubmitted(test.id) ? (
                    <Badge className="bg-green-100 text-green-800 flex items-center gap-1 text-xs px-1 py-0 h-6 w-full justify-center">
                      <CheckCircle className="h-2 w-2" />
                      Done
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      className="h-6 text-xs px-2 w-full"
                      disabled={!is28DayComplete(test.id)}
                      onClick={() => handleSubmit28Day(test.id)}
                    >
                      Submit
                    </Button>
                  )}
                </TableCell>

                {/* Additional Specifications */}
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.t20 || 70}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 't20')}
                    onChange={(e) => handleTestDataUpdate(test.id, 't20', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.jRing || 70}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent w-full"
                    value={getFieldValue(test, 'jRing')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'jRing', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.staticSegregation || 70}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent w-full"
                    value={getFieldValue(test, 'staticSegregation')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'staticSegregation', e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default FreshConcreteTestsTable;
