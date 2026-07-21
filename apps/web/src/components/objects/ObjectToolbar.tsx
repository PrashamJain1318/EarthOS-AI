import React from 'react';
import { EosInput } from '@earthos/ui';
import { Search, LayoutGrid, List as ListIcon, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { useObjectStore } from '../../stores/objectStore';
import { AdvancedSearchPanel } from './AdvancedSearchPanel';

export const ObjectToolbar: React.FC = () => {
  const { 
    viewMode, setViewMode, 
    searchQuery, setSearchQuery, 
    sortBy, setSortBy,
    sortOrder, setSortOrder,
    filters
  } = useObjectStore();

  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between w-full">
      <div className="flex-1 w-full md:max-w-md relative">
        <EosInput
          placeholder="Search objects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search size={18} />}
          className="w-full"
        />
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors ${
              isAdvancedOpen || Object.keys(filters).length > 0
                ? 'bg-[#2E7D32]/10 border-[#2E7D32]/30 text-[#2E7D32]' 
                : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal size={14} />
            <span className="text-sm font-semibold">Filters</span>
            {Object.keys(filters).length > 0 && (
              <span className="bg-[#2E7D32] text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">
                {Object.keys(filters).length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center bg-gray-100 dark:bg-white/5 rounded-lg p-1 border border-gray-200 dark:border-white/10 shrink-0">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-sm border-none outline-none pl-2 pr-6 py-1.5 text-gray-700 dark:text-gray-300 appearance-none cursor-pointer"
          >
            <option value="createdAt">Recent</option>
            <option value="updatedAt">Recently Updated</option>
            <option value="objectName">Name</option>
            <option value="purchasePrice">Price</option>
            <option value="currentValue">Value</option>
            <option value="carbonScore">Carbon Score</option>
            <option value="aiScore">AI Score</option>
          </select>
          <button 
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded mr-1 transition-colors"
            title={sortOrder === 'asc' ? "Ascending" : "Descending"}
          >
            <ArrowUpDown size={14} className={`text-gray-400 transition-transform ${sortOrder === 'asc' ? '' : 'rotate-180'}`} />
          </button>
        </div>

        <div className="flex items-center bg-gray-100 dark:bg-white/5 rounded-lg p-1 border border-gray-200 dark:border-white/10 shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-white/10 shadow-sm text-[#2E7D32] dark:text-[#4CAF50]' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
            aria-label="Grid view"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-white/10 shadow-sm text-[#2E7D32] dark:text-[#4CAF50]' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
            aria-label="List view"
          >
            <ListIcon size={18} />
          </button>
        </div>
      </div>
      </div>

      <AdvancedSearchPanel isOpen={isAdvancedOpen} onClose={() => setIsAdvancedOpen(false)} />
    </div>
  );
};
