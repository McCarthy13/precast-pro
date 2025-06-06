
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MoistureTestRow from './MoistureTestRow';

interface MoistureTestData {
  date: Date | undefined;
  binNumber: string;
  aggregate: string;
  wetWeight: string;
  dryWeight: string;
}

interface MoistureTestTableProps {
  moistureData: MoistureTestData[];
  onUpdateRow: (index: number, field: keyof MoistureTestData, value: any) => void;
  absorptionValues: { [key: string]: number };
}

const MoistureTestTable: React.FC<MoistureTestTableProps> = ({
  moistureData,
  onUpdateRow,
  absorptionValues
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">Date</TableHead>
            <TableHead className="w-24">Bin #</TableHead>
            <TableHead className="w-40">Aggregate</TableHead>
            <TableHead className="w-32">Wet Weight (lbs)</TableHead>
            <TableHead className="w-32">Dry Weight (lbs)</TableHead>
            <TableHead className="w-32">Total Moisture (%)</TableHead>
            <TableHead className="w-32">Free Moisture (%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moistureData.map((row, index) => (
            <MoistureTestRow
              key={index}
              index={index}
              data={row}
              onUpdate={onUpdateRow}
              absorptionValues={absorptionValues}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MoistureTestTable;
