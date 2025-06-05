
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Settings } from "lucide-react";

interface Piece {
  id: string;
  name: string;
  project: string;
  status: 'ok-to-ship' | 'field-repair-ok' | 'wip-only' | 'eng-only' | 'wip-and-eng' | 'scrap';
  issues: Array<{
    id: string;
    type: 'WIP' | 'ENG';
    category: string;
    description: string;
    resolved: boolean;
  }>;
}

const mockPieces: Piece[] = [
  {
    id: "P001",
    name: "Wall Panel A-12",
    project: "Downtown Office Complex",
    status: "ok-to-ship",
    issues: []
  },
  {
    id: "P002", 
    name: "Beam B-05",
    project: "Retail Center Phase 2",
    status: "field-repair-ok",
    issues: [
      { id: "I001", type: "ENG", category: "Surface Defect", description: "Minor surface spall", resolved: true }
    ]
  },
  {
    id: "P003",
    name: "Column C-18",
    project: "Industrial Warehouse",
    status: "wip-only",
    issues: [
      { id: "I002", type: "WIP", category: "Dimensional", description: "Edge needs finishing", resolved: false }
    ]
  },
  {
    id: "P004",
    name: "Slab S-07",
    project: "Parking Structure",
    status: "eng-only", 
    issues: [
      { id: "I003", type: "ENG", category: "Structural", description: "Crack requires review", resolved: false }
    ]
  },
  {
    id: "P005",
    name: "Panel P-23",
    project: "Hospital Wing",
    status: "wip-and-eng",
    issues: [
      { id: "I004", type: "WIP", category: "Surface", description: "Surface repair needed", resolved: false },
      { id: "I005", type: "ENG", category: "Dimensional", description: "Tolerance review required", resolved: false }
    ]
  },
  {
    id: "P006",
    name: "Beam B-12",
    project: "School Addition",
    status: "scrap",
    issues: [
      { id: "I006", type: "ENG", category: "Structural", description: "Critical defect - scrap piece", resolved: false }
    ]
  }
];

const getStatusDisplay = (status: Piece['status']) => {
  switch (status) {
    case 'ok-to-ship':
      return { label: 'OK to Ship', bgClass: 'bg-green-500', icon: CheckCircle };
    case 'field-repair-ok':
      return { label: 'Field Repair - OK to Ship', bgClass: 'bg-green-500', icon: CheckCircle };
    case 'wip-only':
      return { label: 'WIP Required', bgClass: 'bg-yellow-500', icon: Settings };
    case 'eng-only':
      return { label: 'ENG Review Required', bgClass: 'bg-orange-500', icon: AlertTriangle };
    case 'wip-and-eng':
      return { label: 'WIP & ENG Required', bgClass: 'bg-gradient-to-r from-orange-500 to-yellow-500', icon: AlertTriangle };
    case 'scrap':
      return { label: 'Scrap', bgClass: 'bg-red-500', icon: XCircle };
    default:
      return { label: 'Unknown', bgClass: 'bg-gray-500', icon: Settings };
  }
};

const QCStatusOverview = () => {
  const statusCounts = {
    'ok-to-ship': mockPieces.filter(p => p.status === 'ok-to-ship' || p.status === 'field-repair-ok').length,
    'wip-only': mockPieces.filter(p => p.status === 'wip-only').length,
    'eng-only': mockPieces.filter(p => p.status === 'eng-only').length,
    'wip-and-eng': mockPieces.filter(p => p.status === 'wip-and-eng').length,
    'scrap': mockPieces.filter(p => p.status === 'scrap').length,
  };

  return (
    <Card className="module-card-hover border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-700">
          <CheckCircle className="h-5 w-5 mr-2" />
          QC Status Overview
        </CardTitle>
        <CardDescription>Real-time status of pieces in production with visual indicators</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts['ok-to-ship']}</div>
            <div className="text-xs text-gray-600">Ready to Ship</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts['wip-only']}</div>
            <div className="text-xs text-gray-600">WIP Only</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{statusCounts['eng-only']}</div>
            <div className="text-xs text-gray-600">ENG Only</div>
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
          {mockPieces.slice(0, 4).map((piece) => {
            const statusInfo = getStatusDisplay(piece.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={piece.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <StatusIcon className="h-4 w-4 text-gray-600" />
                  <div>
                    <div className="font-medium text-sm">{piece.name}</div>
                    <div className="text-xs text-gray-500">{piece.project}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {piece.issues.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {piece.issues.length} issue{piece.issues.length > 1 ? 's' : ''}
                    </Badge>
                  )}
                  <div className={`px-3 py-1 rounded-full text-white text-xs font-medium ${statusInfo.bgClass}`}>
                    {statusInfo.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t">
          <button className="w-full text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
            View All QC Status →
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QCStatusOverview;
