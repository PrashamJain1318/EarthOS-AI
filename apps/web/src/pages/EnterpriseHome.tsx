import * as React from 'react';
import { Typography, EosCard } from '@earthos/ui';

export const EnterpriseHome: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">Enterprise Dashboard</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Scope 3 emissions accounting and industrial byproduct matching console.</Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EosCard variant="glass" className="p-6 border-blue-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Scope 3 Emissions</Typography>
          <Typography variant="h4" className="text-blue-500 font-bold mt-2">1,240 tCO2e</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-blue-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Active Material Streams</Typography>
          <Typography variant="h4" className="text-blue-500 font-bold mt-2">18</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-blue-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">ERP Sync Status</Typography>
          <Typography variant="h4" className="text-blue-500 font-bold mt-2">Healthy</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-blue-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Compliance Score</Typography>
          <Typography variant="h4" className="text-blue-500 font-bold mt-2">94%</Typography>
        </EosCard>
      </div>
    </div>
  );
};
export default EnterpriseHome;
