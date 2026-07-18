import * as React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar } from '@earthos/ui';
import { Recycle, Factory, Truck, Activity } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export const RecyclerLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { label: 'Overview', href: '/dashboard/recycler', icon: <Activity size={18} /> },
    { label: 'Sorting Lines', href: '/dashboard/recycler/sorting', icon: <Factory size={18} /> },
    { label: 'Material Yield', href: '/dashboard/recycler/yield', icon: <Recycle size={18} /> },
    { label: 'Logistics', href: '/dashboard/recycler/logistics', icon: <Truck size={18} /> }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-cyan-50/5 dark:bg-[#0B1220]">
      <EosSidebar
        items={menuItems}
        activeHref={location.pathname}
        onItemClick={(href) => navigate(href)}
        onLogoutClick={() => {
          logout();
          navigate('/');
        }}
        orgName="RECYCLER PORTAL"
        logoIcon={<Recycle size={24} className="text-cyan-500" />}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-cyan-500/10 flex items-center justify-between px-8 bg-white/50 dark:bg-[#162033]/20 backdrop-blur-md">
          <span className="font-semibold text-sm text-cyan-600 dark:text-cyan-400">
            SECURE RECYCLER CONSOLE
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
