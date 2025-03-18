import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Task Manager
        </Link>
        
        <nav>
          <ul className="flex space-x-6">
            {user ? (
              <>
                <li>
                  <Link href="/tasks" className="text-gray-600 hover:text-blue-600">
                    Tasks
                  </Link>
                </li>
                {user.role === 'ADMIN' && (
                  <li>
                    <Link href="/admin" className="text-gray-600 hover:text-blue-600">
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className="text-gray-600 hover:text-blue-600">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-gray-600 hover:text-blue-600">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
