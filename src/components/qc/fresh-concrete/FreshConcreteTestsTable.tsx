import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CheckCircle, X } from "lucide-react";
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
  showFilters: boolean;
  columnFilters: Record<string, string>;
  setColumnFilters: (filters: Record<string, string>) => void;
  clearColumnFilter: (column: string) => void;
  clearAllFilters: () => void;
}

const FreshConcreteTestsTable = ({
  tests,
  columns,
  strengthData,
  updateStrengthData,
  calculateAverage,
  showFilters,
  columnFilters,
  setColumnFilters,
  clearColumnFilter,
  clearAllFilters
}: FreshConcreteTestsTableProps) => {
  // Define fixed column widths for better control
  const columnWidths = {
    date: 90,
    time: 70,
    mixDesign: 80,
    batchTicket: 90,
    form: 100,
    job: 70,
    pieces: 120,
    slumpFlow: 90,
    airContent: 70,
    ambientTemp: 85,
    concreteTemp: 85,
    unitWeight: 95,
    yield: 80,
    relativeYield: 85,
    release: 90,
    releaseRequired: 85,
    releaseSubmit: 100,
    strength1: 90,
    strength2: 90,
    strength3: 90,
    average: 90,
    strengthRequired: 85,
    strengthSubmit: 110,
    t20: 80,
    jRing: 80,
    staticSegregation: 90
  };

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

  // Helper function to get Pass/Fail color
  const getPassFailColor = (value: string) => {
    const normalizedValue = value.toLowerCase().trim();
    if (normalizedValue === 'pass') {
      return 'text-green-600 font-semibold';
    } else if (normalizedValue === 'fail') {
      return 'text-red-600 font-semibold';
    }
    return '';
  };

  // Handle filter updates
  const handleFilterChange = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  return (
    <div>
      {/* Column Filters */}
      {showFilters && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Column Filters</h3>
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {[
              { key: 'date', label: 'Date' },
              { key: 'time', label: 'Time' },
              { key: 'job', label: 'Job' },
              { key: 'mixDesign', label: 'Mix Design' },
              { key: 'batchTicket', label: 'Batch #' },
              { key: 'pieces', label: 'Pieces' },
              { key: 'slumpFlow', label: 'Slump/Flow' },
              { key: 'airContent', label: 'Air Content' },
              { key: 'ambientTemp', label: 'Ambient Temp' },
              { key: 'concreteTemp', label: 'Concrete Temp' },
              { key: 'unitWeight', label: 'Unit Weight' },
              { key: 'yield', label: 'Yield' },
              { key: 'relativeYield', label: 'Relative Yield' },
              { key: 'releaseRequired', label: 'Release Req' },
              { key: 'strengthRequired', label: 'Strength Req' },
              { key: 't20', label: 'T-20' },
              { key: 'jRing', label: 'J-Ring' },
              { key: 'staticSegregation', label: 'Static Seg' },
              { key: 'technician', label: 'Technician' },
              { key: 'status', label: 'Status' }
            ].map(({ key, label }) => (
              <div key={key} className="space-y-1">
                <label className="text-xs font-medium text-gray-600">{label}</label>
                <div className="relative">
                  <Input
                    placeholder={`Filter ${label.toLowerCase()}...`}
                    value={columnFilters[key] || ''}
                    onChange={(e) => handleFilterChange(key, e.target.value)}
                    className="text-xs h-8"
                  />
                  {columnFilters[key] && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => clearColumnFilter(key)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ScrollArea className="w-full rounded-md border">
        <Table className="min-w-max">
          <TableHeader>
            <TableRow>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.date}px`, minWidth: `${columnWidths.date}px`}}>Date</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.time}px`, minWidth: `${columnWidths.time}px`}}>Time</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.mixDesign}px`, minWidth: `${columnWidths.mixDesign}px`}}>Mix<br/>ID</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.batchTicket}px`, minWidth: `${columnWidths.batchTicket}px`}}>Batch<br/>#</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.form}px`, minWidth: `${columnWidths.form}px`}}>Form</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.job}px`, minWidth: `${columnWidths.job}px`}}>Job</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.pieces}px`, minWidth: `${columnWidths.pieces}px`}}>Pieces</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.slumpFlow}px`, minWidth: `${columnWidths.slumpFlow}px`}}>Slump<br/>(Flow)<br/>(in)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.airContent}px`, minWidth: `${columnWidths.airContent}px`}}>Air<br/>(%)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.ambientTemp}px`, minWidth: `${columnWidths.ambientTemp}px`}}>Amb<br/>Temp<br/>(°F)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.concreteTemp}px`, minWidth: `${columnWidths.concreteTemp}px`}}>Conc<br/>Temp<br/>(°F)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.unitWeight}px`, minWidth: `${columnWidths.unitWeight}px`}}>Unit<br/>Wt<br/>(lb/ft³)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.yield}px`, minWidth: `${columnWidths.yield}px`}}>Yield<br/>(ft³)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.relativeYield}px`, minWidth: `${columnWidths.relativeYield}px`}}>Rel<br/>Yield</TableHead>
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
              
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.release}px`, minWidth: `${columnWidths.release}px`}}>Release</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.releaseRequired}px`, minWidth: `${columnWidths.releaseRequired}px`}}>Required</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.releaseSubmit}px`, minWidth: `${columnWidths.releaseSubmit}px`}}>Submit<br/>Release</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strength1}px`, minWidth: `${columnWidths.strength1}px`}}>28-Day<br/>#1</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strength2}px`, minWidth: `${columnWidths.strength2}px`}}>28-Day<br/>#2</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strength3}px`, minWidth: `${columnWidths.strength3}px`}}>28-Day<br/>#3</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.average}px`, minWidth: `${columnWidths.average}px`}}>Average</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strengthRequired}px`, minWidth: `${columnWidths.strengthRequired}px`}}>Required</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.strengthSubmit}px`, minWidth: `${columnWidths.strengthSubmit}px`}}>Submit<br/>28-Day</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.t20}px`, minWidth: `${columnWidths.t20}px`}}>T-20<br/>(sec)</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.jRing}px`, minWidth: `${columnWidths.jRing}px`}}>J-Ring</TableHead>
              <TableHead className="px-2 py-2 text-xs whitespace-nowrap" style={{width: `${columnWidths.staticSegregation}px`, minWidth: `${columnWidths.staticSegregation}px`}}>Static<br/>Seg</TableHead>
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
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.date}px`, minWidth: `${columnWidths.date}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent w-full"
                    value={formatDate(getFieldValue(test, 'date'))}
                    onChange={(e) => handleTestDataUpdate(test.id, 'date', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.time}px`, minWidth: `${columnWidths.time}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent w-full"
                    value={getFieldValue(test, 'time')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'time', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.mixDesign}px`, minWidth: `${columnWidths.mixDesign}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent w-full"
                    value={getFieldValue(test, 'mixDesign')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'mixDesign', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.batchTicket}px`, minWidth: `${columnWidths.batchTicket}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent w-full"
                    value={getFieldValue(test, 'batchTicket')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'batchTicket', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.form}px`, minWidth: `${columnWidths.form}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent font-medium w-full"
                    value={getFormIdentifier(test)}
                    onChange={(e) => handleTestDataUpdate(test.id, 'form', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.job}px`, minWidth: `${columnWidths.job}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent font-medium w-full"
                    value={getFieldValue(test, 'job')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'job', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.pieces}px`, minWidth: `${columnWidths.pieces}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent w-full"
                    value={getFieldValue(test, 'pieces')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'pieces', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.slumpFlow}px`, minWidth: `${columnWidths.slumpFlow}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'slumpFlow')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'slumpFlow', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.airContent}px`, minWidth: `${columnWidths.airContent}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'airContent')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'airContent', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.ambientTemp}px`, minWidth: `${columnWidths.ambientTemp}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'ambientTemp')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'ambientTemp', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.concreteTemp}px`, minWidth: `${columnWidths.concreteTemp}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'concreteTemp')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'concreteTemp', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.unitWeight}px`, minWidth: `${columnWidths.unitWeight}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'unitWeight')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'unitWeight', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.yield}px`, minWidth: `${columnWidths.yield}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'yield')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'yield', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.relativeYield}px`, minWidth: `${columnWidths.relativeYield}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'relativeYield')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'relativeYield', e.target.value)}
                  />
                </TableCell>
                
                {/* Release Results */}
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.release}px`, minWidth: `${columnWidths.release}px`}}>
                  <Input
                    className={`text-xs px-1 text-center w-full ${getReleaseColor(test.id, getFieldValue(test, 'releaseRequired'))}`}
                    placeholder="5171"
                    value={strengthData[test.id]?.release || ''}
                    disabled={isReleaseSubmitted(test.id)}
                    onChange={(e) => handleStrengthDataUpdate(test.id, 'release', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.releaseRequired}px`, minWidth: `${columnWidths.releaseRequired}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'releaseRequired')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'releaseRequired', e.target.value)}
                    placeholder="3500"
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.releaseSubmit}px`, minWidth: `${columnWidths.releaseSubmit}px`}}>
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
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strength1}px`, minWidth: `${columnWidths.strength1}px`}}>
                  <Input
                    className="text-xs text-center px-1 w-full"
                    placeholder="8674"
                    value={strengthData[test.id]?.strength1 || ''}
                    disabled={is28DaySubmitted(test.id)}
                    maxLength={5}
                    onChange={(e) => handleStrengthDataUpdate(test.id, 'strength1', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strength2}px`, minWidth: `${columnWidths.strength2}px`}}>
                  <Input
                    className="text-xs text-center px-1 w-full"
                    placeholder="8491"
                    value={strengthData[test.id]?.strength2 || ''}
                    disabled={is28DaySubmitted(test.id)}
                    maxLength={5}
                    onChange={(e) => handleStrengthDataUpdate(test.id, 'strength2', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strength3}px`, minWidth: `${columnWidths.strength3}px`}}>
                  <Input
                    className="text-xs text-center px-1 w-full"
                    placeholder="8532"
                    value={strengthData[test.id]?.strength3 || ''}
                    disabled={is28DaySubmitted(test.id)}
                    maxLength={5}
                    onChange={(e) => handleStrengthDataUpdate(test.id, 'strength3', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.average}px`, minWidth: `${columnWidths.average}px`}}>
                  <div className={`h-6 flex items-center justify-center text-sm font-medium bg-gray-50 rounded border px-1 w-full ${getAverageColor(test.id, getFieldValue(test, 'strengthRequired'))}`}>
                    {calculateAverage(test.id) || '--'}
                  </div>
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strengthRequired}px`, minWidth: `${columnWidths.strengthRequired}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 'strengthRequired')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'strengthRequired', e.target.value)}
                    placeholder="5000"
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.strengthSubmit}px`, minWidth: `${columnWidths.strengthSubmit}px`}}>
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
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.t20}px`, minWidth: `${columnWidths.t20}px`}}>
                  <Input
                    className="text-xs px-1 border-none bg-transparent text-center w-full"
                    value={getFieldValue(test, 't20')}
                    onChange={(e) => handleTestDataUpdate(test.id, 't20', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.jRing}px`, minWidth: `${columnWidths.jRing}px`}}>
                  <Input
                    className={`text-xs px-1 border-none bg-transparent w-full ${getPassFailColor(getFieldValue(test, 'jRing'))}`}
                    value={getFieldValue(test, 'jRing')}
                    onChange={(e) => handleTestDataUpdate(test.id, 'jRing', e.target.value)}
                  />
                </TableCell>
                <TableCell className="px-1 py-1 whitespace-nowrap" style={{width: `${columnWidths.staticSegregation}px`, minWidth: `${columnWidths.staticSegregation}px`}}>
                  <Input
                    className={`text-xs px-1 border-none bg-transparent w-full ${getPassFailColor(getFieldValue(test, 'staticSegregation'))}`}
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
