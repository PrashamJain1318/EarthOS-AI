import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Metals', value: 45 },
  { name: 'Plastics', value: 25 },
  { name: 'Organics', value: 20 },
  { name: 'Electronics', value: 10 }
];

const COLORS = ['#2E7D32', '#00BCD4', '#FFA726', '#7E57C2'];

export const ObjectCategoriesChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#1E293B',
            borderColor: '#334155',
            borderRadius: '8px',
            color: '#F8FAFC',
            fontSize: '12px'
          }}
        />
        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default ObjectCategoriesChart;
