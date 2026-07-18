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
  const { isLoggedIn, user } = useAuthStore();
  
  if (!isLoggedIn) {
    return <Outlet />;
  }

  const roleRoutes: Partial<Record<UserRole, string>> = {
    USER: '/dashboard/user',
    NGO: '/dashboard/ngo',
    REPAIR_PARTNER: '/dashboard/repair',
    RECYCLER: '/dashboard/recycler',
    SELLER: '/dashboard/seller',
    ENTERPRISE: '/dashboard/enterprise',
    GOVERNMENT: '/dashboard/government',
    ADMIN: '/dashboard/admin',
    SUPER_ADMIN: '/dashboard/admin'
  };
  const destination = user ? (roleRoutes[user.role] || '/dashboard/user') : '/dashboard/user';
  return <Navigate to={destination} replace />;
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
    // Redirect unauthorized profiles back to their designated role dashboard
    const roleRoutes: Partial<Record<UserRole, string>> = {
      USER: '/dashboard/user',
      NGO: '/dashboard/ngo',
      REPAIR_PARTNER: '/dashboard/repair',
      RECYCLER: '/dashboard/recycler',
      SELLER: '/dashboard/seller',
      ENTERPRISE: '/dashboard/enterprise',
      GOVERNMENT: '/dashboard/government',
      ADMIN: '/dashboard/admin',
      SUPER_ADMIN: '/dashboard/admin'
    };
    
    const fallbackRoute = user ? (roleRoutes[user.role] || '/dashboard/user') : '/dashboard/user';
    return <Navigate to={fallbackRoute} replace />;
  }

  return <Outlet />;
};

// 4. DashboardRedirect: Redirects any access to root /dashboard to the user's role-specific dashboard path
export const DashboardRedirect: React.FC = () => {
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const roleRoutes: Partial<Record<UserRole, string>> = {
    USER: '/dashboard/user',
    NGO: '/dashboard/ngo',
    REPAIR_PARTNER: '/dashboard/repair',
    RECYCLER: '/dashboard/recycler',
    SELLER: '/dashboard/seller',
    ENTERPRISE: '/dashboard/enterprise',
    GOVERNMENT: '/dashboard/government',
    ADMIN: '/dashboard/admin',
    SUPER_ADMIN: '/dashboard/admin'
  };

  const destination = user ? (roleRoutes[user.role] || '/dashboard/user') : '/dashboard/user';
  return <Navigate to={destination} replace />;
};
