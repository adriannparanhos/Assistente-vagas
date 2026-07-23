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

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  isLoading: false,
  error: null,
  
  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await apiClient.get<JobApplication[]>('/jobs');
      set({ jobs: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Erro ao carregar as vagas', isLoading: false });
    }
  },

  addJob: async (job) => {
    set({ isLoading: true, error: null });
    try {
      const jobWithHistory = {
        ...job,
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

  deleteJob: async (jobId: string) => {
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== jobId),
    }));

    try {
      await apiClient.delete(`/jobs/${jobId}`);
      console.log('Vaga deletada com sucesso no backend!');
    } catch (error) {
      console.error('Falha ao deletar vaga na API. Revertendo...', error);
      await get().fetchJobs(); 
    }
  },
}));
