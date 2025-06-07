
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

  const handleSubmitRow = (testId: string) => {
    updateStrengthData(testId, 'submitted', 'true');
    console.log(`Row ${testId} submitted for finalization`);
  };

  const isRowComplete = (testId: string) => {
    const data = strengthData[testId];
    return data?.release && data?.strength1 && data?.strength2 && data?.strength3;
  };

  const isRowSubmitted = (testId: string) => {
    return strengthData[testId]?.submitted === 'true';
  };

  return (
    <ScrollArea className="w-full rounded-md border">
      <div className="min-w-[2000px] w-full">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className="whitespace-nowrap">{column.label}</TableHead>
              ))}
              <TableHead className="text-center font-semibold bg-blue-50 whitespace-nowrap" colSpan={5}>
                STRENGTH RESULTS
              </TableHead>
              <TableHead className="text-center font-semibold bg-gray-50 whitespace-nowrap" colSpan={3}>
                ADDITIONAL SPECIFICATIONS
              </TableHead>
              <TableHead className="text-center font-semibold bg-green-50 whitespace-nowrap">
                ACTION
              </TableHead>
            </TableRow>
            <TableRow>
              {columns.map(() => (
                <TableHead key="spacer" className="p-0 h-0"></TableHead>
              ))}
              <TableHead className="text-xs whitespace-nowrap">Release/Release Required</TableHead>
              <TableHead className="text-xs whitespace-nowrap">28-Day Strength 1</TableHead>
              <TableHead className="text-xs whitespace-nowrap">28-Day Strength 2</TableHead>
              <TableHead className="text-xs whitespace-nowrap">28-Day Strength 3</TableHead>
              <TableHead className="text-xs whitespace-nowrap">Average 28-Day Strength/Required</TableHead>
              <TableHead className="text-xs whitespace-nowrap">T-20 (sec)</TableHead>
              <TableHead className="text-xs whitespace-nowrap">J-Ring</TableHead>
              <TableHead className="text-xs whitespace-nowrap">Static Segregation</TableHead>
              <TableHead className="text-xs whitespace-nowrap">Submit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.map((test) => (
              <TableRow key={test.id} className={isRowSubmitted(test.id) ? 'bg-green-50' : ''}>
                <TableCell className="whitespace-nowrap">{test.date}</TableCell>
                <TableCell className="whitespace-nowrap">{test.time}</TableCell>
                <TableCell className="whitespace-nowrap">{test.mixDesign}</TableCell>
                <TableCell className="whitespace-nowrap">{test.batchTicket}</TableCell>
                <TableCell className="whitespace-nowrap">{test.pieces}</TableCell>
                <TableCell className="whitespace-nowrap">{test.slumpFlow}</TableCell>
                <TableCell className="whitespace-nowrap">{test.airContent}</TableCell>
                <TableCell className="whitespace-nowrap">{test.ambientTemp}</TableCell>
                <TableCell className="whitespace-nowrap">{test.concreteTemp}</TableCell>
                <TableCell className="whitespace-nowrap">{test.unitWeight}</TableCell>
                <TableCell className="whitespace-nowrap">{test.yield}</TableCell>
                <TableCell className="whitespace-nowrap">{test.relativeYield}</TableCell>
                
                {/* Strength Results - Editable columns */}
                <TableCell className="whitespace-nowrap">
                  <Input
                    className={`w-32 h-8 text-xs ${getReleaseColor(test.id, test.releaseRequired)}`}
                    placeholder={`5171/${test.releaseRequired || '3500'}`}
                    value={formatReleaseValue(test.id, test.releaseRequired)}
                    disabled={isRowSubmitted(test.id)}
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
                <TableCell className="whitespace-nowrap">
                  <Input
                    className="w-24 h-8 text-xs"
                    placeholder="8674"
                    value={strengthData[test.id]?.strength1 || ''}
                    disabled={isRowSubmitted(test.id)}
                    onChange={(e) => updateStrengthData(test.id, 'strength1', e.target.value)}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Input
                    className="w-24 h-8 text-xs"
                    placeholder="8491"
                    value={strengthData[test.id]?.strength2 || ''}
                    disabled={isRowSubmitted(test.id)}
                    onChange={(e) => updateStrengthData(test.id, 'strength2', e.target.value)}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Input
                    className="w-24 h-8 text-xs"
                    placeholder="8532"
                    value={strengthData[test.id]?.strength3 || ''}
                    disabled={isRowSubmitted(test.id)}
                    onChange={(e) => updateStrengthData(test.id, 'strength3', e.target.value)}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className={`w-32 h-8 flex items-center justify-center text-xs font-medium bg-gray-50 rounded border ${getAverageColor(test.id, test.strengthRequired)}`}>
                    {formatAverageValue(test.id, test.strengthRequired)}
                  </div>
                </TableCell>

                {/* Additional Specifications */}
                <TableCell className="whitespace-nowrap">{test.t20}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge className={test.jRing === "Pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {test.jRing}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge className={test.staticSegregation === "Pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {test.staticSegregation}
                  </Badge>
                </TableCell>

                {/* Submit Action */}
                <TableCell className="whitespace-nowrap">
                  {isRowSubmitted(test.id) ? (
                    <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Submitted
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      className="h-8 text-xs"
                      disabled={!isRowComplete(test.id)}
                      onClick={() => handleSubmitRow(test.id)}
                    >
                      Submit
                    </Button>
                  )}
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
