'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/tasks');
  }, [router]);
  
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <p>Redirecting to tasks...</p>
      </div>
    </div>
  );
}