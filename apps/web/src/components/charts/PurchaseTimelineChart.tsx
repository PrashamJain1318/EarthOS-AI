import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ObjectItem } from '../../../services/objectService';

interface Props {
  objects: ObjectItem[];
}

const PurchaseTimelineChart: React.FC<Props> = ({ objects }) => {
  const data = useMemo(() => {
    const timeline: Record<string, number> = {};
    objects.forEach(obj => {
      if (obj.purchaseDate) {
        const date = new Date(obj.purchaseDate);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        timeline[monthYear] = (timeline[monthYear] || 0) + 1;
      }
    });

    return Object.entries(timeline)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [objects]);

  if (!data.length) return <div className="h-[260px] flex items-center justify-center text-gray-400 text-sm">No data available</div>;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-slate-800" />
        <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
        <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '12px' }}
          cursor={{ fill: '#334155', opacity: 0.2 }}
        />
        <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default PurchaseTimelineChart;
