import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Typography, EosInput, EosButton, EosBadge } from '@earthos/ui';
import { KeyRound, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { UserRole } from '@earthos/types';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorMsg(null);

    // Simulate mock authentication verification
    setTimeout(() => {
      setIsLoading(false);
      if (data.email === 'error@earthos.ai') {
        setErrorMsg('Invalid credentials. Please try again.');
      } else {
        let role: UserRole = 'USER';
        if (data.email.includes('enterprise')) {
          role = 'ENTERPRISE';
        } else if (data.email.includes('government')) {
          role = 'GOVERNMENT';
        } else if (data.email.includes('admin')) {
          role = 'ADMIN';
        }

        login(
          {
            id: 'mock_user_123',
            name: 'Arthur Dent',
            email: data.email,
            role: role
          },
          'mock_jwt_access_token'
        );

        if (role === 'ENTERPRISE') {
          navigate('/enterprise');
        } else if (role === 'GOVERNMENT') {
          navigate('/government');
        } else if (role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-5 w-full"
    >
      <div className="flex flex-col gap-1 text-center items-center">
        <EosBadge variant="info">Secure Gateway</EosBadge>
        <Typography variant="h3" className="font-display font-bold mt-2">
          Welcome Back
        </Typography>
        <Typography variant="small" className="text-gray-400">
          Enter credentials to access the Operating System.
        </Typography>
      </div>

      {errorMsg && (
        <div className="flex items-start gap-2.5 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-semibold animate-shake">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <EosInput
          label="Email Address"
          type="email"
          placeholder="architect@earthos.ai"
          icon={<Mail size={18} />}
          error={errors.email?.message}
          disabled={isLoading}
          {...register('email')}
        />

        <EosInput
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={<KeyRound size={18} />}
          error={errors.password?.message}
          disabled={isLoading}
          {...register('password')}
        />

        <div className="flex justify-between items-center text-xs mt-1 select-none font-semibold">
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-[#7E57C2] hover:underline"
            disabled={isLoading}
          >
            Forgot Password?
          </button>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-[#F8FAFC]"
            disabled={isLoading}
          >
            Create Account
          </button>
        </div>

        <EosButton
          type="submit"
          variant="primary"
          className="w-full mt-2 font-semibold"
          isLoading={isLoading}
        >
          <span>Authenticate Session</span>
          <ArrowRight size={16} className="ml-1.5" />
        </EosButton>
      </form>
    </motion.div>
  );
};
export default Login;
