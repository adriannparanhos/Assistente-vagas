import { create } from 'zustand';
import { mockJobs } from '../domain/mockData';
import type { JobApplication, JobApplicationStatus } from '../domain/types';

interface JobStore {
  jobs: JobApplication[];
  addJob: (job: JobApplication) => void;
  updateJobStatus: (id: string, status: JobApplicationStatus) => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: mockJobs,
  addJob: (job) =>
    set((state) => ({
      jobs: [...state.jobs, job],
    })),
  updateJobStatus: (id, status) =>
    set((state) => ({
      jobs: state.jobs.map((job) => (job.id === id ? { ...job, status } : job)),
    })),
}));
