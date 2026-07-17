import * as React from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { EosCard } from './EosCard';
import { cn } from '../utils';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'warning' | 'info';
  onClose: (id: string) => void;
  duration?: number;
}

export const EosToast: React.FC<ToastProps> = ({ id, message, type = 'success', onClose, duration = 4000 }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <EosCard
      variant="glass"
      elevation="mid"
      className="flex items-start gap-3 p-4 min-w-[300px] max-w-sm rounded-2xl animate-slide-in"
    >
      <div className={cn('p-1 rounded-lg shrink-0', {
        'text-[#2E7D32]': type === 'success',
        'text-[#FF9800]': type === 'warning',
        'text-[#00BCD4]': type === 'info'
      })}>
        {type === 'success' && <CheckCircle size={20} />}
        {type === 'warning' && <AlertTriangle size={20} />}
        {type === 'info' && <Info size={20} />}
      </div>
      <div className="flex-1 text-sm font-medium text-[#1F2937] dark:text-[#CBD5E1]">
        {message}
      </div>
      <button
        onClick={() => onClose(id)}
        className="p-0.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-[#B0BEC5] hover:text-[#1F2937] dark:hover:text-[#F8FAFC] transition-colors shrink-0"
      >
        <X size={16} />
      </button>
    </EosCard>
  );
};
