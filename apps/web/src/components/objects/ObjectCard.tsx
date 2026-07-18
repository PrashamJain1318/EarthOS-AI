import React from 'react';
import { Typography, EosCard, EosButton, EosBadge } from '@earthos/ui';
import { Edit2, Eye, Trash2, Box, Leaf, Cpu } from 'lucide-react';
import { ObjectItem } from '../../services/objectService';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ObjectCardProps {
  object: ObjectItem;
  viewMode: 'grid' | 'list';
  onDelete: (id: string) => void;
}

export const ObjectCard: React.FC<ObjectCardProps> = React.memo(({ object, viewMode, onDelete }) => {
  const navigate = useNavigate();

  const getConditionColor = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case 'new': return 'success';
      case 'good': return 'info';
      case 'fair': return 'warning';
      case 'poor': return 'error';
      default: return 'secondary';
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (viewMode === 'list') {
    return (
      <motion.div variants={itemVariants} layout>
        <EosCard variant="glass" className="p-4 flex items-center justify-between hover:border-[#00BCD4]/30 transition-all group focus-within:ring-2 focus-within:ring-[#00BCD4] outline-none">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
            {object.images?.[0] ? (
              <img src={object.images[0]} alt={`Thumbnail of ${object.objectName}`} loading="lazy" className="w-full h-full object-cover" />
            ) : (
              <Box size={24} className="text-gray-400" />
            )}
          </div>
          <div className="flex flex-col gap-1 w-1/4">
            <Typography variant="h6" className="font-bold truncate">{object.objectName}</Typography>
            <Typography variant="small" className="text-gray-500 truncate">{object.category}</Typography>
          </div>
          <div className="flex flex-col gap-1 w-1/6">
            <Typography variant="small" className="text-gray-400">Condition</Typography>
            <EosBadge variant={getConditionColor(object.condition)} className="w-fit">
              {object.condition}
            </EosBadge>
          </div>
          <div className="flex gap-4 w-1/4">
            {object.carbonScore !== undefined && (
              <div className="flex items-center gap-1.5 text-sm text-green-500 font-semibold">
                <Leaf size={16} />
                <span>{object.carbonScore}</span>
              </div>
            )}
            {object.aiScore !== undefined && (
              <div className="flex items-center gap-1.5 text-sm text-blue-500 font-semibold">
                <Cpu size={16} />
                <span>{object.aiScore}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 w-1/6 justify-end">
             {object.currentValue !== undefined && (
                <Typography variant="h6" className="font-bold">
                  ${object.currentValue.toLocaleString()}
                </Typography>
             )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <EosButton variant="secondary" onClick={() => navigate(`/objects/${object._id}`)} className="p-2 min-w-0" aria-label="View">
            <Eye size={16} />
          </EosButton>
          <EosButton variant="secondary" onClick={() => navigate(`/objects/${object._id}/edit`)} className="p-2 min-w-0" aria-label="Edit">
            <Edit2 size={16} />
          </EosButton>
          <EosButton variant="secondary" onClick={() => onDelete(object._id)} className="p-2 min-w-0 text-red-500 hover:text-red-600 hover:border-red-500/50" aria-label="Delete">
            <Trash2 size={16} />
          </EosButton>
        </div>
      </EosCard>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div variants={itemVariants} layout className="h-full">
      <EosCard variant="glass" className="flex flex-col overflow-hidden hover:border-[#00BCD4]/30 transition-all group h-full focus-within:ring-2 focus-within:ring-[#00BCD4] outline-none">
      <div className="w-full h-48 bg-gray-100 dark:bg-white/5 flex items-center justify-center relative">
        {object.images?.[0] ? (
          <img src={object.images[0]} alt={`Image of ${object.objectName}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <Box size={40} className="text-gray-400" />
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <EosBadge variant="secondary" className="bg-white/90 dark:bg-black/90 backdrop-blur-md border-0">
            {object.category}
          </EosBadge>
        </div>
        <div className="absolute top-3 right-3">
          <EosBadge variant={getConditionColor(object.condition)} className="backdrop-blur-md">
            {object.condition}
          </EosBadge>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <Typography variant="h5" className="font-bold line-clamp-1">{object.objectName}</Typography>
          {object.currentValue !== undefined && (
            <Typography variant="h6" className="font-bold text-green-500">
              ${object.currentValue.toLocaleString()}
            </Typography>
          )}
        </div>
        
        <div className="flex gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
          {object.carbonScore !== undefined && (
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Leaf size={12} /> Carbon
              </div>
              <Typography variant="small" className="font-bold text-green-500">{object.carbonScore}</Typography>
            </div>
          )}
          {object.aiScore !== undefined && (
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Cpu size={12} /> AI Score
              </div>
              <Typography variant="small" className="font-bold text-blue-500">{object.aiScore}</Typography>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 pb-5 flex gap-2 mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <EosButton variant="secondary" onClick={() => navigate(`/objects/${object._id}`)} className="flex-1 flex justify-center py-2" aria-label="View">
          <Eye size={16} />
        </EosButton>
        <EosButton variant="secondary" onClick={() => navigate(`/objects/${object._id}/edit`)} className="flex-1 flex justify-center py-2" aria-label="Edit">
          <Edit2 size={16} />
        </EosButton>
        <EosButton variant="secondary" onClick={() => onDelete(object._id)} className="flex-1 flex justify-center py-2 text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-500/20" aria-label="Delete">
          <Trash2 size={16} />
        </EosButton>
      </div>
    </EosCard>
    </motion.div>
  );
});

ObjectCard.displayName = 'ObjectCard';
