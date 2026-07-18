import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, EosCard, EosButton } from '@earthos/ui';
import { Plus, Package } from 'lucide-react';

export const Objects: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 select-none text-left">
      
      {/* Header and Add button row */}
      <div className="flex justify-between items-center">
        <div>
          <Typography variant="h3" className="font-bold tracking-tight">My Objects</Typography>
          <Typography variant="small" className="text-[#B0BEC5]">Catalog of registered physical resources under custody.</Typography>
        </div>
        
        <EosButton 
          variant="primary" 
          onClick={() => navigate('/objects/new')}
          className="flex items-center gap-1.5 font-bold"
        >
          <Plus size={16} />
          <span>Add Object</span>
        </EosButton>
      </div>

      {/* Empty State Card */}
      <EosCard variant="glass" className="h-72 flex flex-col items-center justify-center gap-4 text-center border border-dashed border-[#B0BEC5]/30 p-8">
        <div className="p-3 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-gray-400 dark:text-[#CBD5E1]">
          <Package size={36} />
        </div>
        <div>
          <Typography variant="h4" className="font-bold">No registered objects</Typography>
          <Typography variant="small" className="text-[#B0BEC5] max-w-sm mt-1">
            Your resource catalog is empty. Scan an object or click below to record your first batch stream.
          </Typography>
        </div>
        <EosButton 
          variant="secondary" 
          onClick={() => navigate('/objects/new')}
          className="font-bold border border-[#2E7D32]/25 hover:border-[#2E7D32]/50 text-[#2E7D32] bg-[#2E7D32]/5 hover:bg-[#2E7D32]/10"
        >
          Register Resource Stream
        </EosButton>
      </EosCard>

    </div>
  );
};
export default Objects;
