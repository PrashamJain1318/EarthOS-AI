import React from 'react';
import { EosCard } from '@earthos/ui';

interface ObjectSkeletonProps {
  viewMode: 'grid' | 'list';
}

export const ObjectSkeleton: React.FC<ObjectSkeletonProps> = ({ viewMode }) => {
  const cards = Array.from({ length: 6 }).map((_, i) => i);

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4 w-full animate-pulse">
        {cards.map(i => (
          <EosCard key={i} variant="glass" className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-white/10 shrink-0"></div>
              <div className="flex flex-col gap-2 w-1/4">
                <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/2"></div>
              </div>
              <div className="flex flex-col gap-2 w-1/6">
                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 dark:bg-white/10 rounded-full w-20"></div>
              </div>
              <div className="flex gap-4 w-1/4">
                <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-12"></div>
                <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-12"></div>
              </div>
              <div className="w-1/6 flex justify-end">
                <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-24"></div>
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <div className="w-8 h-8 bg-gray-200 dark:bg-white/10 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 dark:bg-white/10 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 dark:bg-white/10 rounded"></div>
            </div>
          </EosCard>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-pulse">
      {cards.map(i => (
        <EosCard key={i} variant="glass" className="flex flex-col h-[320px]">
          <div className="w-full h-48 bg-gray-200 dark:bg-white/10 shrink-0"></div>
          <div className="p-5 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
              <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-1/4"></div>
            </div>
            <div className="flex gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
              <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-16"></div>
              <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-16"></div>
            </div>
          </div>
        </EosCard>
      ))}
    </div>
  );
};
