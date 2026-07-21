import React, { Suspense, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar, EosInput, EosButton } from '@earthos/ui';
import { Search, Sun, Moon, Plus } from 'lucide-react';
import { useUiStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { NotificationDropdown } from './NotificationDropdown';
import { PortalErrorBoundary } from './PortalErrorBoundary';
import { PortalLoading } from './PortalLoading';
import { Breadcrumbs } from './Breadcrumbs';

interface PortalLayoutTemplateProps {
  menuItems: Array<{ label: string; href: string; icon: React.ReactNode }>;
  orgName?: string;
  logoIcon?: React.ReactNode;
  themeColorClassName?: string;
  headerTitle?: string;
  showNewEntryButton?: boolean;
}

export const PortalLayoutTemplate: React.FC<PortalLayoutTemplateProps> = ({
  menuItems,
  orgName = 'EARTHOS',
  logoIcon,
  themeColorClassName = 'bg-gradient-to-br from-white to-[#F8FAFC] dark:from-[#0B1220] dark:to-[#162033]/20',
  headerTitle = 'PORTAL CONSOLE',
  showNewEntryButton = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, sidebarOpen } = useUiStore();
  const { user, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`flex h-screen overflow-hidden ${themeColorClassName}`}>
      {/* Left Sidebar Navigation */}
      {sidebarOpen ? (
        <EosSidebar
          items={menuItems}
          activeHref={location.pathname}
          onItemClick={(href) => navigate(href)}
          onLogoutClick={() => {
            logout();
            navigate('/');
          }}
          orgName={orgName}
          logoIcon={logoIcon}
        />
      ) : null}

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Premium Top Navigation header bar */}
        <header className="h-16 border-b border-[#B0BEC5]/30 dark:border-[#263238]/30 flex items-center justify-between px-8 bg-white/70 dark:bg-[#162033]/20 backdrop-blur-md z-20 shrink-0">
          
          {/* Left panel location tracker */}
          <div className="flex items-center gap-6">
            <span className="font-display font-bold text-sm tracking-tight text-[#1F2937] dark:text-[#F8FAFC]">
              {headerTitle}
            </span>
            
            {/* Global Search Bar */}
            <div className="hidden md:flex items-center max-w-xs relative">
              <EosInput
                placeholder="Search resources, passport IDs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={16} />}
                className="py-1.5 px-3 bg-gray-50/50 dark:bg-black/10 text-xs rounded-lg"
              />
            </div>
          </div>

          {/* Right panel session controls */}
          <div className="flex items-center gap-4">
            
            {/* Quick action trigger button */}
            {showNewEntryButton && (
              <EosButton
                variant="primary"
                size="sm"
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold"
                onClick={() => navigate('/dashboard/user/scanner')}
              >
                <Plus size={14} />
                <span className="hidden sm:inline">New Entry</span>
              </EosButton>
            )}

            {/* Notifications Alert center */}
            <NotificationDropdown />

            {/* Theme Toggle Trigger */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[#B0BEC5]/20 dark:border-[#263238]/30 bg-white/50 dark:bg-black/10 text-gray-500 hover:text-[#1F2937] dark:hover:text-[#F8FAFC] transition-colors"
              aria-label="Toggle theme settings"
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
                <span className="text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC]">{user?.name || 'Arthur Dent'}</span>
                <span className="text-[10px] text-gray-400 font-medium">{user?.email || 'arthur@dent.com'}</span>
                <span className="text-[9px] uppercase tracking-wider text-[#B0BEC5] font-bold mt-0.5">{user?.role || 'USER'}</span>
              </div>
            </div>

          </div>
        </header>

        {/* Workspace Outlet + Right Panel Layout */}
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
