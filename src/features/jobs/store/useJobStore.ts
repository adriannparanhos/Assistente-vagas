import { create } from 'zustand';
import { apiClient } from '../../../shared/api/apiClient';
import type { JobApplication, JobApplicationStatus } from '../domain/types';

interface JobStore {
  jobs: JobApplication[];
  isLoading: boolean;
  error: string | null;
  
  fetchJobs: () => Promise<void>;
  addJob: (job: JobApplication) => Promise<void>;
  updateJobStatus: (id: string, status: JobApplicationStatus) => void;
  updateJobDetails: (id: string, updatedData: Partial<JobApplication>) => void;
  deleteJob: (id: string) => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  isLoading: false,
  error: null,
  
  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await apiClient.get<JobApplication[]>('/jobs?userId=user-123');
      set({ jobs: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Erro ao carregar as vagas', isLoading: false });
    }
  },

  addJob: async (job) => {
    set({ isLoading: true, error: null });
    try {
      // Mock history for optimistic/local usage before DB stores it correctly
      const jobWithHistory = {
        ...job,
        userId: 'user-123',
        history: [{ status: job.status, date: new Date().toISOString() }],
      };
      
      const savedJob = await apiClient.post<JobApplication>('/jobs', jobWithHistory);
      
      set((state) => ({
        jobs: [...state.jobs, savedJob],
        isLoading: false
      }));
    } catch (err: any) {
      set({ error: err.message || 'Erro ao criar a vaga', isLoading: false });
    }
  },
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
