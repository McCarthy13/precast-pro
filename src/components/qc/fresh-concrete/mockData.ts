
import { getFormsByDepartment } from "@/data/productionForms";

export const mixDesigns = [
  { id: 'MD-001', name: 'Standard Wall Panel Mix - 5000 PSI' },
  { id: 'MD-002', name: 'Double Tee Mix Design - 6000 PSI' },
  { id: 'MD-003', name: 'Architectural Precast Mix - 4500 PSI' },
];

export const batchTickets = [
  { id: '2401151', mixDesign: 'MD-001', yield: '27.0', batchSize: '1.0' },
  { id: '2401152', mixDesign: 'MD-002', yield: '26.8', batchSize: '1.5' },
  { id: '2401153', mixDesign: 'MD-001', yield: '27.2', batchSize: '2.0' },
];

// Get real company forms by department
export const getCompanyFormsByDepartment = (department: string) => {
  const forms = getFormsByDepartment(department);
  
  // Transform to the format expected by the components
  const scheduledPieces: Record<string, any[]> = {};
  
  forms.forEach(form => {
    scheduledPieces[form.name] = form.scheduledJobs.map((job, index) => ({
      id: `${form.id}-${index + 1}`,
      name: `${job.panelType || 'Element'} ${index + 1}`,
      jobNumber: job.project || '5000',
      pieceId: `${form.id.substring(0, 3)}${index + 1}`
    }));
  });
  
  return scheduledPieces;
};

// Legacy export for backward compatibility - now uses real forms
export const scheduledPieces = {
  // Precast forms
  'Beam Line 1': [
    { id: 'BL1-1', name: 'Beam 1', jobNumber: '5014', pieceId: 'B1' },
    { id: 'BL1-2', name: 'Beam 2', jobNumber: '5014', pieceId: 'B2' },
  ],
  'Beam Line 2': [
    { id: 'BL2-1', name: 'Beam 1', jobNumber: '5015', pieceId: 'B1' },
    { id: 'BL2-2', name: 'Beam 2', jobNumber: '5015', pieceId: 'B2' },
  ],
  'Beam Line 3': [
    { id: 'BL3-1', name: 'Beam 1', jobNumber: '5016', pieceId: 'B1' },
  ],
  'Beam Line 6': [
    { id: 'BL6-1', name: 'Beam 1', jobNumber: '5017', pieceId: 'B1' },
  ],
  'East Panel Bed-East': [
    { id: 'EPB-E-1', name: 'Panel 1', jobNumber: '5018', pieceId: 'P1' },
    { id: 'EPB-E-2', name: 'Panel 2', jobNumber: '5018', pieceId: 'P2' },
  ],
  'East Panel Bed-West': [
    { id: 'EPB-W-1', name: 'Panel 1', jobNumber: '5019', pieceId: 'P1' },
  ],
  'West Panel Bed-East': [
    { id: 'WPB-E-1', name: 'Panel 1', jobNumber: '5020', pieceId: 'P1' },
  ],
  'West Panel Bed-West': [
    { id: 'WPB-W-1', name: 'Panel 1', jobNumber: '5021', pieceId: 'P1' },
    { id: 'WPB-W-2', name: 'Panel 2', jobNumber: '5021', pieceId: 'P2' },
  ],
  'Columns': [
    { id: 'COL-1', name: 'Column 1', jobNumber: '5022', pieceId: 'C1' },
    { id: 'COL-2', name: 'Column 2', jobNumber: '5022', pieceId: 'C2' },
  ],
  'Stadia': [
    { id: 'STAD-1', name: 'Stadia 1', jobNumber: '5023', pieceId: 'S1' },
  ],
  'Mild Steel': [
    { id: 'MS-1', name: 'Mild Steel 1', jobNumber: '5024', pieceId: 'MS1' },
  ],
  
  // Wall Panel forms (1-24)
  ...Array.from({ length: 24 }, (_, i) => ({
    [`Wall Panel Form ${i + 1}`]: [
      { id: `WP${i + 1}-1`, name: `Wall Panel 1`, jobNumber: '5100', pieceId: `WP${i + 1}-1` },
      { id: `WP${i + 1}-2`, name: `Wall Panel 2`, jobNumber: '5100', pieceId: `WP${i + 1}-2` },
    ]
  })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
  
  // Extruded forms
  'Extruded 1': [
    { id: 'EXT1-1', name: 'Hollow Core 1', jobNumber: '5200', pieceId: 'HC1' },
  ],
  'Extruded 2': [
    { id: 'EXT2-1', name: 'Hollow Core 1', jobNumber: '5201', pieceId: 'HC1' },
  ],
  'Extruded 3': [
    { id: 'EXT3-1', name: 'Hollow Core 1', jobNumber: '5202', pieceId: 'HC1' },
  ],
  'Extruded 4': [
    { id: 'EXT4-1', name: 'Hollow Core 1', jobNumber: '5203', pieceId: 'HC1' },
  ],
  'Extruded 5': [
    { id: 'EXT5-1', name: 'Hollow Core 1', jobNumber: '5204', pieceId: 'HC1' },
  ],
  'Extruded 6': [
    { id: 'EXT6-1', name: 'Hollow Core 1', jobNumber: '5205', pieceId: 'HC1' },
  ],
  'Extruded 7': [
    { id: 'EXT7-1', name: 'Hollow Core 1', jobNumber: '5206', pieceId: 'HC1' },
  ],
  'Extruded 8': [
    { id: 'EXT8-1', name: 'Hollow Core 1', jobNumber: '5207', pieceId: 'HC1' },
  ],
};
