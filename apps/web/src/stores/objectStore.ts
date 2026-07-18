import { create } from 'zustand';

export interface AdvancedFilters {
  name?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  category?: string;
  condition?: string;
  location?: string;
  hasWarranty?: string;
  minPurchaseDate?: string;
  maxPurchaseDate?: string;
  minPrice?: string;
  maxPrice?: string;
  minAiScore?: string;
  maxAiScore?: string;
  minCarbonScore?: string;
  maxCarbonScore?: string;
  tags?: string;
}

interface ObjectState {
  viewMode: 'grid' | 'list';
  searchQuery: string;
  filters: AdvancedFilters;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  setViewMode: (mode: 'grid' | 'list') => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<AdvancedFilters>) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  resetFilters: () => void;
}

export const useObjectStore = create<ObjectState>((set) => ({
  viewMode: 'grid',
  searchQuery: '',
  filters: {},
  sortBy: 'createdAt',
  sortOrder: 'desc',
  
  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder: order }),
  
  resetFilters: () => set({
    searchQuery: '',
    filters: {},
    sortBy: 'createdAt',
    sortOrder: 'desc',
  }),
}));
