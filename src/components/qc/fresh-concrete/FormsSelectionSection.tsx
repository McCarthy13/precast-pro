
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { getFormsByDepartment, scheduledPieces } from './mockData';

interface FormsSelectionSectionProps {
  selectedForms: Set<string>;
  selectedPieces: Set<string>;
  handleSelectAllForms: (checked: boolean) => void;
  handleFormToggle: (formName: string, checked: boolean) => void;
  handlePieceToggle: (pieceId: string, checked: boolean) => void;
  departmentName?: string;
}

const FormsSelectionSection: React.FC<FormsSelectionSectionProps> = ({
  selectedForms,
  selectedPieces,
  handleSelectAllForms,
  handleFormToggle,
  handlePieceToggle,
  departmentName = "Precast"
}) => {
  // Normalize department name and get forms specific to the department
  const normalizedDept = departmentName.toLowerCase().replace(/\s+/g, '-');
  const departmentForms = getFormsByDepartment(normalizedDept);

  console.log('FormsSelectionSection - Department:', departmentName, 'Normalized:', normalizedDept);
  console.log('FormsSelectionSection - Forms:', departmentForms);

  // Helper function to get shorthand job number (last 4 digits)
  const getShorthandJobNumber = (fullJobNumber: string): string => {
    return fullJobNumber.slice(-4);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <Label className="text-base font-medium">Select Forms/Workspaces and Pieces</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="selectAllForms"
            checked={selectedForms.size === departmentForms.length}
            onCheckedChange={(checked) => handleSelectAllForms(checked as boolean)}
          />
          <Label htmlFor="selectAllForms" className="text-sm cursor-pointer font-medium">
            Select All
          </Label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {departmentForms.map((form) => {
          const formPieces = scheduledPieces[form.name] || [];
          const isFormSelected = selectedForms.has(form.name);
          
          return (
            <div key={form.id} className="border rounded-md p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={form.name}
                  checked={isFormSelected}
                  onCheckedChange={(checked) => handleFormToggle(form.name, checked as boolean)}
                />
                <Label htmlFor={form.name} className="text-sm cursor-pointer font-medium">
                  {form.name}
                </Label>
                <span className="text-xs text-muted-foreground">
                  ({formPieces.length})
                </span>
              </div>
              
              {formPieces.length > 0 && (
                <div className="ml-5 space-y-1 border-l border-border pl-2">
                  {formPieces.map((piece) => (
                    <div key={piece.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={piece.id}
                        checked={selectedPieces.has(piece.id)}
                        onCheckedChange={(checked) => handlePieceToggle(piece.id, checked as boolean)}
                      />
                      <Label htmlFor={piece.id} className="text-xs cursor-pointer">
                        {getShorthandJobNumber(piece.jobNumber)}-{piece.pieceId}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
              
              {formPieces.length === 0 && (
                <div className="ml-5 text-xs text-muted-foreground italic">
                  No pieces scheduled
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormsSelectionSection;
