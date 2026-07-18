import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EosButton, EosInput, Typography } from '@earthos/ui';
import { X, Upload, Plus } from 'lucide-react';

const maintenanceSchema = z.object({
  title: z.string().min(1, 'Title is required').max(150),
  type: z.enum(['REPAIR', 'PREVENTATIVE', 'UPGRADE', 'INSPECTION']),
  date: z.string().min(1, 'Date is required'),
  cost: z.number().min(0).optional().nullable(),
  technicianNotes: z.string().max(2000).optional().nullable(),
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).default('COMPLETED')
});

type MaintenanceFormData = z.infer<typeof maintenanceSchema>;

interface AddMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MaintenanceFormData & { recordId: string; receipts: string[] }) => Promise<void>;
}

export const AddMaintenanceModal: React.FC<AddMaintenanceModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipts, setReceipts] = useState<File[]>([]);

  const { register, handleSubmit: hookFormSubmit, formState: { errors }, reset } = useForm<MaintenanceFormData>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      type: 'REPAIR',
      status: 'COMPLETED',
      cost: 0,
      date: new Date().toISOString().split('T')[0]
    }
  });

  if (!isOpen) return null;

  const handleFormSubmit = async (data: MaintenanceFormData) => {
    setIsSubmitting(true);
    try {
      // In a real app, we would upload the receipts files to a bucket and get URLs
      // For now, we mock the URLs
      const mockReceiptUrls = receipts.map((f, i) => `https://storage.earthos.ai/receipts/mock-${i}.pdf`);
      
      const payload = {
        recordId: Math.random().toString(36).substring(7),
        ...data,
        receipts: mockReceiptUrls
      };

      await onSubmit(payload);
      reset();
      setReceipts([]);
      onClose();
    } catch (error) {
      console.error('Failed to add maintenance record', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#162033] w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 border border-gray-100 dark:border-white/10"
      >
        <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
          <div>
            <Typography variant="h3" className="font-bold">Log Maintenance Event</Typography>
            <Typography variant="small" className="text-gray-500">Record a repair, upgrade, or inspection.</Typography>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form id="maintenance-form" onSubmit={hookFormSubmit(handleFormSubmit)} className="flex flex-col gap-6">
            
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <EosInput
                  label="Title / Summary"
                  placeholder="e.g. Battery Replacement"
                  error={errors.title?.message}
                  {...register('title')}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Type</label>
                <select 
                  {...register('type')}
                  className="w-full bg-white dark:bg-[#0B1220] border border-[#B0BEC5]/50 dark:border-[#263238] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCD4] transition-all"
                >
                  <option value="REPAIR">Repair</option>
                  <option value="PREVENTATIVE">Preventative</option>
                  <option value="UPGRADE">Upgrade</option>
                  <option value="INSPECTION">Inspection</option>
                </select>
                {errors.type && <span className="text-xs text-red-500">{errors.type.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Status</label>
                <select 
                  {...register('status')}
                  className="w-full bg-white dark:bg-[#0B1220] border border-[#B0BEC5]/50 dark:border-[#263238] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCD4] transition-all"
                >
                  <option value="COMPLETED">Completed</option>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
                {errors.status && <span className="text-xs text-red-500">{errors.status.message}</span>}
              </div>

              <EosInput
                label="Date"
                type="date"
                error={errors.date?.message}
                {...register('date')}
              />

              <EosInput
                label="Cost (USD)"
                type="number"
                step="0.01"
                min="0"
                error={errors.cost?.message}
                {...register('cost', { valueAsNumber: true })}
              />

              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Technician Notes</label>
                <textarea
                  {...register('technicianNotes')}
                  placeholder="Enter details about the maintenance work performed..."
                  rows={4}
                  className="w-full bg-white dark:bg-[#0B1220] border border-[#B0BEC5]/50 dark:border-[#263238] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCD4] transition-all resize-none"
                />
                {errors.technicianNotes && <span className="text-xs text-red-500">{errors.technicianNotes.message}</span>}
              </div>

              {/* Receipt Upload UI */}
              <div className="col-span-2">
                <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1] mb-2 block">Receipts & Documents</label>
                <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 bg-gray-50/50 dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    multiple 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files) {
                        setReceipts(prev => [...prev, ...Array.from(e.target.files!)]);
                      }
                    }}
                  />
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-full">
                    <Upload size={24} />
                  </div>
                  <div className="text-center">
                    <Typography variant="small" className="font-bold">Click or drag files here</Typography>
                    <Typography variant="small" className="text-gray-500">Supports PDF, JPG, PNG (Max 5MB)</Typography>
                  </div>
                </div>

                {receipts.length > 0 && (
                  <div className="mt-4 flex flex-col gap-2">
                    {receipts.map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl">
                        <Typography variant="small" className="font-medium truncate max-w-[80%]">{file.name}</Typography>
                        <button 
                          type="button" 
                          className="text-red-500 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                          onClick={() => setReceipts(prev => prev.filter((_, idx) => idx !== i))}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 flex items-center justify-end gap-3 shrink-0">
          <EosButton variant="secondary" onClick={onClose} disabled={isSubmitting}>Cancel</EosButton>
          <EosButton variant="primary" type="submit" form="maintenance-form" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? 'Saving...' : 'Save Record'}
            {!isSubmitting && <Plus size={16} />}
          </EosButton>
        </div>
      </div>
    </div>
  );
};
