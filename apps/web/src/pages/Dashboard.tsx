import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, EosButton, EosCard } from '@earthos/ui';
import { useAuthStore } from '../stores/authStore';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto py-12 select-none">
      <EosCard variant="glass" className="p-8 border-[#B0BEC5]/20 flex flex-col gap-6 text-left">
        <div>
          <Typography variant="h3" className="font-bold tracking-tight">Command Center</Typography>
          <Typography variant="small" className="text-gray-400">Minimal Telemetry Validation Active</Typography>
        </div>

        <hr className="border-[#B0BEC5]/20 dark:border-[#263238]/30" />

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-semibold">Logged-in User Name:</span>
            <span className="font-bold text-[#1F2937] dark:text-[#F8FAFC]">{user?.name || 'Arthur Dent'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-semibold">User Email:</span>
            <span className="font-mono text-[#1F2937] dark:text-[#F8FAFC]">{user?.email || 'dent@earth.com'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-semibold">User Authority Role:</span>
            <span className="font-bold text-[#2E7D32] capitalize">{user?.role?.toLowerCase() || 'user'}</span>
          </div>
        </div>

        <hr className="border-[#B0BEC5]/20 dark:border-[#263238]/30" />

        <EosButton
          variant="secondary"
          className="w-full font-bold border border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500/10"
          onClick={handleLogout}
        >
          De-authenticate Session (Log Out)
        </EosButton>
      </EosCard>
    </div>
  );
};
export default Dashboard;
