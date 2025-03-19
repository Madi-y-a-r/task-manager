import { Role } from '@/types/auth';

export interface UserModel {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export function validateUserInput(name: string, email: string, password: string): boolean {
  // Validate name
  if (!name || name.trim().length < 2) {
    return false;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return false;
  }
  
  // Validate password
  if (!password || password.length < 6) {
    return false;
  }
  
  return true;
}