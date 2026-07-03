import { Navigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate replace state={{ tab: 'login' }} to="/auth" />;
  }

  return <>{children}</>;
}
