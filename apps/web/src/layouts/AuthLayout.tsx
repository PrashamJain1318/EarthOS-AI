import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Globe, ArrowLeft } from 'lucide-react';
import { EosCard } from '@earthos/ui';

export const AuthLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-white to-[#F8FAFC] dark:from-[#0B1220] dark:to-[#162033]/30">
      {/* Return to website */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-[#B0BEC5] hover:text-[#1F2937] dark:hover:text-[#F8FAFC] transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </button>

      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-2 select-none">
          <Globe className="text-[#2E7D32]" size={40} />
          <h1 className="text-2xl font-bold font-display tracking-tight text-[#1F2937] dark:text-[#F8FAFC]">
            EARTHOS AI
          </h1>
          <p className="text-xs text-[#B0BEC5] font-medium">
            Nothing useful should ever become waste.
          </p>
        </div>

        {/* Auth Forms */}
        <EosCard variant="glass" elevation="high" className="p-8">
          <Outlet />
        </EosCard>
      </div>
    </div>
  );
};
