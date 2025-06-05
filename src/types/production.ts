
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
  formId?: string;
  scheduledDate?: string;
  pourOrder?: number;
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

export interface ProductionForm {
  id: string;
  name: string;
  department: 'precast' | 'extruded' | 'flexicore' | 'wall-panels';
  capacity: number;
  dimensions?: string;
  isActive: boolean;
  currentJob?: Job;
  scheduledJobs: Job[];
}

export interface QCInspectionPiece {
  id: string;
  pieceNumber: string;
  pieceName: string;
  formId: string;
  pourOrder: number;
  inspectionStatus: 'pending' | 'in-progress' | 'complete' | 'issues';
  prePourAnnotations?: any[];
  postPourAnnotations?: any[];
  drawingPages: DrawingPage[];
}

export interface DrawingPage {
  id: string;
  imageUrl: string;
  pageNumber: number;
  annotations: Annotation[];
}

export interface Annotation {
  id: string;
  type: 'comment' | 'markup' | 'highlight';
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  color: string;
  timestamp: string;
  inspector: string;
}
