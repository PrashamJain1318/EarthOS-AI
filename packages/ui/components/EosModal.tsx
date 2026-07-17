import * as React from 'react';
import { X } from 'lucide-react';
import { EosCard } from './EosCard';
import { cn } from '../utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const EosModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />
      <EosCard
        variant="glass"
        elevation="high"
        className={cn('relative w-full max-w-lg z-10 flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-scale-up', className)}
      >
        <div className="flex items-center justify-between border-b border-[#B0BEC5]/30 dark:border-[#263238]/30 pb-3">
          {title ? (
            <h3 className="text-xl font-bold text-[#1F2937] dark:text-[#F8FAFC]">
              {title}
            </h3>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#B0BEC5] hover:text-[#1F2937] dark:hover:text-[#F8FAFC] transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1">{children}</div>
      </EosCard>
    </div>
  );
};
