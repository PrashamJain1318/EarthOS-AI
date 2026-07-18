import React from 'react';
import { Typography } from '@earthos/ui';
import {
  Heart,
  PackageOpen,
  Truck,
  Users,
  Star,
  Leaf
} from 'lucide-react';
import { DashboardWidget } from '../components/DashboardWidget';
import { RecentActivity } from '../components/RecentActivity';
import { ErrorBoundary } from '../components/ErrorBoundary';

const sparklineDonations = [{ value: 12 }, { value: 18 }, { value: 25 }, { value: 34 }];
const sparklineDeliveries = [{ value: 3 }, { value: 5 }, { value: 8 }, { value: 12 }];
const sparklineInventory = [{ value: 150 }, { value: 145 }, { value: 160 }, { value: 175 }];
const sparklinePeople = [{ value: 500 }, { value: 550 }, { value: 620 }, { value: 750 }];
const sparklineImpact = [{ value: 80 }, { value: 85 }, { value: 88 }, { value: 92 }];
const sparklineCarbon = [{ value: 20 }, { value: 25 }, { value: 32 }, { value: 45 }];

export const NgoDashboard: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-8 select-none">
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="h3" className="font-bold tracking-tight text-teal-600">NGO Dashboard</Typography>
            <Typography variant="small" className="text-gray-400">
              Manage incoming donations, distributions, and track your global impact.
            </Typography>
          </div>
        </div>

        {/* KPI Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardWidget
            title="Donation Requests"
            value={34}
            icon={<PackageOpen size={20} className="text-teal-500" />}
            trend={12.5}
            sparklineData={sparklineDonations}
          />
          <DashboardWidget
            title="Pending Deliveries"
            value={12}
            icon={<Truck size={20} className="text-amber-500" />}
            trend={-5.0}
            sparklineData={sparklineDeliveries}
          />
          <DashboardWidget
            title="Inventory"
            value={175}
            icon={<Heart size={20} className="text-red-500" />}
            trend={8.2}
            sparklineData={sparklineInventory}
          />
          <DashboardWidget
            title="People Helped"
            value={750}
            icon={<Users size={20} className="text-blue-500" />}
            trend={22.4}
            sparklineData={sparklinePeople}
          />
          <DashboardWidget
            title="Impact Score"
            value={92}
            unit="/100"
            icon={<Star size={20} className="text-purple-500" />}
            trend={4.5}
            sparklineData={sparklineImpact}
          />
          <DashboardWidget
            title="Carbon Saved"
            value={45}
            unit="Tons"
            icon={<Leaf size={20} className="text-[#2E7D32]" />}
            trend={18.0}
            sparklineData={sparklineCarbon}
          />
        </div>

        {/* Recent Activity Timeline */}
        <RecentActivity />

      </div>
    </ErrorBoundary>
  );
};
export default NgoDashboard;
