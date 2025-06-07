// Mock data for Fresh Concrete Test forms

export interface MixDesign {
  id: string;
  name: string;
  strength: string;
  department: string;
}

export interface BatchTicket {
  id: string;
  mixDesign: string;
  batchSize: string;
  yield: string;
  timestamp: string;
}

export interface Piece {
  id: string;
  name: string;
  jobNumber: string;
  pieceId: string;
}

export interface Form {
  id: string;
  name: string;
  department: string;
  type: string;
}

export const mixDesigns: MixDesign[] = [
  { id: "MD-001", name: "Standard Precast Mix", strength: "5000 psi", department: "precast" },
  { id: "MD-002", name: "High Strength Precast", strength: "6000 psi", department: "precast" },
  { id: "MD-003", name: "Extruded Products", strength: "4500 psi", department: "extruded" },
  { id: "MD-004", name: "Flexicore Mix", strength: "4000 psi", department: "flexicore" },
  { id: "MD-005", name: "Wall Panel Mix", strength: "5500 psi", department: "wall-panels" }
];

export const batchTickets: BatchTicket[] = [
  { id: "BT-2024-0115-001", mixDesign: "MD-001", batchSize: "3.5", yield: "94.5", timestamp: "2024-01-15 09:00" },
  { id: "BT-2024-0115-002", mixDesign: "MD-002", batchSize: "5.0", yield: "135.0", timestamp: "2024-01-15 10:30" },
  { id: "BT-2024-0115-003", mixDesign: "MD-003", batchSize: "2.8", yield: "75.6", timestamp: "2024-01-15 14:15" },
  { id: "BT-2024-0115-004", mixDesign: "MD-004", batchSize: "4.2", yield: "113.4", timestamp: "2024-01-15 16:00" },
  { id: "BT-2024-0115-005", mixDesign: "MD-005", batchSize: "3.8", yield: "102.6", timestamp: "2024-01-15 11:45" }
];

// Updated forms for Precast Department
export const precastForms: Form[] = [
  { id: "BL1", name: "BL1", department: "precast", type: "beam-line" },
  { id: "BL2", name: "BL2", department: "precast", type: "beam-line" },
  { id: "BL3", name: "BL3", department: "precast", type: "beam-line" },
  { id: "BL6", name: "BL6", department: "precast", type: "beam-line" },
  { id: "EPB-E", name: "EPB-E", department: "precast", type: "panel-bed" },
  { id: "EPB-W", name: "EPB-W", department: "precast", type: "panel-bed" },
  { id: "WPB-E", name: "WPB-E", department: "precast", type: "panel-bed" },
  { id: "WPB-W", name: "WPB-W", department: "precast", type: "panel-bed" },
  { id: "MS", name: "MS", department: "precast", type: "mild-steel" },
  { id: "COL", name: "COL", department: "precast", type: "columns" },
  { id: "STAD", name: "STAD", department: "precast", type: "stadia" }
];

// All forms (can be extended for other departments)
export const allForms: Form[] = [
  ...precastForms
  // Other department forms can be added here when needed
];

export const scheduledPieces: { [formName: string]: Piece[] } = {
  "BL1": [
    { id: "piece-1", name: "Beam B1", jobNumber: "5014", pieceId: "B0001" },
    { id: "piece-2", name: "Beam B2", jobNumber: "5014", pieceId: "B0002" }
  ],
  "BL2": [
    { id: "piece-3", name: "Beam B3", jobNumber: "5015", pieceId: "B0003" },
    { id: "piece-4", name: "Beam B4", jobNumber: "5015", pieceId: "B0004" }
  ],
  "BL3": [
    { id: "piece-5", name: "Beam B5", jobNumber: "5016", pieceId: "B0005" }
  ],
  "BL6": [
    { id: "piece-6", name: "Beam B6", jobNumber: "5017", pieceId: "B0006" }
  ],
  "EPB-E": [
    { id: "piece-7", name: "Column C1", jobNumber: "5018", pieceId: "C0001" },
    { id: "piece-8", name: "Column C2", jobNumber: "5018", pieceId: "C0002" }
  ],
  "EPB-W": [
    { id: "piece-9", name: "Column C3", jobNumber: "5019", pieceId: "C0003" }
  ],
  "WPB-E": [
    { id: "piece-10", name: "Slab S1", jobNumber: "5020", pieceId: "S0001" }
  ],
  "WPB-W": [
    { id: "piece-11", name: "Slab S2", jobNumber: "5021", pieceId: "S0002" }
  ],
  "MS": [
    { id: "piece-12", name: "Mild Steel MS1", jobNumber: "5022", pieceId: "M0001" }
  ],
  "COL": [
    { id: "piece-13", name: "Column C4", jobNumber: "5023", pieceId: "C0004" },
    { id: "piece-14", name: "Column C5", jobNumber: "5023", pieceId: "C0005" }
  ],
  "STAD": [
    { id: "piece-15", name: "Stadia ST1", jobNumber: "5024", pieceId: "M0002" }
  ]
};
