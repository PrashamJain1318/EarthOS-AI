import React from 'react';
import { EosCard, Typography, EosBadge } from '@earthos/ui';
import { MapPin, Heart, Store, Activity } from 'lucide-react';
import { ObjectItem } from '../../../services/objectService';

interface ObjectLogisticsProps {
  object: ObjectItem;
}

export const ObjectLogistics: React.FC<ObjectLogisticsProps> = ({ object }) => {
  return (
    <EosCard variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Activity size={20} className="text-[#2E7D32]" />
        <Typography variant="h5" className="font-bold">Status & Logistics</Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
        {/* Lifecycle Stage */}
        <div className="flex flex-col gap-1">
          <Typography variant="small" className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Lifecycle Stage</Typography>
          <div className="flex items-center gap-2 mt-1">
            <Activity size={16} className="text-gray-400" />
            <EosBadge variant="info" className="px-2 py-0.5">{object.lifecycleStage}</EosBadge>
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <Typography variant="small" className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Location</Typography>
          <div className="flex items-center gap-2 mt-1">
            <MapPin size={16} className="text-gray-400 shrink-0" />
            <span className="text-sm font-medium line-clamp-1">
              {object.location?.address || object.location?.city 
                ? `${object.location.address ? object.location.address + ', ' : ''}${object.location.city || ''}`
                : 'Unspecified'}
            </span>
          </div>
        </div>

        {/* Donation Status */}
        <div className="flex flex-col gap-1">
          <Typography variant="small" className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Donation</Typography>
          <div className="flex items-center gap-2 mt-1">
            <Heart size={16} className={object.donationStatus === 'DONATED' ? 'text-red-400' : 'text-gray-400'} />
            <span className="text-sm font-medium">{object.donationStatus.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Marketplace Status */}
        <div className="flex flex-col gap-1">
          <Typography variant="small" className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Marketplace</Typography>
          <div className="flex items-center gap-2 mt-1">
            <Store size={16} className={object.marketplaceStatus === 'LISTED' ? 'text-blue-500' : 'text-gray-400'} />
            <span className="text-sm font-medium">{object.marketplaceStatus.replace('_', ' ')}</span>
          </div>
        </div>
      </div>
    </EosCard>
  );
};
