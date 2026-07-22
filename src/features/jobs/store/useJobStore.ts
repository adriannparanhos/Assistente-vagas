import { create } from 'zustand';
import { mockJobs } from '../domain/mockData';
import type { JobApplication, JobApplicationStatus } from '../domain/types';

interface JobStore {
  jobs: JobApplication[];
  addJob: (job: JobApplication) => void;
  updateJobStatus: (id: string, status: JobApplicationStatus) => void;
  updateJobDetails: (id: string, updatedData: Partial<JobApplication>) => void;
  deleteJob: (id: string) => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: mockJobs,
  addJob: (job) =>
    set((state) => ({
      jobs: [
        ...state.jobs,
        {
          ...job,
          history: [{ status: job.status, date: new Date().toISOString() }],
        },
      ],
    })),
  updateJobStatus: (id, status) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === id
          ? {
              ...job,
              status,
              history: [
                ...(job.history || []),
                { status, date: new Date().toISOString() },
              ],
            }
          : job
      ),
    })),
  updateJobDetails: (id, updatedData) =>
    set((state) => ({
      jobs: state.jobs.map((job) => (job.id === id ? { ...job, ...updatedData } : job)),
    })),
  deleteJob: (id) =>
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== id),
    })),
}));
