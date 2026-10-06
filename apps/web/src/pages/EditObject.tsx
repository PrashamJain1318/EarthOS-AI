import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence } from 'framer-motion';
import { 
  Typography, 
  EosButton, 
  EosCard, 
  EosInput, 
  EosToast,
  EosSpinner 
} from '@earthos/ui';
import { 
  Box, 
  Tag, 
  UploadCloud, 
  Trash2, 
  ArrowLeft, 
  Globe, 
  Calendar,
  FileText,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { useObject, useUpdateObject, useDeleteObject } from '../hooks/useObjects';
import { ObjectItem } from '../services/objectService';
import { DeleteConfirmationModal } from '../components/objects/DeleteConfirmationModal';
import { ObjectDetailsSkeleton } from '../components/objects/details/ObjectDetailsSkeleton';
import { SmartTagInput } from '../components/ui/SmartTagInput';
import { CategoryAutocomplete } from '../components/ui/CategoryAutocomplete';

// Removed hardcoded CATEGORIES since we are using dynamic ones from the backend.

const CONDITIONS = [
  'NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR', 'DAMAGED', 'NON_FUNCTIONAL'
] as const;

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const objectFormSchema = z.object({
  objectName: z.string().min(1, 'Object name is required.').max(200),
  description: z.string().max(2000).optional().nullable(),
  category: z.string().min(1, 'Please select a category.'),
  subCategory: z.string().max(100).optional().nullable(),
  brand: z.string().max(100).optional().nullable(),
  model: z.string().max(100).optional().nullable(),
  serialNumber: z.string().optional().nullable(),
  purchaseDate: z.string().optional().nullable(),
  purchasePrice: z.preprocess((val) => (val === '' || val === null ? undefined : Number(val)), z.number().min(0, 'Price cannot be negative.').optional()),
  currency: z.string().max(5).default('USD'),
  currentValue: z.preprocess((val) => (val === '' || val === null ? undefined : Number(val)), z.number().min(0, 'Value cannot be negative.').optional()),
  condition: z.enum(CONDITIONS),
  quantity: z.preprocess((val) => (val === '' || val === null ? 1 : Number(val)), z.number().int().min(1, 'Quantity must be at least 1.').default(1)),
  warrantyExpiry: z.string().optional().nullable(),
  maintenanceDate: z.string().optional().nullable(),
  location: z.object({
    address: z.string().max(300).optional().nullable(),
    city: z.string().max(100).optional().nullable(),
    state: z.string().max(100).optional().nullable(),
    country: z.string().max(100).optional().nullable(),
  }).optional().nullable(),
  warranty: z.object({
    provider: z.string().max(100).optional().nullable(),
    contact: z.string().max(200).optional().nullable(),
  }).optional().nullable(),
  notes: z.string().max(5000).optional().nullable(),
});

type ObjectFormValues = z.infer<typeof objectFormSchema>;

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  action?: { label: string; onClick: () => void };
}

export const EditObject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: object, isLoading: isFetching, isError } = useObject(id!);
  const { mutateAsync: updateObject } = useUpdateObject();
  const { mutateAsync: deleteObject } = useDeleteObject();

  const [toast, setToast] = useState<ToastState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLock = useRef(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [reminders, setReminders] = useState<number[]>([]);
  
  // Mixed state of existing urls and new files
  const [images, setImages] = useState<{ id: string; url: string; file?: File; progress: number }[]>([]);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTimeoutRef, setDeleteTimeoutRef] = useState<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ObjectFormValues>({
    resolver: zodResolver(objectFormSchema),
    defaultValues: {
      condition: 'GOOD',
      quantity: 1,
      currency: 'USD',
      category: ''
    }
  });

  // Pre-fill form when data arrives
  useEffect(() => {
    if (object) {
      reset({
        objectName: object.objectName,
        description: object.description,
        category: object.category,
        subCategory: object.subCategory,
        brand: object.brand,
        model: object.model,
        serialNumber: object.serialNumber,
        purchaseDate: object.purchaseDate ? object.purchaseDate.split('T')[0] : '',
        purchasePrice: object.purchasePrice,
        currency: object.currency || 'USD',
        currentValue: object.currentValue,
        condition: object.condition as typeof CONDITIONS[number],
        quantity: object.quantity,
        warrantyExpiry: object.warrantyExpiry ? object.warrantyExpiry.split('T')[0] : '',
        warranty: {
          provider: object.warranty?.provider || '',
          contact: object.warranty?.contact || '',
        },
        maintenanceDate: object.maintenanceDate ? object.maintenanceDate.split('T')[0] : '',
        location: object.location,
        notes: object.notes,
      });
      setTags(object.tags || []);
      setReminders(object.warranty?.reminders || []);
      
      const existingImages = (object.images || []).map((url, i) => ({
        id: `existing-${i}`,
        url,
        progress: 100
      }));
      setImages(existingImages);
    }
  }, [object, reset]);

  // Image Handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (images.length >= 10) return;
      const id = Math.random().toString(36).substring(7);
      const url = URL.createObjectURL(file);
      
      const newImg = { id, url, file, progress: 10 };
      setImages(prev => [...prev, newImg]);

      let currentProgress = 10;
      const interval = setInterval(() => {
        currentProgress += 15;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
        }
        setImages(prev => prev.map(img => img.id === id ? { ...img, progress: currentProgress } : img));
      }, 100);
    });
  };

  const handleRemoveImage = (idToRemove: string) => {
    setImages(prev => {
      const target = prev.find(img => img.id === idToRemove);
      if (target && target.file) URL.revokeObjectURL(target.url);
      return prev.filter(img => img.id !== idToRemove);
    });
  };

  // Update Submission
  const onSubmit = async (values: ObjectFormValues) => {
    if (submitLock.current) return;
    submitLock.current = true;
    setIsSubmitting(true);
    setApiError(null);

    const validImages = images.filter(img => img.progress === 100);
    const finalImages = await Promise.all(
      validImages.map(async img => {
        if (img.file) return await fileToBase64(img.file);
        return img.url;
      })
    );

    const finalPayload = {
      ...values,
      tags,
      warranty: {
        ...values.warranty,
        reminders,
        documents: object?.warranty?.documents || [] // Preserve existing until file upload fully implemented
      },
      images: finalImages,
    };

    try {
      await updateObject({ id: id!, data: finalPayload as Partial<ObjectItem> });

      setToast({
        id: 'success-update-object',
        message: 'Object updated successfully.',
        type: 'success'
      });

      images.forEach(img => {
        if (img.file) URL.revokeObjectURL(img.url);
      });

      setTimeout(() => {
        navigate(`/objects/${id}`);
      }, 1500);

    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Failed to update object.');
      setIsSubmitting(false);
      submitLock.current = false;
    }
  };

  // Delete Handlers with Undo Strategy
  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    
    setToast({
      id: 'undo-delete',
      message: 'Object queued for deletion in 5 seconds...',
      type: 'warning',
      action: {
        label: 'UNDO',
        onClick: handleUndoDelete
      }
    });

    const timeoutId = setTimeout(async () => {
      try {
        await deleteObject(id!);
        setToast(null);
        navigate('/objects', { replace: true });
      } catch (err) {
        setToast({ id: 'err-delete', message: 'Failed to delete object.', type: 'error' });
      }
    }, 5000);

    setDeleteTimeoutRef(timeoutId);
  };

  const handleUndoDelete = () => {
    if (deleteTimeoutRef) {
      clearTimeout(deleteTimeoutRef);
      setDeleteTimeoutRef(null);
      setToast({
        id: 'undo-success',
        message: 'Deletion cancelled.',
        type: 'info'
      });
    }
  };

  if (isFetching) {
    return <div className="max-w-4xl mx-auto pb-16"><ObjectDetailsSkeleton /></div>;
  }

  if (isError || !object) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center h-64 gap-4">
        <AlertCircle size={48} className="text-red-500" />
        <Typography variant="h4">Object not found</Typography>
        <EosButton variant="secondary" onClick={() => navigate('/objects')}>Back to Objects</EosButton>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 select-none relative pb-16">
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        objectName={object.objectName}
      />

      <div className="fixed top-6 right-6 z-50">
        <AnimatePresence>
          {toast && (
            <EosToast
              id={toast.id}
              message={toast.message}
              type={toast.type}
              action={toast.action}
              onClose={() => setToast(null)}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(`/objects/${id}`)}
            className="p-2 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-gray-500 hover:text-[#1F2937] dark:hover:text-[#F8FAFC] transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <Typography variant="h3" className="font-bold tracking-tight">Edit Object</Typography>
            <Typography variant="small" className="text-gray-400">Update details for {object.objectId}</Typography>
          </div>
        </div>
        <EosButton variant="secondary" onClick={() => setIsDeleteModalOpen(true)} className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 border-red-200 dark:border-red-500/20 font-bold">
          <Trash2 size={16} className="mr-1.5" /> Delete Object
        </EosButton>
      </div>

      {apiError && (
        <EosCard variant="default" className="p-4 border-red-500/20 bg-red-500/5 text-red-500 text-xs font-semibold flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{apiError}</span>
        </EosCard>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        
        {/* Core Details */}
        <EosCard variant="glass" className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3">
            <Box size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">General Details</Typography>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <EosInput label="Object Name" error={errors.objectName?.message} {...register('objectName')} />
            
            <CategoryAutocomplete 
              category={watch('category')}
              subCategory={watch('subCategory') || ''}
              onChange={(cat, sub) => {
                setValue('category', cat, { shouldValidate: true });
                setValue('subCategory', sub || '', { shouldValidate: true });
              }}
              error={errors.category?.message}
            />

            <EosInput label="Quantity" type="number" error={errors.quantity?.message} {...register('quantity')} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Description</label>
            <textarea rows={3} className="w-full px-4 py-2.5 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32] text-sm resize-none" {...register('description')} />
          </div>
        </EosCard>

        {/* Identifiers */}
        <EosCard variant="glass" className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3">
            <Globe size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">Identifiers & Make</Typography>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <EosInput label="Brand / Producer" error={errors.brand?.message} {...register('brand')} />
            <EosInput label="Model" error={errors.model?.message} {...register('model')} />
            <EosInput label="Serial Number" error={errors.serialNumber?.message} {...register('serialNumber')} />
          </div>
        </EosCard>

        {/* Financials & Lifespan */}
        <EosCard variant="glass" className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3">
            <Calendar size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">Finances & Life Cycle</Typography>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <EosInput label="Acquisition Cost" type="number" step="any" error={errors.purchasePrice?.message} {...register('purchasePrice')} />
            <EosInput label="Current Value" type="number" step="any" error={errors.currentValue?.message} {...register('currentValue')} />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Condition</label>
              <select className="w-full px-4 py-2.5 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32]" {...register('condition')}>
                {CONDITIONS.map(cond => <option key={cond} value={cond}>{cond.replace('_', ' ')}</option>)}
              </select>
            </div>
            <EosInput label="Purchase Date" type="date" error={errors.purchaseDate?.message} {...register('purchaseDate')} />
            <EosInput label="Warranty Expiry" type="date" error={errors.warrantyExpiry?.message} {...register('warrantyExpiry')} />
            <EosInput label="Next Maintenance" type="date" error={errors.maintenanceDate?.message} {...register('maintenanceDate')} />
          </div>
        </EosCard>

        {/* Warranty Details */}
        <EosCard variant="glass" className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3">
            <ShieldCheck size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">Warranty Information</Typography>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <EosInput
              label="Service Provider / Brand"
              placeholder="e.g. Apple Care"
              error={errors.warranty?.provider?.message}
              {...register('warranty.provider')}
            />

            <EosInput
              label="Contact Info"
              placeholder="e.g. 1-800-MY-APPLE or support@apple.com"
              error={errors.warranty?.contact?.message}
              {...register('warranty.contact')}
            />

            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Expiry Reminders</label>
              <div className="flex flex-wrap gap-3">
                {[30, 14, 7, 1].map(days => (
                  <label key={days} className="flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={reminders.includes(days)}
                      onChange={(e) => {
                        if (e.target.checked) setReminders(prev => [...prev, days]);
                        else setReminders(prev => prev.filter(d => d !== days));
                      }}
                      className="accent-[#2E7D32]"
                    />
                    <span className="text-sm font-medium">{days} Days Before</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </EosCard>

        {/* Location */}
        <EosCard variant="glass" className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3">
            <MapPin size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">Location</Typography>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <EosInput label="Address" error={errors.location?.address?.message} {...register('location.address')} />
            </div>
            <EosInput label="City" error={errors.location?.city?.message} {...register('location.city')} />
            <div className="grid grid-cols-2 gap-4">
              <EosInput label="State" error={errors.location?.state?.message} {...register('location.state')} />
              <EosInput label="Country" error={errors.location?.country?.message} {...register('location.country')} />
            </div>
          </div>
        </EosCard>

        {/* Tags & Images */}
        <EosCard variant="glass" className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3">
            <Tag size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">Tags & Images</Typography>
          </div>

          <SmartTagInput 
            tags={tags} 
            onChange={setTags} 
            maxTags={20} 
          />

          <div className="flex flex-col gap-2.5 mt-2">
            <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Images (Max 10)</label>
            <div className="border border-dashed border-[#B0BEC5]/50 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-gray-50/20 dark:bg-black/5 hover:bg-gray-50/50 dark:hover:bg-black/10 cursor-pointer relative">
              <input type="file" multiple accept="image/*" onChange={handleImageChange} disabled={images.length >= 10} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <UploadCloud size={32} className="text-[#2E7D32]" />
              <div className="text-center">
                <p className="text-xs font-bold text-[#1F2937] dark:text-[#CBD5E1]">Click to upload or drag files here</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {images.map(img => (
                <div key={img.id} className="relative group aspect-square rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-black/10 flex items-center justify-center">
                  <img src={img.url} alt="Upload preview" loading="lazy" className="w-full h-full object-cover" />
                  {img.progress < 100 && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-3 gap-2">
                      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#2E7D32] h-full" style={{ width: `${img.progress}%` }} />
                      </div>
                    </div>
                  )}
                  {img.progress === 100 && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={() => handleRemoveImage(img.id)} className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </EosCard>

        {/* Notes Area */}
        <EosCard variant="glass" className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3">
            <FileText size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">Additional Notes</Typography>
          </div>
          <div className="flex flex-col gap-1.5">
            <textarea rows={4} className="w-full px-4 py-2.5 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32] text-sm resize-none" {...register('notes')} />
          </div>
        </EosCard>

        <div className="flex items-center justify-end gap-4 mt-2">
          <EosButton variant="secondary" type="button" onClick={() => navigate(`/objects/${id}`)} disabled={isSubmitting} className="px-6 py-2.5 font-bold">
            Cancel
          </EosButton>
          <EosButton variant="primary" type="submit" disabled={isSubmitting} className="px-8 py-2.5 font-bold min-w-[160px] flex items-center justify-center gap-2">
            {isSubmitting ? <><EosSpinner size="sm" /><span>Updating...</span></> : <span>Save Changes</span>}
          </EosButton>
        </div>
      </form>
    </div>
  );
};
