import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';

export interface Resume {
  id: string;
  name: string;
  targetRole: string;
  createdAt: string;
  fileName: string;
  fileBase64: string;
}

const idbStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

interface ResumeStore {
  resumes: Resume[];
  addResume: (resume: Resume) => void;
  deleteResume: (id: string) => void;
  updateResume: (id: string, updatedData: Partial<Resume>) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumes: [],
      addResume: (resume) =>
        set((state) => ({
          resumes: [...state.resumes, resume],
        })),
      deleteResume: (id) =>
        set((state) => ({
          resumes: state.resumes.filter((resume) => resume.id !== id),
        })),
      updateResume: (id, updatedData) =>
        set((state) => ({
          resumes: state.resumes.map((resume) =>
            resume.id === id ? { ...resume, ...updatedData } : resume
          ),
        })),
    }),
    {
      name: 'resume-storage',
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
