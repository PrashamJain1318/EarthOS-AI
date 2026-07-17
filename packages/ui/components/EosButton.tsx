import * as React from 'react';
import { cn } from '../utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const EosButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 select-none active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none disabled:active:scale-100',
          {
            // Variants
            'bg-[#2E7D32] hover:bg-[#256428] text-white shadow-sm': variant === 'primary',
            'border border-[#B0BEC5] hover:bg-black/5 dark:hover:bg-white/5 text-[#1F2937] dark:text-[#F8FAFC]': variant === 'secondary',
            'text-[#7E57C2] hover:text-[#5e3f9a] hover:underline bg-transparent px-0 py-0 rounded-none active:scale-100 focus:ring-0 focus:ring-offset-0': variant === 'tertiary',
            'bg-red-600 hover:bg-red-700 text-white shadow-sm': variant === 'danger',
            
            // Sizes
            'px-3 py-1.5 text-sm': size === 'sm' && variant !== 'tertiary',
            'px-4 py-2.5 text-base': size === 'md' && variant !== 'tertiary',
            'px-6 py-3.5 text-lg': size === 'lg' && variant !== 'tertiary',
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

EosButton.displayName = 'EosButton';
