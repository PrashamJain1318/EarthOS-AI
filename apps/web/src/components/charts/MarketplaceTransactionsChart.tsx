import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'May', Volume: 150, Revenue: 1800 },
  { name: 'Jun', Volume: 220, Revenue: 2400 },
  { name: 'Jul', Volume: 180, Revenue: 2100 },
  { name: 'Aug', Volume: 240, Revenue: 2800 },
  { name: 'Sep', Volume: 290, Revenue: 3200 },
  { name: 'Oct', Volume: 310, Revenue: 3400 }
];

export const MarketplaceTransactionsChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={data} margin={{ top: 10, right: -20, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-slate-800" />
        <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
        <YAxis yAxisId="left" stroke="#94A3B8" fontSize={11} tickLine={false} />
        <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" fontSize={11} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1E293B',
            borderColor: '#334155',
            borderRadius: '8px',
            color: '#F8FAFC',
            fontSize: '12px'
          }}
        />
        <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
        <Bar yAxisId="left" dataKey="Volume" fill="#FFA726" radius={[4, 4, 0, 0]} barSize={20} />
        <Line yAxisId="right" type="monotone" dataKey="Revenue" stroke="#2E7D32" strokeWidth={2.5} dot={{ r: 3 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
export default MarketplaceTransactionsChart;
