
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getFormsByDepartment } from "@/data/productionForms";

interface FreshConcreteTestsControlsProps {
  onNewTest: () => void;
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  selectedForm: string;
  onFormChange: (form: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const FreshConcreteTestsControls: React.FC<FreshConcreteTestsControlsProps> = ({
  onNewTest,
  selectedDepartment,
  onDepartmentChange,
  selectedForm,
  onFormChange,
  searchTerm,
  onSearchChange
}) => {
  // Get available forms based on selected department
  const getAvailableForms = () => {
    if (!selectedDepartment) return [];
    
    switch (selectedDepartment) {
      case 'precast':
        return ['BL1', 'BL2', 'BL3', 'BL6', 'EPB-E', 'EPB-W', 'WPB-E', 'WPB-W', 'COL', 'STADIA', 'MILD'];
      case 'wall-panels':
        return Array.from({ length: 24 }, (_, i) => `WP${i + 1}`);
      case 'extruded':
        return ['EXT1', 'EXT2', 'EXT3', 'EXT4', 'EXT5', 'EXT6', 'EXT7', 'EXT8'];
      case 'flexicore':
        const flexicoreForms = getFormsByDepartment('flexicore');
        return flexicoreForms.map(form => form.id);
      default:
        return [];
    }
  };

  const availableForms = getAvailableForms();

  return (
    <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
      {/* Department Filter */}
      <div className="flex-1">
        <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="precast">Precast</SelectItem>
            <SelectItem value="wall-panels">Wall Panels</SelectItem>
            <SelectItem value="extruded">Extruded</SelectItem>
            <SelectItem value="flexicore">Flexicore</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Form Filter */}
      <div className="flex-1">
        <Select value={selectedForm} onValueChange={onFormChange} disabled={!selectedDepartment}>
          <SelectTrigger>
            <SelectValue placeholder="Select Form" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Forms</SelectItem>
            {availableForms.map((form) => (
              <SelectItem key={form} value={form}>
                {form}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
        <Button onClick={onNewTest} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Test
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>
    </div>
  );
};

export default FreshConcreteTestsControls;
