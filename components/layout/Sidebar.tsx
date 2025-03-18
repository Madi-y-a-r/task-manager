import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function Sidebar() {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <aside className="bg-gray-50 w-64 min-h-screen p-4 border-r border-gray-200">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700">Task Manager</h2>
        <p className="text-sm text-gray-500">Welcome, {user.name}</p>
      </div>
      
      <nav>
        <ul className="space-y-2">
          <li>
            <Link 
              href="/tasks" 
              className="block p-2 rounded hover:bg-gray-200 text-gray-700 hover:text-blue-600"
            >
              All Tasks
            </Link>
          </li>
          <li>
            <Link 
              href="/tasks/new" 
              className="block p-2 rounded hover:bg-gray-200 text-gray-700 hover:text-blue-600"
            >
              Create Task
            </Link>
          </li>
          {user.role === 'ADMIN' && (
            <li>
              <Link 
                href="/admin/users" 
                className="block p-2 rounded hover:bg-gray-200 text-gray-700 hover:text-blue-600"
              >
                Manage Users
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}
