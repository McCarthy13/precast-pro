
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Settings, Plus, Edit, Trash2, Play, Pause, CheckCircle, AlertTriangle } from "lucide-react";

interface WorkflowStep {
  id: string;
  name: string;
  type: 'inspection' | 'approval' | 'notification' | 'action';
  required: boolean;
  automatable: boolean;
  estimatedTime: number; // in minutes
  dependencies: string[];
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  triggerEvent: string;
  status: 'active' | 'draft' | 'archived';
  steps: WorkflowStep[];
  successCriteria: string;
  failureActions: string[];
  lastModified: string;
  createdBy: string;
  usageCount: number;
}

const mockWorkflows: Workflow[] = [
  {
    id: "WF001",
    name: "Standard Precast Element QC",
    description: "Complete quality control workflow for standard precast elements",
    triggerEvent: "Production Complete",
    status: "active",
    steps: [
      {
        id: "S001",
        name: "Initial Visual Inspection",
        type: "inspection",
        required: true,
        automatable: false,
        estimatedTime: 15,
        dependencies: []
      },
      {
        id: "S002", 
        name: "Dimensional Verification",
        type: "inspection",
        required: true,
        automatable: true,
        estimatedTime: 10,
        dependencies: ["S001"]
      },
      {
        id: "S003",
        name: "Surface Quality Check",
        type: "inspection", 
        required: true,
        automatable: false,
        estimatedTime: 20,
        dependencies: ["S001"]
      },
      {
        id: "S004",
        name: "Final Approval",
        type: "approval",
        required: true,
        automatable: false,
        estimatedTime: 5,
        dependencies: ["S002", "S003"]
      }
    ],
    successCriteria: "All inspections passed and approved",
    failureActions: ["Create WIP", "Notify Production", "Update Status"],
    lastModified: "2025-06-04",
    createdBy: "Sarah Johnson",
    usageCount: 156
  },
  {
    id: "WF002",
    name: "Shipping Readiness Check",
    description: "Final QC workflow before piece shipping",
    triggerEvent: "Shipping Scheduled",
    status: "active",
    steps: [
      {
        id: "S005",
        name: "Loading Inspection",
        type: "inspection",
        required: true,
        automatable: false,
        estimatedTime: 8,
        dependencies: []
      },
      {
        id: "S006",
        name: "Documentation Review",
        type: "approval",
        required: true,
        automatable: true,
        estimatedTime: 3,
        dependencies: []
      },
      {
        id: "S007",
        name: "Shipping Approval",
        type: "approval",
        required: true,
        automatable: false,
        estimatedTime: 2,
        dependencies: ["S005", "S006"]
      }
    ],
    successCriteria: "Ready for shipping",
    failureActions: ["Hold Shipment", "Create Issue", "Notify Management"],
    lastModified: "2025-06-03",
    createdBy: "Mike Chen",
    usageCount: 89
  }
];

const QCWorkflowManager = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStepTypeIcon = (type: string) => {
    switch (type) {
      case 'inspection': return CheckCircle;
      case 'approval': return Settings;
      case 'notification': return AlertTriangle;
      case 'action': return Play;
      default: return Settings;
    }
  };

  const filteredWorkflows = mockWorkflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">QC Workflow Management</h3>
          <p className="text-sm text-gray-600">Manage automated QC processes and approval flows</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search workflows..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflow List */}
        <div className="space-y-4">
          {filteredWorkflows.map((workflow) => (
            <Card 
              key={workflow.id} 
              className={`module-card-hover cursor-pointer ${selectedWorkflow === workflow.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedWorkflow(workflow.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <CardDescription className="mt-1">{workflow.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(workflow.status)}>
                    {workflow.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Trigger:</span>
                      <div className="font-medium">{workflow.triggerEvent}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Steps:</span>
                      <div className="font-medium">{workflow.steps.length}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Usage:</span>
                      <div className="font-medium">{workflow.usageCount} times</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Modified:</span>
                      <div className="font-medium">{new Date(workflow.lastModified).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Created by {workflow.createdBy}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Workflow Details */}
        <div>
          {selectedWorkflow ? (
            <Card>
              <CardHeader>
                <CardTitle>Workflow Details</CardTitle>
                <CardDescription>
                  {mockWorkflows.find(w => w.id === selectedWorkflow)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {(() => {
                  const workflow = mockWorkflows.find(w => w.id === selectedWorkflow);
                  if (!workflow) return null;
                  
                  return (
                    <div className="space-y-6">
                      {/* Success Criteria */}
                      <div>
                        <h5 className="font-medium text-green-700 mb-2">Success Criteria</h5>
                        <div className="text-sm bg-green-50 p-3 rounded">
                          {workflow.successCriteria}
                        </div>
                      </div>

                      {/* Workflow Steps */}
                      <div>
                        <h5 className="font-medium mb-3">Workflow Steps</h5>
                        <div className="space-y-3">
                          {workflow.steps.map((step, index) => {
                            const StepIcon = getStepTypeIcon(step.type);
                            return (
                              <div key={step.id} className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                                  <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                                </div>
                                <ArrowRight className="h-4 w-4 text-gray-400" />
                                <div className="flex-1 bg-gray-50 p-3 rounded">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <StepIcon className="h-4 w-4 text-gray-600" />
                                      <span className="font-medium">{step.name}</span>
                                      {step.required && (
                                        <Badge variant="destructive" className="text-xs">Required</Badge>
                                      )}
                                      {step.automatable && (
                                        <Badge variant="secondary" className="text-xs">Auto</Badge>
                                      )}
                                    </div>
                                    <span className="text-xs text-gray-500">{step.estimatedTime}min</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Failure Actions */}
                      <div>
                        <h5 className="font-medium text-red-700 mb-2">Failure Actions</h5>
                        <div className="space-y-1">
                          {workflow.failureActions.map((action, index) => (
                            <div key={index} className="text-sm bg-red-50 p-2 rounded flex items-center">
                              <AlertTriangle className="h-3 w-3 text-red-500 mr-2" />
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-medium text-gray-600">Select a workflow</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Choose a workflow from the list to view its details and configuration
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default QCWorkflowManager;
