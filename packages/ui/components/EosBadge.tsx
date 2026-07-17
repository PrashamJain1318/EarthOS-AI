import * as React from 'react';
import { cn } from '../utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'info' | 'neutral';
}

export const EosBadge: React.FC<BadgeProps> = ({ className, variant = 'neutral', ...props }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none border',
        {
          'bg-green-50 dark:bg-green-950/20 text-[#2E7D32] border-green-200 dark:border-green-900/30': variant === 'success',
          'bg-yellow-50 dark:bg-yellow-950/20 text-[#FF9800] border-yellow-200 dark:border-yellow-900/30': variant === 'warning',
          'bg-cyan-50 dark:bg-cyan-950/20 text-[#00BCD4] border-cyan-200 dark:border-cyan-900/30': variant === 'info',
          'bg-gray-50 dark:bg-gray-900 text-[#B0BEC5] border-gray-200 dark:border-gray-800': variant === 'neutral'
        },
        className
      )}
      {...props}
    />
  );
};
