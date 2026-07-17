import * as React from 'react';
import { Typography, EosInput, EosButton } from '@earthos/ui';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 text-center">
        <Typography variant="h3">Reset Password</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Enter your email to receive recovery link.</Typography>
      </div>

      <EosInput label="Email Address" type="email" placeholder="dent@earth.com" />

      <div className="text-center text-xs mt-1">
        <button onClick={() => navigate('/login')} className="text-[#B0BEC5] hover:text-[#1F2937] dark:hover:text-[#F8FAFC] font-semibold">
          Back to Login
        </button>
      </div>

      <EosButton variant="primary" className="w-full mt-2" onClick={() => navigate('/login')}>
        Send Recovery Link
      </EosButton>
    </div>
  );
};
export default ForgotPassword;
