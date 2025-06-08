
export interface FreshTest {
  id: string;
  date: string;
  time: string;
  job: string;
  mixDesign: string;
  batchTicket: string;
  form: string;
  pieces: string;
  slumpFlow: string;
  airContent: string;
  ambientTemp: string;
  concreteTemp: string;
  unitWeight: string;
  releaseRequired: string;
  strengthRequired: string;
  yield: string;
  relativeYield: string;
  t20: string;
  jRing: string;
  staticSegregation: string;
  technician: string;
  status: string;
  submitted?: boolean;
  formSubmissionId?: string;
  isSubLine?: boolean;
  parentId?: string;
}

export interface Column {
  key: string;
  label: string;
}

export interface HierarchyGroup {
  mainTest: FreshTest;
  hierarchy: FormGroup[];
  allTests: FreshTest[];
}

export interface FormGroup {
  form: string;
  jobs: JobGroup[];
}

export interface JobGroup {
  job: string;
  pieces: string[];
}

export const columnWidths = {
  date: 90,
  time: 70,
  mixDesign: 80,
  batchTicket: 90,
  form: 100,
  job: 80,
  pieces: 120,
  slumpFlow: 90,
  airContent: 70,
  ambientTemp: 85,
  concreteTemp: 85,
  unitWeight: 95,
  yield: 80,
  relativeYield: 85,
  release: 90,
  releaseRequired: 85,
  releaseSubmit: 100,
  strength1: 90,
  strength2: 90,
  strength3: 90,
  average: 90,
  strengthRequired: 85,
  strengthSubmit: 110,
  t20: 80,
  jRing: 80,
  staticSegregation: 90
};
