"use client"
import { useTaskStore } from '@/store/taskStore';
import { TaskFilters, TaskStatus } from '@/types/task';

export default function TaskFilter() {
  const { filters, setFilters } = useTaskStore();
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as TaskStatus | '';
    setFilters({ status: value || undefined });
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split('-');
    setFilters({ 
      sortBy: sortBy as 'createdAt' | 'updatedAt', 
      sortOrder: sortOrder as 'asc' | 'desc' 
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-auto">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={filters.status || ''}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="w-full md:w-auto">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sort"
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={handleSortChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="createdAt-desc">Date Created (Newest)</option>
            <option value="createdAt-asc">Date Created (Oldest)</option>
            <option value="updatedAt-desc">Last Updated (Newest)</option>
            <option value="updatedAt-asc">Last Updated (Oldest)</option>
          </select>
        </div>
      </div>
    </div>
  );
}