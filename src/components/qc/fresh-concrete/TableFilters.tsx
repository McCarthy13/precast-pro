
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TableFiltersProps {
  showFilters: boolean;
  columnFilters: Record<string, string>;
  setColumnFilters: (filters: Record<string, string>) => void;
  clearColumnFilter: (column: string) => void;
  clearAllFilters: () => void;
}

const TableFilters = ({
  showFilters,
  columnFilters,
  setColumnFilters,
  clearColumnFilter,
  clearAllFilters
}: TableFiltersProps) => {
  const handleFilterChange = (column: string, value: string) => {
    setColumnFilters({
      ...columnFilters,
      [column]: value
    });
  };

  const filterColumns = [
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'job', label: 'Job' },
    { key: 'mixDesign', label: 'Mix Design' },
    { key: 'batchTicket', label: 'Batch #' },
    { key: 'pieces', label: 'Pieces' },
    { key: 'slumpFlow', label: 'Slump/Flow' },
    { key: 'airContent', label: 'Air Content' },
    { key: 'ambientTemp', label: 'Ambient Temp' },
    { key: 'concreteTemp', label: 'Concrete Temp' },
    { key: 'unitWeight', label: 'Unit Weight' },
    { key: 'yield', label: 'Yield' },
    { key: 'relativeYield', label: 'Relative Yield' },
    { key: 'releaseRequired', label: 'Release Req' },
    { key: 'strengthRequired', label: 'Strength Req' },
    { key: 't20', label: 'T-20' },
    { key: 'jRing', label: 'J-Ring' },
    { key: 'staticSegregation', label: 'Static Seg' },
    { key: 'technician', label: 'Technician' },
    { key: 'status', label: 'Status' }
  ];

  if (!showFilters) return null;

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">Column Filters</h3>
        <Button variant="outline" size="sm" onClick={clearAllFilters}>
          Clear All
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {filterColumns.map(({ key, label }) => (
          <div key={key} className="space-y-1">
            <label className="text-xs font-medium text-gray-600">{label}</label>
            <div className="relative">
              <Input
                placeholder={`Filter ${label.toLowerCase()}...`}
                value={columnFilters[key] || ''}
                onChange={(e) => handleFilterChange(key, e.target.value)}
                className="text-xs h-8"
              />
              {columnFilters[key] && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => clearColumnFilter(key)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableFilters;
