import * as React from 'react';
import { Typography, EosCard } from '@earthos/ui';

export const NgoDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">NGO Dashboard</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Manage donations, volunteers, and campaigns.</Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EosCard variant="glass" className="p-6 border-teal-500/20">
          <Typography variant="h4" className="text-teal-600 font-bold">120</Typography>
          <Typography variant="small" className="text-[#1F2937] dark:text-[#F8FAFC]">Active Volunteers</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-teal-500/20">
          <Typography variant="h4" className="text-teal-600 font-bold">45</Typography>
          <Typography variant="small" className="text-[#1F2937] dark:text-[#F8FAFC]">Incoming Donations</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-teal-500/20">
          <Typography variant="h4" className="text-teal-600 font-bold">3</Typography>
          <Typography variant="small" className="text-[#1F2937] dark:text-[#F8FAFC]">Active Campaigns</Typography>
        </EosCard>
      </div>
    </div>
  );
};
export default NgoDashboard;
