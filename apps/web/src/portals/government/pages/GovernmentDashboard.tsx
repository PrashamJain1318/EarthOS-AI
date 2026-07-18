import React from 'react';
import { Typography } from '@earthos/ui';
import { BarChart4, Trash2, HeartHandshake, Leaf } from 'lucide-react';
import DashboardWidget from '../../../components/DashboardWidget';

export const GovernmentDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 max-w-7xl">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" className="font-display font-bold">
          National Analytics
        </Typography>
        <Typography variant="small" className="text-[#B0BEC5] font-medium">
          Monitor nation-wide waste diversion and sustainability metrics.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardWidget
          title="National Carbon Score"
          value={82.4}
          unit="Mt"
          icon={<Leaf size={20} />}
          trend={4.5}
          tooltipText="Total mega-tons of carbon offset nationally."
          sparklineData={[{ value: 75.0 }, { value: 78.2 }, { value: 80.1 }, { value: 82.4 }]}
        />
        <DashboardWidget
          title="Waste Diverted"
          value={14.2}
          unit="kt"
          icon={<Trash2 size={20} />}
          trend={12}
          tooltipText="Kilo-tons of material diverted from landfills."
          sparklineData={[{ value: 10.0 }, { value: 12.5 }, { value: 13.8 }, { value: 14.2 }]}
        />
        <DashboardWidget
          title="Registered NGOs"
          value={342}
          icon={<HeartHandshake size={20} />}
          trend={5}
          tooltipText="Active non-profit organizations on platform."
          sparklineData={[{ value: 300 }, { value: 310 }, { value: 330 }, { value: 342 }]}
        />
        <DashboardWidget
          title="Policy Compliance"
          value={94}
          unit="%"
          icon={<BarChart4 size={20} />}
          trend={2}
          tooltipText="Percentage of enterprises meeting national targets."
          sparklineData={[{ value: 88 }, { value: 90 }, { value: 92 }, { value: 94 }]}
        />
      </div>
    </div>
  );
};

export default GovernmentDashboard;
