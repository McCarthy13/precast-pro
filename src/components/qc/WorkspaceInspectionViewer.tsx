
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ZoomIn, ZoomOut, Save, FileText } from "lucide-react";
import { QCInspectionPiece } from "@/types/production";

interface WorkspaceInspectionViewerProps {
  formName: string;
  pieces: QCInspectionPiece[];
  inspectionType: 'pre-pour' | 'post-pour';
  onBack: () => void;
}

const WorkspaceInspectionViewer: React.FC<WorkspaceInspectionViewerProps> = ({
  formName,
  pieces,
  inspectionType,
  onBack
}) => {
  const [currentPieceIndex, setCurrentPieceIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const currentPiece = pieces[currentPieceIndex];
  const currentPage = currentPiece?.drawingPages[currentPageIndex];

  // Reset page index when piece changes
  useEffect(() => {
    setCurrentPageIndex(0);
    setZoomLevel(1);
  }, [currentPieceIndex]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handlePreviousPiece = () => {
    setCurrentPieceIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNextPiece = () => {
    setCurrentPieceIndex(prev => Math.min(prev + 1, pieces.length - 1));
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    } else if (currentPieceIndex > 0) {
      // Go to last page of previous piece
      setCurrentPieceIndex(prev => prev - 1);
      setCurrentPageIndex(pieces[currentPieceIndex - 1].drawingPages.length - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < currentPiece.drawingPages.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    } else if (currentPieceIndex < pieces.length - 1) {
      // Go to first page of next piece
      setCurrentPieceIndex(prev => prev + 1);
      setCurrentPageIndex(0);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          handlePreviousPiece();
          break;
        case 'ArrowRight':
          handleNextPiece();
          break;
        case 'ArrowUp':
          handlePreviousPage();
          break;
        case 'ArrowDown':
          handleNextPage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPieceIndex, currentPageIndex]);

  if (!currentPiece || !currentPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No pieces available for inspection</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">{formName} - Workspace Inspection</h1>
              <p className="text-sm text-gray-600">{inspectionType} - {currentPiece.pieceName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              Piece {currentPieceIndex + 1} of {pieces.length}
            </Badge>
            <Badge variant="outline">
              Page {currentPageIndex + 1} of {currentPiece.drawingPages.length}
            </Badge>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Piece Navigation */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Pieces:</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePreviousPiece}
                disabled={currentPieceIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextPiece}
                disabled={currentPieceIndex === pieces.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center space-x-2 border-l pl-4">
              <span className="text-sm font-medium">Pages:</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePreviousPage}
                disabled={currentPieceIndex === 0 && currentPageIndex === 0}
              >
                <ChevronUp className="h-4 w-4" />
                Up
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextPage}
                disabled={currentPieceIndex === pieces.length - 1 && currentPageIndex === currentPiece.drawingPages.length - 1}
              >
                <ChevronDown className="h-4 w-4" />
                Down
              </Button>
            </div>
          </div>
          
          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Current Piece Info */}
      <div className="bg-blue-50 border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{currentPiece.pieceName}</h3>
            <p className="text-sm text-gray-600">{currentPiece.pieceNumber} - Position #{currentPiece.pourOrder}</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <span>Use arrow keys: ← → for pieces, ↑ ↓ for pages</span>
          </div>
        </div>
      </div>

      {/* Main Drawing Area */}
      <div className="p-4">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative overflow-auto max-h-[70vh]">
              <img
                src={currentPage.imageUrl}
                alt={`${currentPiece.pieceName} - Page ${currentPage.pageNumber}`}
                className="w-full h-auto transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              />
              
              {/* Annotation overlay would go here */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Future: annotation markers */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Piece Navigator */}
      <div className="p-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Workspace Pieces (Position Order)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {pieces.map((piece, index) => (
                <Card 
                  key={piece.id}
                  className={`cursor-pointer transition-all flex-shrink-0 w-32 ${
                    index === currentPieceIndex 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentPieceIndex(index)}
                >
                  <CardContent className="p-2">
                    <div className="text-center">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-1">
                        {piece.pourOrder}
                      </div>
                      <p className="text-xs font-medium truncate">{piece.pieceName}</p>
                      <p className="text-xs text-gray-500">{piece.drawingPages.length} pages</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkspaceInspectionViewer;
