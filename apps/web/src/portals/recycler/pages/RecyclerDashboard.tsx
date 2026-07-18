import React from 'react';
import { Typography } from '@earthos/ui';
import { Recycle, Truck, Award, Leaf } from 'lucide-react';
import DashboardWidget from '../../../components/DashboardWidget';

export const RecyclerDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 max-w-7xl">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" className="font-display font-bold">
          Recycling Operations
        </Typography>
        <Typography variant="small" className="text-[#B0BEC5] font-medium">
          Manage waste processing and material recovery.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardWidget
          title="Pending Pickups"
          value={12}
          icon={<Truck size={20} />}
          trend={2}
          tooltipText="Material collection requests."
          sparklineData={[{ value: 8 }, { value: 10 }, { value: 14 }, { value: 12 }]}
        />
        <DashboardWidget
          title="Material Processed"
          value={8.5}
          unit="t"
          icon={<Recycle size={20} />}
          trend={15}
          tooltipText="Total tons of material broken down."
          sparklineData={[{ value: 5.0 }, { value: 6.2 }, { value: 7.5 }, { value: 8.5 }]}
        />
        <DashboardWidget
          title="Carbon Offset"
          value={1240}
          unit="kg"
          icon={<Leaf size={20} />}
          trend={18}
          tooltipText="Carbon emissions prevented via recovery."
          sparklineData={[{ value: 1000 }, { value: 1100 }, { value: 1150 }, { value: 1240 }]}
        />
        <DashboardWidget
          title="Certificates Issued"
          value={45}
          icon={<Award size={20} />}
          trend={5}
          tooltipText="Official recycling certificates given."
          sparklineData={[{ value: 30 }, { value: 35 }, { value: 40 }, { value: 45 }]}
        />
      </div>
    </div>
  );
};

export default RecyclerDashboard;
