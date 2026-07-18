import React, { Suspense, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar, EosInput } from '@earthos/ui';
import { Search, Sun, Moon, Database, ShieldAlert, Activity, Settings, Users, Server, List } from 'lucide-react';
import { useUiStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { NotificationDropdown } from '../../components/layout/NotificationDropdown';
import { PortalErrorBoundary } from '../../components/layout/PortalErrorBoundary';
import { PortalLoading } from '../../components/layout/PortalLoading';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';

const superAdminMenuItems = [
  { label: 'God Mode Dashboard', href: '/portal/super-admin/dashboard', icon: <Activity size={18} /> },
  { label: 'Manage Users', href: '/portal/super-admin/users', icon: <Users size={18} /> },
  { label: 'Analytics', href: '/portal/super-admin/analytics', icon: <Activity size={18} /> },
  { label: 'System Logs', href: '/portal/super-admin/logs', icon: <List size={18} /> },
  { label: 'Security', href: '/portal/super-admin/security', icon: <ShieldAlert size={18} /> },
  { label: 'Database', href: '/portal/super-admin/database', icon: <Database size={18} /> },
  { label: 'Configuration', href: '/portal/super-admin/configuration', icon: <Settings size={18} /> },
  { label: 'Feature Flags', href: '/portal/super-admin/features', icon: <Server size={18} /> },
  { label: 'Audit Logs', href: '/portal/super-admin/audit', icon: <List size={18} /> },
];

export const SuperAdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, sidebarOpen } = useUiStore();
  const { user, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white to-[#F8FAFC] dark:from-[#0B1220] dark:to-[#162033]/20 border-x-4 border-red-600">
      {/* Isolated Super Admin Sidebar */}
      {sidebarOpen ? (
        <EosSidebar
          items={superAdminMenuItems}
          activeHref={location.pathname}
          onItemClick={(href) => navigate(href)}
          onLogoutClick={() => {
            logout();
            navigate('/');
          }}
          orgName="EARTHOS ROOT"
        />
      ) : null}

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Super Admin Navigation Header */}
        <header className="h-16 border-b border-[#B0BEC5]/30 dark:border-[#263238]/30 flex items-center justify-between px-8 bg-red-50/70 dark:bg-red-900/10 backdrop-blur-md z-20 shrink-0">
          
          <div className="flex items-center gap-6">
            <span className="font-display font-black text-sm tracking-widest text-red-700 dark:text-red-500 uppercase">
              Super Admin Console (God Mode)
            </span>
            
            <div className="hidden md:flex items-center max-w-xs relative">
              <EosInput
                placeholder="Search queries, flags, users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={16} />}
                className="py-1.5 px-3 bg-white/50 dark:bg-black/20 text-xs rounded-lg border-red-200 dark:border-red-900/30"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <NotificationDropdown />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[#B0BEC5]/20 dark:border-[#263238]/30 bg-white/50 dark:bg-black/10 text-gray-500 hover:text-[#1F2937] dark:hover:text-[#F8FAFC] transition-colors"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <hr className="h-5 border-l border-[#B0BEC5]/20 dark:border-[#263238]/30" />

            {/* Super Admin Profile Badge */}
            <div className="flex items-center gap-2 select-none">
              <div className="h-8 w-8 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(185,28,28,0.5)]">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'ROOT'}
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-red-700 dark:text-red-500">{user?.name || 'System Root'}</span>
                <span className="text-[10px] text-red-800 dark:text-red-400 font-black tracking-widest">SUPER_ADMIN</span>
              </div>
            </div>
          </div>
        </header>

        {/* Super Admin Workspace Outlet */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <Breadcrumbs />
          <PortalErrorBoundary>
            <Suspense fallback={<PortalLoading />}>
              <Outlet />
            </Suspense>
          </PortalErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
