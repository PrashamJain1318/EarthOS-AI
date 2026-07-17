import * as React from 'react';
import { Typography, EosCard } from '@earthos/ui';
import { Globe } from 'lucide-react';

export const EarthTwin: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">Environmental Twin</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">3D Gaussian Splatting and WebGL point cloud rendering of your circular resource grid.</Typography>
      </div>

      <EosCard variant="glass" className="h-[60vh] flex flex-col items-center justify-center gap-4 text-center border border-dashed border-[#B0BEC5]/30">
        <Globe size={48} className="text-[#B0BEC5] animate-pulse" />
        <div>
          <Typography variant="h4">3D Canvas Layer Placeholder</Typography>
          <Typography variant="small" className="text-[#B0BEC5]">React Three Fiber canvas layers mapping active coordinates will mount here.</Typography>
        </div>
      </EosCard>
    </div>
  );
};
export default EarthTwin;
