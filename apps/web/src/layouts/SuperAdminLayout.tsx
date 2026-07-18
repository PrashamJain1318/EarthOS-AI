import * as React from 'react';
import { 
  ShieldAlert, 
  Database,
  Terminal,
  Activity,
  Server,
  Settings as SettingsIcon,
  LayoutDashboard
} from 'lucide-react';
import { PortalLayoutTemplate } from '../components/layout/PortalLayoutTemplate';

export const SuperAdminLayout: React.FC = () => {
  const menuItems = [
    { label: 'God Mode Dashboard', href: '/dashboard/superadmin', icon: <LayoutDashboard size={18} /> },
    { label: 'System Telemetry', href: '/dashboard/superadmin/telemetry', icon: <Activity size={18} /> },
    { label: 'Database Logs', href: '/dashboard/superadmin/logs', icon: <Database size={18} /> },
    { label: 'API Console', href: '/dashboard/superadmin/api', icon: <Terminal size={18} /> },
    { label: 'Server Fleet', href: '/dashboard/superadmin/servers', icon: <Server size={18} /> },
    { label: 'Global Configurations', href: '/dashboard/superadmin/settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <PortalLayoutTemplate
      menuItems={menuItems}
      orgName="SUPER ADMIN"
      headerTitle="EARTHOS OVERLORD / SYSTEM CORE"
      logoIcon={<ShieldAlert size={24} className="text-purple-600" />}
      themeColorClassName="bg-purple-50/5 dark:bg-[#0B1220]"
    />
  );
};
