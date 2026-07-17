import * as React from 'react';
import { Typography, EosCard } from '@earthos/ui';

export const AdminHome: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">System Admin Panel</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">System status monitoring, verify profiles, and dispute resolution flags.</Typography>
      </div>
      <EosCard variant="glass" className="h-60 flex items-center justify-center border border-dashed border-[#B0BEC5]/30">
        <Typography variant="small" className="text-[#B0BEC5]">
          System healthy. 0 pending organization verifications, 0 flagged disputes.
        </Typography>
      </EosCard>
    </div>
  );
};
export default AdminHome;
