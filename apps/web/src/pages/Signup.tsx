import * as React from 'react';
import { Typography, EosInput, EosButton } from '@earthos/ui';
import { useNavigate } from 'react-router-dom';

export const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 text-center">
        <Typography variant="h3">Get Started</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Initialize your Resource Profile today.</Typography>
      </div>

      <EosInput label="Full Name" placeholder="Arthur Dent" />
      <EosInput label="Email Address" type="email" placeholder="dent@earth.com" />
      <EosInput label="Password" type="password" placeholder="••••••••" />

      <div className="text-center text-xs mt-1">
        <button onClick={() => navigate('/login')} className="text-[#B0BEC5] hover:text-[#1F2937] dark:hover:text-[#F8FAFC] font-semibold">
          Already have an account? Sign In
        </button>
      </div>

      <EosButton variant="primary" className="w-full mt-2" onClick={() => navigate('/dashboard')}>
        Create Account
      </EosButton>
    </div>
  );
};
export default Signup;
