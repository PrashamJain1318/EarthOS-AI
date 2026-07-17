import * as React from 'react';
import { Typography, EosCard } from '@earthos/ui';

export const Objects: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">My Objects</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Catalog of registered physical resources under custody.</Typography>
      </div>
      <EosCard variant="glass" className="h-64 flex items-center justify-center border border-dashed border-[#B0BEC5]/30">
        <Typography variant="small" className="text-[#B0BEC5]">
          Your resource catalog is empty. Scan an object or connect your ERP to populate this registry.
        </Typography>
      </EosCard>
    </div>
  );
};
export default Objects;
