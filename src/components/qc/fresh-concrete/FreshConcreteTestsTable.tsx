import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
  yield: string;
  relativeYield: string;
  t20: string;
  jRing: string;
  staticSegregation: string;
  technician: string;
  status: string;
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
    
    const parts = releaseData.split('/');
    if (parts.length !== 2) return '';
    
    const actual = parseFloat(parts[0]);
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
            </TableRow>
            <TableRow>
              {columns.map(() => (
                <TableHead key="spacer" className="p-0 h-0"></TableHead>
              ))}
              <TableHead className="text-xs whitespace-nowrap">Release/Release Required</TableHead>
              <TableHead className="text-xs whitespace-nowrap">28-Day Strength 1</TableHead>
              <TableHead className="text-xs whitespace-nowrap">28-Day Strength 2</TableHead>
              <TableHead className="text-xs whitespace-nowrap">28-Day Strength 3</TableHead>
              <TableHead className="text-xs whitespace-nowrap">Average</TableHead>
              <TableHead className="text-xs whitespace-nowrap">T-20 (sec)</TableHead>
              <TableHead className="text-xs whitespace-nowrap">J-Ring</TableHead>
              <TableHead className="text-xs whitespace-nowrap">Static Segregation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.map((test) => (
              <TableRow key={test.id}>
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
                <TableCell className="whitespace-nowrap">{test.releaseRequired}</TableCell>
                <TableCell className="whitespace-nowrap">{test.yield}</TableCell>
                <TableCell className="whitespace-nowrap">{test.relativeYield}</TableCell>
                
                {/* Strength Results - Editable columns */}
                <TableCell className="whitespace-nowrap">
                  <Input
                    className={`w-32 h-8 text-xs ${getReleaseColor(test.id, test.releaseRequired)}`}
                    placeholder={`5171/${test.releaseRequired || '3500'}`}
                    value={strengthData[test.id]?.release || ''}
                    onChange={(e) => updateStrengthData(test.id, 'release', e.target.value)}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Input
                    className="w-24 h-8 text-xs"
                    placeholder="8674"
                    value={strengthData[test.id]?.strength1 || ''}
                    onChange={(e) => updateStrengthData(test.id, 'strength1', e.target.value)}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Input
                    className="w-24 h-8 text-xs"
                    placeholder="8491"
                    value={strengthData[test.id]?.strength2 || ''}
                    onChange={(e) => updateStrengthData(test.id, 'strength2', e.target.value)}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Input
                    className="w-24 h-8 text-xs"
                    placeholder="8532"
                    value={strengthData[test.id]?.strength3 || ''}
                    onChange={(e) => updateStrengthData(test.id, 'strength3', e.target.value)}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="w-20 h-8 flex items-center justify-center text-xs font-medium bg-gray-50 rounded border">
                    {calculateAverage(test.id) || '--'}
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
