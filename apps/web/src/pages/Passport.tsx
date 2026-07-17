import * as React from 'react';
import { Typography, EosCard, EosBadge } from '@earthos/ui';
import { FileText, ShieldCheck } from 'lucide-react';

export const Passport: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <Typography variant="h3">Earth Passport Registry</Typography>
          <Typography variant="small" className="text-[#B0BEC5]">Cryptographic Digital Product Passports validating material lineage.</Typography>
        </div>
        <EosBadge variant="info">Verified</EosBadge>
      </div>

      <EosCard variant="default" className="p-8 flex flex-col gap-4 border border-[#00BCD4]/30 bg-cyan-50/5 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <FileText size={24} className="text-[#00BCD4]" />
          <Typography variant="h4" className="font-mono">EOS-PASSPORT-POLY-98A</Typography>
        </div>
        <hr className="border-[#B0BEC5]/20" />
        <ul className="flex flex-col gap-2 text-sm text-[#B0BEC5]">
          <li><strong>Material Class:</strong> High Purity Polyethylene (CAS-9002-88-4)</li>
          <li><strong>Purity Vector:</strong> 98.4%</li>
          <li><strong>Origin Facility:</strong> Gulf Coast Polymers (Houston, TX)</li>
          <li><strong>Status:</strong> Active Custody</li>
        </ul>
        <div className="flex items-center gap-1.5 text-xs text-green-500 font-semibold mt-2">
          <ShieldCheck size={16} />
          <span>Blockchain-verified material history</span>
        </div>
      </EosCard>
    </div>
  );
};
export default Passport;
