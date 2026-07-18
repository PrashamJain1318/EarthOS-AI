import * as React from 'react';
import { 
  Store, 
  Package, 
  ShoppingCart, 
  Users, 
  LineChart, 
  DollarSign, 
  CreditCard,
  Settings as SettingsIcon,
  LayoutDashboard
} from 'lucide-react';
import { PortalLayoutTemplate } from '../components/layout/PortalLayoutTemplate';

export const SellerLayout: React.FC = () => {
  const menuItems = [
    { label: 'Dashboard', href: '/dashboard/seller', icon: <LayoutDashboard size={18} /> },
    { label: 'Products', href: '/dashboard/seller/products', icon: <Package size={18} /> },
    { label: 'Orders', href: '/dashboard/seller/orders', icon: <ShoppingCart size={18} /> },
    { label: 'Customers', href: '/dashboard/seller/customers', icon: <Users size={18} /> },
    { label: 'Analytics', href: '/dashboard/seller/analytics', icon: <LineChart size={18} /> },
    { label: 'Revenue', href: '/dashboard/seller/revenue', icon: <DollarSign size={18} /> },
    { label: 'Payouts', href: '/dashboard/seller/payouts', icon: <CreditCard size={18} /> },
    { label: 'Settings', href: '/dashboard/seller/settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <PortalLayoutTemplate
      menuItems={menuItems}
      orgName="SELLER PORTAL"
      headerTitle="MARKETPLACE SELLER CONSOLE"
      logoIcon={<Store size={24} className="text-indigo-500" />}
      themeColorClassName="bg-indigo-50/5 dark:bg-[#0B1220]"
    />
  );
};
