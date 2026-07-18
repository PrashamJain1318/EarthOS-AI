import React, { Suspense, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar, EosInput, EosButton } from '@earthos/ui';
import { Search, Sun, Moon, Plus, Home, Box, ScanLine, FileCheck, ShoppingBag, Wrench, Heart, Leaf, Bell, User, Settings } from 'lucide-react';
import { useUiStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { NotificationDropdown } from '../../components/layout/NotificationDropdown';
import { PortalErrorBoundary } from '../../components/layout/PortalErrorBoundary';
import { PortalLoading } from '../../components/layout/PortalLoading';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';

const userMenuItems = [
  { label: 'Dashboard', href: '/portal/user/dashboard', icon: <Home size={18} /> },
  { label: 'My Objects', href: '/portal/user/my-objects', icon: <Box size={18} /> },
  { label: 'AI Scanner', href: '/portal/user/scanner', icon: <ScanLine size={18} /> },
  { label: 'Digital Passport', href: '/portal/user/passport', icon: <FileCheck size={18} /> },
  { label: 'Marketplace', href: '/portal/user/marketplace', icon: <ShoppingBag size={18} /> },
  { label: 'Repair', href: '/portal/user/repair', icon: <Wrench size={18} /> },
  { label: 'Donate', href: '/portal/user/donate', icon: <Heart size={18} /> },
  { label: 'Carbon Wallet', href: '/portal/user/wallet', icon: <Leaf size={18} /> },
  { label: 'Earth Score', href: '/portal/user/score', icon: <Leaf size={18} /> },
  { label: 'Notifications', href: '/portal/user/notifications', icon: <Bell size={18} /> },
  { label: 'Profile', href: '/portal/user/profile', icon: <User size={18} /> },
  { label: 'Settings', href: '/portal/user/settings', icon: <Settings size={18} /> },
];

export const UserLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, sidebarOpen } = useUiStore();
  const { user, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white to-[#F8FAFC] dark:from-[#0B1220] dark:to-[#162033]/20">
      {/* Isolated User Sidebar */}
      {sidebarOpen ? (
        <EosSidebar
          items={userMenuItems}
          activeHref={location.pathname}
          onItemClick={(href) => navigate(href)}
          onLogoutClick={() => {
            logout();
            navigate('/');
          }}
          orgName="EARTHOS USER"
        />
      ) : null}

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* User Navigation Header */}
        <header className="h-16 border-b border-[#B0BEC5]/30 dark:border-[#263238]/30 flex items-center justify-between px-8 bg-white/70 dark:bg-[#162033]/20 backdrop-blur-md z-20 shrink-0">
          
          <div className="flex items-center gap-6">
            <span className="font-display font-bold text-sm tracking-tight text-[#1F2937] dark:text-[#F8FAFC]">
              USER PORTAL
            </span>
            
            <div className="hidden md:flex items-center max-w-xs relative">
              <EosInput
                placeholder="Search user resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={16} />}
                className="py-1.5 px-3 bg-gray-50/50 dark:bg-black/10 text-xs rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <EosButton
              variant="primary"
              size="sm"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold"
              onClick={() => navigate('/portal/user/scanner')}
            >
              <Plus size={14} />
              <span className="hidden sm:inline">New Entry</span>
            </EosButton>

            <NotificationDropdown />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[#B0BEC5]/20 dark:border-[#263238]/30 bg-white/50 dark:bg-black/10 text-gray-500 hover:text-[#1F2937] dark:hover:text-[#F8FAFC] transition-colors"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <hr className="h-5 border-l border-[#B0BEC5]/20 dark:border-[#263238]/30" />

            {/* User Profile Badge */}
            <div className="flex items-center gap-2 select-none">
              <div className="h-8 w-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC]">{user?.name || 'User'}</span>
                <span className="text-[10px] text-gray-400 font-medium capitalize">{user?.role?.toLowerCase() || 'User'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* User Workspace Outlet */}
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

export default UserLayout;
