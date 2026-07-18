import React from 'react';
import { Home, Scan, QrCode, Store, Wrench, Heart, Wallet, Bell, Globe, User as UserIcon, Settings as SettingsIcon } from 'lucide-react';
import { PortalLayoutTemplate } from '../components/layout/PortalLayoutTemplate';

export const UserLayout: React.FC = () => {
  const menuItems = [
    { label: 'Dashboard', href: '/dashboard/user', icon: <Home size={18} /> },
    { label: 'My Objects', href: '/dashboard/user/objects', icon: <Scan size={18} /> },
    { label: 'AI Scanner', href: '/dashboard/user/scanner', icon: <Scan size={18} /> },
    { label: 'Digital Passport', href: '/dashboard/user/passport', icon: <QrCode size={18} /> },
    { label: 'Marketplace', href: '/dashboard/user/marketplace', icon: <Store size={18} /> },
    { label: 'Repair', href: '/dashboard/user/repair', icon: <Wrench size={18} /> },
    { label: 'Donate', href: '/dashboard/user/donate', icon: <Heart size={18} /> },
    { label: 'Carbon Wallet', href: '/dashboard/user/wallet', icon: <Wallet size={18} /> },
    { label: 'Earth Score', href: '/dashboard/user/earthscore', icon: <Globe size={18} /> },
    { label: 'Notifications', href: '/dashboard/user/notifications', icon: <Bell size={18} /> },
    { label: 'Profile', href: '/dashboard/user/profile', icon: <UserIcon size={18} /> },
    { label: 'Settings', href: '/dashboard/user/settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <PortalLayoutTemplate
      menuItems={menuItems}
      orgName="USER PORTAL"
      headerTitle="USER PORTAL / PERSONAL DASHBOARD"
      themeColorClassName="bg-gradient-to-br from-white to-[#F8FAFC] dark:from-[#0B1220] dark:to-[#162033]/20"
      showNewEntryButton={true}
    />
  );
};
