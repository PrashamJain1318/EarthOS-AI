import * as React from 'react';
import { Typography, EosCard } from '@earthos/ui';

export const GovernmentHome: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">Smart City Portal</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Regional resource heatmaps and municipal waste diversion trackers.</Typography>
      </div>
      <EosCard variant="glass" className="h-60 flex items-center justify-center border border-dashed border-[#B0BEC5]/30">
        <Typography variant="small" className="text-[#B0BEC5]">
          Select regional district layers to load geospatial routing maps.
        </Typography>
      </EosCard>
    </div>
  );
};
export default GovernmentHome;
