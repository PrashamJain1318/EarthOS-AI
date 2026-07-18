import React, { Suspense, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar, EosInput } from '@earthos/ui';
import { Search, Sun, Moon, Home, Truck, Recycle, Award, Leaf } from 'lucide-react';
import { useUiStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { NotificationDropdown } from '../../components/layout/NotificationDropdown';
import { PortalErrorBoundary } from '../../components/layout/PortalErrorBoundary';
import { PortalLoading } from '../../components/layout/PortalLoading';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';

const recyclerMenuItems = [
  { label: 'Recycler Dashboard', href: '/portal/recycler/dashboard', icon: <Home size={18} /> },
  { label: 'Pickup Requests', href: '/portal/recycler/pickups', icon: <Truck size={18} /> },
  { label: 'Processing', href: '/portal/recycler/processing', icon: <Recycle size={18} /> },
  { label: 'Certificates', href: '/portal/recycler/certificates', icon: <Award size={18} /> },
  { label: 'Carbon Reports', href: '/portal/recycler/carbon', icon: <Leaf size={18} /> },
];

export const RecyclerLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, sidebarOpen } = useUiStore();
  const { user, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white to-[#F8FAFC] dark:from-[#0B1220] dark:to-[#162033]/20">
      {/* Isolated Recycler Sidebar */}
      {sidebarOpen ? (
        <EosSidebar
          items={recyclerMenuItems}
          activeHref={location.pathname}
          onItemClick={(href) => navigate(href)}
          onLogoutClick={() => {
            logout();
            navigate('/');
          }}
          orgName="EARTHOS RECYCLER"
        />
      ) : null}

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Recycler Navigation Header */}
        <header className="h-16 border-b border-[#B0BEC5]/30 dark:border-[#263238]/30 flex items-center justify-between px-8 bg-white/70 dark:bg-[#162033]/20 backdrop-blur-md z-20 shrink-0">
          
          <div className="flex items-center gap-6">
            <span className="font-display font-bold text-sm tracking-tight text-[#2E7D32] dark:text-[#81C784]">
              RECYCLING FACILITY
            </span>
            
            <div className="hidden md:flex items-center max-w-xs relative">
              <EosInput
                placeholder="Search pickups, batches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={16} />}
                className="py-1.5 px-3 bg-gray-50/50 dark:bg-black/10 text-xs rounded-lg"
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

            {/* Recycler Profile Badge */}
            <div className="flex items-center gap-2 select-none">
              <div className="h-8 w-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'R'}
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC]">{user?.name || 'Recycling Plant'}</span>
                <span className="text-[10px] text-[#2E7D32] font-bold uppercase">{user?.role || 'Recycler'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Recycler Workspace Outlet */}
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

export default RecyclerLayout;
