import * as React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar } from '@earthos/ui';
import { 
  Shield, 
  Users, 
  Package, 
  FileText, 
  ShoppingBag, 
  ShieldAlert, 
  Handshake, 
  LineChart, 
  Flame, 
  LifeBuoy, 
  Settings as SettingsIcon,
  LayoutDashboard
} from 'lucide-react';

import { useAuthStore } from '../stores/authStore';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { label: 'Overview', href: '/dashboard/admin', icon: <LayoutDashboard size={18} /> },
    { label: 'Users', href: '/dashboard/admin/users', icon: <Users size={18} /> },
    { label: 'Objects', href: '/dashboard/admin/objects', icon: <Package size={18} /> },
    { label: 'Reports', href: '/dashboard/admin/reports', icon: <FileText size={18} /> },
    { label: 'Marketplace', href: '/dashboard/admin/marketplace', icon: <ShoppingBag size={18} /> },
    { label: 'Moderation', href: '/dashboard/admin/moderation', icon: <ShieldAlert size={18} /> },
    { label: 'Partners', href: '/dashboard/admin/partners', icon: <Handshake size={18} /> },
    { label: 'Analytics', href: '/dashboard/admin/analytics', icon: <LineChart size={18} /> },
    { label: 'Carbon Statistics', href: '/dashboard/admin/carbon', icon: <Flame size={18} /> },
    { label: 'Support', href: '/dashboard/admin/support', icon: <LifeBuoy size={18} /> },
    { label: 'Settings', href: '/dashboard/admin/settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-red-50/5 dark:bg-[#0B1220]">
      <EosSidebar
        items={menuItems}
        activeHref={location.pathname}
        onItemClick={(href) => navigate(href)}
        onLogoutClick={() => {
          logout();
          navigate('/');
        }}
        orgName="ADMIN CONSOLE"
        logoIcon={<Shield size={24} className="text-red-500" />}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-red-500/10 flex items-center justify-between px-8 bg-white/50 dark:bg-[#162033]/20 backdrop-blur-md">
          <span className="font-semibold text-sm text-red-500">
            SYSTEM CONTROL LAYER / SECURE SESSION
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
