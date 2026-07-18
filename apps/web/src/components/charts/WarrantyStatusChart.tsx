import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ObjectItem } from '../../../services/objectService';

interface Props {
  objects: ObjectItem[];
}

const COLORS = ['#10B981', '#F43F5E', '#94A3B8'];

const WarrantyStatusChart: React.FC<Props> = ({ objects }) => {
  const data = useMemo(() => {
    let active = 0;
    let expired = 0;
    let none = 0;
    
    const now = new Date();

    objects.forEach(obj => {
      if (!obj.warrantyExpiryDate) {
        none++;
      } else {
        const expiry = new Date(obj.warrantyExpiryDate);
        if (expiry > now) {
          active++;
        } else {
          expired++;
        }
      }
    });

    return [
      { name: 'Active', value: active },
      { name: 'Expired', value: expired },
      { name: 'No Warranty', value: none },
    ].filter(d => d.value > 0);
  }, [objects]);

  if (!data.length) return <div className="h-[260px] flex items-center justify-center text-gray-400 text-sm">No data available</div>;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC', fontSize: '12px' }}
          itemStyle={{ color: '#F8FAFC' }}
        />
        <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default WarrantyStatusChart;
