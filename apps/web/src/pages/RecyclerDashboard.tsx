import React from 'react';
import { Typography } from '@earthos/ui';
import {
  Truck,
  Trash2,
  Box,
  Leaf,
  DollarSign
} from 'lucide-react';
import { DashboardWidget } from '../components/DashboardWidget';
import { RecentActivity } from '../components/RecentActivity';
import { ErrorBoundary } from '../components/ErrorBoundary';

const sparklinePickups = [{ value: 5 }, { value: 8 }, { value: 12 }, { value: 15 }];
const sparklineWaste = [{ value: 100 }, { value: 120 }, { value: 150 }, { value: 210 }];
const sparklineMaterials = [{ value: 80 }, { value: 95 }, { value: 110 }, { value: 145 }];
const sparklineCarbon = [{ value: 25 }, { value: 30 }, { value: 45 }, { value: 60 }];
const sparklineRevenue = [{ value: 4500 }, { value: 5200 }, { value: 5800 }, { value: 7200 }];

export const RecyclerDashboard: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-8 select-none">
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="h3" className="font-bold tracking-tight text-cyan-500">Recycler Dashboard</Typography>
            <Typography variant="small" className="text-gray-400">
              Manage material streams, pickup logistics, and processing revenue.
            </Typography>
          </div>
        </div>

        {/* KPI Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardWidget
            title="Pending Pickups"
            value={15}
            icon={<Truck size={20} className="text-cyan-500" />}
            trend={12.5}
            sparklineData={sparklinePickups}
          />
          <DashboardWidget
            title="Processed Waste"
            value={210}
            unit="Tons"
            icon={<Trash2 size={20} className="text-[#2E7D32]" />}
            trend={18.0}
            sparklineData={sparklineWaste}
          />
          <DashboardWidget
            title="Recycled Materials"
            value={145}
            unit="Tons"
            icon={<Box size={20} className="text-indigo-500" />}
            trend={22.4}
            sparklineData={sparklineMaterials}
          />
          <DashboardWidget
            title="Carbon Offset"
            value={60}
            unit="Tons"
            icon={<Leaf size={20} className="text-[#2E7D32]" />}
            trend={8.2}
            sparklineData={sparklineCarbon}
          />
          <DashboardWidget
            title="Revenue"
            value={7200}
            unit="$"
            icon={<DollarSign size={20} className="text-emerald-500" />}
            trend={15.5}
            sparklineData={sparklineRevenue}
          />
        </div>

        {/* Recent Activity Timeline */}
        <RecentActivity />

      </div>
    </ErrorBoundary>
  );
};
export default RecyclerDashboard;
