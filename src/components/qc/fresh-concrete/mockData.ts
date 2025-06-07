
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

export const scheduledPieces = {
  'Form A': [
    { id: '5014-C16', name: 'Column 16', jobNumber: '5014', pieceId: 'C16' },
    { id: '5014-C17', name: 'Column 17', jobNumber: '5014', pieceId: 'C17' },
    { id: '5014-B3', name: 'Beam 3', jobNumber: '5014', pieceId: 'B3' },
  ],
  'Form B': [
    { id: '5015-W1', name: 'Wall Panel 1', jobNumber: '5015', pieceId: 'W1' },
    { id: '5015-W2', name: 'Wall Panel 2', jobNumber: '5015', pieceId: 'W2' },
    { id: '5015-W3', name: 'Wall Panel 3', jobNumber: '5015', pieceId: 'W3' },
  ],
  'Form C': [
    { id: '5016-DT1', name: 'Double Tee 1', jobNumber: '5016', pieceId: 'DT1' },
    { id: '5016-DT2', name: 'Double Tee 2', jobNumber: '5016', pieceId: 'DT2' },
  ],
};
