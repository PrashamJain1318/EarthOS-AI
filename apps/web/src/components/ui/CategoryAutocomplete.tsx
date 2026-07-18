import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, Check, FolderTree } from 'lucide-react';
import { useCategories } from '../../hooks/useTaxonomy';
import { Typography } from '@earthos/ui';

interface CategoryAutocompleteProps {
  category: string;
  subCategory?: string;
  onChange: (category: string, subCategory?: string) => void;
  error?: string;
}

export const CategoryAutocomplete: React.FC<CategoryAutocompleteProps> = ({ category, subCategory, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: topCategories, isLoading } = useCategories(search, null); // Parent categories
  
  // Find the selected parent category object to get its ID for subcategories
  const selectedParent = (topCategories || []).find(c => c.name.toUpperCase() === category?.toUpperCase());
  const { data: subCategories } = useCategories('', selectedParent?._id || undefined);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCategory = (catName: string) => {
    onChange(catName.toUpperCase(), ''); // Reset subcategory when category changes
    setSearch('');
  };

  const handleSelectSubCategory = (subCatName: string) => {
    onChange(category, subCatName.toUpperCase());
    setIsOpen(false);
  };

  const displayText = category ? (subCategory ? `${category} / ${subCategory}` : category) : 'Select Category...';

  return (
    <div className="flex flex-col gap-1.5 relative w-full" ref={containerRef}>
      <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Category & Sub-Category</label>
      
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 bg-white dark:bg-[#162033] border rounded-xl text-left flex items-center justify-between transition-colors ${
          error ? 'border-red-500' : isOpen ? 'border-[#2E7D32]' : 'border-[#B0BEC5] dark:border-[#263238]'
        }`}
      >
        <span className={`font-medium ${category ? 'text-[#1F2937] dark:text-[#F8FAFC]' : 'text-gray-400'}`}>
          {displayText}
        </span>
        <ChevronDown size={18} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}

      {isOpen && (
        <div className="absolute top-[72px] left-0 right-0 z-50 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-slate-800 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 flex flex-col max-h-[300px]">
          
          <div className="p-2 border-b border-gray-100 dark:border-slate-800 relative shrink-0">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-black/20 border border-transparent focus:border-[#2E7D32] rounded-lg text-sm outline-none text-[#1F2937] dark:text-white"
            />
          </div>

          <div className="flex flex-1 overflow-hidden min-h-[200px]">
            {/* Left Column: Top Categories */}
            <div className="w-1/2 border-r border-gray-100 dark:border-slate-800 overflow-y-auto p-1">
              {isLoading ? (
                <div className="p-4 text-center text-xs text-gray-500 animate-pulse">Loading...</div>
              ) : (topCategories || []).length === 0 ? (
                <div className="p-4 text-center text-xs text-gray-500">
                  {search ? 'No categories found.' : 'No categories yet.'}
                  <button type="button" onClick={() => handleSelectCategory(search)} className="block w-full mt-2 text-[#2E7D32] font-bold hover:underline">
                    Create "{search}"
                  </button>
                </div>
              ) : (
                (topCategories || []).map(cat => (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                      category?.toUpperCase() === cat.name.toUpperCase() 
                        ? 'bg-[#2E7D32]/10 text-[#2E7D32]' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    {cat.name}
                    {category?.toUpperCase() === cat.name.toUpperCase() && <Check size={14} />}
                  </button>
                ))
              )}
            </div>

            {/* Right Column: Sub Categories */}
            <div className="w-1/2 bg-gray-50 dark:bg-black/10 overflow-y-auto p-1 flex flex-col">
              {!category ? (
                <div className="flex-1 flex flex-col items-center justify-center p-4 text-gray-400 opacity-50">
                  <FolderTree size={32} className="mb-2" />
                  <Typography variant="small" className="text-center">Select a category to view sub-categories</Typography>
                </div>
              ) : (
                <>
                  <div className="px-3 py-2">
                    <Typography variant="small" className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                      Sub-categories
                    </Typography>
                  </div>
                  {/* Option to clear sub-category (just use parent) */}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      !subCategory 
                        ? 'bg-[#2E7D32]/10 text-[#2E7D32] font-bold' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'
                    }`}
                  >
                    <span className="italic">Any {category}</span>
                    {!subCategory && <Check size={14} />}
                  </button>
                  
                  {subCategories?.map(sub => (
                    <button
                      key={sub._id}
                      type="button"
                      onClick={() => handleSelectSubCategory(sub.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between mt-1 ${
                        subCategory?.toUpperCase() === sub.name.toUpperCase() 
                          ? 'bg-[#2E7D32]/10 text-[#2E7D32] font-bold' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-white/5'
                      }`}
                    >
                      {sub.name}
                      {subCategory?.toUpperCase() === sub.name.toUpperCase() && <Check size={14} />}
                    </button>
                  ))}

                  {/* Allow adding a custom subcategory if it doesn't exist */}
                  {search && !(subCategories || []).some(s => s.name.toUpperCase() === search.toUpperCase()) && (
                    <button
                      type="button"
                      onClick={() => handleSelectSubCategory(search)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#2E7D32] hover:bg-[#2E7D32]/10 transition-colors mt-2 font-semibold border border-dashed border-[#2E7D32]/50"
                    >
                      + Create "{search}"
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
