import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, EosButton, EosCard } from '@earthos/ui';
import { Plus, Package } from 'lucide-react';
import { useObjectStore } from '../stores/objectStore';
import { useAllObjects, useDeleteObject } from '../hooks/useObjects';
import { useDebounce } from '../hooks/useDebounce';
import { ObjectToolbar } from '../components/objects/ObjectToolbar';
import { ObjectList } from '../components/objects/ObjectList';
import { ObjectSkeleton } from '../components/objects/ObjectSkeleton';
import { ObjectError } from '../components/objects/ObjectError';

const PAGE_SIZE = 12;

export const Objects: React.FC = () => {
  const navigate = useNavigate();
  const store = useObjectStore();
  const debouncedSearch = useDebounce(store.searchQuery, 400);
  const [page, setPage] = React.useState(1);

  const { data: allObjects = [], isLoading, isError, error, refetch } = useAllObjects();
  const deleteMutation = useDeleteObject();

  // Reset pagination when filters change
  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearch, store.filters, store.sortBy, store.sortOrder]);

  const filteredAndSortedObjects = React.useMemo(() => {
    let result = [...allObjects];

    // Search
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(obj => 
        obj.objectName.toLowerCase().includes(q) ||
        (obj.brand && obj.brand.toLowerCase().includes(q)) ||
        (obj.model && obj.model.toLowerCase().includes(q)) ||
        (obj.category && obj.category.toLowerCase().includes(q))
      );
    }

    // Filters
    const f = store.filters;
    if (f.category) result = result.filter(obj => obj.category === f.category);
    if (f.brand) result = result.filter(obj => obj.brand?.toLowerCase().includes(f.brand!.toLowerCase()));
    if (f.model) result = result.filter(obj => obj.model?.toLowerCase().includes(f.model!.toLowerCase()));
    if (f.serialNumber) result = result.filter(obj => obj.serialNumber?.toLowerCase().includes(f.serialNumber!.toLowerCase()));
    if (f.condition) result = result.filter(obj => obj.condition === f.condition);
    if (f.hasWarranty) result = result.filter(obj => (f.hasWarranty === 'true' ? !!obj.warranty : !obj.warranty));
    
    // Dates
    if (f.minPurchaseDate) {
      const minDate = new Date(f.minPurchaseDate).getTime();
      result = result.filter(obj => obj.purchaseDate && new Date(obj.purchaseDate).getTime() >= minDate);
    }
    if (f.maxPurchaseDate) {
      const maxDate = new Date(f.maxPurchaseDate).getTime();
      result = result.filter(obj => obj.purchaseDate && new Date(obj.purchaseDate).getTime() <= maxDate);
    }

    // Price
    if (f.minPrice) {
      const min = parseFloat(f.minPrice);
      result = result.filter(obj => (obj.currentValue || obj.purchasePrice || 0) >= min);
    }
    if (f.maxPrice) {
      const max = parseFloat(f.maxPrice);
      result = result.filter(obj => (obj.currentValue || obj.purchasePrice || 0) <= max);
    }

    // Sort
    result.sort((a, b) => {
      let valA: any;
      let valB: any;

      switch (store.sortBy) {
        case 'objectName':
          valA = a.objectName.toLowerCase();
          valB = b.objectName.toLowerCase();
          break;
        case 'purchasePrice':
        case 'currentValue':
          valA = a.currentValue || a.purchasePrice || 0;
          valB = b.currentValue || b.purchasePrice || 0;
          break;
        case 'carbonScore':
          valA = a.carbonScore || 0;
          valB = b.carbonScore || 0;
          break;
        case 'aiScore':
          valA = a.aiScore || 0;
          valB = b.aiScore || 0;
          break;
        case 'updatedAt':
          valA = new Date(a.updatedAt).getTime();
          valB = new Date(b.updatedAt).getTime();
          break;
        case 'createdAt':
        default:
          valA = new Date(a.createdAt).getTime();
          valB = new Date(b.createdAt).getTime();
          break;
      }

      if (valA < valB) return store.sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return store.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [allObjects, debouncedSearch, store.filters, store.sortBy, store.sortOrder]);

  const visibleObjects = React.useMemo(() => {
    return filteredAndSortedObjects.slice(0, page * PAGE_SIZE);
  }, [filteredAndSortedObjects, page]);

  const hasNextPage = page * PAGE_SIZE < filteredAndSortedObjects.length;

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this object? This action cannot be undone.')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <main className="flex flex-col gap-6 select-none text-left w-full max-w-[1600px] mx-auto pb-12" aria-labelledby="objects-page-title">
      
      {/* Header and Add button row */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Typography variant="h3" id="objects-page-title" className="font-bold tracking-tight">My Objects</Typography>
          <Typography variant="small" className="text-[#B0BEC5]">Catalog of registered physical resources under custody.</Typography>
        </div>
        
        <EosButton 
          variant="primary" 
          onClick={() => navigate('/objects/new')}
          className="flex items-center gap-1.5 font-bold shrink-0"
        >
          <Plus size={16} />
          <span>Add Object</span>
        </EosButton>
      </header>

      <section aria-label="Object controls and filters">
        <ObjectToolbar />
      </section>

      {isLoading ? (
        <ObjectSkeleton viewMode={store.viewMode} />
      ) : isError ? (
        <ObjectError message={(error as Error)?.message} onRetry={() => refetch()} />
      ) : filteredAndSortedObjects.length === 0 ? (
        <EosCard variant="glass" className="h-72 flex flex-col items-center justify-center gap-4 text-center border border-dashed border-[#B0BEC5]/30 p-8">
          <div className="p-3 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-gray-400 dark:text-[#CBD5E1]">
            <Package size={36} />
          </div>
          <div>
            <Typography variant="h4" className="font-bold">
              {store.searchQuery || Object.keys(store.filters).length > 0 ? 'No matches found' : 'No registered objects'}
            </Typography>
            <Typography variant="small" className="text-[#B0BEC5] max-w-sm mt-1">
              {store.searchQuery || Object.keys(store.filters).length > 0
                ? 'Try adjusting your search or filters to find what you are looking for.'
                : 'Your resource catalog is empty. Scan an object or click below to record your first batch stream.'}
            </Typography>
          </div>
          {store.searchQuery || Object.keys(store.filters).length > 0 ? (
            <EosButton variant="secondary" onClick={() => store.resetFilters()} className="mt-2 font-bold">
              Clear Filters
            </EosButton>
          ) : (
            <EosButton 
              variant="secondary" 
              onClick={() => navigate('/objects/new')}
              className="font-bold border border-[#2E7D32]/25 hover:border-[#2E7D32]/50 text-[#2E7D32] bg-[#2E7D32]/5 hover:bg-[#2E7D32]/10 mt-2"
            >
              Register Resource Stream
            </EosButton>
          )}
        </EosCard>
      ) : (
        <ObjectList 
          objects={visibleObjects} 
          viewMode={store.viewMode} 
          onDelete={handleDelete}
          hasNextPage={hasNextPage}
          isFetchingNextPage={false}
          fetchNextPage={() => setPage(p => p + 1)}
        />
      )}

    </main>
  );
};
export default Objects;
