import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, EosButton, EosCard } from '@earthos/ui';
import { Plus, Package } from 'lucide-react';
import { useObjectStore } from '../stores/objectStore';
import { useInfiniteObjects, useDeleteObject } from '../hooks/useObjects';
import { useDebounce } from '../hooks/useDebounce';
import { ObjectToolbar } from '../components/objects/ObjectToolbar';
import { ObjectList } from '../components/objects/ObjectList';
import { ObjectSkeleton } from '../components/objects/ObjectSkeleton';
import { ObjectError } from '../components/objects/ObjectError';

export const Objects: React.FC = () => {
  const navigate = useNavigate();
  const store = useObjectStore();
  const debouncedSearch = useDebounce(store.searchQuery, 400);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteObjects({
    q: debouncedSearch,
    ...store.filters,
    sortBy: store.sortBy,
    sortOrder: store.sortOrder
  });

  const deleteMutation = useDeleteObject();

  // Flatten the infinite query pages into a single array of objects
  const objects = React.useMemo(() => {
    return data?.pages.flatMap(page => page.data) || [];
  }, [data]);

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
      ) : objects.length === 0 ? (
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
          objects={objects} 
          viewMode={store.viewMode} 
          onDelete={handleDelete}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}

    </main>
  );
};
export default Objects;
