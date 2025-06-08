// Define types locally since they don't exist in production types
export interface Piece {
  id: string;
  name: string;
  jobNumber: string;
  pieceId: string;
}

export interface Form {
  id: string;
  name: string;
}

export interface BatchTicket {
  id: string;
  mixDesign: string;
  batchSize: string;
  yield: string;
  description: string;
}

export interface MixDesign {
  id: string;
  name: string;
  description: string;
}

export const mixDesigns: MixDesign[] = [
  {
    id: "MD-001",
    name: "Standard Precast Mix",
    description: "General purpose precast concrete mix"
  },
  {
    id: "MD-002", 
    name: "High Strength Precast",
    description: "High strength concrete for structural elements"
  },
  {
    id: "MD-003",
    name: "Extruded Products",
    description: "Specialized mix for extruded concrete products"
  },
  {
    id: "MD-004",
    name: "Flexicore Mix", 
    description: "Mix design for flexicore production"
  }
];

export const batchTickets: BatchTicket[] = [
  {
    id: "BT-2024-0115-001",
    mixDesign: "MD-001",
    batchSize: "3.5",
    yield: "27.0",
    description: "Standard Precast Mix - 3.5 yd³"
  },
  {
    id: "BT-2024-0115-002", 
    mixDesign: "MD-002",
    batchSize: "5.0",
    yield: "27.0",
    description: "High Strength Precast - 5.0 yd³"
  },
  {
    id: "BT-2024-0115-003",
    mixDesign: "MD-003", 
    batchSize: "2.8",
    yield: "27.0",
    description: "Extruded Products - 2.8 yd³"
  },
  {
    id: "BT-2024-0115-004",
    mixDesign: "MD-004",
    batchSize: "4.2", 
    yield: "27.0",
    description: "Flexicore Mix - 4.2 yd³"
  }
];

export const scheduledPieces: { [formName: string]: Piece[] } = {
  // Precast Department Forms - Updated to use Job/Mark format
  "BL1": [
    { id: "BL1-001", name: "Beam A1", jobNumber: "25-5014", pieceId: "B001" },
    { id: "BL1-002", name: "Beam A2", jobNumber: "25-5014", pieceId: "B002" },
    { id: "BL1-003", name: "Beam B1", jobNumber: "25-5015", pieceId: "B003" }
  ],
  "BL2": [
    { id: "BL2-001", name: "Beam C1", jobNumber: "25-5016", pieceId: "B004" },
    { id: "BL2-002", name: "Beam C2", jobNumber: "25-5016", pieceId: "B005" }
  ],
  "BL3": [
    { id: "BL3-001", name: "Beam D1", jobNumber: "25-5017", pieceId: "B006" }
  ],
  "BL6": [],
  "COL": [
    { id: "COL-001", name: "Column 1", jobNumber: "25-5018", pieceId: "C001" },
    { id: "COL-002", name: "Column 2", jobNumber: "25-5018", pieceId: "C002" },
    { id: "COL-003", name: "Column 3", jobNumber: "25-5019", pieceId: "C003" }
  ],
  "STAD": [
    { id: "STAD-001", name: "Riser 1", jobNumber: "25-5020", pieceId: "M001" },
    { id: "STAD-002", name: "Riser 2", jobNumber: "25-5020", pieceId: "M002" }
  ],
  "EPB-E": [
    { id: "EPB-E-001", name: "Panel E1", jobNumber: "25-5021", pieceId: "S001" }
  ],
  "EPB-W": [
    { id: "EPB-W-001", name: "Panel W1", jobNumber: "25-5022", pieceId: "S002" },
    { id: "EPB-W-002", name: "Panel W2", jobNumber: "25-5022", pieceId: "S003" }
  ],
  "WPB-E": [],
  "WPB-W": [
    { id: "WPB-W-001", name: "Panel WW1", jobNumber: "25-5023", pieceId: "S004" }
  ],
  "MS": [
    { id: "MS-001", name: "Mild Steel 1", jobNumber: "25-5024", pieceId: "B007" }
  ],

  // Wall Panels Department Forms (WP1-WP24)
  "WP1": [
    { id: "WP1-001", name: "Wall Panel 1-1", jobNumber: "25-5025", pieceId: "W001" },
    { id: "WP1-002", name: "Wall Panel 1-2", jobNumber: "25-5025", pieceId: "W002" }
  ],
  "WP2": [
    { id: "WP2-001", name: "Wall Panel 2-1", jobNumber: "25-5026", pieceId: "W003" },
    { id: "WP2-002", name: "Wall Panel 2-2", jobNumber: "25-5026", pieceId: "W004" }
  ],
  "WP3": [
    { id: "WP3-001", name: "Wall Panel 3-1", jobNumber: "25-5027", pieceId: "W005" }
  ],
  "WP4": [
    { id: "WP4-001", name: "Wall Panel 4-1", jobNumber: "25-5028", pieceId: "W006" },
    { id: "WP4-002", name: "Wall Panel 4-2", jobNumber: "25-5028", pieceId: "W007" }
  ],
  "WP5": [
    { id: "WP5-001", name: "Wall Panel 5-1", jobNumber: "25-5029", pieceId: "W008" }
  ],
  "WP6": [],
  "WP7": [],
  "WP8": [
    { id: "WP8-001", name: "Wall Panel 8-1", jobNumber: "25-5030", pieceId: "W009" }
  ],
  "WP9": [
    { id: "WP9-001", name: "Wall Panel 9-1", jobNumber: "25-5031", pieceId: "W010" },
    { id: "WP9-002", name: "Wall Panel 9-2", jobNumber: "25-5031", pieceId: "W011" }
  ],
  "WP10": [],
  "WP11": [],
  "WP12": [
    { id: "WP12-001", name: "Wall Panel 12-1", jobNumber: "25-5032", pieceId: "W012" }
  ],
  ...Array.from({ length: 12 }, (_, i) => {
    const formName = `WP${i + 13}`;
    return { [formName]: [] };
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {}),

  // Extruded Department Forms (EXT1-EXT8)
  "EXT1": [
    { id: "EXT1-001", name: "Hollow Core 1", jobNumber: "25-7001", pieceId: "H001" },
    { id: "EXT1-002", name: "Hollow Core 2", jobNumber: "25-7001", pieceId: "H002" },
    { id: "EXT1-003", name: "Hollow Core 3", jobNumber: "25-7002", pieceId: "H001" }
  ],
  "EXT2": [
    { id: "EXT2-001", name: "Hollow Core 4", jobNumber: "25-7003", pieceId: "H001" },
    { id: "EXT2-002", name: "Hollow Core 5", jobNumber: "25-7003", pieceId: "H002" }
  ],
  "EXT3": [
    { id: "EXT3-001", name: "Hollow Core 6", jobNumber: "25-7004", pieceId: "H001" },
    { id: "EXT3-002", name: "Hollow Core 7", jobNumber: "25-7004", pieceId: "H002" }
  ],
  "EXT4": [
    { id: "EXT4-001", name: "Hollow Core 8", jobNumber: "25-7005", pieceId: "H001" }
  ],
  "EXT5": [],
  "EXT6": [],
  "EXT7": [],
  "EXT8": [],

  // Flexicore Department Forms
  "FL12x24-1": [
    { id: "FL12x24-1-001", name: "Flexicore 12x24 1", jobNumber: "25-8010", pieceId: "H001" }
  ],
  "FL12x24-2": [
    { id: "FL12x24-2-001", name: "Flexicore 12x24 2", jobNumber: "25-8011", pieceId: "H002" }
  ],
  "FL12x24-3": [
    { id: "FL12x24-3-001", name: "Flexicore 12x24 3", jobNumber: "25-8012", pieceId: "H003" }
  ],
  "FL12x24-4": [
    { id: "FL12x24-4-001", name: "Flexicore 12x24 4", jobNumber: "25-8013", pieceId: "H004" }
  ],
  "FL12x24-5": [
    { id: "FL12x24-5-001", name: "Flexicore 12x24 5", jobNumber: "25-8014", pieceId: "H005" }
  ],
  ...Array.from({ length: 15 }, (_, i) => {
    const formName = `FL12x24-${i + 6}`;
    return { [formName]: [] };
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {}),

  "FL8x24-1": [
    { id: "FL8x24-1-001", name: "Flexicore 8x24 1", jobNumber: "25-8015", pieceId: "H006" }
  ],
  "FL8x24-2": [
    { id: "FL8x24-2-001", name: "Flexicore 8x24 2", jobNumber: "25-8016", pieceId: "H007" }
  ],
  "FL8x24-3": [
    { id: "FL8x24-3-001", name: "Flexicore 8x24 3", jobNumber: "25-8017", pieceId: "H008" }
  ],
  ...Array.from({ length: 17 }, (_, i) => {
    const formName = `FL8x24-${i + 4}`;
    return { [formName]: [] };
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {}),

  ...Array.from({ length: 3 }, (_, i) => {
    const formName = `FL12x16-${i + 1}`;
    return { [formName]: [] };
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {}),

  ...Array.from({ length: 3 }, (_, i) => {
    const formName = `FL8x16-${i + 1}`;
    return { [formName]: [] };
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {}),

  // Double Tees Department Forms
  "DT1": [
    { id: "DT1-001", name: "Double Tee 1", jobNumber: "25-9001", pieceId: "T001" },
    { id: "DT1-002", name: "Double Tee 2", jobNumber: "25-9001", pieceId: "T002" }
  ],
  "DT2": [
    { id: "DT2-001", name: "Double Tee 3", jobNumber: "25-9002", pieceId: "T001" }
  ],
  "DT3": [],
  "DT4": [
    { id: "DT4-001", name: "Double Tee 4", jobNumber: "25-9003", pieceId: "T003" }
  ]
};

export const getFormsByDepartment = (department: string): Form[] => {
  switch (department) {
    case 'precast':
      return [
        { id: "BL1", name: "BL1" },
        { id: "BL2", name: "BL2" }, 
        { id: "BL3", name: "BL3" },
        { id: "BL6", name: "BL6" },
        { id: "COL", name: "COL" },
        { id: "STAD", name: "STAD" },
        { id: "EPB-E", name: "EPB-E" },
        { id: "EPB-W", name: "EPB-W" },
        { id: "WPB-E", name: "WPB-E" },
        { id: "WPB-W", name: "WPB-W" },
        { id: "MS", name: "MS" }
      ];
    case 'wall-panels':
      return Array.from({ length: 24 }, (_, i) => ({
        id: `WP${i + 1}`,
        name: `WP${i + 1}`
      }));
    case 'extruded':
      return [
        { id: "EXT1", name: "EXT1" },
        { id: "EXT2", name: "EXT2" },
        { id: "EXT3", name: "EXT3" },
        { id: "EXT4", name: "EXT4" },
        { id: "EXT5", name: "EXT5" },
        { id: "EXT6", name: "EXT6" },
        { id: "EXT7", name: "EXT7" },
        { id: "EXT8", name: "EXT8" }
      ];
    case 'flexicore':
      return [
        ...Array.from({ length: 20 }, (_, i) => ({
          id: `FL12x24-${i + 1}`,
          name: `FL12x24-${i + 1}`
        })),
        ...Array.from({ length: 20 }, (_, i) => ({
          id: `FL8x24-${i + 1}`,
          name: `FL8x24-${i + 1}`
        })),
        ...Array.from({ length: 3 }, (_, i) => ({
          id: `FL12x16-${i + 1}`,
          name: `FL12x16-${i + 1}`
        })),
        ...Array.from({ length: 3 }, (_, i) => ({
          id: `FL8x16-${i + 1}`,
          name: `FL8x16-${i + 1}`
        }))
      ];
    case 'double-tees':
      return [
        { id: "DT1", name: "DT1" },
        { id: "DT2", name: "DT2" },
        { id: "DT3", name: "DT3" },
        { id: "DT4", name: "DT4" }
      ];
    default:
      return [];
  }
};
