import { create } from 'zustand';
import { TaskState, Task, CreateTaskInput, UpdateTaskInput, TaskFilters } from '@/types/task';

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  currentTask: null,
  filters: {
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  isLoading: false,
  error: null,
  
  fetchTasks: async (filters?: TaskFilters) => {
    set({ isLoading: true, error: null });

    try {
      const token = localStorage.getItem('token'); // ✅ Получаем токен
      console.log('Token from localStorage:', token); // ✅ Логируем токен

      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const response = await fetch('/api/tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // ✅ Передаем токен
          'Content-Type': 'application/json',
        },
      });

      console.log('Request sent with Authorization:', `Bearer ${token}`); // ✅ Проверяем, уходит ли токен

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch tasks');
      }

      const data = await response.json();
      console.log('Fetched Tasks:', data);

      set({ tasks: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      set({ isLoading: false, error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  },

  
  fetchTask: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch task');
      }
      
      const data = await response.json();
      set({ currentTask: data, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  },
  
  createTask: async (task: CreateTaskInput) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(task),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create task');
      }
      
      const newTask = await response.json();
      set((state) => ({ 
        tasks: [newTask, ...state.tasks], 
        isLoading: false 
      }));
    } catch (error) {
      set({ isLoading: false, error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  },
  
  updateTask: async (id: string, task: UpdateTaskInput) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(task),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update task');
      }
      
      const updatedTask = await response.json();
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
        currentTask: state.currentTask?.id === id ? updatedTask : state.currentTask,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false, error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  },
  
  deleteTask: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete task');
      }
      
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        currentTask: state.currentTask?.id === id ? null : state.currentTask,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false, error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  },
  
  setFilters: (filters: TaskFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
    get().fetchTasks();
  },
}));