
'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useTaskStore } from '@/store/taskStore';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import TaskForm from '@/components/tasks/TaskForm';

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;
  const { user, token } = useAuthStore();
  const { fetchTask, currentTask, isLoading, error } = useTaskStore();
  
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);
  
  useEffect(() => {
    if (taskId) {
      fetchTask(taskId);
    }
  }, [taskId, fetchTask]);
  
  if (!user) {
    return null;
  }
  
  const handleSuccess = () => {
    router.push('/tasks');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-50">
            <p className="text-center py-10">Loading task...</p>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-50">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>Error: {error}</p>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!currentTask) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-50">
            <p className="text-center py-10">Task not found.</p>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
          <TaskForm task={currentTask} isEditing onSuccess={handleSuccess} />
        </main>
      </div>
      
      <Footer />
    </div>
  );
}