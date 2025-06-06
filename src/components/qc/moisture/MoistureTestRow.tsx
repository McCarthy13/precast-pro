
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format, parse, isValid } from "date-fns";

interface MoistureTestData {
  date: Date | undefined;
  binNumber: string;
  aggregate: string;
  wetWeight: string;
  dryWeight: string;
}

interface MoistureTestRowProps {
  index: number;
  data: MoistureTestData;
  onUpdate: (index: number, field: keyof MoistureTestData, value: any) => void;
  absorptionValues: { [key: string]: number };
}

const MoistureTestRow: React.FC<MoistureTestRowProps> = ({
  index,
  data,
  onUpdate,
  absorptionValues
}) => {
  const [dateInput, setDateInput] = useState(data.date ? format(data.date, "MM/dd/yy") : "");

  const handleDateInputChange = (value: string) => {
    setDateInput(value);
    
    // Try to parse the input as a date
    const parsedDate = parse(value, "MM/dd/yy", new Date());
    if (isValid(parsedDate)) {
      onUpdate(index, 'date', parsedDate);
    } else if (value === "") {
      onUpdate(index, 'date', undefined);
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    onUpdate(index, 'date', date);
    setDateInput(date ? format(date, "MM/dd/yy") : "");
  };

  const calculateTotalMoisture = (wetWeight: string, dryWeight: string): number => {
    const wet = parseFloat(wetWeight);
    const dry = parseFloat(dryWeight);
    if (wet && dry && dry > 0) {
      return ((wet - dry) / dry) * 100;
    }
    return 0;
  };

  const calculateFreeMoisture = (totalMoisture: number, aggregate: string): number => {
    const absorption = absorptionValues[aggregate] || 0;
    return totalMoisture - absorption;
  };

  const totalMoisture = calculateTotalMoisture(data.wetWeight, data.dryWeight);
  const freeMoisture = calculateFreeMoisture(totalMoisture, data.aggregate);

  return (
    <TableRow>
      <TableCell>
        <div className="flex">
          <Input
            type="text"
            placeholder="MM/DD/YY"
            value={dateInput}
            onChange={(e) => handleDateInputChange(e.target.value)}
            className="flex-1 mr-1"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="px-2">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.date}
                onSelect={handleCalendarSelect}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </TableCell>
      <TableCell>
        <Select value={data.binNumber} onValueChange={(value) => onUpdate(index, 'binNumber', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Bin" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 16 }, (_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Select value={data.aggregate} onValueChange={(value) => onUpdate(index, 'aggregate', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select aggregate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3/8\" Pea Gravel">3/8" Pea Gravel</SelectItem>
            <SelectItem value="Fine Sand">Fine Sand</SelectItem>
            <SelectItem value="3/4\" Stone">3/4" Stone</SelectItem>
            <SelectItem value="1/2\" Stone">1/2" Stone</SelectItem>
            <SelectItem value="Coarse Sand">Coarse Sand</SelectItem>
            <SelectItem value="1\" Stone">1" Stone</SelectItem>
            <SelectItem value="Mason Sand">Mason Sand</SelectItem>
            <SelectItem value="#57 Stone">#57 Stone</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Input
          type="number"
          step="0.1"
          placeholder="0.0"
          value={data.wetWeight}
          onChange={(e) => onUpdate(index, 'wetWeight', e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          step="0.1"
          placeholder="0.0"
          value={data.dryWeight}
          onChange={(e) => onUpdate(index, 'dryWeight', e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          step="0.1"
          value={totalMoisture > 0 ? totalMoisture.toFixed(1) : ''}
          disabled
          className="bg-gray-100"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          step="0.1"
          value={freeMoisture > 0 ? freeMoisture.toFixed(1) : ''}
          disabled
          className="bg-gray-100"
        />
      </TableCell>
    </TableRow>
  );
};

export default MoistureTestRow;
