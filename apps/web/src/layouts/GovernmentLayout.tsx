import * as React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar } from '@earthos/ui';
import { 
  Landmark, 
  BarChart3, 
  FilePieChart, 
  FileSpreadsheet, 
  Flame, 
  Heart, 
  Recycle, 
  Shield, 
  Settings as SettingsIcon,
  LayoutDashboard
} from 'lucide-react';

import { useAuthStore } from '../stores/authStore';

export const GovernmentLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { label: 'Overview', href: '/dashboard/government', icon: <LayoutDashboard size={18} /> },
    { label: 'National Statistics', href: '/dashboard/government/stats', icon: <BarChart3 size={18} /> },
    { label: 'Waste Analytics', href: '/dashboard/government/waste', icon: <FilePieChart size={18} /> },
    { label: 'District Reports', href: '/dashboard/government/districts', icon: <FileSpreadsheet size={18} /> },
    { label: 'Carbon Reports', href: '/dashboard/government/carbon', icon: <Flame size={18} /> },
    { label: 'NGOs', href: '/dashboard/government/ngos', icon: <Heart size={18} /> },
    { label: 'Recycling Centers', href: '/dashboard/government/recyclers', icon: <Recycle size={18} /> },
    { label: 'Policies', href: '/dashboard/government/policies', icon: <Shield size={18} /> },
    { label: 'Settings', href: '/dashboard/government/settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-emerald-50/5 dark:bg-[#0B1220]">
      <EosSidebar
        items={menuItems}
        activeHref={location.pathname}
        onItemClick={(href) => navigate(href)}
        onLogoutClick={() => {
          logout();
          navigate('/');
        }}
        orgName="GOVERNMENT PORTAL"
        logoIcon={<Landmark size={24} className="text-emerald-500" />}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-emerald-500/10 flex items-center justify-between px-8 bg-white/50 dark:bg-[#162033]/20 backdrop-blur-md">
          <span className="font-semibold text-sm text-emerald-500">
            PUBLIC SECTOR CONSOLE / ZERO-WASTE TARGETS
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
