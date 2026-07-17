import React, { useEffect, useState } from 'react';
import { EosCard, EosBadge, Typography } from '@earthos/ui';
import { HelpCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface SparklineData {
  value: number;
}

interface DashboardWidgetProps {
  title: string;
  value: number | string;
  unit?: string;
  icon: React.ReactNode;
  trend: number; // positive = up, negative = down
  tooltipText: string;
  sparklineData: SparklineData[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  value,
  unit = '',
  icon,
  trend,
  tooltipText,
  sparklineData,
  isLoading = false,
  isError = false,
  onRetry
}) => {
  const [displayVal, setDisplayVal] = useState<number | string>(typeof value === 'number' ? 0 : value);
  const [showTooltip, setShowTooltip] = useState(false);

  // Smooth animated counter effect for numbers
  useEffect(() => {
    if (isLoading || isError || typeof value !== 'number') {
      setDisplayVal(value);
      return;
    }

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalDuration = 1000;
    const incrementTime = 30;
    const totalSteps = totalDuration / incrementTime;
    const stepIncrement = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += stepIncrement;
      if (start >= end) {
        clearInterval(timer);
        setDisplayVal(end);
      } else {
        setDisplayVal(Math.floor(start * 100) / 100);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, isLoading, isError]);

  if (isLoading) {
    return (
      <EosCard variant="glass" className="h-[180px] p-6 relative flex flex-col justify-between overflow-hidden animate-pulse border border-[#B0BEC5]/10">
        <div className="flex justify-between items-start">
          <div className="h-4 w-28 bg-[#B0BEC5]/20 dark:bg-white/5 rounded" />
          <div className="h-8 w-8 rounded-lg bg-[#B0BEC5]/20 dark:bg-white/5" />
        </div>
        <div className="h-8 w-36 bg-[#B0BEC5]/20 dark:bg-white/5 rounded" />
        <div className="h-6 w-full bg-[#B0BEC5]/10 dark:bg-white/5 rounded mt-2" />
      </EosCard>
    );
  }

  if (isError) {
    return (
      <EosCard variant="glass" className="h-[180px] p-6 flex flex-col justify-between items-center text-center border border-red-500/20 bg-red-500/5">
        <div className="flex flex-col items-center gap-2">
          <AlertTriangle size={24} className="text-red-500" />
          <span className="text-xs font-semibold text-red-500">Failed to load telemetry</span>
        </div>
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-[10px] font-bold text-red-500 transition-colors uppercase tracking-wider"
        >
          <RefreshCw size={10} />
          <span>Retry Conn</span>
        </button>
      </EosCard>
    );
  }

  const isTrendUp = trend >= 0;

  // Generate native SVG points for the sparkline to avoid Recharts crashes on React 19
  const minVal = Math.min(...sparklineData.map(d => d.value));
  const maxVal = Math.max(...sparklineData.map(d => d.value));
  const rangeVal = maxVal - minVal || 1;
  const svgPoints = sparklineData.map((d, i) => {
    const x = (i / (sparklineData.length - 1)) * 100;
    const y = 30 - ((d.value - minVal) / rangeVal) * 22; // leaving 8px total top padding
    return `${x},${y}`;
  }).join(' ');

  return (
    <EosCard
      variant="glass"
      className="h-[180px] p-6 relative flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#2E7D32]/30 hover:shadow-lg group"
    >
      {/* Sparkline background matching trend color (native SVG to prevent React 19 crashes) */}
      <div className="absolute inset-x-0 bottom-0 h-16 opacity-30 select-none z-0">
        <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isTrendUp ? '#2E7D32' : '#D32F2F'} stopOpacity={0.8} />
              <stop offset="100%" stopColor={isTrendUp ? '#2E7D32' : '#D32F2F'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path
            d={`M 0,30 L ${svgPoints} L 100,30 Z`}
            fill={`url(#gradient-${title})`}
          />
          <polyline
            fill="none"
            stroke={isTrendUp ? '#2E7D32' : '#D32F2F'}
            strokeWidth="1.5"
            points={svgPoints}
          />
        </svg>
      </div>

      {/* Top row */}
      <div className="flex justify-between items-start z-10">
        <div className="flex items-center gap-1.5 select-none relative">
          <span className="text-xs font-bold text-[#1F2937] dark:text-[#CBD5E1] font-display">{title}</span>
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-[#2E7D32] transition-colors"
            aria-label="Metric details tooltip"
          >
            <HelpCircle size={13} />
          </button>
          
          {/* Tooltip Overlay */}
          {showTooltip && (
            <div className="absolute left-0 bottom-6 w-48 p-2.5 bg-[#1E293B] border border-slate-700 rounded-lg text-[10px] text-slate-200 shadow-xl leading-normal font-semibold z-30 pointer-events-none">
              {tooltipText}
            </div>
          )}
        </div>

        {/* Floating icon */}
        <div className="p-2 rounded-lg bg-gray-50/50 dark:bg-white/5 text-gray-500 dark:text-[#CBD5E1] group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>

      {/* Center Counter Value */}
      <div className="flex flex-col gap-1 z-10 select-none">
        <div className="flex items-baseline gap-1">
          <Typography variant="h2" className="font-mono font-bold tracking-tight text-[#1F2937] dark:text-[#F8FAFC]">
            {typeof displayVal === 'number' ? displayVal.toLocaleString() : displayVal}
          </Typography>
          {unit && (
            <span className="text-xs font-bold text-gray-400 font-mono">{unit}</span>
          )}
        </div>

        {/* Bottom Trend Badge */}
        <div className="flex items-center">
          <EosBadge variant={isTrendUp ? 'success' : 'danger'} size="sm" className="font-semibold font-mono">
            {isTrendUp ? `+${trend}%` : `${trend}%`}
          </EosBadge>
        </div>
      </div>
    </EosCard>
  );
};
export default DashboardWidget;
