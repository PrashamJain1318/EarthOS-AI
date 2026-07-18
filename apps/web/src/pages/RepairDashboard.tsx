import React from 'react';
import { Typography } from '@earthos/ui';
import {
  Wrench,
  CheckCircle,
  DollarSign,
  Star,
  MessageSquare
} from 'lucide-react';
import { DashboardWidget } from '../components/DashboardWidget';
import { RecentActivity } from '../components/RecentActivity';
import { ErrorBoundary } from '../components/ErrorBoundary';

const sparklinePending = [{ value: 10 }, { value: 12 }, { value: 15 }, { value: 24 }];
const sparklineCompleted = [{ value: 40 }, { value: 45 }, { value: 52 }, { value: 65 }];
const sparklineRevenue = [{ value: 2000 }, { value: 2500 }, { value: 2200 }, { value: 3100 }];
const sparklineRatings = [{ value: 4.2 }, { value: 4.5 }, { value: 4.7 }, { value: 4.8 }];
const sparklineFeedback = [{ value: 5 }, { value: 8 }, { value: 12 }, { value: 18 }];

export const RepairDashboard: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-8 select-none">
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="h3" className="font-bold tracking-tight text-amber-500">Repair Dashboard</Typography>
            <Typography variant="small" className="text-gray-400">
              Manage incoming hardware repairs, track revenue, and monitor technician performance.
            </Typography>
          </div>
        </div>

        {/* KPI Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardWidget
            title="Pending Repairs"
            value={24}
            icon={<Wrench size={20} className="text-amber-500" />}
            trend={12.5}
            sparklineData={sparklinePending}
          />
          <DashboardWidget
            title="Completed Repairs"
            value={65}
            icon={<CheckCircle size={20} className="text-[#2E7D32]" />}
            trend={18.0}
            sparklineData={sparklineCompleted}
          />
          <DashboardWidget
            title="Revenue"
            value={3100}
            unit="$"
            icon={<DollarSign size={20} className="text-emerald-500" />}
            trend={22.4}
            sparklineData={sparklineRevenue}
          />
          <DashboardWidget
            title="Ratings"
            value={4.8}
            unit="/5"
            icon={<Star size={20} className="text-yellow-500" />}
            trend={2.1}
            sparklineData={sparklineRatings}
          />
          <DashboardWidget
            title="Customer Feedback"
            value={18}
            icon={<MessageSquare size={20} className="text-blue-500" />}
            trend={5.5}
            sparklineData={sparklineFeedback}
          />
        </div>

        {/* Recent Activity Timeline */}
        <RecentActivity />

      </div>
    </ErrorBoundary>
  );
};
export default RepairDashboard;
