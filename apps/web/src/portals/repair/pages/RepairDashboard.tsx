import React from 'react';
import { Typography } from '@earthos/ui';
import { Wrench, CheckCircle, DollarSign, Star } from 'lucide-react';
import DashboardWidget from '../../../components/DashboardWidget';

export const RepairDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 max-w-7xl">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" className="font-display font-bold">
          Repair Workshop
        </Typography>
        <Typography variant="small" className="text-[#B0BEC5] font-medium">
          Manage hardware repairs and technician schedules.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardWidget
          title="Pending Repairs"
          value={45}
          icon={<Wrench size={20} />}
          trend={10}
          tooltipText="Items awaiting diagnosis or repair."
          sparklineData={[{ value: 30 }, { value: 35 }, { value: 40 }, { value: 45 }]}
        />
        <DashboardWidget
          title="Completed Jobs"
          value={128}
          icon={<CheckCircle size={20} />}
          trend={20}
          tooltipText="Repairs finished this month."
          sparklineData={[{ value: 100 }, { value: 110 }, { value: 120 }, { value: 128 }]}
        />
        <DashboardWidget
          title="Monthly Revenue"
          value={8450}
          unit="$"
          icon={<DollarSign size={20} />}
          trend={15}
          tooltipText="Total revenue from repair services."
          sparklineData={[{ value: 7000 }, { value: 7500 }, { value: 8000 }, { value: 8450 }]}
        />
        <DashboardWidget
          title="Customer Rating"
          value={4.8}
          unit="/ 5"
          icon={<Star size={20} />}
          trend={2}
          tooltipText="Average post-repair satisfaction score."
          sparklineData={[{ value: 4.5 }, { value: 4.6 }, { value: 4.7 }, { value: 4.8 }]}
        />
      </div>
    </div>
  );
};

export default RepairDashboard;
