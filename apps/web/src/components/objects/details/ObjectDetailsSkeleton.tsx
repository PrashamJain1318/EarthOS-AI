import React from 'react';
import { EosCard } from '@earthos/ui';

export const ObjectDetailsSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2 w-1/3">
          <div className="h-10 bg-gray-200 dark:bg-white/10 rounded-md w-full"></div>
          <div className="h-5 bg-gray-200 dark:bg-white/10 rounded-md w-1/2"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-gray-200 dark:bg-white/10 rounded-md"></div>
          <div className="h-10 w-24 bg-gray-200 dark:bg-white/10 rounded-md"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Gallery Skeleton */}
          <EosCard variant="glass" className="h-96 bg-gray-200 dark:bg-white/5 rounded-xl"></EosCard>
          
          {/* Overview Skeleton */}
          <EosCard variant="glass" className="h-48 bg-gray-200 dark:bg-white/5 rounded-xl"></EosCard>
          
          {/* Timeline Skeleton */}
          <EosCard variant="glass" className="h-64 bg-gray-200 dark:bg-white/5 rounded-xl"></EosCard>
        </div>
        
        <div className="flex flex-col gap-6">
          {/* Financials Skeleton */}
          <EosCard variant="glass" className="h-48 bg-gray-200 dark:bg-white/5 rounded-xl"></EosCard>
          
          {/* Metrics Skeleton */}
          <EosCard variant="glass" className="h-48 bg-gray-200 dark:bg-white/5 rounded-xl"></EosCard>
          
          {/* Meta Skeleton */}
          <EosCard variant="glass" className="h-64 bg-gray-200 dark:bg-white/5 rounded-xl"></EosCard>
        </div>
      </div>
    </div>
  );
};
