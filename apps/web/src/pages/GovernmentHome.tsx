import * as React from 'react';
import { Typography, EosCard } from '@earthos/ui';

export const GovernmentHome: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">Smart City Portal</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Regional resource heatmaps and municipal waste diversion trackers.</Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EosCard variant="glass" className="p-6 border-emerald-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">City Diversion Rate</Typography>
          <Typography variant="h4" className="text-emerald-500 font-bold mt-2">42%</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-emerald-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Tons Recycled (YTD)</Typography>
          <Typography variant="h4" className="text-emerald-500 font-bold mt-2">8,450</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-emerald-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Active Facilities</Typography>
          <Typography variant="h4" className="text-emerald-500 font-bold mt-2">12</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-emerald-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">E-Waste Target</Typography>
          <Typography variant="h4" className="text-emerald-500 font-bold mt-2">On Track</Typography>
        </EosCard>
      </div>
    </div>
  );
};
export default GovernmentHome;
