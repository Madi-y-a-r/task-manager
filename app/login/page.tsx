
import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        
        <LoginForm />
        
        <div className="text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-800">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}