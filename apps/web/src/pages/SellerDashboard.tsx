import * as React from 'react';
import { Typography, EosCard } from '@earthos/ui';

export const SellerDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">Marketplace Dashboard</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Manage inventory, track sales, and fulfill orders.</Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EosCard variant="glass" className="p-6 border-indigo-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Active Listings</Typography>
          <Typography variant="h4" className="text-indigo-500 font-bold mt-2">142</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-indigo-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Pending Orders</Typography>
          <Typography variant="h4" className="text-indigo-500 font-bold mt-2">12</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-indigo-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Total GMV</Typography>
          <Typography variant="h4" className="text-indigo-500 font-bold mt-2">$4,250</Typography>
        </EosCard>
        <EosCard variant="glass" className="p-6 border-indigo-500/20">
          <Typography variant="small" className="text-[#B0BEC5]">Seller Rating</Typography>
          <Typography variant="h4" className="text-indigo-500 font-bold mt-2">4.9</Typography>
        </EosCard>
      </div>
    </div>
  );
};
export default SellerDashboard;
