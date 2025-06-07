

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
    { id: "piece-1", name: "Prestressed Beam", jobNumber: "5014", pieceId: "5014-B14" },
    { id: "piece-2", name: "Prestressed Beam", jobNumber: "5014", pieceId: "5014-B15" },
    { id: "piece-3", name: "Prestressed Beam", jobNumber: "5018", pieceId: "5018-B22" },
    { id: "piece-4", name: "Prestressed Beam", jobNumber: "5018", pieceId: "5018-B23" }
  ],
  "BL2": [
    { id: "piece-5", name: "Prestressed Beam", jobNumber: "5015", pieceId: "5015-B08" },
    { id: "piece-6", name: "Prestressed Beam", jobNumber: "5015", pieceId: "5015-B09" },
    { id: "piece-7", name: "Prestressed Beam", jobNumber: "5019", pieceId: "5019-B31" }
  ],
  "BL3": [
    { id: "piece-8", name: "Prestressed Beam", jobNumber: "5016", pieceId: "5016-B42" },
    { id: "piece-9", name: "Prestressed Beam", jobNumber: "5016", pieceId: "5016-B43" }
  ],
  "BL6": [
    { id: "piece-10", name: "Prestressed Beam", jobNumber: "5017", pieceId: "5017-B18" },
    { id: "piece-11", name: "Prestressed Beam", jobNumber: "5020", pieceId: "5020-B05" }
  ],
  "EPB-E": [
    { id: "piece-12", name: "Solid Slab", jobNumber: "5021", pieceId: "5021-S101" },
    { id: "piece-13", name: "Solid Slab", jobNumber: "5021", pieceId: "5021-S102" },
    { id: "piece-14", name: "Solid Slab Section", jobNumber: "5022", pieceId: "5022-SS05" }
  ],
  "EPB-W": [
    { id: "piece-15", name: "Solid Slab", jobNumber: "5023", pieceId: "5023-S301" },
    { id: "piece-16", name: "Solid Slab Section", jobNumber: "5023", pieceId: "5023-SS12" }
  ],
  "WPB-E": [
    { id: "piece-17", name: "Wall Panel", jobNumber: "5024", pieceId: "5024-W401" },
    { id: "piece-18", name: "Wall Panel", jobNumber: "5024", pieceId: "5024-W402" },
    { id: "piece-19", name: "Wall Panel", jobNumber: "5025", pieceId: "5025-W501" }
  ],
  "WPB-W": [
    { id: "piece-20", name: "Wall Panel", jobNumber: "5026", pieceId: "5026-W601" },
    { id: "piece-21", name: "Wall Panel", jobNumber: "5026", pieceId: "5026-W602" }
  ],
  "MS": [
    { id: "piece-22", name: "Mild Steel Element", jobNumber: "5027", pieceId: "5027-MS01" },
    { id: "piece-23", name: "Mild Steel Element", jobNumber: "5027", pieceId: "5027-MS02" },
    { id: "piece-24", name: "Mild Steel Element", jobNumber: "5028", pieceId: "5028-MS15" }
  ],
  "COL": [
    { id: "piece-25", name: "Precast Column", jobNumber: "5029", pieceId: "5029-C701" },
    { id: "piece-26", name: "Precast Column", jobNumber: "5029", pieceId: "5029-C702" },
    { id: "piece-27", name: "Precast Column", jobNumber: "5030", pieceId: "5030-C801" },
    { id: "piece-28", name: "Precast Column", jobNumber: "5030", pieceId: "5030-C802" }
  ],
  "STAD": [
    { id: "piece-29", name: "Stadium Riser", jobNumber: "5031", pieceId: "5031-SR01" },
    { id: "piece-30", name: "Stadium Riser", jobNumber: "5031", pieceId: "5031-SR02" },
    { id: "piece-31", name: "Stadium Riser", jobNumber: "5032", pieceId: "5032-SR15" }
  ]
};

