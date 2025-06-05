
export interface InventoryItem {
  id: string;
  name: string;
  category: 'raw-material' | 'work-in-progress' | 'finished-goods' | 'consumables';
  quantity: number;
  unit: string;
  location: string;
  lastUpdated: string;
  minStock?: number;
  maxStock?: number;
  cost?: number;
}

export interface MaterialConsumption {
  itemId: string;
  itemName: string;
  quantityUsed: number;
  unit: string;
  jobId: string;
  date: string;
}

export interface InventoryTransaction {
  id: string;
  itemId: string;
  type: 'receipt' | 'consumption' | 'transfer' | 'adjustment';
  quantity: number;
  fromLocation?: string;
  toLocation?: string;
  jobId?: string;
  notes?: string;
  timestamp: string;
  user: string;
}
