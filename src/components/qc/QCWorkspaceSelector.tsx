
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory, Calendar, Users } from "lucide-react";
import { getAllForms, getFormsByDepartment } from "@/data/productionForms";
import MobileQCInspection from "./MobileQCInspection";
import { QCInspectionPiece } from "@/types/production";

interface QCWorkspaceSelectorProps {
  department?: string;
}

const QCWorkspaceSelector: React.FC<QCWorkspaceSelectorProps> = ({ department }) => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [inspectionType, setInspectionType] = useState<'pre-pour' | 'post-pour'>('pre-pour');

  // Department-specific form configurations
  const getDepartmentForms = (dept: string) => {
    switch (dept?.toLowerCase()) {
      case 'wall panels':
        return Array.from({ length: 24 }, (_, i) => ({
          id: `WP-${i + 1}`,
          name: `Wall Panel Form ${i + 1}`,
          department: 'wall-panels',
          capacity: '8-12 panels',
          dimensions: '8x40ft',
          scheduledJobs: [
            { id: `wp-${i + 1}-job1`, panelType: 'Wall Panel' },
            { id: `wp-${i + 1}-job2`, panelType: 'Wall Panel' }
          ]
        }));
      
      case 'precast':
        return [
          { id: 'BL1', name: 'Beam Line 1', department: 'precast', capacity: '4-6 beams', dimensions: '12x200ft', scheduledJobs: [{ id: 'bl1-job1', panelType: 'Beam' }] },
          { id: 'BL2', name: 'Beam Line 2', department: 'precast', capacity: '4-6 beams', dimensions: '12x200ft', scheduledJobs: [{ id: 'bl2-job1', panelType: 'Beam' }] },
          { id: 'BL3', name: 'Beam Line 3', department: 'precast', capacity: '4-6 beams', dimensions: '12x200ft', scheduledJobs: [{ id: 'bl3-job1', panelType: 'Beam' }] },
          { id: 'BL6', name: 'Beam Line 6', department: 'precast', capacity: '4-6 beams', dimensions: '12x200ft', scheduledJobs: [{ id: 'bl6-job1', panelType: 'Beam' }] },
          { id: 'WPB-W', name: 'West Panel Bed-West', department: 'precast', capacity: '8-10 panels', dimensions: '10x100ft', scheduledJobs: [{ id: 'wpbw-job1', panelType: 'Panel' }] },
          { id: 'WPB-E', name: 'West Panel Bed-East', department: 'precast', capacity: '8-10 panels', dimensions: '10x100ft', scheduledJobs: [{ id: 'wpbe-job1', panelType: 'Panel' }] },
          { id: 'EPB-W', name: 'East Panel Bed-West', department: 'precast', capacity: '8-10 panels', dimensions: '10x100ft', scheduledJobs: [{ id: 'epbw-job1', panelType: 'Panel' }] },
          { id: 'EPB-E', name: 'East Panel Bed-East', department: 'precast', capacity: '8-10 panels', dimensions: '10x100ft', scheduledJobs: [{ id: 'epbe-job1', panelType: 'Panel' }] },
          { id: 'COL', name: 'Columns', department: 'precast', capacity: '12-16 columns', dimensions: '8x80ft', scheduledJobs: [{ id: 'col-job1', panelType: 'Column' }] },
          { id: 'STADIA', name: 'Stadia', department: 'precast', capacity: '6-8 stadia', dimensions: '12x120ft', scheduledJobs: [{ id: 'stadia-job1', panelType: 'Stadia' }] },
          { id: 'MILD-STEEL', name: 'Mild Steel', department: 'precast', capacity: '20-25 pieces', dimensions: '6x60ft', scheduledJobs: [{ id: 'mild-job1', panelType: 'Mild Steel' }] }
        ];
      
      case 'extruded':
        return [
          { id: 'EXT1', name: 'EXT 1', department: 'extruded', capacity: '200-250ft', dimensions: '4x250ft', scheduledJobs: [{ id: 'ext1-job1', panelType: 'Extruded' }] },
          { id: 'EXT2', name: 'EXT 2', department: 'extruded', capacity: '200-250ft', dimensions: '4x250ft', scheduledJobs: [{ id: 'ext2-job1', panelType: 'Extruded' }] },
          { id: 'EXT3', name: 'EXT 3', department: 'extruded', capacity: '200-250ft', dimensions: '4x250ft', scheduledJobs: [{ id: 'ext3-job1', panelType: 'Extruded' }] },
          { id: 'EXT4', name: 'EXT 4', department: 'extruded', capacity: '200-250ft', dimensions: '4x250ft', scheduledJobs: [{ id: 'ext4-job1', panelType: 'Extruded' }] }
        ];
      
      case 'flexicore':
        return getFormsByDepartment('flexicore');
      
      case 'double tees':
        return getFormsByDepartment('double-tees');
      
      default:
        return getAllForms();
    }
  };

  // Actual blueprint and technical drawing images
  const technicalDrawingImages = [
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
    "https://images.unsplash.com/photo-1545389336-cf090694435e",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
    "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8",
    "https://images.unsplash.com/photo-1581094288338-2314dddb7ece",
    "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b",
  ];

  // Generate mock QC inspection pieces from scheduled jobs with realistic drawing pages
  const generateMockQCPieces = (formId: string): QCInspectionPiece[] => {
    const availableForms = getDepartmentForms(department || '');
    const form = availableForms.find(f => f.id === formId);
    if (!form || !form.scheduledJobs.length) return [];

    return form.scheduledJobs.map((job, index) => {
      const pageCount = Math.floor(Math.random() * 3) + 2;
      const drawingPages = Array.from({ length: pageCount }, (_, pageIndex) => ({
        id: `${job.id}-pg${pageIndex + 1}`,
        imageUrl: technicalDrawingImages[(index * pageCount + pageIndex) % technicalDrawingImages.length],
        pageNumber: pageIndex + 1,
        annotations: []
      }));

      return {
        id: `QC-${job.id}`,
        pieceNumber: `${formId}-2024-${String(index + 1).padStart(3, '0')}`,
        pieceName: `${job.panelType || 'Element'} ${index + 1}`,
        formId: formId,
        pourOrder: index + 1,
        inspectionStatus: Math.random() > 0.7 ? 'complete' : 'pending',
        drawingPages: drawingPages
      };
    });
  };

  if (selectedForm) {
    const availableForms = getDepartmentForms(department || '');
    const form = availableForms.find(f => f.id === selectedForm);
    const mockPieces = generateMockQCPieces(selectedForm);
    
    return (
      <MobileQCInspection
        formId={selectedForm}
        formName={form?.name || selectedForm}
        inspectionType={inspectionType}
        pieces={mockPieces}
        onBack={() => setSelectedForm(null)}
        onStartInspection={(pieceId) => {
          console.log(`Starting inspection for piece ${pieceId}`);
        }}
      />
    );
  }

  const formsToDisplay = getDepartmentForms(department || '');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">
            {department ? `${department} ` : ''}QC Workspace Inspection
          </h3>
          <p className="text-gray-600">
            Select a {department ? department.toLowerCase() : ''} form/workspace to inspect
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={inspectionType === 'pre-pour' ? 'default' : 'outline'}
            onClick={() => setInspectionType('pre-pour')}
          >
            Pre-Pour
          </Button>
          <Button
            variant={inspectionType === 'post-pour' ? 'default' : 'outline'}
            onClick={() => setInspectionType('post-pour')}
          >
            Post-Pour
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {formsToDisplay.map((form) => (
          <Card 
            key={form.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-blue-500"
            onClick={() => setSelectedForm(form.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                {form.name}
                <Badge variant="secondary" className="text-xs">
                  {form.scheduledJobs.length} pieces
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                {form.dimensions && (
                  <p className="text-xs text-gray-600">{form.dimensions}</p>
                )}
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center text-gray-600">
                    <Factory className="h-3 w-3 mr-1" />
                    Capacity: {form.capacity}
                  </span>
                  <span className="flex items-center text-blue-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    Ready for QC
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QCWorkspaceSelector;
