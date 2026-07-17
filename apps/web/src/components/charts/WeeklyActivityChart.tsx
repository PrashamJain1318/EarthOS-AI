import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', Scanned: 4, Abated: 3 },
  { name: 'Tue', Scanned: 6, Abated: 4 },
  { name: 'Wed', Scanned: 8, Abated: 5 },
  { name: 'Thu', Scanned: 5, Abated: 4 },
  { name: 'Fri', Scanned: 9, Abated: 7 },
  { name: 'Sat', Scanned: 3, Abated: 2 },
  { name: 'Sun', Scanned: 5, Abated: 4 }
];

export const WeeklyActivityChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#B0BEC5/20" className="stroke-gray-200 dark:stroke-slate-800" />
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
        <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
        <Bar dataKey="Scanned" fill="#7E57C2" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Abated" fill="#2E7D32" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default WeeklyActivityChart;
