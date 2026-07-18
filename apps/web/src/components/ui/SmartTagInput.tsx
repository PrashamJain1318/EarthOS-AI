import React, { useState, useEffect, useRef } from 'react';
import { Tag as TagIcon, Plus, X, Search } from 'lucide-react';
import { usePopularTags, useTagSearch } from '../../hooks/useTaxonomy';
import { Typography } from '@earthos/ui';

interface SmartTagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
}

export const SmartTagInput: React.FC<SmartTagInputProps> = ({ tags, onChange, maxTags = 20 }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: popularTags } = usePopularTags(15);
  const { data: searchResults } = useTagSearch(input);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddTag = (tag: string) => {
    const cleanTag = tag.trim().toUpperCase();
    if (cleanTag && !tags.includes(cleanTag) && tags.length < maxTags) {
      onChange([...tags, cleanTag]);
      setInput('');
      setIsFocused(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(input);
    }
  };

  const showSuggestions = isFocused && (!input || (searchResults && searchResults.length > 0));

  return (
    <div className="flex flex-col gap-2.5 relative" ref={containerRef}>
      <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1]">Tags (Max {maxTags})</label>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#B0BEC5]">
          <Search size={16} />
        </div>
        <input 
          type="text" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          placeholder="Search or create tags..."
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32]" 
        />
        <button 
          type="button" 
          onClick={() => handleAddTag(input)} 
          className="absolute inset-y-1.5 right-1.5 px-3 bg-[#2E7D32]/10 hover:bg-[#2E7D32]/20 text-[#2E7D32] font-bold rounded-lg text-sm flex items-center gap-1 transition-colors"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-1">
        {tags.map(tag => (
          <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-[#2E7D32] text-white shadow-sm">
            {tag} 
            <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-red-200 transition-colors">
              <X size={12} strokeWidth={3} />
            </button>
          </span>
        ))}
      </div>

      {showSuggestions && (
        <div className="absolute top-[72px] left-0 right-0 z-50 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-slate-800 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
          {input && searchResults && searchResults.length > 0 && (
            <div className="p-2">
              <Typography variant="small" className="px-3 py-1 text-gray-500 font-bold uppercase tracking-wider text-[10px]">Matching Tags</Typography>
              <div className="flex flex-col">
                {searchResults.map(tag => (
                  <button 
                    key={tag._id} 
                    type="button" 
                    onClick={() => handleAddTag(tag.name)}
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg text-left transition-colors"
                  >
                    <span className="font-medium text-[#1F2937] dark:text-[#F8FAFC]">{tag.name}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 dark:bg-black/20 px-2 py-0.5 rounded-full">{tag.usageCount} uses</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!input && popularTags && popularTags.length > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-black/10 border-t border-gray-100 dark:border-slate-800">
              <Typography variant="small" className="text-gray-500 font-bold uppercase tracking-wider text-[10px] mb-3 flex items-center gap-1">
                <TagIcon size={12} /> Popular Tags
              </Typography>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button 
                    key={tag._id} 
                    type="button" 
                    onClick={() => handleAddTag(tag.name)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#162033] border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:border-[#2E7D32] hover:text-[#2E7D32] transition-colors shadow-sm"
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
