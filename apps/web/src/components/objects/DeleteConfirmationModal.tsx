import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, EosButton } from '@earthos/ui';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  objectName: string;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  objectName 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
          >
            <div className="bg-white dark:bg-[#162033] border border-gray-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl pointer-events-auto flex flex-col gap-6">
              
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 text-red-500">
                  <div className="p-3 bg-red-500/10 rounded-xl">
                    <AlertTriangle size={24} />
                  </div>
                  <Typography variant="h4" className="font-bold">Delete Object</Typography>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg text-gray-400 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <Typography variant="body" className="text-gray-600 dark:text-gray-300">
                  Are you sure you want to permanently delete <strong className="text-gray-900 dark:text-white">{objectName}</strong>?
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  This action will remove all associated digital twin data, telemetry history, and carbon footprint analytics.
                </Typography>
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <EosButton variant="secondary" onClick={onClose} className="font-bold">
                  Cancel
                </EosButton>
                <EosButton variant="primary" onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white border-none font-bold">
                  Yes, Delete Object
                </EosButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
