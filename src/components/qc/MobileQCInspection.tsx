
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ArrowLeft, Save, GripVertical, Play, CheckCircle, AlertTriangle, Eye, Hash } from "lucide-react";
import { QCInspectionPiece } from "@/types/production";
import DrawingInspectionViewer from "./DrawingInspectionViewer";
import WorkspaceInspectionViewer from "./WorkspaceInspectionViewer";

interface MobileQCInspectionProps {
  formId: string;
  formName: string;
  inspectionType: 'pre-pour' | 'post-pour';
  pieces: QCInspectionPiece[];
  onBack: () => void;
  onStartInspection: (pieceId: string) => void;
}

const MobileQCInspection: React.FC<MobileQCInspectionProps> = ({
  formId,
  formName,
  inspectionType,
  pieces: initialPieces,
  onBack,
  onStartInspection
}) => {
  const [pieces, setPieces] = useState(initialPieces);
  const [isDragDisabled] = useState(inspectionType === 'post-pour');
  const [selectedPiece, setSelectedPiece] = useState<QCInspectionPiece | null>(null);
  const [showWorkspaceInspection, setShowWorkspaceInspection] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination || isDragDisabled) return;

    const items = Array.from(pieces);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update pour order based on new position
    const updatedItems = items.map((item, index) => ({
      ...item,
      pourOrder: index + 1
    }));

    setPieces(updatedItems);
  };

  const handleInspectPiece = (piece: QCInspectionPiece) => {
    setSelectedPiece(piece);
    onStartInspection(piece.id);
  };

  const handlePositionChange = (pieceId: string, newPosition: number) => {
    if (newPosition < 1 || newPosition > pieces.length) return;
    
    const updatedPieces = pieces.map(piece => {
      if (piece.id === pieceId) {
        return { ...piece, pourOrder: newPosition };
      }
      return piece;
    });
    
    // Sort by new position to maintain order
    const sortedPieces = updatedPieces.sort((a, b) => a.pourOrder - b.pourOrder);
    
    // Reassign sequential positions
    const finalPieces = sortedPieces.map((piece, index) => ({
      ...piece,
      pourOrder: index + 1
    }));
    
    setPieces(finalPieces);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'issues':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Play className="h-4 w-4 text-blue-600" />;
      case 'issues':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400" />;
    }
  };

  // If workspace inspection is active, show the workspace viewer
  if (showWorkspaceInspection) {
    return (
      <WorkspaceInspectionViewer
        formName={formName}
        pieces={pieces.sort((a, b) => a.pourOrder - b.pourOrder)}
        inspectionType={inspectionType}
        onBack={() => setShowWorkspaceInspection(false)}
      />
    );
  }

  // If a piece is selected for inspection, show the drawing viewer
  if (selectedPiece) {
    return (
      <DrawingInspectionViewer
        piece={selectedPiece}
        inspectionType={inspectionType}
        onBack={() => setSelectedPiece(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">{formName}</h1>
              <p className="text-sm text-gray-600">{inspectionType} Inspection</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{pieces.length} Pieces</Badge>
            <Button 
              size="sm" 
              onClick={() => setShowWorkspaceInspection(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              Inspect All
            </Button>
          </div>
        </div>
      </div>

      {/* Instruction Banner */}
      <div className="bg-blue-50 border-b border-blue-200 p-4">
        <p className="text-sm text-blue-800">
          {inspectionType === 'pre-pour' 
            ? "Assign positions to pieces, then use 'Inspect All' to review the entire workspace"
            : "Pieces are arranged in assigned order. Use 'Inspect All' to continue inspection from pre-pour markups"
          }
        </p>
      </div>

      {/* Piece List */}
      <div className="p-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="pieces" isDropDisabled={isDragDisabled}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`space-y-3 ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
              >
                {pieces.map((piece, index) => (
                  <Draggable 
                    key={piece.id} 
                    draggableId={piece.id} 
                    index={index}
                    isDragDisabled={isDragDisabled}
                  >
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`${snapshot.isDragging ? 'shadow-lg rotate-2' : 'shadow'} ${getStatusColor(piece.inspectionStatus)}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            {!isDragDisabled && (
                              <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                                <GripVertical className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                            
                            <div className="flex items-center space-x-2">
                              <Hash className="h-4 w-4 text-gray-500" />
                              <Input
                                type="number"
                                value={piece.pourOrder}
                                onChange={(e) => handlePositionChange(piece.id, parseInt(e.target.value))}
                                className="w-16 h-8 text-center text-sm"
                                min={1}
                                max={pieces.length}
                                disabled={isDragDisabled}
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">{piece.pieceName}</h3>
                              <p className="text-sm text-gray-600 truncate">{piece.pieceNumber}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                {getStatusIcon(piece.inspectionStatus)}
                                <span className="text-xs font-medium capitalize">{piece.inspectionStatus}</span>
                                <span className="text-xs text-gray-500">
                                  {piece.drawingPages.length} page{piece.drawingPages.length !== 1 ? 's' : ''}
                                </span>
                              </div>
                            </div>
                            
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleInspectPiece(piece)}
                              className="flex-shrink-0"
                            >
                              {piece.inspectionStatus === 'complete' ? 'Review' : 'Inspect'}
                            </Button>
                          </div>
                          
                          {/* Annotation Summary */}
                          {(piece.prePourAnnotations?.length || piece.postPourAnnotations?.length) && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="flex items-center space-x-4 text-xs text-gray-600">
                                {piece.prePourAnnotations?.length && (
                                  <span>Pre-pour: {piece.prePourAnnotations.length} markups</span>
                                )}
                                {piece.postPourAnnotations?.length && (
                                  <span>Post-pour: {piece.postPourAnnotations.length} markups</span>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default MobileQCInspection;
