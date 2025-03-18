import { create } from 'zustand';
import { AuthState, LoginCredentials, RegisterCredentials } from '@/types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoading: false,
  error: null,
  
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to login');
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      
      set({ user: data.user, token: data.token, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  },
  
  register: async (credentials: RegisterCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to register');
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      
      set({ user: data.user, token: data.token, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));