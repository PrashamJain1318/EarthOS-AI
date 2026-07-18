import * as React from 'react';
import { 
  Landmark, 
  Map, 
  MapPin, 
  HeartHandshake, 
  Trash2, 
  Leaf, 
  BookOpen, 
  ShieldCheck,
  Settings as SettingsIcon,
  LayoutDashboard
} from 'lucide-react';
import { PortalLayoutTemplate } from '../components/layout/PortalLayoutTemplate';

export const GovernmentLayout: React.FC = () => {
  const menuItems = [
    { label: 'National Dashboard', href: '/dashboard/government', icon: <LayoutDashboard size={18} /> },
    { label: 'States', href: '/dashboard/government/states', icon: <Map size={18} /> },
    { label: 'Districts', href: '/dashboard/government/districts', icon: <MapPin size={18} /> },
    { label: 'NGOs', href: '/dashboard/government/ngos', icon: <HeartHandshake size={18} /> },
    { label: 'Waste Analytics', href: '/dashboard/government/waste', icon: <Trash2 size={18} /> },
    { label: 'Carbon Reports', href: '/dashboard/government/carbon', icon: <Leaf size={18} /> },
    { label: 'Policies', href: '/dashboard/government/policies', icon: <BookOpen size={18} /> },
    { label: 'Compliance', href: '/dashboard/government/compliance', icon: <ShieldCheck size={18} /> },
    { label: 'Settings', href: '/dashboard/government/settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <PortalLayoutTemplate
      menuItems={menuItems}
      orgName="GOVERNMENT PORTAL"
      headerTitle="NATIONAL SUSTAINABILITY COMMAND CENTER"
      logoIcon={<Landmark size={24} className="text-emerald-500" />}
      themeColorClassName="bg-emerald-50/5 dark:bg-[#0B1220]"
    />
  );
};
