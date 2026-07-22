export type JobApplicationStatus =
  | 'APPLIED'
  | 'HR_INTERVIEW'
  | 'TECH_INTERVIEW'
  | 'OFFER'
  | 'REJECTED';

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: JobApplicationStatus;
  appliedDate: string;
  resumeVersion: string;
  salaryRange?: string;
  notes?: string;
}
