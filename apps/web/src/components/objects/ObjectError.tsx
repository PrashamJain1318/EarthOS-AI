import React from 'react';
import { EosCard, Typography, EosButton } from '@earthos/ui';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ObjectErrorProps {
  message: string;
  onRetry: () => void;
}

export const ObjectError: React.FC<ObjectErrorProps> = ({ message, onRetry }) => {
  return (
    <EosCard variant="glass" className="p-8 flex flex-col items-center justify-center text-center gap-4 w-full h-[300px] border-red-500/20 bg-red-500/5">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
        <AlertTriangle size={32} />
      </div>
      <div>
        <Typography variant="h4" className="font-bold text-red-500">Failed to load objects</Typography>
        <Typography variant="small" className="text-gray-500 dark:text-gray-400 max-w-md mt-2">
          {message || 'An unexpected error occurred while fetching your objects. Please check your connection and try again.'}
        </Typography>
      </div>
      <EosButton variant="secondary" onClick={onRetry} className="mt-2 flex items-center gap-2">
        <RefreshCw size={16} />
        <span>Try Again</span>
      </EosButton>
    </EosCard>
  );
};
