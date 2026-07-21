import React from 'react';
import { EosInput, EosButton, Typography } from '@earthos/ui';
import { useObjectStore } from '../../stores/objectStore';
import { CategoryAutocomplete } from '../ui/CategoryAutocomplete';
import { FilterX } from 'lucide-react';

interface AdvancedSearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvancedSearchPanel: React.FC<AdvancedSearchPanelProps> = ({ isOpen, onClose }) => {
  const { filters, setFilters, resetFilters } = useObjectStore();

  if (!isOpen) return null;

  return (
    <div className="w-full bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-2xl p-6 mt-4 shadow-lg animate-in slide-in-from-top-4 fade-in duration-200">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold flex items-center gap-2">
          Advanced Filters
        </Typography>
        <EosButton variant="secondary" onClick={() => { resetFilters(); onClose(); }} className="flex items-center gap-1">
          <FilterX size={16} />
          Clear All
        </EosButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Core Attributes */}
        <EosInput
          label="Brand"
          placeholder="e.g. Apple, Dell"
          value={filters.brand || ''}
          onChange={e => setFilters({ brand: e.target.value })}
        />
        <EosInput
          label="Model"
          placeholder="e.g. MacBook Pro"
          value={filters.model || ''}
          onChange={e => setFilters({ model: e.target.value })}
        />
        <EosInput
          label="Serial Number"
          placeholder="Exact or partial match"
          value={filters.serialNumber || ''}
          onChange={e => setFilters({ serialNumber: e.target.value })}
        />
        <CategoryAutocomplete
          category={filters.category || ''}
          subCategory=""
          onChange={(cat) => setFilters({ category: cat })}
        />

        {/* Location & Dates */}
        <EosInput
          label="Location (City/Country)"
          placeholder="e.g. New York, USA"
          value={filters.location || ''}
          onChange={e => setFilters({ location: e.target.value })}
        />
        <EosInput
          label="Min Purchase Date"
          type="date"
          value={filters.minPurchaseDate ? filters.minPurchaseDate.split('T')[0] : ''}
          onChange={e => setFilters({ minPurchaseDate: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
        />
        <EosInput
          label="Max Purchase Date"
          type="date"
          value={filters.maxPurchaseDate ? filters.maxPurchaseDate.split('T')[0] : ''}
          onChange={e => setFilters({ maxPurchaseDate: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
        />
        
        {/* Value Range */}
        <EosInput
          label="Min Estimated Value ($)"
          type="number"
          placeholder="0"
          value={filters.minPrice || ''}
          onChange={e => setFilters({ minPrice: e.target.value })}
        />
        <EosInput
          label="Max Estimated Value ($)"
          type="number"
          placeholder="e.g. 5000"
          value={filters.maxPrice || ''}
          onChange={e => setFilters({ maxPrice: e.target.value })}
        />

        {/* State */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Condition</label>
          <select
            className="w-full px-4 py-2.5 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32]"
            value={filters.condition || ''}
            onChange={e => setFilters({ condition: e.target.value })}
          >
            <option value="">Any Condition</option>
            <option value="NEW">New</option>
            <option value="LIKE_NEW">Like New</option>
            <option value="GOOD">Good</option>
            <option value="FAIR">Fair</option>
            <option value="POOR">Poor</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Warranty Status</label>
          <select
            className="w-full px-4 py-2.5 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32]"
            value={filters.hasWarranty || ''}
            onChange={e => setFilters({ hasWarranty: e.target.value })}
          >
            <option value="">Any</option>
            <option value="true">Active Warranty</option>
            <option value="false">Expired / None</option>
          </select>
        </div>
      </div>
    </div>
  );
};
