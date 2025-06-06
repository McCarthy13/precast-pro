
import React, { useState } from 'react';
import DocumentTemplate from './DocumentTemplate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ExternalLink } from "lucide-react";
import { format } from "date-fns";

// Define the structure for moisture test data
interface MoistureTestData {
  date: Date | undefined;
  binNumber: string;
  aggregate: string;
  wetWeight: string;
  dryWeight: string;
}

const MoistureTestForm = () => {
  // Initialize 10 empty rows
  const [moistureData, setMoistureData] = useState<MoistureTestData[]>(
    Array(10).fill(null).map(() => ({
      date: undefined,
      binNumber: '',
      aggregate: '',
      wetWeight: '',
      dryWeight: ''
    }))
  );

  // Mock absorption values for different aggregates
  const absorptionValues: { [key: string]: number } = {
    "3/8\" Pea Gravel": 2.5,
    "Fine Sand": 3.3,
    "3/4\" Stone": 1.5,
    "1/2\" Stone": 1.5,
    "Coarse Sand": 2.8,
    "1\" Stone": 1.2,
    "Mason Sand": 3.0,
    "#57 Stone": 1.8
  };

  const updateRow = (index: number, field: keyof MoistureTestData, value: any) => {
    const newData = [...moistureData];
    newData[index] = { ...newData[index], [field]: value };
    setMoistureData(newData);
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

  return (
    <DocumentTemplate
      title="Moisture Test Data Form"
      documentNumber="QC-MT-001"
      version="Rev 1.0"
      creationDate="2024-01-15"
      author="Quality Control Department"
      reviewDate="2024-07-15"
      approvedBy="QC Manager"
    >
      {/* Document Management Link */}
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" asChild>
          <a href="/document-management" className="flex items-center">
            <ExternalLink className="h-4 w-4 mr-2" />
            View in Document Management
          </a>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Moisture Test Data Entry</CardTitle>
          <CardDescription>Record moisture test measurements for aggregate materials</CardDescription>
        </CardHeader>
        <CardContent>
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
                {moistureData.map((row, index) => {
                  const totalMoisture = calculateTotalMoisture(row.wetWeight, row.dryWeight);
                  const freeMoisture = calculateFreeMoisture(totalMoisture, row.aggregate);
                  
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {row.date ? format(row.date, "MM/dd/yy") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={row.date}
                              onSelect={(date) => updateRow(index, 'date', date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <Select value={row.binNumber} onValueChange={(value) => updateRow(index, 'binNumber', value)}>
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
                        <Select value={row.aggregate} onValueChange={(value) => updateRow(index, 'aggregate', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select aggregate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3/8&quot; Pea Gravel">3/8" Pea Gravel</SelectItem>
                            <SelectItem value="Fine Sand">Fine Sand</SelectItem>
                            <SelectItem value="3/4&quot; Stone">3/4" Stone</SelectItem>
                            <SelectItem value="1/2&quot; Stone">1/2" Stone</SelectItem>
                            <SelectItem value="Coarse Sand">Coarse Sand</SelectItem>
                            <SelectItem value="1&quot; Stone">1" Stone</SelectItem>
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
                          value={row.wetWeight}
                          onChange={(e) => updateRow(index, 'wetWeight', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="0.0"
                          value={row.dryWeight}
                          onChange={(e) => updateRow(index, 'dryWeight', e.target.value)}
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
                })}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>• Total Moisture = ((Wet Weight - Dry Weight) / Dry Weight) × 100</p>
            <p>• Free Moisture = Total Moisture - Absorption</p>
            <p>• Absorption values are automatically retrieved from material database</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes and Observations</CardTitle>
          <CardDescription>Additional comments and observations</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea 
            id="notes" 
            placeholder="Enter any observations, equipment calibration notes, or additional comments..."
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6">
        <div className="flex space-x-4">
          <Button variant="outline">Save Draft</Button>
          <Button>Submit for Review</Button>
        </div>
      </div>
    </DocumentTemplate>
  );
};

export default MoistureTestForm;
