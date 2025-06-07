
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CheckCircle } from "lucide-react";

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

  const getFormSubmissionGroup = (testId: string) => {
    const test = tests.find(t => t.id === testId);
    if (!test?.formSubmissionId) return [testId];
    
    return tests
      .filter(t => t.formSubmissionId === test.formSubmissionId)
      .map(t => t.id);
  };

  return (
    <ScrollArea className="w-full rounded-md border">
      <div className="min-w-fit w-full">
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Date</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Time</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Job</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Mix<br/>ID</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Batch<br/>#</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Pieces</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Slump<br/>(Flow)<br/>(in)</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Air<br/>(%)</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Amb<br/>Temp<br/>(°F)</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Conc<br/>Temp<br/>(°F)</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Unit<br/>Wt<br/>(lb/ft³)</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Yield<br/>(ft³)</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Rel<br/>Yield</TableHead>
              <TableHead className="text-center font-semibold bg-blue-50 text-[10px] leading-tight p-1" colSpan={2}>
                RELEASE RESULTS
              </TableHead>
              <TableHead className="text-center font-semibold bg-purple-50 text-[10px] leading-tight p-1" colSpan={4}>
                28-DAY STRENGTH RESULTS
              </TableHead>
              <TableHead className="text-center font-semibold bg-gray-50 text-[10px] leading-tight p-1" colSpan={3}>
                ADDITIONAL SPECS
              </TableHead>
            </TableRow>
            <TableRow>
              {/* Spacer cells for main columns */}
              <TableHead className="p-0 h-0"></TableHead>
              <TableHead className="p-0 h-0"></TableHead>
              <TableHead className="p-0 h-0"></TableHead>
              <TableHead className="p-0 h-0"></TableHead>
              <TableHead className="p-0 h-0"></TableHead>
              <TableHead className="p-0 h-0"></TableHead>
              <TableHead className="p-0 h-0"></TableHead>
              <TableHead className="p-0 h-0"></TableHead>
              <TableHead className="p-0 h-0"></TableHead>
              <TableHead className="p-0 h-0"></TableHead>
              <TableHead className="p-0 h-0"></TableHead>
              <TableHead className="p-0 h-0"></TableHead>
              <TableHead className="p-0 h-0"></TableHead>
              
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Release/<br/>Required</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Submit<br/>Release</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">28-Day<br/>#1</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">28-Day<br/>#2</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">28-Day<br/>#3</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Average/<br/>Required</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Submit<br/>28-Day</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">T-20<br/>(sec)</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">J-Ring</TableHead>
              <TableHead className="w-auto text-[10px] leading-tight p-1 whitespace-nowrap">Static<br/>Seg</TableHead>
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
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent"
                    value={getFieldValue(test, 'date')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'date', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent"
                    value={getFieldValue(test, 'time')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'time', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent font-medium"
                    value={getFieldValue(test, 'job')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'job', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent"
                    value={getFieldValue(test, 'mixDesign')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'mixDesign', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent"
                    value={getFieldValue(test, 'batchTicket')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'batchTicket', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent"
                    value={getFieldValue(test, 'pieces')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'pieces', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent text-center"
                    value={getFieldValue(test, 'slumpFlow')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'slumpFlow', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent text-center"
                    value={getFieldValue(test, 'airContent')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'airContent', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent text-center"
                    value={getFieldValue(test, 'ambientTemp')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'ambientTemp', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent text-center"
                    value={getFieldValue(test, 'concreteTemp')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'concreteTemp', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent text-center"
                    value={getFieldValue(test, 'unitWeight')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'unitWeight', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent text-center"
                    value={getFieldValue(test, 'yield')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'yield', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent text-center"
                    value={getFieldValue(test, 'relativeYield')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'relativeYield', e.target.value)}
                  />
                </TableCell>
                
                {/* Release Results */}
                <TableCell className="p-1 w-auto">
                  <Input
                    className={`w-full h-5 text-[10px] px-1 ${getReleaseColor(test.id, getFieldValue(test, 'releaseRequired'))}`}
                    placeholder={`5171/${getFieldValue(test, 'releaseRequired') || '3500'}`}
                    value={formatReleaseValue(test.id, getFieldValue(test, 'releaseRequired'))}
                    disabled={isReleaseSubmitted(test.id)}
                    onChange={(e) => {
                      const value = e.target.value;
                      const slashIndex = value.lastIndexOf('/');
                      if (slashIndex !== -1) {
                        const numerator = value.substring(0, slashIndex);
                        handleStrengthDataUpdate(test.id, 'release', numerator);
                      } else {
                        handleStrengthDataUpdate(test.id, 'release', value);
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="p-1 w-auto">
                  {isReleaseSubmitted(test.id) ? (
                    <Badge className="bg-green-100 text-green-800 flex items-center gap-1 text-[10px] px-1 py-0 h-5">
                      <CheckCircle className="h-2 w-2" />
                      Done
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      className="h-5 text-[10px] px-1"
                      disabled={!isReleaseComplete(test.id)}
                      onClick={() => handleSubmitRelease(test.id)}
                    >
                      Submit
                    </Button>
                  )}
                </TableCell>

                {/* 28-Day Strength Results */}
                <TableCell className="p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] text-center px-1"
                    placeholder="8674"
                    value={strengthData[test.id]?.strength1 || ''}
                    disabled={is28DaySubmitted(test.id)}
                    maxLength={5}
                    onChange={(e) => handleStrengthDataUpdate(test.id, 'strength1', e.target.value)}
                  />
                </TableCell>
                <TableCell className="p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] text-center px-1"
                    placeholder="8491"
                    value={strengthData[test.id]?.strength2 || ''}
                    disabled={is28DaySubmitted(test.id)}
                    maxLength={5}
                    onChange={(e) => handleStrengthDataUpdate(test.id, 'strength2', e.target.value)}
                  />
                </TableCell>
                <TableCell className="p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] text-center px-1"
                    placeholder="8532"
                    value={strengthData[test.id]?.strength3 || ''}
                    disabled={is28DaySubmitted(test.id)}
                    maxLength={5}
                    onChange={(e) => handleStrengthDataUpdate(test.id, 'strength3', e.target.value)}
                  />
                </TableCell>
                <TableCell className="p-1 w-auto">
                  <div className={`w-full h-5 flex items-center justify-center text-[10px] font-medium bg-gray-50 rounded border px-1 ${getAverageColor(test.id, getFieldValue(test, 'strengthRequired'))}`}>
                    {formatAverageValue(test.id, getFieldValue(test, 'strengthRequired'))}
                  </div>
                </TableCell>
                <TableCell className="p-1 w-auto">
                  {is28DaySubmitted(test.id) ? (
                    <Badge className="bg-green-100 text-green-800 flex items-center gap-1 text-[10px] px-1 py-0 h-5">
                      <CheckCircle className="h-2 w-2" />
                      Done
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      className="h-5 text-[10px] px-1"
                      disabled={!is28DayComplete(test.id)}
                      onClick={() => handleSubmit28Day(test.id)}
                    >
                      Submit
                    </Button>
                  )}
                </TableCell>

                {/* Additional Specifications */}
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent text-center"
                    value={getFieldValue(test, 't20')}
                    onChange={(e) => handleTestDataUpdate(test.id, 't20', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent"
                    value={getFieldValue(test, 'jRing')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'jRing', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-[10px] p-1 w-auto">
                  <Input
                    className="w-full h-5 text-[10px] px-1 border-none bg-transparent"
                    value={getFieldValue(test, 'staticSegregation')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'staticSegregation', e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default FreshConcreteTestsTable;
