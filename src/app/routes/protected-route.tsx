import { Navigate } from 'react-router';
import { useAuth } from '@app/providers/auth/use-auth';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
