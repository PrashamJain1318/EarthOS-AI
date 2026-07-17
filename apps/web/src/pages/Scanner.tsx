import * as React from 'react';
import { Typography, EosCard, EosButton } from '@earthos/ui';
import { Camera } from 'lucide-react';

export const Scanner: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">AI Object Scanner</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Upload photos or SDS files to identify chemical configurations.</Typography>
      </div>
      <EosCard variant="glass" className="p-12 flex flex-col items-center justify-center gap-4 text-center border border-dashed border-[#B0BEC5]/30">
        <Camera size={48} className="text-[#B0BEC5]" />
        <div>
          <Typography variant="h4">Camera Viewport Mockup</Typography>
          <Typography variant="small" className="text-[#B0BEC5]">Frame objects to run YOLOv8 vector classification models.</Typography>
        </div>
        <EosButton variant="primary" size="sm">Start Camera Session</EosButton>
      </EosCard>
    </div>
  );
};
export default Scanner;
