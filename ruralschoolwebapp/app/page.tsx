'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from './context/AuthContext';

export default function HomePage() {
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace('/login');
    } else {
      switch (user.role) {
        case 'admin':
          router.replace('/admin/dashboard');
          break;
        case 'teacher':
          router.replace('/teacher/dashboard');
          break;
        case 'student':
          router.replace('/student/dashboard');
          break;
        default:
          router.replace('/login');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>Loading...</h1>
</div>
);
}