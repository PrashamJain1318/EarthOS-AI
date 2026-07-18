import React from 'react';
import { Typography } from '@earthos/ui';
import { HeartHandshake, Package, Globe, Truck } from 'lucide-react';
import DashboardWidget from '../../../components/DashboardWidget';

export const NgoDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 max-w-7xl">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" className="font-display font-bold">
          NGO Operations
        </Typography>
        <Typography variant="small" className="text-[#B0BEC5] font-medium">
          Manage hardware donations and distribution networks.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardWidget
          title="Pending Donations"
          value={342}
          icon={<HeartHandshake size={20} />}
          trend={15}
          tooltipText="Inbound material donations."
          sparklineData={[{ value: 300 }, { value: 320 }, { value: 335 }, { value: 342 }]}
        />
        <DashboardWidget
          title="Current Inventory"
          value={1205}
          icon={<Package size={20} />}
          trend={5}
          tooltipText="Items ready for deployment."
          sparklineData={[{ value: 1100 }, { value: 1150 }, { value: 1180 }, { value: 1205 }]}
        />
        <DashboardWidget
          title="People Impacted"
          value={8450}
          icon={<Globe size={20} />}
          trend={25}
          tooltipText="Total receivers helped this year."
          sparklineData={[{ value: 7000 }, { value: 7500 }, { value: 8000 }, { value: 8450 }]}
        />
        <DashboardWidget
          title="Active Deliveries"
          value={18}
          icon={<Truck size={20} />}
          trend={-2}
          tooltipText="Shipments currently in transit."
          sparklineData={[{ value: 25 }, { value: 22 }, { value: 20 }, { value: 18 }]}
        />
      </div>
    </div>
  );
};

export default NgoDashboard;
