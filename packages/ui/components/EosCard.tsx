import * as React from 'react';
import { cn } from '../utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass';
  elevation?: 'low' | 'mid' | 'high';
  hoverable?: boolean;
}

export const EosCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', elevation = 'mid', hoverable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-3xl p-6 transition-all duration-300 border border-[#B0BEC5]/50 dark:border-[#263238]/40',
          {
            // Variants
            'bg-white dark:bg-[#162033]': variant === 'default',
            'bg-[#F8FAFC]/80 dark:bg-[#162033]/70 backdrop-blur-md': variant === 'glass',
            
            // Elevations
            'shadow-sm': elevation === 'low',
            'shadow-md dark:shadow-black/20': elevation === 'mid',
            'shadow-xl dark:shadow-black/40': elevation === 'high',
            
            // Interactive states
            'hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-black/30 hover:border-[#00BCD4]/30 cursor-pointer': hoverable
          },
          className
        )}
        {...props}
      />
    );
  }
);

EosCard.displayName = 'EosCard';
