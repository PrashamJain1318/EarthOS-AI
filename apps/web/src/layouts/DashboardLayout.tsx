import * as React from 'react';
import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { EosSidebar, EosButton, EosCard, EosInput, Typography } from '@earthos/ui';
import { 
  LayoutDashboard, 
  Package, 
  ScanLine, 
  BookOpen, 
  ShoppingBag, 
  Wallet,
  Settings as SettingsIcon,
  Search,
  Sun,
  Moon,
  Plus,
  PanelRight,
  TrendingUp,
  Sparkles,
  AlertCircle,
  Wrench,
  Heart,
  Bell,
  User as UserIcon
} from 'lucide-react';
import { useUiStore } from '../stores/uiStore';
import { useAuthStore } from '../stores/authStore';
import { NotificationDropdown } from '../components/layout/NotificationDropdown';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, sidebarOpen } = useUiStore();
  const { user, logout } = useAuthStore();
  const [insightsOpen, setInsightsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard/user', icon: <LayoutDashboard size={18} /> },
    { label: 'My Objects', href: '/dashboard/user/objects', icon: <Package size={18} /> },
    { label: 'AI Scanner', href: '/dashboard/user/scanner', icon: <ScanLine size={18} /> },
    { label: 'Digital Passport', href: '/dashboard/user/passport', icon: <BookOpen size={18} /> },
    { label: 'Marketplace', href: '/dashboard/user/marketplace', icon: <ShoppingBag size={18} /> },
    { label: 'Repair', href: '/dashboard/user/repair', icon: <Wrench size={18} /> },
    { label: 'Donate', href: '/dashboard/user/donate', icon: <Heart size={18} /> },
    { label: 'Carbon Wallet', href: '/dashboard/user/wallet', icon: <Wallet size={18} /> },
    { label: 'Notifications', href: '/dashboard/user/notifications', icon: <Bell size={18} /> },
    { label: 'Profile', href: '/dashboard/user/profile', icon: <UserIcon size={18} /> },
    { label: 'Settings', href: '/dashboard/user/settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white to-[#F8FAFC] dark:from-[#0B1220] dark:to-[#162033]/20">
      
      {/* Left Sidebar Navigation */}
      {sidebarOpen ? (
        <EosSidebar
          items={menuItems}
          activeHref={location.pathname}
          onItemClick={(href) => navigate(href)}
          onLogoutClick={() => {
            logout();
            navigate('/');
          }}
        />
      ) : null}

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Premium Top Navigation header bar */}
        <header className="h-16 border-b border-[#B0BEC5]/30 dark:border-[#263238]/30 flex items-center justify-between px-8 bg-white/70 dark:bg-[#162033]/20 backdrop-blur-md z-20 shrink-0">
          
          {/* Left panel location tracker */}
          <div className="flex items-center gap-6">
            <span className="font-display font-bold text-sm tracking-tight text-[#1F2937] dark:text-[#F8FAFC]">
              {location.pathname.substring(1).toUpperCase() || 'DASHBOARD'}
            </span>
            
            {/* Global Search Bar */}
            <div className="hidden md:flex items-center max-w-xs relative">
              <EosInput
                placeholder="Search resources, passport IDs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={16} />}
                className="py-1.5 px-3 bg-gray-50/50 dark:bg-black/10 text-xs rounded-lg"
              />
            </div>
          </div>

          {/* Right panel session controls */}
          <div className="flex items-center gap-4">
            
            {/* Quick action trigger button */}
            <EosButton
              variant="primary"
              size="sm"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold"
              onClick={() => navigate('/scanner')}
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Register Stream</span>
            </EosButton>

            {/* Notifications Alert center */}
            <NotificationDropdown />

            {/* Theme Toggle Trigger */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[#B0BEC5]/20 dark:border-[#263238]/30 bg-white/50 dark:bg-black/10 text-gray-500 hover:text-[#1F2937] dark:hover:text-[#F8FAFC] transition-colors"
              aria-label="Toggle theme settings"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Insights Panel Toggle */}
            <button
              onClick={() => setInsightsOpen(!insightsOpen)}
              className={`p-2 rounded-lg border border-[#B0BEC5]/20 dark:border-[#263238]/30 transition-colors ${
                insightsOpen ? 'bg-[#2E7D32]/10 border-[#2E7D32]/30 text-[#2E7D32]' : 'bg-white/50 dark:bg-black/10 text-gray-500'
              }`}
              aria-label="Toggle insights panel"
            >
              <PanelRight size={18} />
            </button>

            <hr className="h-5 border-l border-[#B0BEC5]/20 dark:border-[#263238]/30" />

            {/* User Profile Badge */}
            <div className="flex items-center gap-2 select-none">
              <div className="h-8 w-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC]">{user?.name || 'Arthur Dent'}</span>
                <span className="text-[10px] text-gray-400 font-medium capitalize">{user?.role?.toLowerCase() || 'User'}</span>
              </div>
            </div>

          </div>
        </header>

        {/* Workspace Outlet + Right Panel Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Main Content Workspace */}
          <main className="flex-1 overflow-y-auto p-8 z-10">
            <Outlet />
          </main>

          {/* Right Insights Panel (Framer Motion Drawer) */}
          <AnimatePresence>
            {insightsOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="border-l border-[#B0BEC5]/30 dark:border-[#263238]/30 bg-white/40 dark:bg-[#162033]/20 backdrop-blur-md flex flex-col gap-6 p-6 overflow-y-auto shrink-0 z-10"
              >
                <div>
                  <Typography variant="h4" className="font-display font-bold">Insights Hub</Typography>
                  <Typography variant="small" className="text-gray-400">Resource telemetry streams.</Typography>
                </div>

                {/* Carbon balance card */}
                <EosCard variant="glass" className="p-4 border-[#2E7D32]/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#2E7D32]/10 text-[#2E7D32]">
                      <Wallet size={18} />
                    </div>
                    <div>
                      <Typography variant="small" className="text-xs">Carbon Balance</Typography>
                      <Typography variant="h3" className="font-mono text-lg font-bold">142.50 Credits</Typography>
                    </div>
                  </div>
                </EosCard>

                {/* Active telemetry alerts logs */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#1F2937] dark:text-[#CBD5E1]">
                    System Telemetry
                  </span>
                  
                  <EosCard variant="default" className="p-4 border-yellow-500/20 bg-yellow-500/5 flex gap-3">
                    <AlertCircle size={18} className="text-yellow-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC]">Device Repair Overdue</span>
                      <Typography variant="small" className="text-[10px] text-gray-500 leading-normal">
                        Verify the hardware repair status voucher to unlock passport origin.
                      </Typography>
                    </div>
                  </EosCard>

                  <EosCard variant="default" className="p-4 border-green-500/20 bg-green-500/5 flex gap-3">
                    <Sparkles size={18} className="text-green-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1F2937] dark:text-[#F8FAFC]">Carbon abated!</span>
                      <Typography variant="small" className="text-[10px] text-gray-500 leading-normal">
                        Aluminium stream match abated 1.2 Tons CO2.
                      </Typography>
                    </div>
                  </EosCard>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;
