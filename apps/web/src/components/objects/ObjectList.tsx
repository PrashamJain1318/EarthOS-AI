import React, { useEffect, useRef } from 'react';
import { ObjectCard } from './ObjectCard';
import { ObjectItem } from '../../services/objectService';
import { EosButton } from '@earthos/ui';
import { motion, AnimatePresence } from 'framer-motion';

interface ObjectListProps {
  objects: ObjectItem[];
  viewMode: 'grid' | 'list';
  onDelete: (id: string) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export const ObjectList: React.FC<ObjectListProps> = ({ 
  objects, 
  viewMode, 
  onDelete, 
  hasNextPage, 
  isFetchingNextPage, 
  fetchNextPage 
}) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.05, delayChildren: 0.1 } 
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-4 w-full"
      >
        <AnimatePresence>
        {objects.map((obj) => (
          <ObjectCard key={obj._id} object={obj} viewMode="list" onDelete={onDelete} />
        ))}
        </AnimatePresence>
        {hasNextPage && (
          <div ref={loadMoreRef} className="py-4 flex justify-center">
            <EosButton variant="secondary" onClick={() => fetchNextPage()} isLoading={isFetchingNextPage}>
              Load More
            </EosButton>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
      >
        <AnimatePresence>
        {objects.map((obj) => (
          <ObjectCard key={obj._id} object={obj} viewMode="grid" onDelete={onDelete} />
        ))}
        </AnimatePresence>
      </motion.div>
      {hasNextPage && (
        <div ref={loadMoreRef} className="py-8 flex justify-center">
          <EosButton variant="secondary" onClick={() => fetchNextPage()} isLoading={isFetchingNextPage}>
            Load More
          </EosButton>
        </div>
      )}
    </div>
  );
};
