import React from 'react';
import { Typography } from '@earthos/ui';
import {
  Globe,
  Trash2,
  Heart,
  Recycle,
  HeartHandshake,
  MapPin
} from 'lucide-react';
import { DashboardWidget } from '../components/DashboardWidget';
import { RecentActivity } from '../components/RecentActivity';
import { ErrorBoundary } from '../components/ErrorBoundary';

const sparklineCarbon = [{ value: 65 }, { value: 68 }, { value: 74 }, { value: 82 }];
const sparklineWaste = [{ value: 5000 }, { value: 4800 }, { value: 4200 }, { value: 3900 }];
const sparklineDonation = [{ value: 120 }, { value: 150 }, { value: 190 }, { value: 240 }];
const sparklineRecycling = [{ value: 20 }, { value: 25 }, { value: 28 }, { value: 34 }];
const sparklineNGOs = [{ value: 45 }, { value: 52 }, { value: 68 }, { value: 85 }];
const sparklineDistricts = [{ value: 12 }, { value: 15 }, { value: 18 }, { value: 24 }];

export const GovernmentHome: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-8 select-none">
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="h3" className="font-bold tracking-tight text-emerald-500">National Dashboard</Typography>
            <Typography variant="small" className="text-gray-400">
              National-level sustainability metrics, municipal waste analytics, and policy compliance monitoring.
            </Typography>
          </div>
        </div>

        {/* KPI Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardWidget
            title="National Carbon Score"
            value={82}
            unit="/100"
            icon={<Globe size={20} className="text-blue-500" />}
            trend={12.5}
            sparklineData={sparklineCarbon}
          />
          <DashboardWidget
            title="Waste Statistics"
            value={3900}
            unit="Tons"
            icon={<Trash2 size={20} className="text-[#2E7D32]" />}
            trend={-8.5}
            sparklineData={sparklineWaste}
          />
          <DashboardWidget
            title="Donation Impact"
            value={240}
            unit="Tons"
            icon={<Heart size={20} className="text-red-500" />}
            trend={18.0}
            sparklineData={sparklineDonation}
          />
          <DashboardWidget
            title="Recycling Rate"
            value={34}
            unit="%"
            icon={<Recycle size={20} className="text-emerald-500" />}
            trend={5.5}
            sparklineData={sparklineRecycling}
          />
          <DashboardWidget
            title="NGO Activity"
            value={85}
            icon={<HeartHandshake size={20} className="text-purple-500" />}
            trend={22.4}
            sparklineData={sparklineNGOs}
          />
          <DashboardWidget
            title="District Reports"
            value={24}
            icon={<MapPin size={20} className="text-amber-500" />}
            trend={4.2}
            sparklineData={sparklineDistricts}
          />
        </div>

        {/* Recent Activity Timeline */}
        <RecentActivity />

      </div>
    </ErrorBoundary>
  );
};
export default GovernmentHome;
