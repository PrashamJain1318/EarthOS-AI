import * as React from 'react';
import { 
  Wrench, 
  Users, 
  Package, 
  FileText, 
  HardHat, 
  LineChart, 
  Settings as SettingsIcon,
  LayoutDashboard
} from 'lucide-react';
import { PortalLayoutTemplate } from '../components/layout/PortalLayoutTemplate';

export const RepairLayout: React.FC = () => {
  const menuItems = [
    { label: 'Dashboard', href: '/dashboard/repair', icon: <LayoutDashboard size={18} /> },
    { label: 'Repair Jobs', href: '/dashboard/repair/jobs', icon: <Wrench size={18} /> },
    { label: 'Customers', href: '/dashboard/repair/customers', icon: <Users size={18} /> },
    { label: 'Inventory', href: '/dashboard/repair/inventory', icon: <Package size={18} /> },
    { label: 'Invoices', href: '/dashboard/repair/invoices', icon: <FileText size={18} /> },
    { label: 'Technicians', href: '/dashboard/repair/technicians', icon: <HardHat size={18} /> },
    { label: 'Analytics', href: '/dashboard/repair/analytics', icon: <LineChart size={18} /> },
    { label: 'Settings', href: '/dashboard/repair/settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <PortalLayoutTemplate
      menuItems={menuItems}
      orgName="REPAIR PORTAL"
      headerTitle="SECURE REPAIR CONSOLE"
      logoIcon={<Wrench size={24} className="text-amber-500" />}
      themeColorClassName="bg-amber-50/5 dark:bg-[#0B1220]"
    />
  );
};
