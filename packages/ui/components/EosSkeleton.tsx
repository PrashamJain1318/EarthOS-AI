import React from 'react';
import { cn } from '../utils';

export interface EosSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'none';
}

export const EosSkeleton: React.FC<EosSkeletonProps> = ({
  variant = 'text',
  animation = 'pulse',
  className,
  ...props
}) => {
  const baseClasses = "bg-slate-200 dark:bg-slate-800";
  
  const variantClasses = {
    text: "h-4 w-full rounded",
    circular: "rounded-full",
    rectangular: "",
    rounded: "rounded-md",
  };

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
    none: "",
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      {...props}
    />
  );
};
