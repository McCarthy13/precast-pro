
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowLeft, ChevronUp, ChevronDown, ZoomIn, ZoomOut, Save, FileText } from "lucide-react";
import { QCInspectionPiece, DrawingPage } from "@/types/production";

interface DrawingInspectionViewerProps {
  piece: QCInspectionPiece;
  onBack: () => void;
  inspectionType: 'pre-pour' | 'post-pour';
}

const DrawingInspectionViewer: React.FC<DrawingInspectionViewerProps> = ({
  piece,
  onBack,
  inspectionType
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const currentPage = piece.drawingPages[currentPageIndex];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handlePreviousPage = () => {
    setCurrentPageIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPageIndex(prev => Math.min(prev + 1, piece.drawingPages.length - 1));
  };

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
              <h1 className="text-lg font-semibold">{piece.pieceName}</h1>
              <p className="text-sm text-gray-600">{piece.pieceNumber} - {inspectionType} Inspection</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              Page {currentPageIndex + 1} of {piece.drawingPages.length}
            </Badge>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Drawing Controls */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{Math.round(zoomLevel * 100)}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePreviousPage}
              disabled={currentPageIndex === 0}
            >
              <ChevronUp className="h-4 w-4" />
              Previous Page
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextPage}
              disabled={currentPageIndex === piece.drawingPages.length - 1}
            >
              <ChevronDown className="h-4 w-4" />
              Next Page
            </Button>
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
                alt={`Drawing page ${currentPage.pageNumber}`}
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

      {/* Page Navigation Carousel */}
      <div className="p-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Drawing Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Carousel className="w-full">
              <CarouselContent>
                {piece.drawingPages.map((page, index) => (
                  <CarouselItem key={page.id} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
                    <Card 
                      className={`cursor-pointer transition-all ${
                        index === currentPageIndex 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setCurrentPageIndex(index)}
                    >
                      <CardContent className="p-2">
                        <img
                          src={page.imageUrl}
                          alt={`Page ${page.pageNumber}`}
                          className="w-full h-16 object-cover rounded"
                        />
                        <p className="text-xs text-center mt-1">Page {page.pageNumber}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DrawingInspectionViewer;
