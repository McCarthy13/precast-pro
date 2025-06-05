
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory, Calendar, Users } from "lucide-react";
import { getAllForms, getFormsByDepartment } from "@/data/productionForms";
import MobileQCInspection from "./MobileQCInspection";
import { QCInspectionPiece } from "@/types/production";

const QCWorkspaceSelector: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [inspectionType, setInspectionType] = useState<'pre-pour' | 'post-pour'>('pre-pour');

  // Mock data - in real app this would come from API
  const mockPieces: QCInspectionPiece[] = [
    {
      id: "P001",
      pieceNumber: "WP-2024-001-012",
      pieceName: "Wall Panel A-12",
      formId: "WP1",
      pourOrder: 1,
      inspectionStatus: "pending",
      drawingPages: [
        { id: "pg1", imageUrl: "/placeholder.svg", pageNumber: 1, annotations: [] },
        { id: "pg2", imageUrl: "/placeholder.svg", pageNumber: 2, annotations: [] }
      ]
    },
    {
      id: "P002",
      pieceNumber: "WP-2024-001-013", 
      pieceName: "Wall Panel A-13",
      formId: "WP1",
      pourOrder: 2,
      inspectionStatus: "pending",
      drawingPages: [
        { id: "pg3", imageUrl: "/placeholder.svg", pageNumber: 1, annotations: [] }
      ]
    }
  ];

  if (selectedForm) {
    const form = getAllForms().find(f => f.id === selectedForm);
    return (
      <MobileQCInspection
        formId={selectedForm}
        formName={form?.name || selectedForm}
        inspectionType={inspectionType}
        pieces={mockPieces}
        onBack={() => setSelectedForm(null)}
        onStartInspection={(pieceId) => {
          console.log(`Starting inspection for piece ${pieceId}`);
          // This would navigate to the drawing inspection interface
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">QC Workspace Inspection</h3>
          <p className="text-gray-600">Select a form/workspace to inspect</p>
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

      <Tabs defaultValue="precast" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="precast">Precast</TabsTrigger>
          <TabsTrigger value="extruded">Extruded</TabsTrigger>
          <TabsTrigger value="flexicore">Flexicore</TabsTrigger>
          <TabsTrigger value="wall-panels">Wall Panels</TabsTrigger>
        </TabsList>

        {['precast', 'extruded', 'flexicore', 'wall-panels'].map((dept) => (
          <TabsContent key={dept} value={dept}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {getFormsByDepartment(dept).map((form) => (
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QCWorkspaceSelector;
