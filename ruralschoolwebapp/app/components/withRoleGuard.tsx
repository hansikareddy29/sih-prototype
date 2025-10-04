// app/components/withRoleGuard.tsx
'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';

const withRoleGuard = (allowedRoles: string[]) => (Component: React.ComponentType) => {
  return function WithRoleGuard(props: any) {
    const { user, isLoading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (isLoading) return;

      if (!user) {
        router.replace('/login');
      } else if (!allowedRoles.includes(user.role)) {
        router.replace(`/${user.role}/dashboard`);
      }
    }, [user, isLoading, router]);

    if (isLoading || !user || !allowedRoles.includes(user.role)) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
};

export default withRoleGuard;