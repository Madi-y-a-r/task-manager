export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface TaskFilters {
  status?: TaskStatus;
  sortBy?: 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  filters: TaskFilters;
  isLoading: boolean;
  error: string | null;
  fetchTasks: (filters?: TaskFilters) => Promise<void>;
  fetchTask: (id: string) => Promise<void>;
  createTask: (task: CreateTaskInput) => Promise<void>;
  updateTask: (id: string, task: UpdateTaskInput) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilters: (filters: TaskFilters) => void;
}