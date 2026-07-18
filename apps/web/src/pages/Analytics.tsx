import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { EosCard, Typography, EosButton } from '@earthos/ui';
import { useInfiniteObjects } from '../hooks/useObjects';
import { ObjectItem } from '../services/objectService';
import { RefreshCw } from 'lucide-react';

// Lazy loaded chart panels to optimize bundle performance
const CategoryDistributionChart = React.lazy(() => import('../components/charts/CategoryDistributionChart'));
const PurchaseTimelineChart = React.lazy(() => import('../components/charts/PurchaseTimelineChart'));
const CarbonSavedChart = React.lazy(() => import('../components/charts/CarbonSavedChart'));
const CurrentValueChart = React.lazy(() => import('../components/charts/CurrentValueChart'));
const WarrantyStatusChart = React.lazy(() => import('../components/charts/WarrantyStatusChart'));
const RepairStatisticsChart = React.lazy(() => import('../components/charts/RepairStatisticsChart'));

const ChartLoadingFallback: React.FC = () => (
  <div className="h-[260px] w-full flex items-center justify-center animate-pulse bg-gray-50/50 dark:bg-white/5 rounded-xl">
    <div className="h-5 w-5 rounded-full border-2 border-[#2E7D32] border-t-transparent animate-spin" />
  </div>
);

export const Analytics: React.FC = () => {
  const { data, isLoading, isError, refetch } = useInfiniteObjects({});

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[50vh]">
        <div className="h-8 w-8 rounded-full border-4 border-[#2E7D32] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Typography variant="h4" className="text-red-500">Failed to load analytics data.</Typography>
        <EosButton variant="primary" onClick={() => refetch()}>
          <RefreshCw size={16} className="mr-2" /> Retry
        </EosButton>
      </div>
    );
  }

  const objects: ObjectItem[] = data?.pages.flatMap(page => page.objects) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8 w-full select-none max-w-[1400px] mx-auto pb-12"
    >
      {/* Section Header Title */}
      <div>
        <Typography variant="h3" className="font-bold tracking-tight">Inventory Analytics</Typography>
        <Typography variant="small" className="text-gray-400">Deep telemetry and insights across your entire physical catalog.</Typography>
      </div>

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Category Distribution */}
        <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4">
          <div>
            <Typography variant="h4" className="font-display font-bold">Category Distribution</Typography>
            <Typography variant="small" className="text-gray-400 text-xs">Breakdown of objects by primary category.</Typography>
          </div>
          <Suspense fallback={<ChartLoadingFallback />}>
            <CategoryDistributionChart objects={objects} />
          </Suspense>
        </EosCard>

        {/* 2. Current Value */}
        <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4">
          <div>
            <Typography variant="h4" className="font-display font-bold">Total Asset Value</Typography>
            <Typography variant="small" className="text-gray-400 text-xs">Accumulated purchase price value vs current estimated resale.</Typography>
          </div>
          <Suspense fallback={<ChartLoadingFallback />}>
            <CurrentValueChart objects={objects} />
          </Suspense>
        </EosCard>

        {/* 3. Purchase Timeline */}
        <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4 lg:col-span-2">
          <div>
            <Typography variant="h4" className="font-display font-bold">Purchase Timeline</Typography>
            <Typography variant="small" className="text-gray-400 text-xs">Historical volume of asset acquisitions over time.</Typography>
          </div>
          <Suspense fallback={<ChartLoadingFallback />}>
            <PurchaseTimelineChart objects={objects} />
          </Suspense>
        </EosCard>

        {/* 4. Carbon Saved */}
        <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4">
          <div>
            <Typography variant="h4" className="font-display font-bold">Carbon Offset</Typography>
            <Typography variant="small" className="text-gray-400 text-xs">Total CO2 equivalent saved by extending object lifecycles.</Typography>
          </div>
          <Suspense fallback={<ChartLoadingFallback />}>
            <CarbonSavedChart objects={objects} />
          </Suspense>
        </EosCard>

        {/* 5. Warranty Status */}
        <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4">
          <div>
            <Typography variant="h4" className="font-display font-bold">Warranty Status</Typography>
            <Typography variant="small" className="text-gray-400 text-xs">Proportion of objects with active vs expired warranties.</Typography>
          </div>
          <Suspense fallback={<ChartLoadingFallback />}>
            <WarrantyStatusChart objects={objects} />
          </Suspense>
        </EosCard>

        {/* 6. Repair Statistics */}
        <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4 lg:col-span-2">
          <div>
            <Typography variant="h4" className="font-display font-bold">Repair & Circularity</Typography>
            <Typography variant="small" className="text-gray-400 text-xs">Registered maintenance events grouped by object condition.</Typography>
          </div>
          <Suspense fallback={<ChartLoadingFallback />}>
            <RepairStatisticsChart objects={objects} />
          </Suspense>
        </EosCard>

      </div>
    </motion.div>
  );
};
export default Analytics;
