import React from 'react';
import { EosCard, Typography } from '@earthos/ui';
import { TrendingDown, TrendingUp, Calendar, CreditCard } from 'lucide-react';
import { ObjectItem } from '../../../services/objectService';

interface ObjectFinancialsProps {
  object: ObjectItem;
}

export const ObjectFinancials: React.FC<ObjectFinancialsProps> = ({ object }) => {
  const purchasePrice = object.purchasePrice || 0;
  const currentValue = object.currentValue || 0;
  const diff = currentValue - purchasePrice;
  const percentDiff = purchasePrice > 0 ? (diff / purchasePrice) * 100 : 0;
  
  const isDepreciated = diff < 0;

  return (
    <EosCard variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex items-center gap-2 mb-2">
        <CreditCard size={20} className="text-[#2E7D32]" />
        <Typography variant="h5" className="font-bold">Financials</Typography>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
          <Typography variant="small" className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Purchase Price</Typography>
          <div className="flex items-baseline gap-1">
            <Typography variant="h4" className="font-bold text-gray-800 dark:text-gray-100">
              {purchasePrice > 0 ? purchasePrice.toLocaleString() : 'N/A'}
            </Typography>
            {purchasePrice > 0 && <span className="text-xs text-gray-400 font-medium">{object.currency}</span>}
          </div>
          {object.purchaseDate && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
              <Calendar size={12} />
              {new Date(object.purchaseDate).toLocaleDateString()}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 relative overflow-hidden">
          <Typography variant="small" className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Current Value</Typography>
          <div className="flex items-baseline gap-1">
            <Typography variant="h4" className="font-bold text-[#2E7D32] dark:text-[#4CAF50]">
              {currentValue > 0 ? currentValue.toLocaleString() : 'N/A'}
            </Typography>
            {currentValue > 0 && <span className="text-xs text-gray-400 font-medium">{object.currency}</span>}
          </div>
          
          {purchasePrice > 0 && currentValue > 0 && (
            <div className={`flex items-center gap-1 text-xs font-bold mt-2 ${isDepreciated ? 'text-red-500' : 'text-green-500'}`}>
              {isDepreciated ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
              {Math.abs(percentDiff).toFixed(1)}% {isDepreciated ? 'Depreciation' : 'Appreciation'}
            </div>
          )}
        </div>
      </div>
    </EosCard>
  );
};
