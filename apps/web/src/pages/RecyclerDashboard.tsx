import * as React from 'react';
import { Typography, EosCard } from '@earthos/ui';

export const RecyclerDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">Recycler Dashboard</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Monitor material yields, purity, and processing.</Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EosCard variant="glass" className="p-6 border-cyan-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Processed (MT)</Typography>
          <Typography variant="h4" className="text-cyan-500 font-bold mt-2">1,840</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-cyan-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Avg Purity</Typography>
          <Typography variant="h4" className="text-cyan-500 font-bold mt-2">94.2%</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-cyan-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Active Lines</Typography>
          <Typography variant="h4" className="text-cyan-500 font-bold mt-2">4</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-cyan-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Carbon Abated</Typography>
          <Typography variant="h4" className="text-cyan-500 font-bold mt-2">320 tCO2e</Typography>
        </EosCard>
      </div>
    </div>
  );
};
export default RecyclerDashboard;
