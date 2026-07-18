import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Plus, 
  Globe, 
  Calendar,
  MapPin,
  FileText
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const CATEGORIES = [
  'ELECTRONICS', 'TEXTILES', 'METALS', 'PLASTICS',
  'ORGANICS', 'GLASS', 'PAPER', 'WOOD', 'CHEMICALS', 'OTHER'
] as const;

const CONDITIONS = [
  'NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR', 'DAMAGED', 'NON_FUNCTIONAL'
] as const;

// ─── Client Validation Schema ────────────────────────────

const objectFormSchema = z.object({
  objectName: z.string().min(1, 'Object name is required.').max(200),
  description: z.string().max(2000).optional(),
  category: z.enum(CATEGORIES, { errorMap: () => ({ message: 'Please select a category.' }) }),
  subCategory: z.string().max(100).optional(),
  brand: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  serialNumber: z.string().optional(),
  purchaseDate: z.string().optional(),
  purchasePrice: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().min(0, 'Price cannot be negative.').optional()),
  currency: z.string().max(5).default('USD'),
  currentValue: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().min(0, 'Value cannot be negative.').optional()),
  condition: z.enum(CONDITIONS),
  quantity: z.preprocess((val) => (val === '' ? 1 : Number(val)), z.number().int().min(1, 'Quantity must be at least 1.').default(1)),
  warrantyExpiry: z.string().optional(),
  maintenanceDate: z.string().optional(),
  location: z.object({
    address: z.string().max(300).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    country: z.string().max(100).optional(),
  }).optional(),
  notes: z.string().max(5000).optional(),
});

type ObjectFormValues = z.infer<typeof objectFormSchema>;

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info';
}

export const AddObject: React.FC = () => {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Tags chip state
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // Image Upload queue simulation state
  const [images, setImages] = useState<{ id: string; url: string; file: File; progress: number }[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ObjectFormValues>({
    resolver: zodResolver(objectFormSchema),
    defaultValues: {
      category: 'ELECTRONICS',
      condition: 'GOOD',
      quantity: 1,
      currency: 'USD',
      location: {
        address: '',
        city: '',
        state: '',
        country: ''
      }
    }
  });

  // Handle Dynamic Tag addition
  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    e.preventDefault();
    const cleanTag = tagInput.trim().toUpperCase();
    if (cleanTag && !tags.includes(cleanTag) && tags.length < 20) {
      setTags([...tags, cleanTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Image Upload handlers simulation
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (images.length >= 10) return;
      const id = Math.random().toString(36).substring(7);
      const url = URL.createObjectURL(file);
      
      const newImg = { id, url, file, progress: 10 };
      setImages(prev => [...prev, newImg]);

      // Simulate upload progression
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
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter(img => img.id !== idToRemove);
    });
  };

  // Handle form submission and API call
  const onSubmit = async (values: ObjectFormValues) => {
    setIsSubmitting(true);
    setApiError(null);

    // Filter images that successfully finished upload simulation
    const uploadedUrls = images
      .filter(img => img.progress === 100)
      .map((_, i) => `https://images.unsplash.com/photo-${1600000000000 + i}?auto=format&fit=crop&w=600&q=80`);

    // Fallback default image if none uploaded
    const finalImages = uploadedUrls.length > 0 ? uploadedUrls : [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'
    ];

    const finalPayload = {
      ...values,
      tags,
      images: finalImages,
      aiScore: Math.floor(65 + Math.random() * 30), // mock premium carbon-index metrics
      carbonScore: Math.floor(70 + Math.random() * 25),
      lifecycleStage: 'ACTIVE',
      donationStatus: 'NONE',
      marketplaceStatus: 'NONE',
      archived: false
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/objects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken || 'mock_jwt_access_token'}`
        },
        body: JSON.stringify(finalPayload)
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error?.message || 'Failed to register resource object.');
      }

      setToast({
        id: 'success-add-object',
        message: `Registered ${resData.data.objectName} successfully as ID: ${resData.data.objectId}`,
        type: 'success'
      });

      // Clear temp blobs
      images.forEach(img => URL.revokeObjectURL(img.url));

      // Redirect back to catalog
      setTimeout(() => {
        navigate('/objects');
      }, 1500);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during object registration.';
      setApiError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 select-none relative pb-16">
      
      {/* Toast Notification Container */}
      <div className="fixed top-6 right-6 z-50">
        <AnimatePresence>
          {toast && (
            <EosToast
              id={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Header row */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/objects')}
          className="p-2 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-gray-500 hover:text-[#1F2937] dark:hover:text-[#F8FAFC] transition-colors"
          aria-label="Back to catalog"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <Typography variant="h3" className="font-bold tracking-tight">Register Stream</Typography>
          <Typography variant="small" className="text-gray-400">Record a new physical asset or raw material stream into the resource grid.</Typography>
        </div>
      </div>

      {apiError && (
        <EosCard variant="default" className="p-4 border-red-500/20 bg-red-500/5 text-red-500 text-xs font-semibold flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{apiError}</span>
        </EosCard>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        
        {/* SECTION 1: Core Details */}
        <EosCard variant="glass" className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3">
            <Box size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">General Details</Typography>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <EosInput
              label="Object/Asset Name"
              placeholder="e.g. Recycled Copper Batch A-12"
              error={errors.objectName?.message}
              {...register('objectName')}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Resource Category</label>
              <select
                className="w-full px-4 py-2.5 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32] transition-colors"
                {...register('category')}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <EosInput
              label="Sub-Category"
              placeholder="e.g. Heavy wires, High purity"
              error={errors.subCategory?.message}
              {...register('subCategory')}
            />

            <EosInput
              label="Quantity"
              type="number"
              placeholder="1"
              error={errors.quantity?.message}
              {...register('quantity')}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Resource Description</label>
            <textarea
              rows={3}
              placeholder="Detailed description of composition, circular origin, or extraction notes..."
              className="w-full px-4 py-2.5 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32] transition-colors text-sm resize-none"
              {...register('description')}
            />
            {errors.description?.message && (
              <span className="text-xs text-red-500 font-medium">{errors.description.message}</span>
            )}
          </div>
        </EosCard>

        {/* SECTION 2: Identifiers & Metadata */}
        <EosCard variant="glass" className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3">
            <Globe size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">Identifiers & Make</Typography>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <EosInput
              label="Brand / Producer"
              placeholder="e.g. Rio Tinto"
              error={errors.brand?.message}
              {...register('brand')}
            />

            <EosInput
              label="Model"
              placeholder="e.g. RT-Cu-99"
              error={errors.model?.message}
              {...register('model')}
            />

            <EosInput
              label="Serial / Batch Number"
              placeholder="e.g. SN-884930-X"
              error={errors.serialNumber?.message}
              {...register('serialNumber')}
            />
          </div>
        </EosCard>

        {/* SECTION 3: Financial & Lifespans */}
        <EosCard variant="glass" className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3">
            <Calendar size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">Finances & Life Cycle</Typography>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <EosInput
              label="Acquisition Cost"
              type="number"
              step="any"
              placeholder="0.00"
              error={errors.purchasePrice?.message}
              {...register('purchasePrice')}
            />

            <EosInput
              label="Current Assessed Value"
              type="number"
              step="any"
              placeholder="0.00"
              error={errors.currentValue?.message}
              {...register('currentValue')}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Asset Condition</label>
              <select
                className="w-full px-4 py-2.5 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32] transition-colors"
                {...register('condition')}
              >
                {CONDITIONS.map(cond => (
                  <option key={cond} value={cond}>{cond.replace('_', ' ')}</option>
                ))}
              </select>
            </div>

            <EosInput
              label="Purchase/Logging Date"
              type="date"
              error={errors.purchaseDate?.message}
              {...register('purchaseDate')}
            />

            <EosInput
              label="Warranty Expiration"
              type="date"
              error={errors.warrantyExpiry?.message}
              {...register('warrantyExpiry')}
            />

            <EosInput
              label="Next Maintenance Logging"
              type="date"
              error={errors.maintenanceDate?.message}
              {...register('maintenanceDate')}
            />
          </div>
        </EosCard>

        {/* SECTION 4: Location & Origin Tracking */}
        <EosCard variant="glass" className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3">
            <MapPin size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">Origin & Address Location</Typography>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <EosInput
                label="Physical Address"
                placeholder="e.g. Warehouse Block C, 142 Green Alley"
                error={errors.location?.address?.message}
                {...register('location.address')}
              />
            </div>

            <EosInput
              label="City"
              placeholder="e.g. Mumbai"
              error={errors.location?.city?.message}
              {...register('location.city')}
            />

            <div className="grid grid-cols-2 gap-4">
              <EosInput
                label="State / Province"
                placeholder="MH"
                error={errors.location?.state?.message}
                {...register('location.state')}
              />
              <EosInput
                label="Country"
                placeholder="IN"
                error={errors.location?.country?.message}
                {...register('location.country')}
              />
            </div>
          </div>
        </EosCard>

        {/* SECTION 5: Dynamic Tags & File Attachments */}
        <EosCard variant="glass" className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3">
            <Tag size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">Telemetry Tags & Imagery Attachments</Typography>
          </div>

          {/* Tags entry panel */}
          <div className="flex flex-col gap-2.5 text-left">
            <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Asset Telemetry Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. COPPER, CIRCULAR_A, BIO_A"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddTag(e)}
                className="flex-1 px-4 py-2 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32] transition-colors text-sm"
              />
              <EosButton variant="secondary" onClick={handleAddTag} className="shrink-0 flex items-center gap-1 font-bold">
                <Plus size={14} />
                <span>Add Tag</span>
              </EosButton>
            </div>
            
            {/* Tags display grid */}
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {tags.map(tag => (
                <span 
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-mono bg-[#2E7D32]/10 border border-[#2E7D32]/25 text-[#2E7D32]"
                >
                  <span>{tag}</span>
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-red-500 transition-colors">
                    &times;
                  </button>
                </span>
              ))}
              {tags.length === 0 && (
                <span className="text-xs text-gray-400 italic">No tags associated yet.</span>
              )}
            </div>
          </div>

          {/* Premium Image Upload Dropzone */}
          <div className="flex flex-col gap-2.5 text-left mt-2">
            <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Imagery Attachments (Max 10)</label>
            
            <div className="border border-dashed border-[#B0BEC5]/50 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-gray-50/20 dark:bg-black/5 hover:bg-gray-50/50 dark:hover:bg-black/10 transition-colors cursor-pointer relative">
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageChange}
                disabled={images.length >= 10}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud size={32} className="text-[#2E7D32]" />
              <div className="text-center">
                <p className="text-xs font-bold text-[#1F2937] dark:text-[#CBD5E1]">Drag and drop images here, or click to browse</p>
                <p className="text-[10px] text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB each. Max 10 images total.</p>
              </div>
            </div>

            {/* Uploading progress list */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {images.map(img => (
                <div 
                  key={img.id}
                  className="relative group aspect-square rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-black/10 flex items-center justify-center"
                >
                  <img src={img.url} alt="Upload preview" className="w-full h-full object-cover select-none" />
                  
                  {/* Progress overlay */}
                  {img.progress < 100 && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-3 gap-2">
                      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#2E7D32] h-full transition-all duration-100" style={{ width: `${img.progress}%` }} />
                      </div>
                      <span className="text-[10px] text-white font-mono font-bold">{img.progress}%</span>
                    </div>
                  )}

                  {/* Hover controls delete button */}
                  {img.progress === 100 && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button" 
                        onClick={() => handleRemoveImage(img.id)}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </EosCard>

        {/* SECTION 6: Notes Area */}
        <EosCard variant="glass" className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3">
            <FileText size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">Additional Notes</Typography>
          </div>

          <div className="flex flex-col gap-1.5">
            <textarea
              rows={4}
              placeholder="Internal tracking notes, special storage metrics, environmental compliance records..."
              className="w-full px-4 py-2.5 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32] transition-colors text-sm resize-none"
              {...register('notes')}
            />
            {errors.notes?.message && (
              <span className="text-xs text-red-500 font-medium">{errors.notes.message}</span>
            )}
          </div>
        </EosCard>

        {/* Form submit actions */}
        <div className="flex items-center justify-end gap-4 mt-2">
          <EosButton
            variant="secondary"
            type="button"
            onClick={() => navigate('/objects')}
            disabled={isSubmitting}
            className="px-6 py-2.5 font-bold"
          >
            Cancel
          </EosButton>
          <EosButton
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2.5 font-bold min-w-[160px] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <EosSpinner size="sm" />
                <span>Registering...</span>
              </>
            ) : (
              <span>Confirm Registration</span>
            )}
          </EosButton>
        </div>

      </form>
    </div>
  );
};

export default AddObject;
