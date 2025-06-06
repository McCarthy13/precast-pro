
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Droplets, Eye, Download } from "lucide-react";
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

  const filteredRecords = records.filter(record =>
    record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.notes.toLowerCase().includes(searchTerm.toLowerCase())
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
            Moisture Test Records
          </CardTitle>
          <CardDescription>
            {filteredRecords.length} record{filteredRecords.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredRecords.length === 0 ? (
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
                    <TableHead>Test ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Test Entries</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.departmentName}</TableCell>
                      <TableCell>{formatDate(record.submittedAt)}</TableCell>
                      <TableCell>{record.testData.length} entries</TableCell>
                      <TableCell>
                        <Badge variant={record.status === 'completed' ? 'default' : 'secondary'}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
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
