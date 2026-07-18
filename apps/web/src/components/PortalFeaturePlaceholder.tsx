import * as React from 'react';
import { Typography, EosCard } from '@earthos/ui';
import { AlertCircle } from 'lucide-react';

interface PortalFeaturePlaceholderProps {
  name: string;
  description: string;
}

export const PortalFeaturePlaceholder: React.FC<PortalFeaturePlaceholderProps> = ({ name, description }) => {
  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">{description}</Typography>
      </div>
      <EosCard variant="glass" className="h-60 flex flex-col items-center justify-center border border-dashed border-[#B0BEC5]/30 gap-3">
        <AlertCircle size={28} className="text-[#B0BEC5] animate-pulse" />
        <Typography variant="small" className="text-[#B0BEC5] font-semibold text-center px-4">
          This feature module is currently undergoing system integration. Telemetry hooks are active.
        </Typography>
      </EosCard>
    </div>
  );
};

export default PortalFeaturePlaceholder;
