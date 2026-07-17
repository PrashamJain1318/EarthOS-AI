import * as React from 'react';
import { cn } from '../utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  clean?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ className, clean = false, ...props }) => {
  return (
    <div
      className={cn(
        'w-full mx-auto px-4 md:px-8',
        {
          'max-w-[1440px]': !clean
        },
        className
      )}
      {...props}
    />
  );
};
