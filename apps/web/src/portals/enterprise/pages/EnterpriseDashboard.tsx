import React from 'react';
import { Typography } from '@earthos/ui';
import { Building2, Box, Leaf, Users } from 'lucide-react';
import DashboardWidget from '../../../components/DashboardWidget';

export const EnterpriseDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 max-w-7xl">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" className="font-display font-bold">
          Corporate Sustainability
        </Typography>
        <Typography variant="small" className="text-[#B0BEC5] font-medium">
          Track organization-wide ESG metrics and physical assets.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardWidget
          title="Total Assets"
          value={12450}
          icon={<Box size={20} />}
          trend={5}
          tooltipText="Physical items in corporate inventory."
          sparklineData={[{ value: 11000 }, { value: 11500 }, { value: 12000 }, { value: 12450 }]}
        />
        <DashboardWidget
          title="Carbon Quota Used"
          value={45}
          unit="%"
          icon={<Leaf size={20} />}
          trend={-2}
          tooltipText="Percentage of annual Scope 3 emissions quota used."
          sparklineData={[{ value: 40 }, { value: 42 }, { value: 43 }, { value: 45 }]}
        />
        <DashboardWidget
          title="Active Departments"
          value={24}
          icon={<Building2 size={20} />}
          trend={0}
          tooltipText="Registered business units."
          sparklineData={[{ value: 24 }, { value: 24 }, { value: 24 }, { value: 24 }]}
        />
        <DashboardWidget
          title="Engaged Employees"
          value={1280}
          icon={<Users size={20} />}
          trend={15}
          tooltipText="Employees actively participating in sustainability programs."
          sparklineData={[{ value: 1000 }, { value: 1100 }, { value: 1200 }, { value: 1280 }]}
        />
      </div>
    </div>
  );
};

export default EnterpriseDashboard;
