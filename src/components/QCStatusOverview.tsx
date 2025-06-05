
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Settings, Clock, Truck } from "lucide-react";

interface Issue {
  id: string;
  type: 'Plant WIP' | 'Field WIP' | 'ENG' | 'Ok As Cast' | 'Scrap';
  category: string;
  description: string;
  resolved: boolean;
  ballInCourt?: string;
  engineerIssued?: boolean;
}

interface Piece {
  id: string;
  name: string;
  project: string;
  status: 'ok-to-ship' | 'field-wip-ok-to-ship' | 'wip-only' | 'eng-only' | 'wip-and-eng' | 'scrap';
  issues: Issue[];
  shippingDate?: string;
  approvedForScheduling: boolean;
  inventoryBank: 'all-pieces' | 'approved-for-scheduling' | 'workspace-1' | 'workspace-2' | 'shipped';
  location?: {
    bay: number;
    row: string;
    stackPosition: number;
  };
}

const mockPieces: Piece[] = [
  {
    id: "P001",
    name: "Wall Panel A-12",
    project: "Downtown Office Complex",
    status: "ok-to-ship",
    issues: [],
    shippingDate: "2025-06-10",
    approvedForScheduling: true,
    inventoryBank: "workspace-1",
    location: { bay: 5, row: "C", stackPosition: 2 }
  },
  {
    id: "P002", 
    name: "Beam B-05",
    project: "Retail Center Phase 2",
    status: "field-wip-ok-to-ship",
    issues: [
      { 
        id: "I001", 
        type: "Field WIP", 
        category: "Surface Defect", 
        description: "Minor surface spall - field repair approved", 
        resolved: true,
        ballInCourt: "Project Manager"
      }
    ],
    shippingDate: "2025-06-08",
    approvedForScheduling: true,
    inventoryBank: "workspace-2",
    location: { bay: 3, row: "A", stackPosition: 1 }
  },
  {
    id: "P003",
    name: "Column C-18",
    project: "Industrial Warehouse",
    status: "wip-only",
    issues: [
      { 
        id: "I002", 
        type: "Plant WIP", 
        category: "Dimensional", 
        description: "Edge needs finishing", 
        resolved: false,
        ballInCourt: "Plant Management",
        engineerIssued: false
      }
    ],
    shippingDate: "2025-06-07",
    approvedForScheduling: true,
    inventoryBank: "approved-for-scheduling"
  },
  {
    id: "P004",
    name: "Slab S-07",
    project: "Parking Structure",
    status: "eng-only", 
    issues: [
      { 
        id: "I003", 
        type: "ENG", 
        category: "Structural", 
        description: "Crack requires review", 
        resolved: false,
        ballInCourt: "Assigned Engineer"
      }
    ],
    shippingDate: "2025-06-06",
    approvedForScheduling: true,
    inventoryBank: "approved-for-scheduling"
  },
  {
    id: "P005",
    name: "Panel P-23",
    project: "Hospital Wing",
    status: "wip-and-eng",
    issues: [
      { 
        id: "I004", 
        type: "Plant WIP", 
        category: "Surface", 
        description: "Surface repair needed", 
        resolved: false,
        ballInCourt: "Plant Management",
        engineerIssued: true
      },
      { 
        id: "I005", 
        type: "ENG", 
        category: "Dimensional", 
        description: "Tolerance review required", 
        resolved: false,
        ballInCourt: "Assigned Engineer"
      }
    ],
    shippingDate: "2025-06-05",
    approvedForScheduling: false,
    inventoryBank: "all-pieces"
  },
  {
    id: "P006",
    name: "Beam B-12",
    project: "School Addition",
    status: "scrap",
    issues: [
      { 
        id: "I006", 
        type: "Scrap", 
        category: "Structural", 
        description: "Critical defect - piece scrapped", 
        resolved: false,
        ballInCourt: "Scheduling"
      }
    ],
    approvedForScheduling: false,
    inventoryBank: "all-pieces"
  }
];

const getStatusDisplay = (piece: Piece) => {
  const urgentShipping = piece.shippingDate && new Date(piece.shippingDate) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  
  switch (piece.status) {
    case 'ok-to-ship':
      return { 
        label: 'OK to Ship', 
        bgClass: 'bg-green-500', 
        icon: CheckCircle,
        urgent: urgentShipping 
      };
    case 'field-wip-ok-to-ship':
      return { 
        label: 'Field WIP - OK to Ship', 
        bgClass: 'bg-green-500', 
        icon: CheckCircle,
        urgent: urgentShipping 
      };
    case 'wip-only':
      return { 
        label: 'Plant WIP Required', 
        bgClass: 'bg-yellow-500', 
        icon: Settings,
        urgent: urgentShipping 
      };
    case 'eng-only':
      return { 
        label: 'ENG Review Required', 
        bgClass: 'bg-orange-500', 
        icon: AlertTriangle,
        urgent: urgentShipping 
      };
    case 'wip-and-eng':
      return { 
        label: 'Plant WIP & ENG Required', 
        bgClass: 'bg-gradient-to-r from-orange-500 to-yellow-500', 
        icon: AlertTriangle,
        urgent: urgentShipping 
      };
    case 'scrap':
      return { 
        label: 'Scrap', 
        bgClass: 'bg-red-500', 
        icon: XCircle,
        urgent: false 
      };
    default:
      return { 
        label: 'Unknown', 
        bgClass: 'bg-gray-500', 
        icon: Settings,
        urgent: false 
      };
  }
};

const getInventoryBankLabel = (bank: string) => {
  switch (bank) {
    case 'all-pieces':
      return 'All Pieces';
    case 'approved-for-scheduling':
      return 'Approved for Scheduling';
    case 'workspace-1':
      return 'Workspace 1';
    case 'workspace-2':
      return 'Workspace 2';
    case 'shipped':
      return 'Shipped';
    default:
      return bank;
  }
};

const QCStatusOverview = () => {
  const statusCounts = {
    'ok-to-ship': mockPieces.filter(p => p.status === 'ok-to-ship' || p.status === 'field-wip-ok-to-ship').length,
    'wip-only': mockPieces.filter(p => p.status === 'wip-only').length,
    'eng-only': mockPieces.filter(p => p.status === 'eng-only').length,
    'wip-and-eng': mockPieces.filter(p => p.status === 'wip-and-eng').length,
    'scrap': mockPieces.filter(p => p.status === 'scrap').length,
  };

  const urgentPieces = mockPieces.filter(piece => {
    if (!piece.shippingDate) return false;
    return new Date(piece.shippingDate) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  });

  return (
    <Card className="module-card-hover border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-700">
          <CheckCircle className="h-5 w-5 mr-2" />
          QC Status Overview
        </CardTitle>
        <CardDescription>Real-time status with production scheduling and shipping integration</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Urgent Shipping Alert */}
        {urgentPieces.length > 0 && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <Truck className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-sm font-medium text-red-800">
                {urgentPieces.length} piece{urgentPieces.length > 1 ? 's' : ''} need{urgentPieces.length === 1 ? 's' : ''} QC approval for shipping within 3 days
              </span>
            </div>
          </div>
        )}

        {/* Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts['ok-to-ship']}</div>
            <div className="text-xs text-gray-600">Ready to Ship</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts['wip-only']}</div>
            <div className="text-xs text-gray-600">Plant WIP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{statusCounts['eng-only']}</div>
            <div className="text-xs text-gray-600">ENG Review</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{statusCounts['wip-and-eng']}</div>
            <div className="text-xs text-gray-600">WIP & ENG</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{statusCounts['scrap']}</div>
            <div className="text-xs text-gray-600">Scrap</div>
          </div>
        </div>

        {/* Piece Status List */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 mb-3">Recent Pieces</h4>
          {mockPieces.slice(0, 5).map((piece) => {
            const statusInfo = getStatusDisplay(piece);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={piece.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-center">
                    <StatusIcon className="h-4 w-4 text-gray-600" />
                    {statusInfo.urgent && (
                      <Clock className="h-3 w-3 text-red-500 mt-1" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{piece.name}</div>
                    <div className="text-xs text-gray-500">{piece.project}</div>
                    {piece.location && (
                      <div className="text-xs text-gray-400">
                        Bay {piece.location.bay}, Row {piece.location.row}, Stack {piece.location.stackPosition}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <div className="flex items-center space-x-2">
                    {piece.issues.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {piece.issues.length} issue{piece.issues.length > 1 ? 's' : ''}
                      </Badge>
                    )}
                    {piece.shippingDate && (
                      <Badge variant="outline" className="text-xs">
                        Ships {new Date(piece.shippingDate).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {getInventoryBankLabel(piece.inventoryBank)}
                    </Badge>
                    <div className={`px-3 py-1 rounded-full text-white text-xs font-medium ${statusInfo.bgClass}`}>
                      {statusInfo.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t">
          <button className="w-full text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
            View Production Schedule & QC Dashboard →
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QCStatusOverview;
