import React from 'react';
import { Typography } from '@earthos/ui';
import { Server, Activity, ShieldAlert, Database } from 'lucide-react';
import DashboardWidget from '../../../components/DashboardWidget';

export const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 max-w-7xl">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" className="font-display font-black text-red-700 dark:text-red-500 uppercase tracking-wide">
          SYSTEM TELEMETRY
        </Typography>
        <Typography variant="small" className="text-red-900/60 dark:text-red-200/50 font-bold uppercase tracking-widest">
          Warning: Unrestricted God Mode Access
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardWidget
          title="Cluster Nodes"
          value={12}
          icon={<Server size={20} />}
          trend={0}
          tooltipText="Active Kubernetes instances."
          sparklineData={[{ value: 12 }, { value: 12 }, { value: 12 }, { value: 12 }]}
        />
        <DashboardWidget
          title="API Requests"
          value={1.2}
          unit="M/s"
          icon={<Activity size={20} />}
          trend={15}
          tooltipText="Global API throughput."
          sparklineData={[{ value: 0.8 }, { value: 0.9 }, { value: 1.1 }, { value: 1.2 }]}
        />
        <DashboardWidget
          title="Security Flags"
          value={3}
          icon={<ShieldAlert size={20} />}
          trend={-2}
          tooltipText="Suspicious payload activities."
          sparklineData={[{ value: 5 }, { value: 4 }, { value: 4 }, { value: 3 }]}
        />
        <DashboardWidget
          title="DB Latency"
          value={12}
          unit="ms"
          icon={<Database size={20} />}
          trend={-1}
          tooltipText="Average database read/write latency."
          sparklineData={[{ value: 14 }, { value: 13 }, { value: 15 }, { value: 12 }]}
        />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
