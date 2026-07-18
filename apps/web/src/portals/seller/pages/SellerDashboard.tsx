import React from 'react';
import { Typography } from '@earthos/ui';
import { ShoppingBag, Package, DollarSign, Users } from 'lucide-react';
import DashboardWidget from '../../../components/DashboardWidget';

export const SellerDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 max-w-7xl">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" className="font-display font-bold">
          Seller Storefront
        </Typography>
        <Typography variant="small" className="text-[#B0BEC5] font-medium">
          Manage your marketplace listings and sales.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardWidget
          title="Active Products"
          value={156}
          icon={<Package size={20} />}
          trend={4}
          tooltipText="Items currently listed for sale."
          sparklineData={[{ value: 140 }, { value: 145 }, { value: 150 }, { value: 156 }]}
        />
        <DashboardWidget
          title="Total Orders"
          value={892}
          icon={<ShoppingBag size={20} />}
          trend={12}
          tooltipText="Orders fulfilled across all time."
          sparklineData={[{ value: 800 }, { value: 820 }, { value: 860 }, { value: 892 }]}
        />
        <DashboardWidget
          title="Monthly Revenue"
          value={14250}
          unit="$"
          icon={<DollarSign size={20} />}
          trend={25}
          tooltipText="Revenue generated this month."
          sparklineData={[{ value: 12000 }, { value: 13000 }, { value: 13500 }, { value: 14250 }]}
        />
        <DashboardWidget
          title="Unique Customers"
          value={450}
          icon={<Users size={20} />}
          trend={8}
          tooltipText="Individual buyers purchasing from you."
          sparklineData={[{ value: 400 }, { value: 420 }, { value: 435 }, { value: 450 }]}
        />
      </div>
    </div>
  );
};

export default SellerDashboard;
