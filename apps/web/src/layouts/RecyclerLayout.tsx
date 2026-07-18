import * as React from 'react';
import { 
  Recycle, 
  Truck, 
  Box, 
  Settings2, 
  FileText, 
  Award, 
  LineChart, 
  Settings as SettingsIcon,
  LayoutDashboard
} from 'lucide-react';
import { PortalLayoutTemplate } from '../components/layout/PortalLayoutTemplate';

export const RecyclerLayout: React.FC = () => {
  const menuItems = [
    { label: 'Dashboard', href: '/dashboard/recycler', icon: <LayoutDashboard size={18} /> },
    { label: 'Pickup Requests', href: '/dashboard/recycler/pickups', icon: <Truck size={18} /> },
    { label: 'Materials', href: '/dashboard/recycler/materials', icon: <Box size={18} /> },
    { label: 'Processing', href: '/dashboard/recycler/processing', icon: <Settings2 size={18} /> },
    { label: 'Carbon Reports', href: '/dashboard/recycler/carbon', icon: <FileText size={18} /> },
    { label: 'Certificates', href: '/dashboard/recycler/certificates', icon: <Award size={18} /> },
    { label: 'Analytics', href: '/dashboard/recycler/analytics', icon: <LineChart size={18} /> },
    { label: 'Settings', href: '/dashboard/recycler/settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <PortalLayoutTemplate
      menuItems={menuItems}
      orgName="RECYCLER PORTAL"
      headerTitle="SECURE RECYCLER HUB"
      logoIcon={<Recycle size={24} className="text-cyan-500" />}
      themeColorClassName="bg-cyan-50/5 dark:bg-[#0B1220]"
    />
  );
};
