import * as React from 'react';
import { 
  Shield, 
  Users, 
  Package, 
  FileText, 
  ShoppingBag, 
  Handshake, 
  Heart,
  LineChart, 
  Flame, 
  LifeBuoy, 
  Settings as SettingsIcon,
  LayoutDashboard
} from 'lucide-react';
import { PortalLayoutTemplate } from '../components/layout/PortalLayoutTemplate';

export const AdminLayout: React.FC = () => {
  const menuItems = [
    { label: 'Overview', href: '/dashboard/admin', icon: <LayoutDashboard size={18} /> },
    { label: 'Users', href: '/dashboard/admin/users', icon: <Users size={18} /> },
    { label: 'Inventory', href: '/dashboard/admin/inventory', icon: <Package size={18} /> },
    { label: 'Marketplace', href: '/dashboard/admin/marketplace', icon: <ShoppingBag size={18} /> },
    { label: 'Partners', href: '/dashboard/admin/partners', icon: <Handshake size={18} /> },
    { label: 'NGOs', href: '/dashboard/admin/ngos', icon: <Heart size={18} /> },
    { label: 'Reports', href: '/dashboard/admin/reports', icon: <FileText size={18} /> },
    { label: 'Analytics', href: '/dashboard/admin/analytics', icon: <LineChart size={18} /> },
    { label: 'Carbon Statistics', href: '/dashboard/admin/carbon', icon: <Flame size={18} /> },
    { label: 'Support', href: '/dashboard/admin/support', icon: <LifeBuoy size={18} /> },
    { label: 'Settings', href: '/dashboard/admin/settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <PortalLayoutTemplate
      menuItems={menuItems}
      orgName="ADMIN CONSOLE"
      headerTitle="SYSTEM CONTROL LAYER / SECURE SESSION"
      logoIcon={<Shield size={24} className="text-red-500" />}
      themeColorClassName="bg-red-50/5 dark:bg-[#0B1220]"
    />
  );
};
