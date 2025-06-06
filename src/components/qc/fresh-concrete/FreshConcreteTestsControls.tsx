
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, ArrowUpDown, Filter, X } from "lucide-react";

interface Column {
  key: string;
  label: string;
}

interface FreshConcreteTestsControlsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  columnFilters: Record<string, string>;
  setColumnFilters: (value: Record<string, string>) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (value: 'asc' | 'desc') => void;
  columns: Column[];
  clearColumnFilter: (column: string) => void;
  clearAllFilters: () => void;
}

const FreshConcreteTestsControls = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  columnFilters,
  setColumnFilters,
  sortOrder,
  setSortOrder,
  columns,
  clearColumnFilter,
  clearAllFilters
}: FreshConcreteTestsControlsProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default FreshConcreteTestsControls;
