import * as React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar } from '@earthos/ui';
import { Briefcase, BarChart3, Settings, ShieldCheck } from 'lucide-react';

export const EnterpriseLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Scope 3 Overview', href: '/enterprise', icon: <BarChart3 size={18} /> },
    { label: 'Material Streams', href: '/enterprise/streams', icon: <Briefcase size={18} /> },
    { label: 'Integration Settings', href: '/enterprise/settings', icon: <Settings size={18} /> }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/5 dark:bg-[#0B1220]">
      <EosSidebar
        items={menuItems}
        activeHref={location.pathname}
        onItemClick={(href) => navigate(href)}
        onLogoutClick={() => navigate('/')}
        orgName="ENTERPRISE HUB"
        logoIcon={<ShieldCheck size={24} className="text-blue-500" />}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-blue-500/10 flex items-center justify-between px-8 bg-white/50 dark:bg-[#162033]/20 backdrop-blur-md">
          <span className="font-semibold text-sm text-blue-500">
            ENTERPRISE CONSOLE / AUDIT COMPLIANT
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
