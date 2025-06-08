import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Thermometer, FlaskConical, Database, Plus, Target } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import FreshConcreteTestsTable from "./fresh-concrete/FreshConcreteTestsTable";
import FreshConcreteTestsControls from "./fresh-concrete/FreshConcreteTestsControls";
import CuringTanksTab from "./fresh-concrete/CuringTanksTab";

const QCFreshConcreteTests = () => {
  const location = useLocation();
  
  // Determine the current department from the URL
  const getCurrentDepartment = () => {
    if (location.pathname.includes('/wall-panels')) return 'wall-panels';
    if (location.pathname.includes('/precast')) return 'precast';
    if (location.pathname.includes('/extruded')) return 'extruded';
    if (location.pathname.includes('/flexicore')) return 'flexicore';
    if (location.pathname.includes('/double-tees')) return 'double-tees';
    return 'precast'; // default
  };

  const currentDepartment = getCurrentDepartment();

  // Get department-specific sample data with hierarchical grouping
  const getDepartmentSampleData = () => {
    switch (currentDepartment) {
      case 'precast':
        return [
          // Form Submission Group 1 - Multiple forms, jobs, and pieces from one test session
          {
            id: "FCT-P001-main",
            date: "2024-01-15",
            time: "09:30",
            job: "5014",
            mixDesign: "MD-001",
            batchTicket: "2401151",
            form: "BL1",
            pieces: "C0016, C0017",
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
            status: "Submitted",
            formSubmissionId: "FS-001"
          },
          {
            id: "FCT-P001-sub1",
            date: "2024-01-15",
            time: "09:30",
            job: "5015",
            mixDesign: "MD-001",
            batchTicket: "2401151",
            form: "BL1",
            pieces: "B0003, B0004",
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
            status: "Submitted",
            formSubmissionId: "FS-001"
          },
          {
            id: "FCT-P001-sub2",
            date: "2024-01-15",
            time: "09:30",
            job: "5016",
            mixDesign: "MD-001",
            batchTicket: "2401151",
            form: "COL",
            pieces: "C0018",
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
            status: "Submitted",
            formSubmissionId: "FS-001"
          },
          {
            id: "FCT-P001-sub3",
            date: "2024-01-15",
            time: "09:30",
            job: "5017",
            mixDesign: "MD-001",
            batchTicket: "2401151",
            form: "COL",
            pieces: "C0019, C0020",
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
            status: "Submitted",
            formSubmissionId: "FS-001"
          },
          {
            id: "FCT-P001-sub4",
            date: "2024-01-15",
            time: "09:30",
            job: "5018",
            mixDesign: "MD-001",
            batchTicket: "2401151",
            form: "BL3",
            pieces: "B0020, B0021, B0022",
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
            status: "Submitted",
            formSubmissionId: "FS-001"
          },

          // Form Submission Group 2 - Single form, single job
          {
            id: "FCT-P002",
            date: "2024-01-14",
            time: "14:15",
            job: "5019",
            mixDesign: "MD-002",
            batchTicket: "2401142",
            form: "STAD",
            pieces: "M0001, M0002",
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
            status: "Draft",
            formSubmissionId: "FS-002"
          },

          // Form Submission Group 3 - Multiple forms with different jobs
          {
            id: "FCT-P003-main",
            date: "2024-01-13",
            time: "11:00",
            job: "5020",
            mixDesign: "MD-003",
            batchTicket: "2401131",
            form: "BL2",
            pieces: "B0025, B0026",
            slumpFlow: "5.2",
            airContent: "6.0",
            ambientTemp: "74",
            concreteTemp: "70",
            unitWeight: "146.1",
            releaseRequired: "3800",
            strengthRequired: "5500",
            yield: "26.9",
            relativeYield: "1.01",
            t20: "12.8",
            jRing: "Pass",
            staticSegregation: "Pass",
            technician: "Mike Wilson",
            status: "Submitted",
            formSubmissionId: "FS-003"
          },
          {
            id: "FCT-P003-sub1",
            date: "2024-01-13",
            time: "11:00",
            job: "5021",
            mixDesign: "MD-003",
            batchTicket: "2401131",
            form: "EPB-E",
            pieces: "B0027",
            slumpFlow: "5.2",
            airContent: "6.0",
            ambientTemp: "74",
            concreteTemp: "70",
            unitWeight: "146.1",
            releaseRequired: "3800",
            strengthRequired: "5500",
            yield: "26.9",
            relativeYield: "1.01",
            t20: "12.8",
            jRing: "Pass",
            staticSegregation: "Pass",
            technician: "Mike Wilson",
            status: "Submitted",
            formSubmissionId: "FS-003"
          },
          {
            id: "FCT-P003-sub2",
            date: "2024-01-13",
            time: "11:00",
            job: "5022",
            mixDesign: "MD-003",
            batchTicket: "2401131",
            form: "EPB-E",
            pieces: "B0028, B0029, B0030",
            slumpFlow: "5.2",
            airContent: "6.0",
            ambientTemp: "74",
            concreteTemp: "70",
            unitWeight: "146.1",
            releaseRequired: "3800",
            strengthRequired: "5500",
            yield: "26.9",
            relativeYield: "1.01",
            t20: "12.8",
            jRing: "Pass",
            staticSegregation: "Pass",
            technician: "Mike Wilson",
            status: "Submitted",
            formSubmissionId: "FS-003"
          }
        ];
      case 'wall-panels':
        return [
          // Form Submission Group 1 - Multiple forms and jobs
          {
            id: "FCT-W001-main",
            date: "2024-01-15",
            time: "10:45",
            job: "5016",
            mixDesign: "MD-WP01",
            batchTicket: "2401153",
            form: "WP1",
            pieces: "W0001, W0002",
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
            status: "Submitted",
            formSubmissionId: "FS-W001"
          },
          {
            id: "FCT-W001-sub1",
            date: "2024-01-15",
            time: "10:45",
            job: "5017",
            mixDesign: "MD-WP01",
            batchTicket: "2401153",
            form: "WP1",
            pieces: "W0003, W0004",
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
            status: "Submitted",
            formSubmissionId: "FS-W001"
          },
          {
            id: "FCT-W001-sub2",
            date: "2024-01-15",
            time: "10:45",
            job: "5018",
            mixDesign: "MD-WP01",
            batchTicket: "2401153",
            form: "WP15",
            pieces: "W0010, W0011, W0012",
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
            status: "Submitted",
            formSubmissionId: "FS-W001"
          },

          // Form Submission Group 2 - Single form
          {
            id: "FCT-W002",
            date: "2024-01-14",
            time: "09:30",
            job: "5019",
            mixDesign: "MD-WP02",
            batchTicket: "2401141",
            form: "WP24",
            pieces: "W0020, W0021",
            slumpFlow: "5.8",
            airContent: "5.9",
            ambientTemp: "72",
            concreteTemp: "69",
            unitWeight: "145.5",
            releaseRequired: "3200",
            strengthRequired: "4800",
            yield: "27.0",
            relativeYield: "0.99",
            t20: "12.2",
            jRing: "Pass",
            staticSegregation: "Pass",
            technician: "Lisa Brown",
            status: "Submitted",
            formSubmissionId: "FS-W002"
          }
        ];

      case 'extruded':
        return [
          {
            id: "FCT-E001",
            date: "2024-01-15",
            time: "11:30",
            job: "5017",
            mixDesign: "MD-EXT01",
            batchTicket: "2401154",
            form: "EXT1",
            pieces: "H0001, H0002",
            slumpFlow: "5.0",
            airContent: "5.5",
            ambientTemp: "73",
            concreteTemp: "69",
            unitWeight: "146.0",
            releaseRequired: "3200",
            strengthRequired: "4500",
            yield: "26.5",
            relativeYield: "0.98",
            t20: "12.0",
            jRing: "Pass",
            staticSegregation: "Pass",
            technician: "Lisa Brown",
            status: "Submitted",
            formSubmissionId: "FS-E001"
          },
          {
            id: "FCT-E002",
            date: "2024-01-14",
            time: "08:15",
            job: "5019",
            mixDesign: "MD-EXT02",
            batchTicket: "2401142",
            form: "EXT3",
            pieces: "H0005, H0006, H0007",
            slumpFlow: "4.8",
            airContent: "5.2",
            ambientTemp: "75",
            concreteTemp: "71",
            unitWeight: "146.8",
            releaseRequired: "3400",
            strengthRequired: "4700",
            yield: "26.3",
            relativeYield: "0.97",
            t20: "11.5",
            jRing: "Pass",
            staticSegregation: "Pass",
            technician: "Tom Davis",
            status: "Submitted",
            formSubmissionId: "FS-E002"
          }
        ];
      case 'flexicore':
        return [
          {
            id: "FCT-F001",
            date: "2024-01-15",
            time: "13:15",
            job: "5018",
            mixDesign: "MD-FL01",
            batchTicket: "2401155",
            form: "FL12x24",
            pieces: "H0003, H0004",
            slumpFlow: "4.5",
            airContent: "5.0",
            ambientTemp: "74",
            concreteTemp: "70",
            unitWeight: "145.5",
            releaseRequired: "3000",
            strengthRequired: "4000",
            yield: "26.0",
            relativeYield: "0.96",
            t20: "11.5",
            jRing: "Pass",
            staticSegregation: "Pass",
            technician: "Tom Davis",
            status: "Submitted",
            formSubmissionId: "FS-F001"
          },
          {
            id: "FCT-F002",
            date: "2024-01-14",
            time: "15:30",
            job: "5020",
            mixDesign: "MD-FL02",
            batchTicket: "2401143",
            form: "FL8x24",
            pieces: "H0008, H0009, H0010, H0011",
            slumpFlow: "4.2",
            airContent: "4.8",
            ambientTemp: "76",
            concreteTemp: "72",
            unitWeight: "145.9",
            releaseRequired: "2800",
            strengthRequired: "3800",
            yield: "25.8",
            relativeYield: "0.95",
            t20: "11.0",
            jRing: "Pass",
            staticSegregation: "Pass",
            technician: "Amy Chen",
            status: "Submitted",
            formSubmissionId: "FS-F002"
          }
        ];
      case 'double-tees':
        return [
          {
            id: "FCT-DT001",
            date: "2024-01-15",
            time: "15:00",
            job: "5019",
            mixDesign: "MD-DT01",
            batchTicket: "2401156",
            form: "DT1",
            pieces: "T0001, T0002",
            slumpFlow: "5.5",
            airContent: "6.0",
            ambientTemp: "72",
            concreteTemp: "68",
            unitWeight: "146.5",
            releaseRequired: "3800",
            strengthRequired: "5500",
            yield: "27.5",
            relativeYield: "1.02",
            t20: "12.8",
            jRing: "Pass",
            staticSegregation: "Pass",
            technician: "Amy Chen",
            status: "Submitted",
            formSubmissionId: "FS-DT001"
          },
          {
            id: "FCT-DT002",
            date: "2024-01-14",
            time: "13:45",
            job: "5021",
            mixDesign: "MD-DT02",
            batchTicket: "2401144",
            form: "DT2",
            pieces: "T0005, T0006, T0007",
            slumpFlow: "5.2",
            airContent: "5.8",
            ambientTemp: "74",
            concreteTemp: "70",
            unitWeight: "146.2",
            releaseRequired: "3600",
            strengthRequired: "5200",
            yield: "27.1",
            relativeYield: "1.00",
            t20: "12.5",
            jRing: "Pass",
            staticSegregation: "Pass",
            technician: "John Smith",
            status: "Submitted",
            formSubmissionId: "FS-DT002"
          }
        ];
      default:
        return [];
    }
  };

  // Get the correct form URL based on department
  const getFormUrl = () => {
    switch (currentDepartment) {
      case 'wall-panels':
        return '/templates/wall-panels-fresh-concrete-test';
      case 'extruded':
        return '/templates/extruded-fresh-concrete-test';
      case 'flexicore':
        return '/templates/flexicore-fresh-concrete-test';
      case 'double-tees':
        return '/templates/double-tees-fresh-concrete-test';
      default:
        return '/templates/fresh-concrete-test';
    }
  };

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [strengthData, setStrengthData] = useState<Record<string, any>>({});
  const [submittedRecords, setSubmittedRecords] = useState<any[]>([]);

  // Load department-specific submitted records from localStorage
  useEffect(() => {
    const storageKey = `freshConcreteTestRecords_${currentDepartment}`;
    const records = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setSubmittedRecords(records);
  }, [currentDepartment]);

  // Convert submitted records to the format expected by the table
  const convertedSubmittedRecords = submittedRecords.map(record => ({
    id: record.id,
    date: record.testData.date,
    time: record.testData.time,
    job: record.testData.job,
    mixDesign: record.testData.mixDesign,
    batchTicket: record.testData.batchTicket,
    form: record.testData.selectedForms?.[0] || 'N/A',
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
    formSubmissionId: record.formSubmissionId || record.id.split('-')[0] + '-' + record.id.split('-')[1]
  }));

  // Combine department sample data with submitted records
  const freshTests = [
    ...getDepartmentSampleData(),
    ...convertedSubmittedRecords
  ];

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'mixDesign', label: 'Mix Design' },
    { key: 'batchTicket', label: 'Batch Ticket' },
    { key: 'job', label: 'Job' },
    { key: 'form', label: 'Form' },
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
    // Navigate to department-specific test form
    window.location.href = getFormUrl();
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
                    <Link to={getFormUrl()}>
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
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
              />

              <FreshConcreteTestsTable
                tests={filteredAndSortedTests}
                columns={columns}
                strengthData={strengthData}
                updateStrengthData={updateStrengthData}
                calculateAverage={calculateAverage}
                showFilters={showFilters}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                clearColumnFilter={clearColumnFilter}
                clearAllFilters={clearAllFilters}
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
