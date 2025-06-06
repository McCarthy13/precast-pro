import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, Plus, Thermometer, FlaskConical, Database, ArrowUpDown, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";

const QCFreshConcreteTests = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [strengthData, setStrengthData] = useState<Record<string, any>>({});

  const freshTests = [
    {
      id: "FCT-001",
      date: "2024-01-15",
      time: "09:30",
      mixDesign: "MD-001",
      batchTicket: "BT-2024-0115-001",
      pieces: "WP1-001, WP1-002, WP2-001",
      slumpFlow: "5.5",
      airContent: "6.2",
      ambientTemp: "72",
      concreteTemp: "68",
      unitWeight: "145.2",
      yield: "27.0",
      relativeYield: "1.00",
      t20: "12.5",
      jRing: "Pass",
      staticSegregation: "Pass",
      technician: "John Smith",
      status: "Submitted"
    },
    {
      id: "FCT-002",
      date: "2024-01-15",
      time: "14:15",
      mixDesign: "MD-002",
      batchTicket: "BT-2024-0115-002",
      pieces: "WP3-001, WP3-002",
      slumpFlow: "4.0",
      airContent: "5.8",
      ambientTemp: "75",
      concreteTemp: "72",
      unitWeight: "147.8",
      yield: "26.8",
      relativeYield: "0.99",
      t20: "11.2",
      jRing: "Pass",
      staticSegregation: "Pass",
      technician: "Sarah Johnson",
      status: "Draft"
    },
    {
      id: "FCT-003",
      date: "2024-01-14",
      time: "10:45",
      mixDesign: "MD-001",
      batchTicket: "BT-2024-0114-001",
      pieces: "WP1-003, WP1-004",
      slumpFlow: "6.0",
      airContent: "6.0",
      ambientTemp: "70",
      concreteTemp: "67",
      unitWeight: "144.8",
      yield: "27.2",
      relativeYield: "1.01",
      t20: "13.0",
      jRing: "Pass",
      staticSegregation: "Pass",
      technician: "Mike Wilson",
      status: "Submitted"
    }
  ];

  const curingTankRecords = [
    {
      id: "CT-001",
      tankNumber: "Tank A",
      temperature: "73°F ± 3°F",
      lastCalibration: "2024-01-01",
      status: "active",
      samplesCount: 24
    },
    {
      id: "CT-002",
      tankNumber: "Tank B", 
      temperature: "74°F ± 3°F",
      lastCalibration: "2024-01-01",
      status: "active",
      samplesCount: 18
    }
  ];

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'mixDesign', label: 'Mix Design' },
    { key: 'batchTicket', label: 'Batch Ticket' },
    { key: 'pieces', label: 'Pieces' },
    { key: 'slumpFlow', label: 'Slump Flow (in)' },
    { key: 'airContent', label: 'Air Content (%)' },
    { key: 'ambientTemp', label: 'Ambient Temp (°F)' },
    { key: 'concreteTemp', label: 'Concrete Temp (°F)' },
    { key: 'unitWeight', label: 'Unit Weight (lb/ft³)' },
    { key: 'yield', label: 'Yield (ft³/yd³)' },
    { key: 'relativeYield', label: 'Relative Yield' },
    { key: 't20', label: 'T-20 (sec)' },
    { key: 'jRing', label: 'J-Ring' },
    { key: 'staticSegregation', label: 'Static Segregation' }
  ];

  const updateStrengthData = (testId: string, field: string, value: string) => {
    setStrengthData(prev => ({
      ...prev,
      [testId]: {
        ...prev[testId],
        [field]: value
      }
    }));
  };

  const calculateAverage = (testId: string) => {
    const data = strengthData[testId];
    if (!data) return '';
    
    const strength1 = parseFloat(data.strength1 || '0');
    const strength2 = parseFloat(data.strength2 || '0');
    const strength3 = parseFloat(data.strength3 || '0');
    
    if (strength1 > 0 && strength2 > 0 && strength3 > 0) {
      return Math.round((strength1 + strength2 + strength3) / 3).toString();
    }
    return '';
  };

  const filteredAndSortedTests = useMemo(() => {
    let filtered = freshTests;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(test =>
        Object.values(test).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply column filters
    Object.entries(columnFilters).forEach(([column, filterValue]) => {
      if (filterValue) {
        filtered = filtered.filter(test =>
          test[column as keyof typeof test]?.toString().toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    });

    // Sort by date and time
    return filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
  }, [searchTerm, columnFilters, sortOrder]);

  const clearColumnFilter = (column: string) => {
    setColumnFilters(prev => {
      const updated = { ...prev };
      delete updated[column];
      return updated;
    });
  };

  const clearAllFilters = () => {
    setColumnFilters({});
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Fresh Concrete Test Data</h2>
          <p className="text-gray-600">Record and track all fresh concrete tests, curing tanks, and neoprene pad usage</p>
        </div>
      </div>

      <Tabs defaultValue="fresh-tests" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fresh-tests" className="flex items-center">
            <FlaskConical className="h-4 w-4 mr-2" />
            Fresh Tests
          </TabsTrigger>
          <TabsTrigger value="curing-tanks" className="flex items-center">
            <Thermometer className="h-4 w-4 mr-2" />
            Curing Tanks
          </TabsTrigger>
          <TabsTrigger value="neoprene-pads" className="flex items-center">
            <Database className="h-4 w-4 mr-2" />
            Neoprene Pads
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fresh-tests" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Fresh Concrete Test Records</CardTitle>
                  <CardDescription>Historical record of all fresh concrete tests</CardDescription>
                </div>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/templates/fresh-concrete-test">
                    <Plus className="h-4 w-4 mr-2" />
                    New Test Record
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search all records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  {(Object.keys(columnFilters).length > 0 || searchTerm) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-red-600 hover:text-red-700"
                    >
                      Clear All
                    </Button>
                  )}
                  <ToggleGroup
                    type="single"
                    value={sortOrder}
                    onValueChange={(value) => value && setSortOrder(value as 'asc' | 'desc')}
                  >
                    <ToggleGroupItem value="desc" aria-label="Newest first">
                      <ArrowUpDown className="h-4 w-4 mr-1" />
                      Newest First
                    </ToggleGroupItem>
                    <ToggleGroupItem value="asc" aria-label="Oldest first">
                      <ArrowUpDown className="h-4 w-4 mr-1" />
                      Oldest First
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>

              {/* Active Filters Display */}
              {Object.keys(columnFilters).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(columnFilters).map(([column, value]) => (
                    <Badge key={column} variant="secondary" className="flex items-center gap-1">
                      {columns.find(col => col.key === column)?.label}: {value}
                      <button
                        onClick={() => clearColumnFilter(column)}
                        className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Column Filters */}
              {showFilters && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-4 bg-gray-50 rounded-lg">
                  {columns.map((column) => (
                    <div key={column.key} className="space-y-1">
                      <label className="text-xs font-medium text-gray-600">{column.label}</label>
                      <Input
                        placeholder={`Filter ${column.label.toLowerCase()}...`}
                        value={columnFilters[column.key] || ''}
                        onChange={(e) => setColumnFilters(prev => ({
                          ...prev,
                          [column.key]: e.target.value
                        }))}
                        className="h-8 text-xs"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((column) => (
                        <TableHead key={column.key}>{column.label}</TableHead>
                      ))}
                      <TableHead className="text-center font-semibold bg-blue-50" colSpan={5}>
                        STRENGTH RESULTS
                      </TableHead>
                    </TableRow>
                    <TableRow>
                      {columns.map(() => (
                        <TableHead key="spacer" className="p-0 h-0"></TableHead>
                      ))}
                      <TableHead className="text-xs">Release/Release Required</TableHead>
                      <TableHead className="text-xs">28-Day Strength 1</TableHead>
                      <TableHead className="text-xs">28-Day Strength 2</TableHead>
                      <TableHead className="text-xs">28-Day Strength 3</TableHead>
                      <TableHead className="text-xs">Average</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedTests.map((test) => (
                      <TableRow key={test.id}>
                        <TableCell>{test.date}</TableCell>
                        <TableCell>{test.time}</TableCell>
                        <TableCell>{test.mixDesign}</TableCell>
                        <TableCell>{test.batchTicket}</TableCell>
                        <TableCell>{test.pieces}</TableCell>
                        <TableCell>{test.slumpFlow}</TableCell>
                        <TableCell>{test.airContent}</TableCell>
                        <TableCell>{test.ambientTemp}</TableCell>
                        <TableCell>{test.concreteTemp}</TableCell>
                        <TableCell>{test.unitWeight}</TableCell>
                        <TableCell>{test.yield}</TableCell>
                        <TableCell>{test.relativeYield}</TableCell>
                        <TableCell>{test.t20}</TableCell>
                        <TableCell>
                          <Badge className={test.jRing === "Pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {test.jRing}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={test.staticSegregation === "Pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {test.staticSegregation}
                          </Badge>
                        </TableCell>
                        {/* Strength Results - Editable columns */}
                        <TableCell>
                          <Input
                            className="w-24 h-8 text-xs"
                            placeholder="5171/3500"
                            value={strengthData[test.id]?.release || ''}
                            onChange={(e) => updateStrengthData(test.id, 'release', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            className="w-20 h-8 text-xs"
                            placeholder="8674"
                            value={strengthData[test.id]?.strength1 || ''}
                            onChange={(e) => updateStrengthData(test.id, 'strength1', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            className="w-20 h-8 text-xs"
                            placeholder="8491"
                            value={strengthData[test.id]?.strength2 || ''}
                            onChange={(e) => updateStrengthData(test.id, 'strength2', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            className="w-20 h-8 text-xs"
                            placeholder="8532"
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curing-tanks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Curing Tank Records</CardTitle>
              <CardDescription>Monitor curing tank conditions and sample storage</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tank ID</TableHead>
                    <TableHead>Tank Number</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Last Calibration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Samples Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {curingTankRecords.map((tank) => (
                    <TableRow key={tank.id}>
                      <TableCell className="font-medium">{tank.id}</TableCell>
                      <TableCell>{tank.tankNumber}</TableCell>
                      <TableCell>{tank.temperature}</TableCell>
                      <TableCell>{tank.lastCalibration}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{tank.status}</Badge>
                      </TableCell>
                      <TableCell>{tank.samplesCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="neoprene-pads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Neoprene Pad Usage Logs</CardTitle>
              <CardDescription>Track neoprene pad usage and replacement schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Neoprene pad usage tracking interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QCFreshConcreteTests;
