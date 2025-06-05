
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, Clock, Camera, FileText, User, Calendar, MapPin } from "lucide-react";

interface Inspection {
  id: string;
  pieceId: string;
  pieceName: string;
  project: string;
  type: 'initial' | 'final' | 'field-repair' | 'shipping';
  status: 'pending' | 'in-progress' | 'passed' | 'failed' | 'requires-review';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  inspector: string;
  scheduledDate: string;
  completedDate?: string;
  issues: number;
  photos: number;
  checklist: string;
  location?: string;
  notes?: string;
}

interface QCInspectionListProps {
  searchTerm: string;
  filter: string;
}

const mockInspections: Inspection[] = [
  {
    id: "INS001",
    pieceId: "P001",
    pieceName: "Wall Panel A-12",
    project: "Downtown Office Complex",
    type: "final",
    status: "pending",
    priority: "high",
    inspector: "Sarah Johnson",
    scheduledDate: "2025-06-05",
    issues: 0,
    photos: 0,
    checklist: "Standard Wall Panel Final",
    location: "Bay 5, Row C, Stack 2"
  },
  {
    id: "INS002",
    pieceId: "P002",
    pieceName: "Beam B-05",
    project: "Retail Center Phase 2",
    type: "shipping",
    status: "passed",
    priority: "normal",
    inspector: "Mike Chen",
    scheduledDate: "2025-06-04",
    completedDate: "2025-06-04",
    issues: 1,
    photos: 3,
    checklist: "Shipping Inspection",
    location: "Bay 3, Row A, Stack 1",
    notes: "Minor surface spall documented for field repair"
  },
  {
    id: "INS003",
    pieceId: "P003",
    pieceName: "Column C-18",
    project: "Industrial Warehouse",
    type: "initial",
    status: "failed",
    priority: "urgent",
    inspector: "David Rodriguez",
    scheduledDate: "2025-06-03",
    completedDate: "2025-06-03",
    issues: 3,
    photos: 8,
    checklist: "Initial QC Inspection",
    notes: "Multiple dimensional issues require plant WIP"
  }
];

const QCInspectionList: React.FC<QCInspectionListProps> = ({ searchTerm, filter }) => {
  const [selectedInspection, setSelectedInspection] = useState<string | null>(null);

  const getStatusDisplay = (status: string, priority: string) => {
    switch (status) {
      case 'pending':
        return { 
          label: 'Pending', 
          bgClass: priority === 'urgent' ? 'bg-red-500' : priority === 'high' ? 'bg-orange-500' : 'bg-yellow-500',
          icon: Clock 
        };
      case 'in-progress':
        return { label: 'In Progress', bgClass: 'bg-blue-500', icon: CheckCircle };
      case 'passed':
        return { label: 'Passed', bgClass: 'bg-green-500', icon: CheckCircle };
      case 'failed':
        return { label: 'Failed', bgClass: 'bg-red-500', icon: XCircle };
      case 'requires-review':
        return { label: 'Requires Review', bgClass: 'bg-purple-500', icon: AlertTriangle };
      default:
        return { label: 'Unknown', bgClass: 'bg-gray-500', icon: Clock };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'initial': return 'Initial QC';
      case 'final': return 'Final QC';
      case 'field-repair': return 'Field Repair';
      case 'shipping': return 'Shipping';
      default: return type;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'normal': return 'text-blue-600 bg-blue-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredInspections = mockInspections.filter(inspection => {
    const matchesSearch = searchTerm === "" || 
      inspection.pieceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.inspector.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || 
      (filter === "pending" && inspection.status === "pending") ||
      (filter === "overdue" && inspection.status === "pending" && new Date(inspection.scheduledDate) < new Date());
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Inspections ({filteredInspections.length})</h3>
        <Button>
          <Camera className="h-4 w-4 mr-2" />
          Start Inspection
        </Button>
      </div>

      {filteredInspections.map((inspection) => {
        const statusInfo = getStatusDisplay(inspection.status, inspection.priority);
        const StatusIcon = statusInfo.icon;
        
        return (
          <Card key={inspection.id} className="module-card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <StatusIcon className="h-5 w-5 text-gray-600" />
                    {inspection.priority === 'urgent' && (
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-1"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-lg">{inspection.pieceName}</h4>
                      <Badge variant="outline" className={getPriorityColor(inspection.priority)}>
                        {inspection.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="secondary">
                        {getTypeLabel(inspection.type)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {inspection.project}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {inspection.inspector}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(inspection.scheduledDate).toLocaleDateString()}
                      </div>
                      {inspection.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {inspection.location}
                        </div>
                      )}
                    </div>
                    
                    {inspection.notes && (
                      <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        {inspection.notes}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${statusInfo.bgClass}`}>
                    {statusInfo.label}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    {inspection.issues > 0 && (
                      <Badge variant="destructive">
                        {inspection.issues} issue{inspection.issues > 1 ? 's' : ''}
                      </Badge>
                    )}
                    {inspection.photos > 0 && (
                      <Badge variant="outline">
                        {inspection.photos} photo{inspection.photos > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {inspection.status === 'pending' && (
                      <Button size="sm">
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QCInspectionList;
