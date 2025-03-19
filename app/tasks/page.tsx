
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import TaskList from '@/components/tasks/TaskList';
import Link from 'next/link';

export default function TasksPage() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Your Tasks</h1>
            <Link 
              href="/tasks/new" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              New Task
            </Link>
          </div>
          
          <TaskList />
        </main>
      </div>
      
      <Footer />
    </div>
  );
}