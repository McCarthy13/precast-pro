
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Edit, Copy, Wand2, CheckSquare, Square, AlertCircle } from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
  required: boolean;
  type: 'visual' | 'measurement' | 'test' | 'documentation';
  tolerance?: string;
  reference?: string;
}

interface Checklist {
  id: string;
  name: string;
  description: string;
  category: 'initial-qc' | 'final-qc' | 'shipping' | 'field-repair' | 'custom';
  version: string;
  status: 'active' | 'draft' | 'archived';
  items: ChecklistItem[];
  createdBy: string;
  lastModified: string;
  usageCount: number;
  aiGenerated: boolean;
}

const mockChecklists: Checklist[] = [
  {
    id: "CL001",
    name: "Standard Wall Panel Final QC",
    description: "Comprehensive final quality control checklist for standard wall panels",
    category: "final-qc",
    version: "2.1",
    status: "active",
    items: [
      {
        id: "I001",
        text: "Verify overall dimensions match drawing specifications",
        required: true,
        type: "measurement",
        tolerance: "±1/4 inch",
        reference: "Drawing A-101"
      },
      {
        id: "I002",
        text: "Inspect surface finish for defects, honeycombing, or blemishes",
        required: true,
        type: "visual"
      },
      {
        id: "I003",
        text: "Check all embed locations and orientations",
        required: true,
        type: "measurement",
        tolerance: "±1/8 inch",
        reference: "Embed Schedule"
      },
      {
        id: "I004",
        text: "Verify concrete strength test results meet specification",
        required: true,
        type: "documentation",
        reference: "Test Report TR-XXX"
      }
    ],
    createdBy: "Sarah Johnson",
    lastModified: "2025-06-01",
    usageCount: 245,
    aiGenerated: false
  },
  {
    id: "CL002",
    name: "AI Generated - Beam Inspection v3.0",
    description: "AI-generated checklist based on recent beam defect patterns",
    category: "initial-qc",
    version: "3.0",
    status: "draft",
    items: [
      {
        id: "I005",
        text: "Inspect prestressed strand locations using magnetic locator",
        required: true,
        type: "test",
        reference: "AI Analysis: Form 7 correlation"
      },
      {
        id: "I006",
        text: "Check for micro-cracking at strand termination points",
        required: true,
        type: "visual",
        reference: "Recent defect pattern AI-123"
      },
      {
        id: "I007",
        text: "Verify camber measurements against calculated values",
        required: true,
        type: "measurement",
        tolerance: "±1/8 inch"
      }
    ],
    createdBy: "AI System",
    lastModified: "2025-06-04",
    usageCount: 0,
    aiGenerated: true
  }
];

const QCChecklistManager = () => {
  const [selectedChecklist, setSelectedChecklist] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'initial-qc': return 'bg-blue-100 text-blue-800';
      case 'final-qc': return 'bg-green-100 text-green-800';
      case 'shipping': return 'bg-purple-100 text-purple-800';
      case 'field-repair': return 'bg-orange-100 text-orange-800';
      case 'custom': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'visual': return '👁️';
      case 'measurement': return '📏';
      case 'test': return '🧪';
      case 'documentation': return '📄';
      default: return '📋';
    }
  };

  const filteredChecklists = mockChecklists.filter(checklist =>
    checklist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checklist.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">QC Checklist Management</h3>
          <p className="text-sm text-gray-600">Create, manage, and deploy QC inspection checklists</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowAIGenerator(true)}>
            <Wand2 className="h-4 w-4 mr-2" />
            AI Generate
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Checklist
          </Button>
        </div>
      </div>

      {/* AI Generator Panel */}
      {showAIGenerator && (
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Wand2 className="h-5 w-5 mr-2" />
              AI Checklist Generator
            </CardTitle>
            <CardDescription>
              Generate custom checklists based on drawing analysis, defect patterns, or project requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Piece type (e.g., Wall Panel, Beam)" />
                <Input placeholder="Drawing reference (optional)" />
                <Input placeholder="Special requirements" />
              </div>
              <div className="flex space-x-3">
                <Button className="construction-gradient">
                  Generate from Drawings
                </Button>
                <Button variant="outline">
                  Generate from Defect Patterns
                </Button>
                <Button variant="outline" onClick={() => setShowAIGenerator(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Input
          placeholder="Search checklists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Checklist List */}
        <div className="space-y-4">
          {filteredChecklists.map((checklist) => (
            <Card 
              key={checklist.id} 
              className={`module-card-hover cursor-pointer ${selectedChecklist === checklist.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedChecklist(checklist.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <CardTitle className="text-lg">{checklist.name}</CardTitle>
                      {checklist.aiGenerated && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          <Wand2 className="h-3 w-3 mr-1" />
                          AI
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{checklist.description}</CardDescription>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(checklist.status)}>
                      {checklist.status}
                    </Badge>
                    <Badge className={getCategoryColor(checklist.category)}>
                      {checklist.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Version:</span>
                      <div className="font-medium">v{checklist.version}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Items:</span>
                      <div className="font-medium">{checklist.items.length}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Usage:</span>
                      <div className="font-medium">{checklist.usageCount} times</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Modified:</span>
                      <div className="font-medium">{new Date(checklist.lastModified).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Created by {checklist.createdBy}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Checklist Details */}
        <div>
          {selectedChecklist ? (
            <Card>
              <CardHeader>
                <CardTitle>Checklist Items</CardTitle>
                <CardDescription>
                  {mockChecklists.find(c => c.id === selectedChecklist)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {(() => {
                  const checklist = mockChecklists.find(c => c.id === selectedChecklist);
                  if (!checklist) return null;
                  
                  return (
                    <div className="space-y-4">
                      {checklist.items.map((item, index) => (
                        <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                          <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full mt-1">
                            <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-lg">{getItemTypeIcon(item.type)}</span>
                              {item.required ? (
                                <CheckSquare className="h-4 w-4 text-red-500" />
                              ) : (
                                <Square className="h-4 w-4 text-gray-400" />
                              )}
                              <Badge variant="outline" className="text-xs">
                                {item.type}
                              </Badge>
                              {item.required && (
                                <Badge variant="destructive" className="text-xs">Required</Badge>
                              )}
                            </div>
                            
                            <div className="text-sm font-medium mb-2">
                              {item.text}
                            </div>
                            
                            {(item.tolerance || item.reference) && (
                              <div className="text-xs text-gray-600 space-y-1">
                                {item.tolerance && (
                                  <div>
                                    <span className="font-medium">Tolerance:</span> {item.tolerance}
                                  </div>
                                )}
                                {item.reference && (
                                  <div>
                                    <span className="font-medium">Reference:</span> {item.reference}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t">
                        <Button className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Use This Checklist
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-medium text-gray-600">Select a checklist</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Choose a checklist from the list to view its items and details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default QCChecklistManager;
