import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '../../../shared/api/apiClient';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: unknown) => Promise<void>;
  register: (data: unknown) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      clearError: () => set({ error: null }),

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err: any) {
          set({
            error: err.message || 'Erro ao efetuar login. Verifique suas credenciais.',
            isLoading: false,
          });
          throw err;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.post<AuthResponse>('/auth/register', data);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err: any) {
          set({
            error: err.message || 'Erro ao criar conta. Tente novamente.',
            isLoading: false,
          });
          throw err;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
