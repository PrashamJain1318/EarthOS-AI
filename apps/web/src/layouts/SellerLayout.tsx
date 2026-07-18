import * as React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosSidebar } from '@earthos/ui';
import { ShoppingCart, Package, DollarSign, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export const SellerLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { label: 'Overview', href: '/dashboard/seller', icon: <TrendingUp size={18} /> },
    { label: 'Inventory', href: '/dashboard/seller/inventory', icon: <Package size={18} /> },
    { label: 'Orders', href: '/dashboard/seller/orders', icon: <ShoppingCart size={18} /> },
    { label: 'Payouts', href: '/dashboard/seller/payouts', icon: <DollarSign size={18} /> }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-indigo-50/5 dark:bg-[#0B1220]">
      <EosSidebar
        items={menuItems}
        activeHref={location.pathname}
        onItemClick={(href) => navigate(href)}
        onLogoutClick={() => {
          logout();
          navigate('/');
        }}
        orgName="MARKETPLACE SELLER"
        logoIcon={<ShoppingCart size={24} className="text-indigo-500" />}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-indigo-500/10 flex items-center justify-between px-8 bg-white/50 dark:bg-[#162033]/20 backdrop-blur-md">
          <span className="font-semibold text-sm text-indigo-600 dark:text-indigo-400">
            SECURE SELLER PORTAL
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
