
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FreshConcreteTestsControlsProps {
  onNewTest: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const FreshConcreteTestsControls: React.FC<FreshConcreteTestsControlsProps> = ({
  onNewTest,
  searchTerm,
  onSearchChange,
  showFilters,
  onToggleFilters
}) => {
  return (
    <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
      {/* Search */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tests..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onToggleFilters}
          className={showFilters ? "bg-blue-50 border-blue-300" : ""}
        >
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>
    </div>
  );
};

export default FreshConcreteTestsControls;
