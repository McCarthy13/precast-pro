
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { scheduledPieces, type Piece } from './fresh-concrete/mockData';

interface PieceSelectionProps {
  scheduledPieces: { [formName: string]: Piece[] };
  selectedPieces: Set<string>;
  onSelectionChange: (pieces: Set<string>) => void;
  selectedForm?: string;
}

const PieceSelection: React.FC<PieceSelectionProps> = ({
  scheduledPieces,
  selectedPieces,
  onSelectionChange,
  selectedForm
}) => {
  const handlePieceToggle = (pieceId: string, checked: boolean) => {
    const newSelection = new Set(selectedPieces);
    if (checked) {
      newSelection.add(pieceId);
    } else {
      newSelection.delete(pieceId);
    }
    onSelectionChange(newSelection);
  };

  // Filter pieces based on selected form
  const getPiecesForForm = () => {
    if (!selectedForm) return [];
    return scheduledPieces[selectedForm] || [];
  };

  const piecesToShow = getPiecesForForm();

  if (piecesToShow.length === 0) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          {selectedForm ? `No pieces scheduled for ${selectedForm}` : 'Select a form to see scheduled pieces'}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <Label className="text-base font-medium">Pieces for {selectedForm}</Label>
      <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
        {piecesToShow.map((piece) => (
          <div key={piece.id} className="flex items-center space-x-2">
            <Checkbox
              id={piece.id}
              checked={selectedPieces.has(piece.id)}
              onCheckedChange={(checked) => handlePieceToggle(piece.id, checked as boolean)}
            />
            <Label htmlFor={piece.id} className="text-sm cursor-pointer">
              {piece.name} (Job: {piece.jobNumber}, Piece: {piece.pieceId})
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieceSelection;
