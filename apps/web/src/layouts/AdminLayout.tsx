import * as React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar } from '@earthos/ui';
import { Shield, Users, AlertTriangle, FileSpreadsheet } from 'lucide-react';

import { useAuthStore } from '../stores/authStore';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { label: 'Users DB', href: '/admin', icon: <Users size={18} /> },
    { label: 'System Logs', href: '/admin/logs', icon: <FileSpreadsheet size={18} /> },
    { label: 'Flagged Tickets', href: '/admin/flags', icon: <AlertTriangle size={18} /> }
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
