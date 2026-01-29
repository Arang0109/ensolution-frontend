import { Navigate } from 'react-router';
import { useAuth } from '@app/providers/auth/use-auth';

export const PublicRoute = ({ children }: {children: React.ReactNode}) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};