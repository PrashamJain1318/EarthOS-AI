import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'May', Score: 78 },
  { name: 'Jun', Score: 81 },
  { name: 'Jul', Score: 80 },
  { name: 'Aug', Score: 84 },
  { name: 'Sep', Score: 85 },
  { name: 'Oct', Score: 88 }
];

export const EarthScoreChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-slate-800" />
        <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
        <YAxis domain={[60, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1E293B',
            borderColor: '#334155',
            borderRadius: '8px',
            color: '#F8FAFC',
            fontSize: '12px'
          }}
        />
        <Line
          type="monotone"
          dataKey="Score"
          stroke="#2E7D32"
          strokeWidth={2.5}
          activeDot={{ r: 6 }}
          dot={{ r: 3, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default EarthScoreChart;
