import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Droplets, Eye, Download, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface MoistureTestRecord {
  id: string;
  departmentName: string;
  submittedAt: string;
  testData: Array<{
    date: Date | undefined;
    binNumber: string;
    aggregate: string;
    wetWeight: string;
    dryWeight: string;
  }>;
  notes: string;
  status: string;
}

interface QCMoisturesProps {
  departmentName?: string;
}

const QCMoistures: React.FC<QCMoisturesProps> = ({ departmentName }) => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<MoistureTestRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    // Load moisture test records from localStorage
    const storedRecords = JSON.parse(localStorage.getItem('moistureTestRecords') || '[]');
    
    // Filter by department if specified
    const filteredRecords = departmentName 
      ? storedRecords.filter((record: MoistureTestRecord) => 
          record.departmentName.toLowerCase() === departmentName.toLowerCase()
        )
      : storedRecords;
    
    setRecords(filteredRecords);
  }, [departmentName]);

  // Flatten all test data from all records for the main table view
  const allTestData = records.flatMap(record => 
    record.testData.map(testEntry => ({
      ...testEntry,
      recordId: record.id,
      submittedAt: record.submittedAt,
      departmentName: record.departmentName,
      notes: record.notes
    }))
  );

  const filteredTestData = allTestData.filter(entry =>
    entry.recordId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.binNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.aggregate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewTest = () => {
    navigate('/templates/moisture-test');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTestDate = (date: Date | undefined | any) => {
    if (!date) return '';
    
    // Handle the date object structure from the form
    if (date && typeof date === 'object' && date.value) {
      return new Date(date.value.iso || date.value.value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
    
    // Handle regular date objects
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
    
    // Handle date strings
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
    
    return '';
  };

  const calculateMoisture = (wetWeight: string, dryWeight: string, aggregate: string) => {
    const wet = parseFloat(wetWeight);
    const dry = parseFloat(dryWeight);
    
    if (isNaN(wet) || isNaN(dry) || dry === 0) {
      return { totalMoisture: '', freeMoisture: '' };
    }
    
    const totalMoisture = ((wet - dry) / dry) * 100;
    const absorption = absorptionValues[aggregate] || 0;
    const freeMoisture = totalMoisture - absorption;
    
    return {
      totalMoisture: totalMoisture.toFixed(2),
      freeMoisture: freeMoisture.toFixed(2)
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Moisture Tests{departmentName && ` - ${departmentName}`}</h2>
          <p className="text-gray-600">Historical record of all moisture test data</p>
        </div>
        <Button onClick={handleNewTest} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Moisture Test
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search moisture test records..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Droplets className="h-5 w-5 mr-2" />
            Moisture Test Data
          </CardTitle>
          <CardDescription>
            {filteredTestData.length} test entr{filteredTestData.length !== 1 ? 'ies' : 'y'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTestData.length === 0 ? (
            <div className="text-center py-8">
              <Droplets className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No moisture test records found.</p>
              <Button 
                onClick={handleNewTest} 
                variant="outline" 
                className="mt-4"
              >
                Create First Test
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Bin #</TableHead>
                    <TableHead>Aggregate</TableHead>
                    <TableHead>Wet Weight (lbs)</TableHead>
                    <TableHead>Dry Weight (lbs)</TableHead>
                    <TableHead>Total Moisture (%)</TableHead>
                    <TableHead>Free Moisture (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTestData.map((entry, index) => {
                    const { totalMoisture, freeMoisture } = calculateMoisture(
                      entry.wetWeight, 
                      entry.dryWeight, 
                      entry.aggregate
                    );
                    
                    return (
                      <TableRow key={`${entry.recordId}-${index}`}>
                        <TableCell>{formatTestDate(entry.date)}</TableCell>
                        <TableCell>{entry.binNumber}</TableCell>
                        <TableCell>{entry.aggregate}</TableCell>
                        <TableCell>{entry.wetWeight}</TableCell>
                        <TableCell>{entry.dryWeight}</TableCell>
                        <TableCell>{totalMoisture ? `${totalMoisture}%` : ''}</TableCell>
                        <TableCell>{freeMoisture ? `${freeMoisture}%` : ''}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QCMoistures;
