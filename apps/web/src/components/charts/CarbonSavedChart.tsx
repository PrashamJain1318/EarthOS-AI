import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'May', Carbon: 2.1 },
  { name: 'Jun', Carbon: 3.2 },
  { name: 'Jul', Carbon: 2.8 },
  { name: 'Aug', Carbon: 4.0 },
  { name: 'Sep', Carbon: 4.2 },
  { name: 'Oct', Carbon: 4.8 }
];

export const CarbonSavedChart: React.FC = () => {
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
          contentStyle={{
            backgroundColor: '#1E293B',
            borderColor: '#334155',
            borderRadius: '8px',
            color: '#F8FAFC',
            fontSize: '12px'
          }}
        />
        <Area
          type="monotone"
          dataKey="Carbon"
          stroke="#00BCD4"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorCarbon)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default CarbonSavedChart;
