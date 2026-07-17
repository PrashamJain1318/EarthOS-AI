import * as React from 'react';
import { Typography, EosInput, EosButton } from '@earthos/ui';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 text-center">
        <Typography variant="h3">Welcome Back</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">Enter your credentials to access the OS.</Typography>
      </div>

      <EosInput label="Email Address" type="email" placeholder="name@company.com" />
      <EosInput label="Password" type="password" placeholder="••••••••" />
      
      <div className="flex justify-between items-center text-xs mt-1">
        <button onClick={() => navigate('/forgot-password')} className="text-[#7E57C2] hover:underline font-semibold">
          Forgot Password?
        </button>
        <button onClick={() => navigate('/signup')} className="text-[#B0BEC5] hover:text-[#1F2937] dark:hover:text-[#F8FAFC] font-semibold">
          Create Account
        </button>
      </div>

      <EosButton variant="primary" className="w-full mt-2" onClick={() => navigate('/dashboard')}>
        Sign In
      </EosButton>
    </div>
  );
};
export default Login;
