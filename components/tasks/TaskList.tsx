
import { useEffect } from 'react';
import { useTaskStore } from '@/store/taskStore';
import TaskCard from './TaskCard';
import TaskFilter from './TaskFilter';

export default function TaskList() {
  const { tasks, fetchTasks, isLoading, error } = useTaskStore();
  
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  
  if (isLoading && tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>Error: {error}</p>
      </div>
    );
  }
  
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No tasks found.</p>
      </div>
    );
  }
  
  return (
    <div>
      <TaskFilter />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}