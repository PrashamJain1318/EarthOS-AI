import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, EosButton, EosCard } from '@earthos/ui';
import { Globe } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { DashboardWidget } from '../components/DashboardWidget';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sparklineData = [{ value: 80 }, { value: 82 }, { value: 85 }, { value: 88 }];

  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-8 select-none">
        {/* Title */}
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="h3" className="font-bold tracking-tight">Command Center</Typography>
            <Typography variant="small" className="text-gray-400">Step 4 Restoration: Single Widget Verification</Typography>
          </div>
          <EosButton
            variant="secondary"
            size="sm"
            className="border border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500/10 font-bold"
            onClick={handleLogout}
          >
            Log Out
          </EosButton>
        </div>

        {/* Grid rendering ONLY the Earth Score Widget */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardWidget
            title="Earth Score"
            value={88}
            unit="/100"
            icon={<Globe size={20} className="text-[#2E7D32]" />}
            trend={4.2}
            tooltipText="Overall index scoring environmental health metrics across active objects."
            sparklineData={sparklineData}
            isLoading={false}
            isError={false}
          />
        </div>

        {/* Profile Details card */}
        <EosCard variant="glass" className="p-6 border-[#B0BEC5]/20 max-w-md">
          <div className="flex flex-col gap-2 text-sm text-left">
            <span className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Session Details</span>
            <div><span className="text-gray-400 font-semibold">User:</span> <span className="font-bold">{user?.name || 'Arthur Dent'}</span></div>
            <div><span className="text-gray-400 font-semibold">Email:</span> <span className="font-mono text-gray-500">{user?.email || 'dent@earth.com'}</span></div>
          </div>
        </EosCard>
      </div>
    </ErrorBoundary>
  );
};
export default Dashboard;
