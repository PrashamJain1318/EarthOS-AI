import React, { useState } from 'react';
import { Typography } from '@earthos/ui';
import { 
  Globe, 
  Leaf, 
  Cpu, 
  ShoppingBag, 
  Wrench, 
  Heart,
  Sparkles
} from 'lucide-react';
import { DashboardWidget } from '../components/DashboardWidget';
import { RecentActivity } from '../components/RecentActivity';

export const Dashboard: React.FC = () => {
  // Mock loading and error telemetry states to verify layouts
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setHasError(false);
    }, 1500);
  };

  const widgetsData = [
    {
      title: 'Earth Score',
      value: 88,
      unit: '/100',
      icon: <Globe size={20} className="text-[#2E7D32]" />,
      trend: 4.2,
      tooltipText: 'Overall index scoring environmental health metrics across active objects.',
      sparklineData: [{ value: 80 }, { value: 82 }, { value: 85 }, { value: 88 }]
    },
    {
      title: 'Carbon Saved',
      value: 4.8,
      unit: 'Tons',
      icon: <Leaf size={20} className="text-[#00BCD4]" />,
      trend: 12.8,
      tooltipText: 'Total carbon dioxide equivalents abated via circular streams.',
      sparklineData: [{ value: 3.5 }, { value: 4.0 }, { value: 4.2 }, { value: 4.8 }]
    },
    {
      title: 'Active Objects',
      value: 24,
      unit: 'Units',
      icon: <Cpu size={20} className="text-[#7E57C2]" />,
      trend: 8.5,
      tooltipText: 'Total active resource tracking hardware passports currently running.',
      sparklineData: [{ value: 12 }, { value: 15 }, { value: 18 }, { value: 24 }]
    },
    {
      title: 'Marketplace Activity',
      value: 1040,
      unit: 'USD',
      icon: <ShoppingBag size={20} className="text-[#FFA726]" />,
      trend: -2.4,
      tooltipText: 'Gross revenue matched from circular product marketplace transactions.',
      sparklineData: [{ value: 920 }, { value: 1100 }, { value: 980 }, { value: 1040 }]
    },
    {
      title: 'Repairs Completed',
      value: 9,
      unit: 'Devices',
      icon: <Wrench size={20} className="text-gray-500" />,
      trend: 15.0,
      tooltipText: 'Units successfully repaired and returned to active lifecycle loops.',
      sparklineData: [{ value: 4 }, { value: 6 }, { value: 7 }, { value: 9 }]
    },
    {
      title: 'Donations Made',
      value: 245,
      unit: 'USD',
      icon: <Heart size={20} className="text-red-500" />,
      trend: 18.2,
      tooltipText: 'Total circular charity donations channeled via wallet.',
      sparklineData: [{ value: 150 }, { value: 180 }, { value: 210 }, { value: 245 }]
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Page Title & Refresh */}
      <div className="flex justify-between items-center select-none">
        <div>
          <Typography variant="h3" className="font-bold tracking-tight">Command Center</Typography>
          <Typography variant="small" className="text-gray-400">Real-time resource lifecycle telemetry.</Typography>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setHasError(!hasError)}
            className="px-2.5 py-1.5 border border-[#B0BEC5]/20 dark:border-[#263238]/30 rounded-lg text-[10px] font-bold text-gray-400 hover:text-red-500 hover:border-red-500/30 transition-colors uppercase tracking-wider"
          >
            Simulate Error
          </button>
          <button
            onClick={handleRefresh}
            className="px-3 py-1.5 bg-[#2E7D32]/10 hover:bg-[#2E7D32]/20 border border-[#2E7D32]/20 rounded-lg text-xs font-bold text-[#2E7D32] transition-colors"
          >
            Sync Telemetry
          </button>
        </div>
      </div>

      {/* Grid of 6 Premium Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgetsData.map((widget, i) => (
          <DashboardWidget
            key={i}
            title={widget.title}
            value={widget.value}
            unit={widget.unit}
            icon={widget.icon}
            trend={widget.trend}
            tooltipText={widget.tooltipText}
            sparklineData={widget.sparklineData}
            isLoading={isRefreshing}
            isError={hasError}
            onRetry={handleRefresh}
          />
        ))}
      </div>

      {/* Recommended Stream Match Alert Banner */}
      <div className="border border-green-500/20 rounded-2xl flex gap-4 p-6 bg-[#2E7D32]/5 dark:bg-[#162033]/10 relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 h-16 w-16 bg-[#2E7D32]/10 rounded-bl-full" />
        <Sparkles className="text-[#2E7D32] shrink-0 mt-0.5 animate-pulse" size={24} />
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-[#1F2937] dark:text-[#F8FAFC]">Active Circular Match</span>
          <Typography variant="small" className="text-gray-500 leading-relaxed text-xs">
            A nearby biotech manufacturer has requested your 4.2 TONS organic biomass byproduct. Shipping this stream abates 1.2 Tons CO2 and yields $840 credit revenue.
          </Typography>
        </div>
      </div>

      {/* Recent Activity Timeline Section */}
      <RecentActivity />
    </div>
  );
};
export default Dashboard;
