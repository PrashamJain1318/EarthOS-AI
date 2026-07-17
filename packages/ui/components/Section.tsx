import * as React from 'react';
import { cn } from '../utils';

export type SectionProps = React.HTMLAttributes<HTMLElement>;

export const Section: React.FC<SectionProps> = ({ className, ...props }) => {
  return (
    <section
      className={cn(
        'py-12 md:py-24 overflow-hidden',
        className
      )}
      {...props}
    />
  );
};
