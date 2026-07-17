import * as React from 'react';
import { cn } from '../utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'mono';
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({ className, variant, as, children, ...props }) => {
  const Component = as || (
    variant === 'h1' ? 'h1' :
    variant === 'h2' ? 'h2' :
    variant === 'h3' ? 'h3' :
    variant === 'h4' ? 'h4' :
    variant === 'mono' ? 'code' : 'p'
  );

  return (
    <Component
      className={cn(
        'text-[#1F2937] dark:text-[#F8FAFC]',
        {
          'font-display font-bold text-4xl md:text-6xl tracking-tight line-height-[1.1]': variant === 'h1',
          'font-display font-bold text-3xl md:text-5xl line-height-[1.2]': variant === 'h2',
          'font-display font-medium text-2xl md:text-3xl line-height-[1.25]': variant === 'h3',
          'font-display font-medium text-xl md:text-2xl line-height-[1.3]': variant === 'h4',
          'font-sans text-base md:text-lg font-normal line-height-[1.5]': variant === 'body',
          'font-sans text-sm font-normal text-[#B0BEC5] dark:text-[#CBD5E1] line-height-[1.4]': variant === 'small',
          'font-mono text-sm md:text-base font-medium text-[#7E57C2] dark:text-[#a084d6]': variant === 'mono'
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
