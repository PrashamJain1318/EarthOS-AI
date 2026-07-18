import React from 'react';
import { EosCard, Typography, EosBadge } from '@earthos/ui';
import { Sparkles, Activity, DollarSign, Leaf, RefreshCw, AlertCircle, TrendingUp, ShieldAlert } from 'lucide-react';
import { ObjectItem } from '../../../services/objectService';
import { useAiInsights } from '../../../hooks/useAiInsights';

interface ObjectAiInsightsProps {
  object: ObjectItem;
}

export const ObjectAiInsights: React.FC<ObjectAiInsightsProps> = ({ object }) => {
  const { data: insights, isLoading, isError } = useAiInsights(object);

  if (isLoading) {
    return (
      <EosCard variant="glass" className="p-6 flex flex-col gap-6 animate-pulse">
        <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 pb-3">
          <Sparkles size={18} className="text-[#00BCD4]" />
          <Typography variant="h4" className="font-bold">EARTHOS AI Insights</Typography>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-gray-200 dark:bg-white/5 rounded-2xl"></div>
          <div className="h-20 bg-gray-200 dark:bg-white/5 rounded-2xl"></div>
        </div>
        <div className="h-24 bg-gray-200 dark:bg-white/5 rounded-2xl"></div>
      </EosCard>
    );
  }

  if (isError || !insights) {
    return (
      <EosCard variant="glass" className="p-6 flex flex-col gap-4 bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle size={18} />
          <Typography variant="h5" className="font-bold">AI Engine Unavailable</Typography>
        </div>
        <Typography variant="small" className="text-gray-500">Could not generate insights for this object at this time.</Typography>
      </EosCard>
    );
  }

  const getRecIcon = (type: string) => {
    switch (type) {
      case 'REPAIR': return <ShieldAlert size={16} className="text-orange-500" />;
      case 'UPGRADE': return <TrendingUp size={16} className="text-blue-500" />;
      case 'RECYCLE': return <RefreshCw size={16} className="text-green-500" />;
      case 'MAINTENANCE': return <Activity size={16} className="text-purple-500" />;
      default: return <Sparkles size={16} className="text-[#00BCD4]" />;
    }
  };

  return (
    <EosCard variant="glass" className="p-6 flex flex-col gap-6 border border-[#00BCD4]/20 relative overflow-hidden group">
      {/* Decorative gradient orb */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#00BCD4]/10 to-purple-500/10 blur-3xl rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-700" />

      <div className="flex items-center justify-between border-b border-[#00BCD4]/20 dark:border-[#00BCD4]/10 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#00BCD4]/10 rounded-lg">
            <Sparkles size={16} className="text-[#00BCD4]" />
          </div>
          <Typography variant="h4" className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00BCD4] to-blue-600 dark:from-[#00BCD4] dark:to-blue-400">
            AI Insights
          </Typography>
        </div>
        <EosBadge variant="primary" className="bg-[#00BCD4]/10 text-[#00BCD4] border-[#00BCD4]/20 text-[10px]">
          Live Analysis
        </EosBadge>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        <div className="flex flex-col p-4 bg-white/50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-1.5 text-gray-500 mb-2">
            <Activity size={14} />
            <Typography variant="small" className="text-xs font-semibold uppercase tracking-wider">Condition</Typography>
          </div>
          <div className="flex items-end gap-1">
            <Typography variant="h3" className="font-mono font-bold leading-none">{insights.metrics.conditionScore}</Typography>
            <Typography variant="small" className="text-gray-400 pb-0.5">/100</Typography>
          </div>
        </div>

        <div className="flex flex-col p-4 bg-white/50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-1.5 text-gray-500 mb-2">
            <DollarSign size={14} />
            <Typography variant="small" className="text-xs font-semibold uppercase tracking-wider">Est. Resale</Typography>
          </div>
          <div className="flex items-end gap-1">
            <Typography variant="h3" className="font-mono font-bold leading-none text-green-600 dark:text-green-400">
              ${insights.metrics.resaleValue}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col p-4 bg-white/50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-1.5 text-gray-500 mb-2">
            <Leaf size={14} />
            <Typography variant="small" className="text-xs font-semibold uppercase tracking-wider">CO2 Saved</Typography>
          </div>
          <div className="flex items-end gap-1">
            <Typography variant="h3" className="font-mono font-bold leading-none">{insights.metrics.carbonImpactSaved}</Typography>
            <Typography variant="small" className="text-gray-400 pb-0.5">kg</Typography>
          </div>
        </div>

        <div className="flex flex-col p-4 bg-white/50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-1.5 text-gray-500 mb-2">
            <RefreshCw size={14} />
            <Typography variant="small" className="text-xs font-semibold uppercase tracking-wider">Lifecycle</Typography>
          </div>
          <div className="flex items-end gap-1">
            <Typography variant="h3" className="font-mono font-bold leading-none">{insights.metrics.lifecyclePredictionMonths}</Typography>
            <Typography variant="small" className="text-gray-400 pb-0.5">mo remaining</Typography>
          </div>
        </div>
      </div>

      {/* Environmental Impact Text */}
      <div className="p-4 bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-2xl relative z-10 flex items-start gap-3">
        <Leaf size={18} className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
        <Typography variant="small" className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
          {insights.environmentalImpact}
        </Typography>
      </div>

      {/* AI Recommendations */}
      <div className="flex flex-col gap-3 relative z-10">
        <Typography variant="h6" className="font-bold text-sm text-[#1F2937] dark:text-[#F8FAFC]">
          Smart Recommendations
        </Typography>
        <div className="grid sm:grid-cols-2 gap-4">
          {insights.recommendations.map(rec => (
            <div key={rec.id} className="p-4 bg-white dark:bg-[#0B1220] border border-gray-100 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gray-50 dark:bg-white/5 rounded-lg">
                    {getRecIcon(rec.type)}
                  </div>
                  <Typography variant="h6" className="font-bold text-sm">{rec.title}</Typography>
                </div>
                <div className="px-2 py-0.5 bg-[#00BCD4]/10 text-[#00BCD4] text-[10px] font-bold rounded-full">
                  {(rec.confidence * 100).toFixed(0)}% Match
                </div>
              </div>
              <Typography variant="small" className="text-xs text-gray-500 leading-relaxed mt-1">
                {rec.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>

    </EosCard>
  );
};
