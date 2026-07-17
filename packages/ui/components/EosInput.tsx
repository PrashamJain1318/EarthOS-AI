import * as React from 'react';
import { cn } from '../utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const EosInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label ? (
          <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">
            {label}
          </label>
        ) : null}
        <div className="relative flex items-center">
          {icon ? (
            <div className="absolute left-3 text-[#B0BEC5] pointer-events-none">
              {icon}
            </div>
          ) : null}
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full px-4 py-2.5 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] transition-all duration-200 focus:outline-none focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 disabled:opacity-40 disabled:pointer-events-none',
              {
                'pl-10': icon,
                'border-red-500 focus:border-red-500 focus:ring-red-500/20': error
              },
              className
            )}
            {...props}
          />
        </div>
        {error ? (
          <span className="text-xs text-red-500 font-medium">{error}</span>
        ) : null}
      </div>
    );
  }
);

EosInput.displayName = 'EosInput';
