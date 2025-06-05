
export interface Job {
  id: string;
  project: string;
  panelType?: string;
  dimensions: string;
  quantity: number;
  completed: number;
  status: string;
  crew: string;
  startDate: string;
  dueDate: string;
  priority: string;
  concreteStrength?: string;
  embedments?: string[];
  finishType?: string;
  reinforcement?: string;
  strandType?: string;
  tensionForce?: string;
  curingMethod?: string;
}

export interface DepartmentStatus {
  name: string;
  target: number;
  completed: number;
  efficiency: number;
  status: "on-track" | "behind" | "ahead";
}

export interface ProductionMetrics {
  totalPieces: number;
  completedToday: number;
  inProgress: number;
  qualityIssues: number;
  efficiency: number;
  onTimeDelivery: number;
}
