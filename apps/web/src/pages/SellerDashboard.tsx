import React from 'react';
import { Typography } from '@earthos/ui';
import {
  DollarSign,
  ShoppingCart,
  Users,
  LineChart,
  Package
} from 'lucide-react';
import { DashboardWidget } from '../components/DashboardWidget';
import { RecentActivity } from '../components/RecentActivity';
import { ErrorBoundary } from '../components/ErrorBoundary';

const sparklineSales = [{ value: 45 }, { value: 52 }, { value: 68 }, { value: 85 }];
const sparklineOrders = [{ value: 12 }, { value: 15 }, { value: 20 }, { value: 25 }];
const sparklineVisitors = [{ value: 500 }, { value: 650 }, { value: 800 }, { value: 1200 }];
const sparklineRevenue = [{ value: 3500 }, { value: 4200 }, { value: 5100 }, { value: 6800 }];
const sparklineShipments = [{ value: 3 }, { value: 5 }, { value: 4 }, { value: 8 }];

export const SellerDashboard: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-8 select-none">
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="h3" className="font-bold tracking-tight text-indigo-500">Seller Dashboard</Typography>
            <Typography variant="small" className="text-gray-400">
              Manage your circular marketplace storefront, track revenue, and fulfill orders.
            </Typography>
          </div>
        </div>

        {/* KPI Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardWidget
            title="Sales"
            value={85}
            icon={<LineChart size={20} className="text-indigo-500" />}
            trend={22.4}
            sparklineData={sparklineSales}
          />
          <DashboardWidget
            title="Orders"
            value={25}
            icon={<ShoppingCart size={20} className="text-blue-500" />}
            trend={18.0}
            sparklineData={sparklineOrders}
          />
          <DashboardWidget
            title="Visitors"
            value={1200}
            icon={<Users size={20} className="text-purple-500" />}
            trend={45.2}
            sparklineData={sparklineVisitors}
          />
          <DashboardWidget
            title="Revenue"
            value={6800}
            unit="$"
            icon={<DollarSign size={20} className="text-emerald-500" />}
            trend={32.5}
            sparklineData={sparklineRevenue}
          />
          <DashboardWidget
            title="Pending Shipments"
            value={8}
            icon={<Package size={20} className="text-amber-500" />}
            trend={12.5}
            sparklineData={sparklineShipments}
          />
        </div>

        {/* Recent Activity Timeline */}
        <RecentActivity />

      </div>
    </ErrorBoundary>
  );
};
export default SellerDashboard;
