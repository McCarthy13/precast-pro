
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Piece {
  id: string;
  name: string;
}

interface FormWithPieces {
  [formName: string]: Piece[];
}

interface PieceSelectionProps {
  scheduledPieces: FormWithPieces;
  selectedPieces: Set<string>;
  onSelectionChange: (selectedPieces: Set<string>) => void;
}

const PieceSelection: React.FC<PieceSelectionProps> = ({
  scheduledPieces,
  selectedPieces,
  onSelectionChange
}) => {
  const allPieceIds = Object.values(scheduledPieces).flat().map(piece => piece.id);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(new Set(allPieceIds));
    } else {
      onSelectionChange(new Set());
    }
  };

  const handleFormSelect = (formName: string, checked: boolean) => {
    const formPieceIds = scheduledPieces[formName].map(piece => piece.id);
    const newSelected = new Set(selectedPieces);
    
    if (checked) {
      formPieceIds.forEach(id => newSelected.add(id));
    } else {
      formPieceIds.forEach(id => newSelected.delete(id));
    }
    
    onSelectionChange(newSelected);
  };

  const handlePieceSelect = (pieceId: string, checked: boolean) => {
    const newSelected = new Set(selectedPieces);
    if (checked) {
      newSelected.add(pieceId);
    } else {
      newSelected.delete(pieceId);
    }
    onSelectionChange(newSelected);
  };

  const isFormFullySelected = (formName: string) => {
    const formPieceIds = scheduledPieces[formName].map(piece => piece.id);
    return formPieceIds.every(id => selectedPieces.has(id));
  };

  const isSelectAllChecked = allPieceIds.every(id => selectedPieces.has(id));

  return (
    <div className="border-t pt-4">
      <Label className="text-base font-medium">Pieces</Label>
      <p className="text-sm text-gray-600 mb-3">Select which pieces this test applies to</p>
      
      <div className="space-y-4">
        {/* Select All Checkbox */}
        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
          <Checkbox 
            id="select-all"
            checked={isSelectAllChecked}
            onCheckedChange={handleSelectAll}
          />
          <Label htmlFor="select-all" className="font-medium">
            Select All ({allPieceIds.length} pieces)
          </Label>
        </div>

        {/* Form-level and Piece-level Checkboxes */}
        {Object.entries(scheduledPieces).map(([formName, pieces]) => (
          <div key={formName} className="border rounded-md p-3">
            {/* Form-level checkbox */}
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox 
                id={`form-${formName}`}
                checked={isFormFullySelected(formName)}
                onCheckedChange={(checked) => handleFormSelect(formName, checked as boolean)}
              />
              <Label htmlFor={`form-${formName}`} className="font-medium text-blue-700">
                {formName} ({pieces.length} pieces)
              </Label>
            </div>

            {/* Individual piece checkboxes */}
            <div className="ml-6 space-y-2">
              {pieces.map((piece) => (
                <div key={piece.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`piece-${piece.id}`}
                    checked={selectedPieces.has(piece.id)}
                    onCheckedChange={(checked) => handlePieceSelect(piece.id, checked as boolean)}
                  />
                  <Label htmlFor={`piece-${piece.id}`} className="text-sm">
                    {piece.id} - {piece.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-sm text-gray-600">
          Selected: {selectedPieces.size} of {allPieceIds.length} pieces
        </div>
      </div>
    </div>
  );
};

export default PieceSelection;
