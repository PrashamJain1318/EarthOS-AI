import React from 'react';
import { Typography } from '@earthos/ui';
import {
  Globe,
  PackageSearch,
  Trash2,
  FileText,
  Network
} from 'lucide-react';
import { DashboardWidget } from '../components/DashboardWidget';
import { RecentActivity } from '../components/RecentActivity';
import { ErrorBoundary } from '../components/ErrorBoundary';

const sparklineCarbon = [{ value: 75 }, { value: 78 }, { value: 82 }, { value: 85 }];
const sparklineAssets = [{ value: 1200 }, { value: 1250 }, { value: 1300 }, { value: 1450 }];
const sparklineWaste = [{ value: 450 }, { value: 500 }, { value: 650 }, { value: 800 }];
const sparklineReports = [{ value: 12 }, { value: 15 }, { value: 18 }, { value: 24 }];
const sparklineDepartments = [{ value: 8 }, { value: 8 }, { value: 9 }, { value: 12 }];

export const EnterpriseHome: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-8 select-none">
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="h3" className="font-bold tracking-tight text-blue-500">Enterprise Dashboard</Typography>
            <Typography variant="small" className="text-gray-400">
              Corporate ESG analytics, scope 3 emissions accounting, and asset lifecycle management.
            </Typography>
          </div>
        </div>

        {/* KPI Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardWidget
            title="Corporate Carbon Score"
            value={85}
            unit="/100"
            icon={<Globe size={20} className="text-blue-500" />}
            trend={5.2}
            sparklineData={sparklineCarbon}
          />
          <DashboardWidget
            title="Assets"
            value={1450}
            icon={<PackageSearch size={20} className="text-indigo-500" />}
            trend={12.5}
            sparklineData={sparklineAssets}
          />
          <DashboardWidget
            title="Waste Prevented"
            value={800}
            unit="Tons"
            icon={<Trash2 size={20} className="text-[#2E7D32]" />}
            trend={22.4}
            sparklineData={sparklineWaste}
          />
          <DashboardWidget
            title="Reports"
            value={24}
            icon={<FileText size={20} className="text-amber-500" />}
            trend={18.0}
            sparklineData={sparklineReports}
          />
          <DashboardWidget
            title="Departments"
            value={12}
            icon={<Network size={20} className="text-purple-500" />}
            trend={33.3}
            sparklineData={sparklineDepartments}
          />
        </div>

        {/* Recent Activity Timeline */}
        <RecentActivity />

      </div>
    </ErrorBoundary>
  );
};
export default EnterpriseHome;
