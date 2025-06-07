import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Thermometer, FlaskConical, Database, Plus, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import FreshConcreteTestsTable from "./fresh-concrete/FreshConcreteTestsTable";
import FreshConcreteTestsControls from "./fresh-concrete/FreshConcreteTestsControls";
import CuringTanksTab from "./fresh-concrete/CuringTanksTab";

const QCFreshConcreteTests = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [strengthData, setStrengthData] = useState<Record<string, any>>({});
  const [submittedRecords, setSubmittedRecords] = useState<any[]>([]);

  // Load submitted records from localStorage
  useEffect(() => {
    const records = JSON.parse(localStorage.getItem('freshConcreteTestRecords') || '[]');
    setSubmittedRecords(records);
  }, []);

  // Convert submitted records to the format expected by the table
  const convertedSubmittedRecords = submittedRecords.map(record => ({
    id: record.id,
    date: record.testData.date,
    time: record.testData.time,
    job: record.testData.job,
    mixDesign: record.testData.mixDesign,
    batchTicket: record.testData.batchTicket,
    pieces: record.testData.pieces,
    slumpFlow: record.testData.slumpFlow,
    airContent: record.testData.airContent,
    ambientTemp: record.testData.ambientTemp,
    concreteTemp: record.testData.concreteTemp,
    unitWeight: record.testData.unitWeight,
    releaseRequired: record.testData.releaseRequired,
    strengthRequired: record.testData.strengthRequired,
    yield: record.testData.yield,
    relativeYield: record.testData.relativeYield,
    t20: record.testData.t20,
    jRing: record.testData.jRing,
    staticSegregation: record.testData.staticSegregation,
    technician: "System",
    status: "Submitted",
    formSubmissionId: record.formSubmissionId || record.id.split('-')[0] + '-' + record.id.split('-')[1] // Extract submission ID from record ID
  }));

  const freshTests = [
    {
      id: "FCT-001",
      date: "2024-01-15",
      time: "09:30",
      job: "5014",
      mixDesign: "MD-001",
      batchTicket: "2401151",
      pieces: "C16, C17, B3",
      slumpFlow: "5.5",
      airContent: "6.2",
      ambientTemp: "72",
      concreteTemp: "68",
      unitWeight: "145.2",
      releaseRequired: "3500",
      strengthRequired: "5000",
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
      job: "5015",
      mixDesign: "MD-002",
      batchTicket: "2401152",
      pieces: "W1, W2",
      slumpFlow: "4.0",
      airContent: "5.8",
      ambientTemp: "75",
      concreteTemp: "72",
      unitWeight: "147.8",
      releaseRequired: "4000",
      strengthRequired: "6000",
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
      job: "5016",
      mixDesign: "MD-001",
      batchTicket: "2401143",
      pieces: "DT1, DT2",
      slumpFlow: "6.0",
      airContent: "6.0",
      ambientTemp: "70",
      concreteTemp: "67",
      unitWeight: "144.8",
      releaseRequired: "3500",
      strengthRequired: "5000",
      yield: "27.2",
      relativeYield: "1.01",
      t20: "13.0",
      jRing: "Pass",
      staticSegregation: "Pass",
      technician: "Mike Wilson",
      status: "Submitted"
    },
    ...convertedSubmittedRecords
  ];

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'mixDesign', label: 'Mix Design' },
    { key: 'batchTicket', label: 'Batch Ticket' },
    { key: 'job', label: 'Job' },
    { key: 'pieces', label: 'Pieces' },
    { key: 'slumpFlow', label: 'Slump Flow (in)' },
    { key: 'airContent', label: 'Air Content (%)' },
    { key: 'ambientTemp', label: 'Ambient Temp (°F)' },
    { key: 'concreteTemp', label: 'Concrete Temp (°F)' },
    { key: 'unitWeight', label: 'Unit Weight (lb/ft³)' },
    { key: 'yield', label: 'Yield (ft³/yd³)' },
    { key: 'relativeYield', label: 'Relative Yield' }
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

  const findOldestRecordWithoutStrength = () => {
    const recordsWithoutStrength = freshTests.filter(test => {
      const average = calculateAverage(test.id);
      const isSubmitted = strengthData[test.id]?.strengthSubmitted === 'true';
      return !average && !isSubmitted;
    });

    if (recordsWithoutStrength.length === 0) return null;

    return recordsWithoutStrength.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    })[0];
  };

  const scrollToOldestRecord = () => {
    const oldestRecord = findOldestRecordWithoutStrength();
    if (oldestRecord) {
      const element = document.getElementById(`test-row-${oldestRecord.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('bg-yellow-100');
        setTimeout(() => {
          element.classList.remove('bg-yellow-100');
        }, 3000);
      }
    }
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
  }, [searchTerm, columnFilters, sortOrder, freshTests]);

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

  const handleNewTest = () => {
    // Navigate to new test form
    window.location.href = '/templates/fresh-concrete-test';
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
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={scrollToOldestRecord}
                    disabled={!findOldestRecordWithoutStrength()}
                    className="flex items-center"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Input 28-Day Strengths
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link to="/templates/fresh-concrete-test">
                      <Plus className="h-4 w-4 mr-2" />
                      New Test Record
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <FreshConcreteTestsControls
                onNewTest={handleNewTest}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />

              <FreshConcreteTestsTable
                tests={filteredAndSortedTests}
                columns={columns}
                strengthData={strengthData}
                updateStrengthData={updateStrengthData}
                calculateAverage={calculateAverage}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curing-tanks" className="space-y-6">
          <CuringTanksTab />
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
