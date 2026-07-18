import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EosErrorPage, EosButton } from '@earthos/ui';
import { useAuthStore } from '../stores/authStore';

export const InvalidRole: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1220] flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6">
        <EosErrorPage
          statusCode={403}
          title="Invalid Role Assignment"
          message={`The role assigned to this account (${user?.role || 'Unknown'}) is not recognized by the system or does not have a designated portal.`}
        />
        <EosButton variant="outline" onClick={handleLogout}>
          Sign Out & Return to Login
        </EosButton>
      </div>
    </div>
  );
};
