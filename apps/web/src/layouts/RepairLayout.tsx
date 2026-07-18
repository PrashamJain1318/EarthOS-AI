import * as React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar } from '@earthos/ui';
import { Wrench, Hammer, Settings2, BarChart } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export const RepairLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { label: 'Overview', href: '/dashboard/repair', icon: <BarChart size={18} /> },
    { label: 'Active Repairs', href: '/dashboard/repair/active', icon: <Wrench size={18} /> },
    { label: 'Parts Inventory', href: '/dashboard/repair/parts', icon: <Hammer size={18} /> },
    { label: 'Diagnostics', href: '/dashboard/repair/diagnostics', icon: <Settings2 size={18} /> }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-amber-50/5 dark:bg-[#0B1220]">
      <EosSidebar
        items={menuItems}
        activeHref={location.pathname}
        onItemClick={(href) => navigate(href)}
        onLogoutClick={() => {
          logout();
          navigate('/');
        }}
        orgName="REPAIR PORTAL"
        logoIcon={<Wrench size={24} className="text-amber-500" />}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-amber-500/10 flex items-center justify-between px-8 bg-white/50 dark:bg-[#162033]/20 backdrop-blur-md">
          <span className="font-semibold text-sm text-amber-600 dark:text-amber-400">
            SECURE REPAIR CONSOLE
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
