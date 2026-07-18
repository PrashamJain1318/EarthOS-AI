import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, EosButton } from '@earthos/ui';
import {
  Globe,
  Leaf,
  Package,
  ShoppingBag,
  Wrench,
  Heart
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { DashboardWidget } from '../components/DashboardWidget';
import { RecentActivity } from '../components/RecentActivity';
import { ErrorBoundary } from '../components/ErrorBoundary';

const sparklineEarthScore = [{ value: 78 }, { value: 80 }, { value: 82 }, { value: 84 }, { value: 86 }, { value: 88 }];
const sparklineCarbonSaved = [{ value: 100 }, { value: 115 }, { value: 130 }, { value: 142 }];
const sparklineActiveObjects = [{ value: 20 }, { value: 22 }, { value: 26 }, { value: 34 }];
const sparklineMarketplace = [{ value: 5 }, { value: 8 }, { value: 12 }, { value: 15 }];
const sparklineRepairs = [{ value: 2 }, { value: 5 }, { value: 7 }, { value: 9 }];
const sparklineDonations = [{ value: 1 }, { value: 3 }, { value: 4 }, { value: 6 }];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-8 select-none">

        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="h3" className="font-bold tracking-tight">Command Center</Typography>
            <Typography variant="small" className="text-gray-400">
              Welcome back, {user?.name || 'Operator'}. Your circular resource grid overview.
            </Typography>
          </div>
          <EosButton
            variant="secondary"
            size="sm"
            className="border border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500/10 font-bold"
            onClick={handleLogout}
          >
            Log Out
          </EosButton>
        </div>

        {/* KPI Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardWidget
            title="Earth Score"
            value={88}
            unit="/100"
            icon={<Globe size={20} className="text-[#2E7D32]" />}
            trend={4.2}
            tooltipText="Overall index scoring environmental health metrics across active objects."
            sparklineData={sparklineEarthScore}
          />
          <DashboardWidget
            title="Carbon Saved"
            value={142.5}
            unit="Tons"
            icon={<Leaf size={20} className="text-[#2E7D32]" />}
            trend={12.8}
            tooltipText="Total carbon dioxide equivalent diverted from atmosphere via circular matching."
            sparklineData={sparklineCarbonSaved}
          />
          <DashboardWidget
            title="Owned Objects"
            value={34}
            icon={<Package size={20} className="text-blue-500" />}
            trend={8.5}
            tooltipText="Number of registered resource objects currently tracked in your circular grid."
            sparklineData={sparklineActiveObjects}
          />
          <DashboardWidget
            title="Marketplace Activity"
            value={15}
            icon={<ShoppingBag size={20} className="text-[#FFA726]" />}
            trend={22.0}
            tooltipText="Circular marketplace transactions completed this month."
            sparklineData={sparklineMarketplace}
          />
          <DashboardWidget
            title="Repair Count"
            value={9}
            icon={<Wrench size={20} className="text-gray-500" />}
            trend={-2.1}
            tooltipText="Hardware restoration and longevity extension tasks completed."
            sparklineData={sparklineRepairs}
          />
          <DashboardWidget
            title="Donation Impact"
            value={6}
            icon={<Heart size={20} className="text-red-500" />}
            trend={50.0}
            tooltipText="Carbon credit donations and NGO offset grants dispatched."
            sparklineData={sparklineDonations}
          />
        </div>

        {/* Recent Activity Timeline */}
        <RecentActivity />

      </div>
    </ErrorBoundary>
  );
};
export default Dashboard;
