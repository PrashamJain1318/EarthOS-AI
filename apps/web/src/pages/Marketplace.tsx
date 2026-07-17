import * as React from 'react';
import { Typography, EosCard, EosBadge } from '@earthos/ui';

export const Marketplace: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h3">Circular Marketplace</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Search and trade secondary raw materials and industrial byproducts.</Typography>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <EosCard variant="glass" className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Typography variant="h4">12 Tons Clean Polyethylene</Typography>
            <EosBadge variant="success">$420 / Ton</EosBadge>
          </div>
          <Typography variant="small" className="text-[#B0BEC5]">
            98.5% purity, sourced from post-industrial clean trimmings. Located in Hamburg, Germany.
          </Typography>
        </EosCard>

        <EosCard variant="glass" className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Typography variant="h4">5.8 Tons Secondary Copper Scrap</Typography>
            <EosBadge variant="success">$6,200 / Ton</EosBadge>
          </div>
          <Typography variant="small" className="text-[#B0BEC5]">
            Granulated clean scrap, ready for metal casting inputs. Located in Chicago, IL.
          </Typography>
        </EosCard>
      </div>
    </div>
  );
};
export default Marketplace;
