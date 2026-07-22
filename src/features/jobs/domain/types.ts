export type JobApplicationStatus =
  | 'APPLIED'
  | 'HR_INTERVIEW'
  | 'TECH_INTERVIEW'
  | 'OFFER'
  | 'REJECTED';

export interface StatusHistoryEvent {
  status: JobApplicationStatus;
  date: string;
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: JobApplicationStatus;
  appliedDate: string;
  resumeVersion: string;
  salaryRange?: string;
  notes?: string;
  jobKeywords?: string;
  history?: StatusHistoryEvent[];
}
