
export interface DocumentInfo {
  title: string;
  documentNumber: string;
  version: string;
  creationDate: string;
  author: string;
  reviewDate?: string;
  approvedBy?: string;
  department?: string;
  category?: 'SOP' | 'Form' | 'Manual' | 'Policy' | 'Procedure' | 'Checklist';
}

export interface RevisionHistory {
  version: string;
  date: string;
  author: string;
  changes: string;
  approver?: string;
}
