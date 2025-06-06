
export interface BatchMaterial {
  id: string;
  name: string;
  type: 'cement' | 'aggregate' | 'admix' | 'fly-ash' | 'water';
  supplier: string;
  unitCost: number;
  unit: string;
  lastUpdated: string;
}

export interface BatchUsageData {
  materialId: string;
  materialName: string;
  quantityUsed: number;
  unit: string;
  cost: number;
  batchId: string;
  mixDesign: string;
  timestamp: string;
  department: string;
}

export interface BatchIntegrationStatus {
  isConnected: boolean;
  lastSync: string;
  status: 'online' | 'offline' | 'syncing' | 'error';
  errorMessage?: string;
}
