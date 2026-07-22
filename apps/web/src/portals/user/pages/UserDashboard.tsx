import React, { Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, EosCard, EosButton, EosBadge, EosEmptyState } from '@earthos/ui';
import { Leaf, Box, Heart, Wrench, RefreshCw, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import DashboardWidget from '../../../components/DashboardWidget';
import { RecentActivity } from '../../../components/RecentActivity';
import { useAllObjects, useDashboardStats } from '../../../hooks/useObjects';
import { formatDistanceToNow } from 'date-fns';

const CategoryDistributionChart = React.lazy(() => import('../../../components/charts/CategoryDistributionChart'));
const PurchaseTimelineChart = React.lazy(() => import('../../../components/charts/PurchaseTimelineChart'));
const WarrantyStatusChart = React.lazy(() => import('../../../components/charts/WarrantyStatusChart'));
const CurrentValueChart = React.lazy(() => import('../../../components/charts/CurrentValueChart'));
const RepairStatisticsChart = React.lazy(() => import('../../../components/charts/RepairStatisticsChart'));

const ChartLoadingFallback: React.FC = () => (
  <div className="h-[260px] w-full flex items-center justify-center animate-pulse bg-gray-50/50 dark:bg-white/5 rounded-xl">
    <div className="h-5 w-5 rounded-full border-2 border-[#2E7D32] border-t-transparent animate-spin" />
  </div>
);

export const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: objects = [], isLoading, isError, refetch } = useAllObjects();
  const { data: statsData, isLoading: statsLoading } = useDashboardStats();

  const stats = useMemo(() => {
    if (statsData) return statsData;
    // Fallback while loading
    return {
      totalObjects: 0,
      totalEstimatedValue: 0,
      activePassports: 0,
      carbonSaved: 0,
      repairCount: 0,
      marketplaceTxs: 0,
      categoryCounts: []
    };
  }, [statsData]);

  const recentObjects = useMemo(() => {
    return [...objects]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [objects]);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Typography variant="h4" className="text-red-500">Failed to load dashboard data.</Typography>
        <EosButton variant="primary" onClick={() => refetch()}>
          <RefreshCw size={16} className="mr-2" /> Retry
        </EosButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-[1400px]">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" className="font-display font-bold">
          Analytics Command Center
        </Typography>
        <Typography variant="small" className="text-[#B0BEC5] font-medium">
          Real-time telemetry and insights for your physical asset portfolio.
        </Typography>
      </div>

      {!isLoading && objects.length === 0 ? (
        <EosCard variant="glass" className="p-12 border-[#B0BEC5]/10 dark:border-[#263238]/20 mt-8">
          <EosEmptyState
            title="No Data Available"
            description="Your dashboard is empty because you haven't added any objects yet. Register your first physical asset to see real-time analytics."
            icon={<Box size={48} className="text-slate-300 dark:text-slate-700" />}
            action={
              <EosButton variant="primary" onClick={() => navigate('/user/objects/add')}>
                Add Your First Object
              </EosButton>
            }
          />
        </EosCard>
      ) : (
        <>
          {/* KPI Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <DashboardWidget
              title="Total Objects"
              value={stats.totalObjects}
              icon={<Box size={20} />}
              tooltipText="Total registered items in your portfolio."
              isLoading={isLoading}
            />
            <DashboardWidget
              title="Total Asset Value"
              value={`$${stats.totalEstimatedValue.toLocaleString()}`}
              icon={<ShoppingBag size={20} />}
              tooltipText="Cumulative estimated value of all registered assets."
              isLoading={isLoading}
            />
            <DashboardWidget
              title="Active Passports"
              value={stats.activePassports}
              icon={<ShieldCheck size={20} />}
              tooltipText="Number of objects with minted Digital Product Passports."
              isLoading={isLoading}
            />
            <DashboardWidget
              title="Carbon Saved"
              value={stats.carbonSaved}
              unit="pts"
              icon={<Leaf size={20} />}
              tooltipText="CO2 emissions prevented via circulation."
              isLoading={isLoading}
            />
            <DashboardWidget
              title="Repair Count"
              value={stats.repairCount}
              icon={<Wrench size={20} />}
              tooltipText="Total maintenance and repair operations logged."
              isLoading={isLoading}
            />
            <DashboardWidget
              title="Marketplace Activity"
              value={stats.marketplaceTxs}
              unit="listings"
              icon={<RefreshCw size={20} />}
              tooltipText="Objects currently engaged in marketplace activities."
              isLoading={isLoading}
            />
          </div>

          {/* Dynamic Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4">
              <div>
                <Typography variant="h4" className="font-display font-bold">Category Distribution</Typography>
              </div>
              <Suspense fallback={<ChartLoadingFallback />}>
                <CategoryDistributionChart objects={objects} preAggregatedData={stats.categoryCounts?.map((c: any) => ({ name: c._id, value: c.count }))} />
              </Suspense>
            </EosCard>

            <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4">
              <div>
                <Typography variant="h4" className="font-display font-bold">Total Asset Value</Typography>
              </div>
              <Suspense fallback={<ChartLoadingFallback />}>
                <CurrentValueChart objects={objects} />
              </Suspense>
            </EosCard>

            <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4 lg:col-span-2">
              <div>
                <Typography variant="h4" className="font-display font-bold">Purchase Timeline</Typography>
              </div>
              <Suspense fallback={<ChartLoadingFallback />}>
                <PurchaseTimelineChart objects={objects} />
              </Suspense>
            </EosCard>
            
            <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4">
              <div>
                <Typography variant="h4" className="font-display font-bold">Warranty Status</Typography>
              </div>
              <Suspense fallback={<ChartLoadingFallback />}>
                <WarrantyStatusChart objects={objects} />
              </Suspense>
            </EosCard>

            <EosCard variant="glass" className="p-6 border-[#B0BEC5]/10 dark:border-[#263238]/20 flex flex-col gap-4">
              <div>
                <Typography variant="h4" className="font-display font-bold">Repair & Circularity</Typography>
              </div>
              <Suspense fallback={<ChartLoadingFallback />}>
                <RepairStatisticsChart objects={objects} />
              </Suspense>
            </EosCard>
          </div>

          {/* Tables and Feeds */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Recent Objects */}
            <div className="xl:col-span-2 flex flex-col gap-4">
              <Typography variant="h4" className="font-display font-bold">Recently Added Objects</Typography>
              <EosCard variant="glass" className="p-0 border-[#B0BEC5]/10 dark:border-[#263238]/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#B0BEC5]/20 dark:border-[#263238]/50 text-xs text-gray-500 uppercase tracking-wider">
                        <th className="p-4 font-semibold">Object Name</th>
                        <th className="p-4 font-semibold">Category</th>
                        <th className="p-4 font-semibold">Brand</th>
                        <th className="p-4 font-semibold">Condition</th>
                        <th className="p-4 font-semibold">Passport</th>
                        <th className="p-4 font-semibold text-right">Added</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentObjects.map(obj => (
                        <tr 
                          key={obj._id} 
                          className="border-b border-[#B0BEC5]/10 dark:border-[#263238]/30 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                          onClick={() => navigate(`/portal/user/objects/${obj._id}`)}
                        >
                          <td className="p-4 font-medium flex items-center gap-3">
                            {obj.images?.[0] ? (
                              <img src={obj.images[0]} alt={obj.objectName} loading="lazy" className="w-8 h-8 rounded-md object-cover bg-gray-100" />
                            ) : (
                              <div className="w-8 h-8 rounded-md bg-gray-100 dark:bg-[#162033] flex items-center justify-center">
                                <Box size={14} className="text-gray-400" />
                              </div>
                            )}
                            {obj.objectName}
                          </td>
                          <td className="p-4 text-sm text-gray-500">{obj.category}</td>
                          <td className="p-4 text-sm text-gray-500">{obj.brand || '-'}</td>
                          <td className="p-4">
                            <EosBadge variant={obj.condition === 'NEW' ? 'success' : 'neutral'}>
                              {obj.condition.replace('_', ' ')}
                            </EosBadge>
                          </td>
                          <td className="p-4">
                            {obj.passportId ? (
                              <EosBadge variant="success" className="bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/20">Minted</EosBadge>
                            ) : (
                              <EosBadge variant="neutral">Pending</EosBadge>
                            )}
                          </td>
                          <td className="p-4 text-sm text-gray-500 text-right whitespace-nowrap">
                            {formatDistanceToNow(new Date(obj.createdAt), { addSuffix: true })}
                          </td>
                        </tr>
                      ))}
                      {recentObjects.length === 0 && !isLoading && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-500">
                            No objects registered yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </EosCard>
            </div>

            {/* Recent Activity Timeline */}
            <div className="xl:col-span-1">
              <RecentActivity objects={objects} />
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
