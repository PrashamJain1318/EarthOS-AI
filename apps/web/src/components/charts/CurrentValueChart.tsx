import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ObjectItem } from '../../../services/objectService';

interface Props {
  objects: ObjectItem[];
}

const CurrentValueChart: React.FC<Props> = ({ objects }) => {
  const data = useMemo(() => {
    // Group by category to show total cost vs estimated resale
    const categories: Record<string, { category: string; Cost: number; Value: number }> = {};
    
    objects.forEach(obj => {
      const cat = obj.category || 'Other';
      if (!categories[cat]) {
        categories[cat] = { category: cat, Cost: 0, Value: 0 };
      }
      
      const cost = obj.purchasePrice || 0;
      
      // Basic mock formula for estimated value based on condition
      const conditionMultiplier = obj.condition === 'NEW' ? 0.9 : obj.condition === 'GOOD' ? 0.7 : 0.4;
      const repairPenalty = (obj.repairCount || 0) * 0.05;
      const estValue = Math.max(0, cost * (conditionMultiplier - repairPenalty));

      categories[cat].Cost += cost;
      categories[cat].Value += estValue;
    });

    return Object.values(categories)
      .map(d => ({ ...d, Cost: Number(d.Cost.toFixed(0)), Value: Number(d.Value.toFixed(0)) }))
      .sort((a, b) => b.Cost - a.Cost)
      .slice(0, 5); // Top 5 categories
  }, [objects]);

  if (!data.length) return <div className="h-[260px] flex items-center justify-center text-gray-400 text-sm">No data available</div>;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-slate-800" />
        <XAxis dataKey="category" stroke="#94A3B8" fontSize={11} tickLine={false} />
        <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(value) => `$${value}`} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '12px' }}
          cursor={{ fill: '#334155', opacity: 0.1 }}
          formatter={(value: number) => [`$${value}`, undefined]}
        />
        <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} />
        <Bar dataKey="Cost" fill="#94A3B8" radius={[4, 4, 0, 0]} maxBarSize={30} />
        <Bar dataKey="Value" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default CurrentValueChart;
