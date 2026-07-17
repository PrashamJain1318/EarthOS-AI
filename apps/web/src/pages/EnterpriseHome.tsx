import * as React from 'react';
import { Typography, EosCard } from '@earthos/ui';

export const EnterpriseHome: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">Enterprise Dashboard</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Scope 3 emissions accounting and industrial byproduct matching console.</Typography>
      </div>
      <EosCard variant="glass" className="h-60 flex items-center justify-center border border-dashed border-[#B0BEC5]/30">
        <Typography variant="small" className="text-[#B0BEC5]">
          No active material streams connected. Integrate your ERP via settings to begin auditing.
        </Typography>
      </EosCard>
    </div>
  );
};
export default EnterpriseHome;
