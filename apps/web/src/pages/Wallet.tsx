import React from 'react';
import { Typography, EosCard } from '@earthos/ui';

export const Wallet: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">Carbon Wallet</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Abated carbon registry transaction ledgers.</Typography>
      </div>
      <EosCard variant="glass" className="h-60 flex items-center justify-center border border-dashed border-[#B0BEC5]/30">
        <Typography variant="small" className="text-[#B0BEC5]">
          Your Carbon Wallet has 142.50 Credits. Register or route streams to mint more carbon vouchers.
        </Typography>
      </EosCard>
    </div>
  );
};
export default Wallet;
