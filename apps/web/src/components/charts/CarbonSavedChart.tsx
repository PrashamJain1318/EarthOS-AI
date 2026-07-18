import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ObjectItem } from '../../../services/objectService';

interface Props {
  objects: ObjectItem[];
}

const CarbonSavedChart: React.FC<Props> = ({ objects }) => {
  const data = useMemo(() => {
    // To show an area chart, we'll accumulate carbon over the registration dates
    const timeline: Record<string, number> = {};
    
    // Sort objects by createdAt
    const sorted = [...objects].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    let cumulativeCarbon = 0;
    sorted.forEach(obj => {
      const date = new Date(obj.createdAt);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      cumulativeCarbon += (obj.carbonScore || 42.5);
      timeline[monthYear] = cumulativeCarbon;
    });

    return Object.entries(timeline)
      .map(([name, Carbon]) => ({ name, Carbon: Number(Carbon.toFixed(1)) }));
  }, [objects]);

  if (!data.length) return <div className="h-[260px] flex items-center justify-center text-gray-400 text-sm">No data available</div>;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00BCD4" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#00BCD4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-slate-800" />
        <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
        <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '12px' }}
        />
        <Area type="monotone" dataKey="Carbon" stroke="#00BCD4" strokeWidth={2} fillOpacity={1} fill="url(#colorCarbon)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default CarbonSavedChart;
