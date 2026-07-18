import * as React from 'react';
import { 
  Building2, 
  PackageSearch,
  Users,
  Network,
  LineChart,
  Trash2,
  ShieldCheck,
  Settings as SettingsIcon,
  LayoutDashboard
} from 'lucide-react';
import { PortalLayoutTemplate } from '../components/layout/PortalLayoutTemplate';

export const EnterpriseLayout: React.FC = () => {
  const menuItems = [
    { label: 'Dashboard', href: '/dashboard/enterprise', icon: <LayoutDashboard size={18} /> },
    { label: 'Assets', href: '/dashboard/enterprise/assets', icon: <PackageSearch size={18} /> },
    { label: 'Employees', href: '/dashboard/enterprise/employees', icon: <Users size={18} /> },
    { label: 'Departments', href: '/dashboard/enterprise/departments', icon: <Network size={18} /> },
    { label: 'Carbon Analytics', href: '/dashboard/enterprise/carbon', icon: <LineChart size={18} /> },
    { label: 'Waste Reports', href: '/dashboard/enterprise/waste', icon: <Trash2 size={18} /> },
    { label: 'Compliance', href: '/dashboard/enterprise/compliance', icon: <ShieldCheck size={18} /> },
    { label: 'Settings', href: '/dashboard/enterprise/settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <PortalLayoutTemplate
      menuItems={menuItems}
      orgName="ENTERPRISE PORTAL"
      headerTitle="CORPORATE ESG DASHBOARD"
      logoIcon={<Building2 size={24} className="text-blue-500" />}
      themeColorClassName="bg-blue-50/5 dark:bg-[#0B1220]"
    />
  );
};
