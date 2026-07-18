import * as React from 'react';
import { Typography, EosCard } from '@earthos/ui';

export const RepairDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">Repair Dashboard</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Manage repair tickets and diagnostics.</Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EosCard variant="glass" className="p-6 border-amber-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Active Tickets</Typography>
          <Typography variant="h4" className="text-amber-500 font-bold mt-2">24</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-amber-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Avg Turnaround</Typography>
          <Typography variant="h4" className="text-amber-500 font-bold mt-2">2.4 Days</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-amber-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Parts Inventory</Typography>
          <Typography variant="h4" className="text-amber-500 font-bold mt-2">Low</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-amber-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Success Rate</Typography>
          <Typography variant="h4" className="text-amber-500 font-bold mt-2">98.5%</Typography>
        </EosCard>
      </div>
    </div>
  );
};
export default RepairDashboard;
