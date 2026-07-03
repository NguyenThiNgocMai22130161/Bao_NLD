import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

import { useAuth } from '@/contexts/AuthContext';

type AdminRouteProps = {
  children: ReactNode;
};

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate replace to="/auth" />;
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate replace to="/" />;
  }

  return <>{children}</>;
}
