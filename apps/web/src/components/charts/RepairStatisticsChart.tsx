import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ObjectItem } from '../../../services/objectService';

interface Props {
  objects: ObjectItem[];
}

const RepairStatisticsChart: React.FC<Props> = ({ objects }) => {
  const data = useMemo(() => {
    // Group repairs by object condition
    const repairsByCondition: Record<string, number> = {
      'NEW': 0,
      'GOOD': 0,
      'FAIR': 0,
      'POOR': 0
    };

    objects.forEach(obj => {
      const condition = obj.condition || 'UNKNOWN';
      if (repairsByCondition[condition] !== undefined) {
        repairsByCondition[condition] += (obj.repairCount || 0);
      }
    });

    return Object.entries(repairsByCondition)
      .map(([name, Repairs]) => ({ name, Repairs }))
      .filter(d => d.Repairs > 0 || d.name === 'NEW' || d.name === 'GOOD'); // keep some baseline
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
          cursor={{ fill: '#334155', opacity: 0.1 }}
        />
        <Bar dataKey="Repairs" fill="#F59E0B" radius={[4, 4, 0, 0]} maxBarSize={50} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default RepairStatisticsChart;
