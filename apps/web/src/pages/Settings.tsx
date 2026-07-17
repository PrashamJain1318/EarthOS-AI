import React from 'react';
import { Typography, EosCard } from '@earthos/ui';

export const Settings: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">Platform Settings</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Manage profile settings, notification vectors, and API integration keys.</Typography>
      </div>
      <EosCard variant="glass" className="h-60 flex items-center justify-center border border-dashed border-[#B0BEC5]/30">
        <Typography variant="small" className="text-[#B0BEC5]">
          Manage your circular preferences, profile details, and compliance configurations.
        </Typography>
      </EosCard>
    </div>
  );
};
export default Settings;
