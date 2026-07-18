import React from 'react';
import { ShieldAlert, FileQuestion } from 'lucide-react';
import { cn } from '../utils';
import { EosButton } from './EosButton';
import { Typography } from './Typography';

export interface EosErrorPageProps {
  statusCode: 403 | 404 | 500;
  title?: string;
  message?: string;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export const EosErrorPage: React.FC<EosErrorPageProps> = ({
  statusCode,
  title,
  message,
  onAction,
  actionLabel = 'Return to Dashboard',
  className
}) => {
  let defaultIcon = <ShieldAlert size={64} className="text-red-500 mb-6" />;
  let defaultTitle = 'Access Denied';
  let defaultMessage = 'You do not have permission to view this resource.';

  if (statusCode === 404) {
    defaultIcon = <FileQuestion size={64} className="text-amber-500 mb-6" />;
    defaultTitle = 'Page Not Found';
    defaultMessage = 'The resource you are looking for does not exist or has been moved.';
  } else if (statusCode === 500) {
    defaultTitle = 'System Error';
    defaultMessage = 'An unexpected error occurred. Please try again later.';
  }

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[60vh] text-center px-4", className)}>
      <div className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-sm max-w-md w-full">
        <div className="flex justify-center">
          {defaultIcon}
        </div>
        
        <div className="mb-2">
          <Typography variant="h2" className="text-slate-800 dark:text-slate-100 font-bold">
            {statusCode}
          </Typography>
        </div>
        
        <Typography variant="h4" className="text-slate-700 dark:text-slate-300 mb-4 font-semibold">
          {title || defaultTitle}
        </Typography>
        
        <Typography variant="small" className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">
          {message || defaultMessage}
        </Typography>
        
        {onAction && (
          <EosButton variant="primary" className="w-full font-bold uppercase tracking-wider text-xs" onClick={onAction}>
            {actionLabel}
          </EosButton>
        )}
      </div>
    </div>
  );
};
