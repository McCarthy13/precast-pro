
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface FreshConcreteTestsTableProps {
  tests: any[];
  columns: any[];
  strengthData: Record<string, any>;
  updateStrengthData: (testId: string, field: string, value: string) => void;
  calculateAverage: (testId: string) => string;
}

const FreshConcreteTestsTable: React.FC<FreshConcreteTestsTableProps> = ({
  tests,
  columns,
  strengthData,
  updateStrengthData,
  calculateAverage
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Mix Design</TableHead>
            <TableHead>Batch Ticket</TableHead>
            <TableHead>Pieces</TableHead>
            <TableHead>Slump Flow (in)</TableHead>
            <TableHead>Air Content (%)</TableHead>
            <TableHead>Ambient Temp (°F)</TableHead>
            <TableHead>Concrete Temp (°F)</TableHead>
            <TableHead>Unit Weight (lb/ft³)</TableHead>
            <TableHead>Release Required</TableHead>
            <TableHead>Strength Required</TableHead>
            <TableHead>Yield (ft³/yd³)</TableHead>
            <TableHead>Relative Yield</TableHead>
            <TableHead>T-20 (sec)</TableHead>
            <TableHead>J-Ring</TableHead>
            <TableHead>Static Segregation</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center font-semibold bg-blue-50" colSpan={4}>
              28-DAY STRENGTH RESULTS
            </TableHead>
          </TableRow>
          <TableRow>
            {Array.from({ length: 20 }, (_, i) => (
              <TableHead key={i} className="p-0 h-0"></TableHead>
            ))}
            <TableHead className="text-xs">Strength 1 (psi)</TableHead>
            <TableHead className="text-xs">Strength 2 (psi)</TableHead>
            <TableHead className="text-xs">Strength 3 (psi)</TableHead>
            <TableHead className="text-xs">28-Day Average (psi)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.map((test) => (
            <TableRow key={test.id} id={`test-row-${test.id}`}>
              <TableCell>{test.date}</TableCell>
              <TableCell>{test.time}</TableCell>
              <TableCell>{test.job || '-'}</TableCell>
              <TableCell>{test.mixDesign}</TableCell>
              <TableCell>{test.batchTicket}</TableCell>
              <TableCell>{test.pieces}</TableCell>
              <TableCell>{test.slumpFlow}</TableCell>
              <TableCell>{test.airContent}</TableCell>
              <TableCell>{test.ambientTemp}</TableCell>
              <TableCell>{test.concreteTemp}</TableCell>
              <TableCell>{test.unitWeight}</TableCell>
              <TableCell>{test.releaseRequired || '-'}</TableCell>
              <TableCell>{test.strengthRequired || '-'}</TableCell>
              <TableCell>{test.yield}</TableCell>
              <TableCell>{test.relativeYield}</TableCell>
              <TableCell>{test.t20 || '-'}</TableCell>
              <TableCell>
                {test.jRing ? (
                  <Badge className={test.jRing === "Pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {test.jRing}
                  </Badge>
                ) : '-'}
              </TableCell>
              <TableCell>
                {test.staticSegregation ? (
                  <Badge className={test.staticSegregation === "Pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {test.staticSegregation}
                  </Badge>
                ) : '-'}
              </TableCell>
              <TableCell>{test.technician || '-'}</TableCell>
              <TableCell>
                <Badge variant={test.status === 'Submitted' ? 'default' : 'secondary'}>
                  {test.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  placeholder="Enter"
                  className="w-20 h-8 text-xs"
                  value={strengthData[test.id]?.strength1 || ''}
                  onChange={(e) => updateStrengthData(test.id, 'strength1', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  placeholder="Enter"
                  className="w-20 h-8 text-xs"
                  value={strengthData[test.id]?.strength2 || ''}
                  onChange={(e) => updateStrengthData(test.id, 'strength2', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  placeholder="Enter"
                  className="w-20 h-8 text-xs"
                  value={strengthData[test.id]?.strength3 || ''}
                  onChange={(e) => updateStrengthData(test.id, 'strength3', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <div className="w-20 h-8 flex items-center justify-center text-xs font-medium bg-gray-50 rounded border">
                  {calculateAverage(test.id) || '--'}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FreshConcreteTestsTable;
