import * as React from 'react';
import { Typography, EosCard, EosBadge } from '@earthos/ui';
import { Users, Award } from 'lucide-react';

export const Community: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">Community Challenges</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Participate in regional cooperative zero-waste milestones.</Typography>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <EosCard variant="default" className="flex gap-4 p-6 border border-[#2E7D32]/30">
          <Users className="text-[#2E7D32]" size={28} />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <Typography variant="h4">Metro Polymer Sweep</Typography>
              <EosBadge variant="success">Active</EosBadge>
            </div>
            <Typography variant="small" className="text-[#B0BEC5]">
              Target: Divert 10 TONS of PET plastics from city landfills this month.
            </Typography>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#2E7D32] h-full" style={{ width: '65%' }} />
            </div>
            <span className="text-xs text-[#B0BEC5] font-semibold mt-1">65% Completed (6.5/10 Tons)</span>
          </div>
        </EosCard>

        <EosCard variant="default" className="flex gap-4 p-6">
          <Award className="text-[#FF9800]" size={28} />
          <div className="flex flex-col gap-2">
            <Typography variant="h4">My Achievements</Typography>
            <Typography variant="small" className="text-[#B0BEC5]">
              Log environmental actions to unlock circular badges and credits.
            </Typography>
            <div className="flex gap-2 mt-2">
              <EosBadge variant="neutral">Scanner Pro</EosBadge>
              <EosBadge variant="neutral">Repair Hero</EosBadge>
            </div>
          </div>
        </EosCard>
      </div>
    </div>
  );
};
export default Community;
