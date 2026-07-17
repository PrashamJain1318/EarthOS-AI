import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { UserRole } from '@earthos/types';

// 1. PrivateRoute: Enforces authenticated session to access paths
export const PrivateRoute: React.FC = () => {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

// 2. GuestRoute: Prevents logged in users from hitting auth routes (like /login or /signup)
export const GuestRoute: React.FC = () => {
  const { isLoggedIn } = useAuthStore();
  return !isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

// 3. RoleRoute: Enforces profile role criteria (e.g. USER, ENTERPRISE, GOVERNMENT, ADMIN)
interface RoleRouteProps {
  allowedRoles: UserRole[];
}

export const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles }) => {
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    // Redirect unauthorized profiles back to dashboard default center
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
