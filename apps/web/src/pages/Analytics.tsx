import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { EosCard, Typography } from '@earthos/ui';

// Lazy loaded chart panels to optimize bundle performance
const WeeklyActivityChart = React.lazy(() => import('../components/charts/WeeklyActivityChart'));
const EarthScoreChart = React.lazy(() => import('../components/charts/EarthScoreChart'));
const CarbonSavedChart = React.lazy(() => import('../components/charts/CarbonSavedChart'));
const ObjectCategoriesChart = React.lazy(() => import('../components/charts/ObjectCategoriesChart'));
const MarketplaceTransactionsChart = React.lazy(() => import('../components/charts/MarketplaceTransactionsChart'));

const ChartLoadingFallback: React.FC = () => (
  <div className="h-[260px] w-full flex items-center justify-center animate-pulse bg-gray-50/50 dark:bg-white/5 rounded-xl">
    <div className="h-5 w-5 rounded-full border-2 border-[#2E7D32] border-t-transparent animate-spin" />
  </div>
);

export const Analytics: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8 w-full select-none"
    >
      {/* Section Header Title */}
      <div>
        <Typography variant="h3" className="font-bold tracking-tight">Environmental Analytics</Typography>
        <Typography variant="small" className="text-gray-400">Deep telemetry reports on resource recovery operations.</Typography>
      </div>

      {/* Grid of 5 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Weekly Activity */}
        <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4">
          <div>
            <Typography variant="h4" className="font-display font-bold">Weekly Activity</Typography>
            <Typography variant="small" className="text-gray-400 text-xs">Resources scanned vs abated count (weekly metrics).</Typography>
          </div>
          <Suspense fallback={<ChartLoadingFallback />}>
            <WeeklyActivityChart />
          </Suspense>
        </EosCard>

        {/* 2. Earth Score Progress */}
        <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4">
          <div>
            <Typography variant="h4" className="font-display font-bold">Earth Score Progress</Typography>
            <Typography variant="small" className="text-gray-400 text-xs">Overall ecological health index ratings trending curve.</Typography>
          </div>
          <Suspense fallback={<ChartLoadingFallback />}>
            <EarthScoreChart />
          </Suspense>
        </EosCard>

        {/* 3. Carbon Saved */}
        <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4">
          <div>
            <Typography variant="h4" className="font-display font-bold">Carbon Saved</Typography>
            <Typography variant="small" className="text-gray-400 text-xs">CO2 greenhouse equivalents saved (accumulated tons).</Typography>
          </div>
          <Suspense fallback={<ChartLoadingFallback />}>
            <CarbonSavedChart />
          </Suspense>
        </EosCard>

        {/* 4. Marketplace Transactions */}
        <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4">
          <div>
            <Typography variant="h4" className="font-display font-bold">Marketplace Transactions</Typography>
            <Typography variant="small" className="text-gray-400 text-xs">Transaction volume mapped alongside generated revenues.</Typography>
          </div>
          <Suspense fallback={<ChartLoadingFallback />}>
            <MarketplaceTransactionsChart />
          </Suspense>
        </EosCard>

        {/* 5. Object Categories */}
        <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4 lg:col-span-2 max-w-lg mx-auto w-full">
          <div>
            <Typography variant="h4" className="font-display font-bold">Object Categories Distribution</Typography>
            <Typography variant="small" className="text-gray-400 text-xs">Material types distribution segment analysis.</Typography>
          </div>
          <Suspense fallback={<ChartLoadingFallback />}>
            <ObjectCategoriesChart />
          </Suspense>
        </EosCard>

      </div>
    </motion.div>
  );
};
export default Analytics;
