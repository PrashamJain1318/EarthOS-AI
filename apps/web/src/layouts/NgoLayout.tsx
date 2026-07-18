import * as React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar } from '@earthos/ui';
import { 
  Heart, 
  PackageOpen, 
  Package,
  Users, 
  Gift,
  Truck,
  FileText,
  TrendingUp,
  Settings as SettingsIcon,
  LayoutDashboard
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export const NgoLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { label: 'Overview', href: '/dashboard/ngo', icon: <LayoutDashboard size={18} /> },
    { label: 'Donation Requests', href: '/dashboard/ngo/requests', icon: <PackageOpen size={18} /> },
    { label: 'Inventory', href: '/dashboard/ngo/inventory', icon: <Package size={18} /> },
    { label: 'Receivers', href: '/dashboard/ngo/receivers', icon: <Users size={18} /> },
    { label: 'Donors', href: '/dashboard/ngo/donors', icon: <Gift size={18} /> },
    { label: 'Deliveries', href: '/dashboard/ngo/deliveries', icon: <Truck size={18} /> },
    { label: 'Reports', href: '/dashboard/ngo/reports', icon: <FileText size={18} /> },
    { label: 'Impact', href: '/dashboard/ngo/impact', icon: <TrendingUp size={18} /> },
    { label: 'Settings', href: '/dashboard/ngo/settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-teal-50/5 dark:bg-[#0B1220]">
      <EosSidebar
        items={menuItems}
        activeHref={location.pathname}
        onItemClick={(href) => navigate(href)}
        onLogoutClick={() => {
          logout();
          navigate('/');
        }}
        orgName="NGO PORTAL"
        logoIcon={<Heart size={24} className="text-teal-500" />}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-teal-500/10 flex items-center justify-between px-8 bg-white/50 dark:bg-[#162033]/20 backdrop-blur-md">
          <span className="font-semibold text-sm text-teal-600 dark:text-teal-400">
            SECURE NGO HUB
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
