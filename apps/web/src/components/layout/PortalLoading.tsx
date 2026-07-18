import React from 'react';
import { EosSpinner } from '@earthos/ui';

export const PortalLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 space-y-4">
      <EosSpinner size="lg" />
      <span className="text-sm font-medium text-gray-500 animate-pulse">Loading portal modules...</span>
    </div>
  );
};
