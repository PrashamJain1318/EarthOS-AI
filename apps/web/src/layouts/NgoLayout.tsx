import * as React from 'react';
import { 
  Heart, 
  Package,
  Users, 
  Gift,
  Truck,
  FileText,
  Handshake,
  Settings as SettingsIcon,
  LayoutDashboard
} from 'lucide-react';
import { PortalLayoutTemplate } from '../components/layout/PortalLayoutTemplate';

export const NgoLayout: React.FC = () => {
  const menuItems = [
    { label: 'Overview', href: '/dashboard/ngo', icon: <LayoutDashboard size={18} /> },
    { label: 'Donations', href: '/dashboard/ngo/donations', icon: <Gift size={18} /> },
    { label: 'Receivers', href: '/dashboard/ngo/receivers', icon: <Users size={18} /> },
    { label: 'Inventory', href: '/dashboard/ngo/inventory', icon: <Package size={18} /> },
    { label: 'Distribution', href: '/dashboard/ngo/distribution', icon: <Heart size={18} /> },
    { label: 'Deliveries', href: '/dashboard/ngo/deliveries', icon: <Truck size={18} /> },
    { label: 'Impact Reports', href: '/dashboard/ngo/reports', icon: <FileText size={18} /> },
    { label: 'Partners', href: '/dashboard/ngo/partners', icon: <Handshake size={18} /> },
    { label: 'Settings', href: '/dashboard/ngo/settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <PortalLayoutTemplate
      menuItems={menuItems}
      orgName="NGO PORTAL"
      headerTitle="SECURE NGO HUB"
      logoIcon={<Heart size={24} className="text-teal-500" />}
      themeColorClassName="bg-teal-50/5 dark:bg-[#0B1220]"
    />
  );
};
