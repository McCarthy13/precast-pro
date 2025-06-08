
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
  date: 75,
  time: 55,
  mixDesign: 65,
  batchTicket: 75,
  form: 50,
  job: 50,
  pieces: 100,
  slumpFlow: 55,
  airContent: 45,
  ambientTemp: 55,
  concreteTemp: 55,
  unitWeight: 60,
  yield: 50,
  relativeYield: 55,
  release: 75,
  releaseRequired: 70,
  releaseSubmit: 85,
  strength1: 75,
  strength2: 75,
  strength3: 75,
  average: 75,
  strengthRequired: 70,
  strengthSubmit: 90,
  t20: 60,
  jRing: 65,
  staticSegregation: 75
};
