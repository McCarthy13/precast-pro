
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

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
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
            <TableHead className="text-center font-semibold bg-blue-50" colSpan={4}>
              28-DAY STRENGTH RESULTS
            </TableHead>
          </TableRow>
          <TableRow>
            {columns.map(() => (
              <TableHead key="spacer" className="p-0 h-0"></TableHead>
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
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {test[column.key as keyof typeof test] || '-'}
                </TableCell>
              ))}
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
