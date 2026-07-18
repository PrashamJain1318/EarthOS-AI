import React from 'react';
import { Typography } from '@earthos/ui';
import { Users, ShieldAlert, Activity, FileText } from 'lucide-react';
import DashboardWidget from '../../../components/DashboardWidget';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 max-w-7xl">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" className="font-display font-bold">
          System Administration
        </Typography>
        <Typography variant="small" className="text-[#B0BEC5] font-medium">
          Global platform overview and security controls.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardWidget
          title="Total Users"
          value={12450}
          icon={<Users size={20} />}
          trend={12}
          tooltipText="Active users on the platform."
          sparklineData={[{ value: 11000 }, { value: 11500 }, { value: 12000 }, { value: 12450 }]}
        />
        <DashboardWidget
          title="Moderation Queue"
          value={45}
          icon={<ShieldAlert size={20} />}
          trend={-5}
          tooltipText="Items pending manual review."
          sparklineData={[{ value: 60 }, { value: 55 }, { value: 50 }, { value: 45 }]}
        />
        <DashboardWidget
          title="System Load"
          value={32}
          unit="%"
          icon={<Activity size={20} />}
          trend={2}
          tooltipText="Average API node utilization."
          sparklineData={[{ value: 20 }, { value: 40 }, { value: 25 }, { value: 32 }]}
        />
        <DashboardWidget
          title="Daily Reports"
          value={128}
          icon={<FileText size={20} />}
          trend={8}
          tooltipText="Generated systemic compliance reports."
          sparklineData={[{ value: 100 }, { value: 110 }, { value: 120 }, { value: 128 }]}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
