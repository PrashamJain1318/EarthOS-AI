import * as React from 'react';
import { cn } from '../utils';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg';
  fallbackText?: string;
}

export const EosAvatar: React.FC<AvatarProps> = ({ className, src, alt, size = 'md', fallbackText, ...props }) => {
  const [hasError, setHasError] = React.useState(false);
  const initials = fallbackText ? fallbackText.substring(0, 2).toUpperCase() : '';

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 border border-[#B0BEC5]/30 dark:border-[#263238]/30 select-none shrink-0',
        {
          'h-8 w-8 text-xs': size === 'sm',
          'h-10 w-10 text-sm': size === 'md',
          'h-14 w-14 text-base': size === 'lg'
        },
        className
      )}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
          {...props}
        />
      ) : (
        <span className="font-semibold text-[#1F2937] dark:text-[#CBD5E1]">
          {initials || '?'}
        </span>
      )}
    </div>
  );
};
