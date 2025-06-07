
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
  '5014': [
    { id: '5014-C16', name: 'Column 16' },
    { id: '5014-C17', name: 'Column 17' },
    { id: '5014-B3', name: 'Beam 3' },
  ],
  '5015': [
    { id: '5015-W1', name: 'Wall Panel 1' },
    { id: '5015-W2', name: 'Wall Panel 2' },
    { id: '5015-W3', name: 'Wall Panel 3' },
  ],
  '5016': [
    { id: '5016-DT1', name: 'Double Tee 1' },
    { id: '5016-DT2', name: 'Double Tee 2' },
  ],
};
