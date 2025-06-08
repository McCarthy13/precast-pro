import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FreshTest, Column, HierarchyGroup } from './types';
import { formatPieces, getDateTimeGroup } from './utils';
import TableFilters from './TableFilters';
import FreshConcreteTableHeader from './TableHeader';
import FreshConcreteTableRow from './TableRow';

interface FreshConcreteTestsTableProps {
  tests: FreshTest[];
  columns: Column[];
  strengthData: Record<string, any>;
  updateStrengthData: (testId: string, field: string, value: string) => void;
  calculateAverage: (testId: string) => string;
  showFilters: boolean;
  columnFilters: Record<string, string>;
  setColumnFilters: (filters: Record<string, string>) => void;
  clearColumnFilter: (column: string) => void;
  clearAllFilters: () => void;
}

const FreshConcreteTestsTable = ({
  tests,
  columns,
  strengthData,
  updateStrengthData,
  calculateAverage,
  showFilters,
  columnFilters,
  setColumnFilters,
  clearColumnFilter,
  clearAllFilters
}: FreshConcreteTestsTableProps) => {
  // Enhanced update function that syncs 28-day strength data across date/time groups
  const handleStrengthDataUpdate = (testId: string, field: string, value: string) => {
    if (field.startsWith('strength') || field === 'strengthSubmitted') {
      // For 28-day strength fields, update all records with the same date and time
      // Extract the base test ID if this is a form-specific key
      const baseTestId = testId.includes('_') ? testId.split('_')[0] : testId;
      const dateTimeGroupIds = getDateTimeGroup(tests, baseTestId);
      dateTimeGroupIds.forEach(id => {
        updateStrengthData(id, field, value);
      });
    } else {
      // For release data (which can be form-specific), update only the specific record/form
      updateStrengthData(testId, field, value);
    }
  };

  // New function to handle main test data updates
  const handleTestDataUpdate = (testId: string, field: string, value: string) => {
    // Store test data updates in strengthData for simplicity
    updateStrengthData(testId, field, value);
  };

  // Helper function to get the current value for a field (either from strengthData or original test data)
  const getFieldValue = (test: FreshTest, field: string) => {
    return strengthData[test.id]?.[field] || test[field as keyof FreshTest] || '';
  };

  const handleSubmitRelease = (testId: string) => {
    updateStrengthData(testId, 'releaseSubmitted', 'true');
    console.log(`Release data for ${testId} submitted for finalization`);
  };

  const handleSubmit28Day = (testId: string) => {
    // Submit 28-day data for all records with the same date and time
    const baseTestId = testId.includes('_') ? testId.split('_')[0] : testId;
    const dateTimeGroupIds = getDateTimeGroup(tests, baseTestId);
    dateTimeGroupIds.forEach(id => {
      updateStrengthData(id, 'strengthSubmitted', 'true');
    });
    console.log(`28-day strength data for group containing ${testId} submitted for finalization`);
  };

  const isReleaseComplete = (testId: string) => {
    const data = strengthData[testId];
    return data?.release;
  };

  const is28DayComplete = (testId: string) => {
    const baseTestId = testId.includes('_') ? testId.split('_')[0] : testId;
    const data = strengthData[baseTestId];
    return data?.strength1 && data?.strength2 && data?.strength3;
  };

  const isReleaseSubmitted = (testId: string) => {
    return strengthData[testId]?.releaseSubmitted === 'true';
  };

  const is28DaySubmitted = (testId: string) => {
    const baseTestId = testId.includes('_') ? testId.split('_')[0] : testId;
    return strengthData[baseTestId]?.strengthSubmitted === 'true';
  };

  // Group tests by form submission ID and create hierarchical structure
  const groupTestsByFormSubmission = (): HierarchyGroup[] => {
    const grouped = new Map<string, FreshTest[]>();
    
    tests.forEach(test => {
      const key = test.formSubmissionId || test.id;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(test);
    });
    
    return Array.from(grouped.values()).map(testGroup => {
      // Use the first test as the main record
      const mainTest = testGroup[0];
      
      // Group by form within this submission
      const formGroups = new Map<string, FreshTest[]>();
      testGroup.forEach(test => {
        if (!formGroups.has(test.form)) {
          formGroups.set(test.form, []);
        }
        formGroups.get(test.form)!.push(test);
      });
      
      // Create hierarchical structure: forms -> jobs -> pieces
      const hierarchy = Array.from(formGroups.entries()).map(([form, formTests]) => {
        // Group by job within this form
        const jobGroups = new Map<string, FreshTest[]>();
        formTests.forEach(test => {
          if (!jobGroups.has(test.job)) {
            jobGroups.set(test.job, []);
          }
          jobGroups.get(test.job)!.push(test);
        });
        
        const jobHierarchy = Array.from(jobGroups.entries()).map(([job, jobTests]) => ({
          job,
          pieces: jobTests.map(test => formatPieces(test.pieces)).filter(Boolean)
        }));
        
        return {
          form,
          jobs: jobHierarchy
        };
      });
      
      return {
        mainTest,
        hierarchy,
        allTests: testGroup
      };
    });
  };

  const groupedTests = groupTestsByFormSubmission();

  return (
    <div>
      <TableFilters
        showFilters={showFilters}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        clearColumnFilter={clearColumnFilter}
        clearAllFilters={clearAllFilters}
      />

      <ScrollArea className="w-full rounded-md border">
        <Table className="min-w-max">
          <FreshConcreteTableHeader />
          <TableBody>
            {groupedTests.map((group, groupIndex) => (
              <FreshConcreteTableRow
                key={group.mainTest.id}
                group={group}
                strengthData={strengthData}
                handleTestDataUpdate={handleTestDataUpdate}
                handleStrengthDataUpdate={handleStrengthDataUpdate}
                calculateAverage={calculateAverage}
                getFieldValue={getFieldValue}
                isReleaseSubmitted={isReleaseSubmitted}
                is28DaySubmitted={is28DaySubmitted}
                isReleaseComplete={isReleaseComplete}
                is28DayComplete={is28DayComplete}
                handleSubmitRelease={handleSubmitRelease}
                handleSubmit28Day={handleSubmit28Day}
              />
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default FreshConcreteTestsTable;
