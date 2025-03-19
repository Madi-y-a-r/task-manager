
import { Task, TaskStatus } from '@/types/task';

export interface TaskModel {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export function validateTaskInput(title: string, description: string, status: TaskStatus): boolean {
  if (!title || title.trim().length < 3) {
    return false;
  }
  
  if (!description || description.trim().length < 5) {
    return false;
  }
  
  const validStatuses: TaskStatus[] = ['pending', 'in_progress', 'completed'];
  if (!validStatuses.includes(status)) {
    return false;
  }
  
  return true;
}