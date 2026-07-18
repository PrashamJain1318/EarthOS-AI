import React from 'react';
import { Typography, EosCard, EosBadge } from '@earthos/ui';
import { Tag, Hash, Factory } from 'lucide-react';
import { ObjectItem } from '../../../services/objectService';

interface ObjectOverviewProps {
  object: ObjectItem;
}

export const ObjectOverview: React.FC<ObjectOverviewProps> = ({ object }) => {
  const getConditionColor = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case 'new': return 'success';
      case 'good': return 'info';
      case 'fair': return 'warning';
      case 'poor': return 'error';
      default: return 'secondary';
    }
  };

  return (
    <EosCard variant="glass" className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <Typography variant="h3" className="font-bold">{object.objectName}</Typography>
          <div className="flex items-center gap-2 mt-1">
            <EosBadge variant="secondary" className="font-semibold">{object.category}</EosBadge>
            {object.subCategory && <span className="text-gray-400 text-sm">{object.subCategory}</span>}
          </div>
        </div>
        <EosBadge variant={getConditionColor(object.condition)} className="text-sm px-3 py-1">
          Condition: {object.condition}
        </EosBadge>
      </div>

      {object.description && (
        <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
          {object.description}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg">
            <Factory size={18} />
          </div>
          <div className="flex flex-col">
            <Typography variant="small" className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Brand / Model</Typography>
            <span className="font-medium text-sm">{object.brand || 'N/A'} {object.model ? `- ${object.model}` : ''}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-500 rounded-lg">
            <Hash size={18} />
          </div>
          <div className="flex flex-col">
            <Typography variant="small" className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Serial Number</Typography>
            <span className="font-medium text-sm">{object.serialNumber || 'N/A'}</span>
          </div>
        </div>
      </div>

      {object.tags && object.tags.length > 0 && (
        <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs font-bold uppercase tracking-wider">
            <Tag size={12} /> Tags
          </div>
          <div className="flex flex-wrap gap-2">
            {object.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-xs text-gray-600 dark:text-gray-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </EosCard>
  );
};
