import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { UserRole } from '@earthos/types';
import { EosErrorPage } from '@earthos/ui';

export const roleRoutes: Record<UserRole, string> = {
  USER: '/portal/user/dashboard',
  NGO: '/portal/ngo/dashboard',
  REPAIR_PARTNER: '/portal/repair/dashboard',
  RECYCLER: '/portal/recycler/dashboard',
  SELLER: '/portal/seller/dashboard',
  ENTERPRISE: '/portal/enterprise/dashboard',
  GOVERNMENT: '/portal/government/dashboard',
  ADMIN: '/portal/admin/dashboard',
  SUPER_ADMIN: '/portal/super-admin/dashboard'
};

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

  const destination = user && roleRoutes[user.role] ? roleRoutes[user.role] : '/invalid-role';
  return <Navigate to={destination} replace />;
};

// 3. RoleRoute: Enforces profile role criteria (e.g. USER, ENTERPRISE, GOVERNMENT, ADMIN)
// Acts as a strict reusable RBAC middleware.
interface RoleRouteProps {
  allowedRoles: UserRole[];
}

export const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles }) => {
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1220] flex items-center justify-center">
        <EosErrorPage 
          statusCode={403} 
          title="Access Denied" 
          message={`Your current role (${user?.role || 'Guest'}) is not authorized to access this portal.`}
        />
      </div>
    );
  }

  return <Outlet />;
};

// 4. AppRedirect: Redirects any access to root /dashboard to the user's role-specific dashboard path
export const AppRedirect: React.FC = () => {
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const destination = user && roleRoutes[user.role] ? roleRoutes[user.role] : '/invalid-role';
  return <Navigate to={destination} replace />;
};
