import React from 'react';
import { Typography } from '@earthos/ui';
import { Leaf, Box, Heart, Wrench, RefreshCw, ShoppingBag } from 'lucide-react';
import DashboardWidget from '../../../components/DashboardWidget';
import RecentActivity from '../../../components/RecentActivity';
import { useInfiniteObjects } from '../../../hooks/useObjects';

export const UserDashboard: React.FC = () => {
  const { data: objectsData, isLoading, isError, refetch } = useInfiniteObjects({});
  const objectsCount = objectsData?.pages?.[0]?.pagination?.total || 0;

  return (
    <div className="flex flex-col gap-8 max-w-7xl">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" className="font-display font-bold">
          User Portal Overview
        </Typography>
        <Typography variant="small" className="text-[#B0BEC5] font-medium">
          Manage your personal resource passports and circular impact.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardWidget
          title="Earth Score"
          value={842}
          unit="pts"
          icon={<Leaf size={20} />}
          trend={12}
          tooltipText="Aggregate circular impact score."
          sparklineData={[{ value: 600 }, { value: 720 }, { value: 800 }, { value: 842 }]}
        />
        <DashboardWidget
          title="Owned Objects"
          value={objectsCount}
          icon={<Box size={20} />}
          trend={5}
          tooltipText="Total registered items in your portfolio."
          sparklineData={[{ value: 2 }, { value: 3 }, { value: 5 }, { value: 8 }]}
          isLoading={isLoading}
          isError={isError}
          onRetry={refetch}
        />
        <DashboardWidget
          title="Carbon Saved"
          value={124.5}
          unit="kg"
          icon={<RefreshCw size={20} />}
          trend={18}
          tooltipText="CO2 emissions prevented via circulation."
          sparklineData={[{ value: 50 }, { value: 80 }, { value: 110 }, { value: 124.5 }]}
        />
        <DashboardWidget
          title="Repair Count"
          value={3}
          icon={<Wrench size={20} />}
          trend={50}
          tooltipText="Number of items repaired instead of replaced."
          sparklineData={[{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }]}
        />
        <DashboardWidget
          title="Donation Impact"
          value={12}
          unit="people"
          icon={<Heart size={20} />}
          trend={20}
          tooltipText="People assisted through your donations."
          sparklineData={[{ value: 0 }, { value: 4 }, { value: 8 }, { value: 12 }]}
        />
        <DashboardWidget
          title="Marketplace Activity"
          value={4}
          unit="txs"
          icon={<ShoppingBag size={20} />}
          trend={10}
          tooltipText="Transactions completed."
          sparklineData={[{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }]}
        />
      </div>

      <div className="mt-4">
        <RecentActivity />
      </div>
    </div>
  );
};

export default UserDashboard;
