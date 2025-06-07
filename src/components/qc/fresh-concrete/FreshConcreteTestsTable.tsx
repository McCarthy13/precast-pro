
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

  const getReleaseColor = (testId: string, releaseRequired: string) => {
    const releaseData = strengthData[testId]?.release || '';
    if (!releaseData || !releaseRequired) return '';
    
    // Extract just the numerator part if it contains a slash
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
    updateStrengthData(testId, 'strengthSubmitted', 'true');
    console.log(`28-day strength data for ${testId} submitted for finalization`);
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

  return (
    <ScrollArea className="w-full rounded-md border">
      <div className="min-w-[1200px] w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-xs leading-tight p-1">Date</TableHead>
              <TableHead className="w-10 text-xs leading-tight p-1">Time</TableHead>
              <TableHead className="w-12 text-xs leading-tight p-1">Mix<br/>ID</TableHead>
              <TableHead className="w-16 text-xs leading-tight p-1">Batch<br/>#</TableHead>
              <TableHead className="w-20 text-xs leading-tight p-1">Pieces</TableHead>
              <TableHead className="w-12 text-xs leading-tight p-1">Slump<br/>(Flow)<br/>(in)</TableHead>
              <TableHead className="w-10 text-xs leading-tight p-1">Air<br/>(%)</TableHead>
              <TableHead className="w-12 text-xs leading-tight p-1">Amb<br/>Temp<br/>(°F)</TableHead>
              <TableHead className="w-12 text-xs leading-tight p-1">Conc<br/>Temp<br/>(°F)</TableHead>
              <TableHead className="w-12 text-xs leading-tight p-1">Unit<br/>Wt<br/>(lb/ft³)</TableHead>
              <TableHead className="w-10 text-xs leading-tight p-1">Yield<br/>(ft³)</TableHead>
              <TableHead className="w-10 text-xs leading-tight p-1">Rel<br/>Yield</TableHead>
              <TableHead className="text-center font-semibold bg-blue-50 text-xs leading-tight p-1" colSpan={2}>
                RELEASE RESULTS
              </TableHead>
              <TableHead className="text-center font-semibold bg-purple-50 text-xs leading-tight p-1" colSpan={4}>
                28-DAY STRENGTH RESULTS
              </TableHead>
              <TableHead className="text-center font-semibold bg-gray-50 text-xs leading-tight p-1" colSpan={3}>
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
              
              <TableHead className="w-18 text-xs leading-tight p-1">Release/<br/>Required</TableHead>
              <TableHead className="w-14 text-xs leading-tight p-1">Submit<br/>Release</TableHead>
              <TableHead className="w-12 text-xs leading-tight p-1">28-Day<br/>#1</TableHead>
              <TableHead className="w-12 text-xs leading-tight p-1">28-Day<br/>#2</TableHead>
              <TableHead className="w-12 text-xs leading-tight p-1">28-Day<br/>#3</TableHead>
              <TableHead className="w-20 text-xs leading-tight p-1">Average/<br/>Required</TableHead>
              <TableHead className="w-14 text-xs leading-tight p-1">Submit<br/>28-Day</TableHead>
              <TableHead className="w-10 text-xs leading-tight p-1">T-20<br/>(sec)</TableHead>
              <TableHead className="w-10 text-xs leading-tight p-1">J-Ring</TableHead>
              <TableHead className="w-12 text-xs leading-tight p-1">Static<br/>Seg</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.map((test) => (
              <TableRow key={test.id} className={
                (isReleaseSubmitted(test.id) && is28DaySubmitted(test.id)) ? 'bg-green-50' : ''
              }>
                <TableCell className="text-xs p-1">{test.date}</TableCell>
                <TableCell className="text-xs p-1">{test.time}</TableCell>
                <TableCell className="text-xs p-1">{test.mixDesign}</TableCell>
                <TableCell className="text-xs p-1">{test.batchTicket}</TableCell>
                <TableCell className="text-xs p-1">{test.pieces}</TableCell>
                <TableCell className="text-xs p-1 text-center">{test.slumpFlow}</TableCell>
                <TableCell className="text-xs p-1 text-center">{test.airContent}</TableCell>
                <TableCell className="text-xs p-1 text-center">{test.ambientTemp}</TableCell>
                <TableCell className="text-xs p-1 text-center">{test.concreteTemp}</TableCell>
                <TableCell className="text-xs p-1 text-center">{test.unitWeight}</TableCell>
                <TableCell className="text-xs p-1 text-center">{test.yield}</TableCell>
                <TableCell className="text-xs p-1 text-center">{test.relativeYield}</TableCell>
                
                {/* Release Results */}
                <TableCell className="p-1">
                  <Input
                    className={`w-full h-6 text-xs ${getReleaseColor(test.id, test.releaseRequired)}`}
                    placeholder={`5171/${test.releaseRequired || '3500'}`}
                    value={formatReleaseValue(test.id, test.releaseRequired)}
                    disabled={isReleaseSubmitted(test.id)}
                    onChange={(e) => {
                      // Only allow editing the numerator part
                      const value = e.target.value;
                      const slashIndex = value.lastIndexOf('/');
                      if (slashIndex !== -1) {
                        const numerator = value.substring(0, slashIndex);
                        updateStrengthData(test.id, 'release', numerator);
                      } else {
                        updateStrengthData(test.id, 'release', value);
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="p-1">
                  {isReleaseSubmitted(test.id) ? (
                    <Badge className="bg-green-100 text-green-800 flex items-center gap-1 text-xs px-1 py-0">
                      <CheckCircle className="h-3 w-3" />
                      Done
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      className="h-6 text-xs px-1"
                      disabled={!isReleaseComplete(test.id)}
                      onClick={() => handleSubmitRelease(test.id)}
                    >
                      Submit
                    </Button>
                  )}
                </TableCell>

                {/* 28-Day Strength Results */}
                <TableCell className="p-1">
                  <Input
                    className="w-full h-6 text-xs text-center"
                    placeholder="8674"
                    value={strengthData[test.id]?.strength1 || ''}
                    disabled={is28DaySubmitted(test.id)}
                    onChange={(e) => updateStrengthData(test.id, 'strength1', e.target.value)}
                  />
                </TableCell>
                <TableCell className="p-1">
                  <Input
                    className="w-full h-6 text-xs text-center"
                    placeholder="8491"
                    value={strengthData[test.id]?.strength2 || ''}
                    disabled={is28DaySubmitted(test.id)}
                    onChange={(e) => updateStrengthData(test.id, 'strength2', e.target.value)}
                  />
                </TableCell>
                <TableCell className="p-1">
                  <Input
                    className="w-full h-6 text-xs text-center"
                    placeholder="8532"
                    value={strengthData[test.id]?.strength3 || ''}
                    disabled={is28DaySubmitted(test.id)}
                    onChange={(e) => updateStrengthData(test.id, 'strength3', e.target.value)}
                  />
                </TableCell>
                <TableCell className="p-1">
                  <div className={`w-full h-6 flex items-center justify-center text-xs font-medium bg-gray-50 rounded border ${getAverageColor(test.id, test.strengthRequired)}`}>
                    {formatAverageValue(test.id, test.strengthRequired)}
                  </div>
                </TableCell>
                <TableCell className="p-1">
                  {is28DaySubmitted(test.id) ? (
                    <Badge className="bg-green-100 text-green-800 flex items-center gap-1 text-xs px-1 py-0">
                      <CheckCircle className="h-3 w-3" />
                      Done
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      className="h-6 text-xs px-1"
                      disabled={!is28DayComplete(test.id)}
                      onClick={() => handleSubmit28Day(test.id)}
                    >
                      Submit
                    </Button>
                  )}
                </TableCell>

                {/* Additional Specifications */}
                <TableCell className="text-xs p-1 text-center">{test.t20}</TableCell>
                <TableCell className="p-1">
                  <Badge className={`text-xs px-1 py-0 ${test.jRing === "Pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {test.jRing}
                  </Badge>
                </TableCell>
                <TableCell className="p-1">
                  <Badge className={`text-xs px-1 py-0 ${test.staticSegregation === "Pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {test.staticSegregation}
                  </Badge>
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
