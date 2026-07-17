import * as React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar } from '@earthos/ui';
import { Landmark, Map, FilePieChart } from 'lucide-react';

import { useAuthStore } from '../stores/authStore';

export const GovernmentLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { label: 'Smart City Map', href: '/government', icon: <Map size={18} /> },
    { label: 'Waste Metrics', href: '/government/metrics', icon: <FilePieChart size={18} /> }
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
