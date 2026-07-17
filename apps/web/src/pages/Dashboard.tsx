import * as React from 'react';
import { EosCard, Typography, EosBadge } from '@earthos/ui';
import { Sparkles, TrendingUp, Wallet, Flame } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <div>
          <Typography variant="h3" className="font-bold">Command Center</Typography>
          <Typography variant="small" className="text-[#B0BEC5]">Real-time telemetry and resource lifecycle actions.</Typography>
        </div>
        <EosBadge variant="success">OS Active</EosBadge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EosCard variant="glass" className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
            <TrendingUp size={24} />
          </div>
          <div>
            <Typography variant="small">Earth Score</Typography>
            <Typography variant="h3" className="font-mono">88/100</Typography>
          </div>
        </EosCard>

        <EosCard variant="glass" className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#00BCD4]/10 text-[#00BCD4]">
            <Wallet size={24} />
          </div>
          <div>
            <Typography variant="small">Carbon Wallet</Typography>
            <Typography variant="h3" className="font-mono">142.50 Credits</Typography>
          </div>
        </EosCard>

        <EosCard variant="glass" className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
            <Flame size={24} />
          </div>
          <div>
            <Typography variant="small">Tons Abated</Typography>
            <Typography variant="h3" className="font-mono">4.8 Tons</Typography>
          </div>
        </EosCard>
      </div>

      {/* Active Recommendations Alert Widget */}
      <EosCard variant="default" className="border border-green-500/30 flex gap-4 p-6 bg-green-50/5 dark:bg-[#162033]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-16 w-16 bg-[#2E7D32]/10 rounded-bl-full" />
        <Sparkles className="text-[#2E7D32] shrink-0" size={32} />
        <div className="flex flex-col gap-2">
          <Typography variant="h4">Active Circular Match</Typography>
          <Typography variant="small" className="text-[#CBD5E1]">
            A nearby biotech manufacturer has requested your 4.2 TONS organic biomass byproduct. Shipping this stream abates 1.2 Tons CO2 and yields $840 credit revenue.
          </Typography>
        </div>
      </EosCard>

      {/* Placeholder grids for recent updates */}
      <div className="grid md:grid-cols-2 gap-6">
        <EosCard variant="default" className="flex flex-col gap-4">
          <Typography variant="h4">Recent Activity</Typography>
          <hr className="border-[#B0BEC5]/20 dark:border-[#263238]/30" />
          <ul className="flex flex-col gap-3 text-sm text-[#B0BEC5]">
            <li className="flex justify-between">
              <span>Matched aluminum scrap batch</span>
              <span className="font-semibold text-green-500">Completed</span>
            </li>
            <li className="flex justify-between">
              <span>Initiated laptop repair ticket</span>
              <span className="font-semibold text-yellow-500">Scheduled</span>
            </li>
            <li className="flex justify-between">
              <span>Registered spent solvent batch</span>
              <span className="font-semibold text-[#00BCD4]">Pending</span>
            </li>
          </ul>
        </EosCard>

        <EosCard variant="default" className="flex flex-col gap-4">
          <Typography variant="h4">System Telemetry</Typography>
          <hr className="border-[#B0BEC5]/20 dark:border-[#263238]/30" />
          <div className="h-28 flex items-center justify-center border border-dashed border-[#B0BEC5]/30 dark:border-[#263238]/30 rounded-xl text-xs text-[#B0BEC5]">
            Graph placeholder: Active Material Flow Velocity (60 FPS rendering ready)
          </div>
        </EosCard>
      </div>
    </div>
  );
};
export default Dashboard;
