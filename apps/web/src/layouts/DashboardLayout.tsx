import * as React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar } from '@earthos/ui';
import { 
  LayoutDashboard, 
  Package, 
  ScanLine, 
  BookOpen, 
  ShoppingBag, 
  MessageSquare, 
  Globe2, 
  Users2 
} from 'lucide-react';
import { useUiStore } from '../stores/uiStore';
import { useAuthStore } from '../stores/authStore';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen } = useUiStore();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { label: 'Overview', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'My Objects', href: '/objects', icon: <Package size={18} /> },
    { label: 'AI Scanner', href: '/scanner', icon: <ScanLine size={18} /> },
    { label: 'Earth Passport', href: '/passport', icon: <BookOpen size={18} /> },
    { label: 'Marketplace', href: '/marketplace', icon: <ShoppingBag size={18} /> },
    { label: 'EarthGPT', href: '/earthgpt', icon: <MessageSquare size={18} /> },
    { label: 'Earth Twin', href: '/earth-twin', icon: <Globe2 size={18} /> },
    { label: 'Community', href: '/community', icon: <Users2 size={18} /> }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white to-[#F8FAFC] dark:from-[#0B1220] dark:to-[#162033]/20">
      {/* Sidebar Navigation */}
      {sidebarOpen ? (
        <EosSidebar
          items={menuItems}
          activeHref={location.pathname}
          onItemClick={(href) => navigate(href)}
          onLogoutClick={() => {
            logout();
            navigate('/');
          }}
        />
      ) : null}

      {/* Main Panel Viewport */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Panel */}
        <header className="h-16 border-b border-[#B0BEC5]/30 dark:border-[#263238]/30 flex items-center justify-between px-8 bg-white/50 dark:bg-[#162033]/20 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-sm text-[#1F2937] dark:text-[#F8FAFC]">
              Workspace / {location.pathname.substring(1).toUpperCase() || 'DASHBOARD'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* User Badge Info */}
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-xs select-none">
                U
              </div>
              <span className="text-xs font-semibold text-[#1F2937] dark:text-[#CBD5E1]">
                Individual Account
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Content Outlet */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
