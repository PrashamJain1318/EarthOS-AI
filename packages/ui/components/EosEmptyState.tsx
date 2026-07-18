import React from 'react';
import { FileSearch } from 'lucide-react';
import { cn } from '../utils';

export interface EosEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EosEmptyState: React.FC<EosEmptyStateProps> = ({
  icon = <FileSearch size={48} className="text-slate-300 dark:text-slate-700" />,
  title,
  description,
  action,
  className
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        {description}
      </p>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};
