import React from 'react';
import { Typography } from '@earthos/ui';
import {
  Users,
  Package,
  ArrowRightLeft,
  DollarSign,
  Trash2,
  Leaf,
  Activity,
  FileText
} from 'lucide-react';
import { DashboardWidget } from '../components/DashboardWidget';
import { RecentActivity } from '../components/RecentActivity';
import { ErrorBoundary } from '../components/ErrorBoundary';

const sparklineUsers = [{ value: 1200 }, { value: 1250 }, { value: 1300 }, { value: 1450 }];
const sparklineObjects = [{ value: 5000 }, { value: 5200 }, { value: 5500 }, { value: 5900 }];
const sparklineTransactions = [{ value: 300 }, { value: 350 }, { value: 400 }, { value: 450 }];
const sparklineRevenue = [{ value: 10000 }, { value: 12000 }, { value: 11500 }, { value: 13000 }];
const sparklineWaste = [{ value: 50 }, { value: 65 }, { value: 80 }, { value: 95 }];
const sparklineCarbon = [{ value: 100 }, { value: 120 }, { value: 150 }, { value: 180 }];
const sparklineHealth = [{ value: 99 }, { value: 99.5 }, { value: 99.9 }, { value: 100 }];
const sparklineReports = [{ value: 5 }, { value: 8 }, { value: 12 }, { value: 15 }];

export const AdminHome: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-8 select-none">

        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="h3" className="font-bold tracking-tight text-red-500">System Admin Panel</Typography>
            <Typography variant="small" className="text-gray-400">
              Global system status monitoring, user verification, and platform telemetry.
            </Typography>
          </div>
        </div>

        {/* KPI Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <DashboardWidget
            title="Total Users"
            value={1450}
            icon={<Users size={20} className="text-blue-500" />}
            trend={12.5}
            sparklineData={sparklineUsers}
          />
          <DashboardWidget
            title="Objects"
            value={5900}
            icon={<Package size={20} className="text-indigo-500" />}
            trend={8.2}
            sparklineData={sparklineObjects}
          />
          <DashboardWidget
            title="Transactions"
            value={450}
            icon={<ArrowRightLeft size={20} className="text-orange-500" />}
            trend={15.0}
            sparklineData={sparklineTransactions}
          />
          <DashboardWidget
            title="Revenue"
            value={13000}
            unit="$"
            icon={<DollarSign size={20} className="text-emerald-500" />}
            trend={18.5}
            sparklineData={sparklineRevenue}
          />
          <DashboardWidget
            title="Waste Prevented"
            value={95.2}
            unit="Tons"
            icon={<Trash2 size={20} className="text-[#2E7D32]" />}
            trend={22.4}
            sparklineData={sparklineWaste}
          />
          <DashboardWidget
            title="Carbon Saved"
            value={180.5}
            unit="Tons"
            icon={<Leaf size={20} className="text-[#2E7D32]" />}
            trend={25.0}
            sparklineData={sparklineCarbon}
          />
          <DashboardWidget
            title="System Health"
            value={99.9}
            unit="%"
            icon={<Activity size={20} className="text-teal-500" />}
            trend={0.1}
            sparklineData={sparklineHealth}
          />
          <DashboardWidget
            title="Recent Reports"
            value={15}
            icon={<FileText size={20} className="text-red-500" />}
            trend={42.0}
            sparklineData={sparklineReports}
          />
        </div>

        {/* Global Recent Activity */}
        <RecentActivity />

      </div>
    </ErrorBoundary>
  );
};
export default AdminHome;
