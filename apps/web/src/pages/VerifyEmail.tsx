import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Typography, EosInput, EosButton, EosBadge } from '@earthos/ui';
import { ShieldCheck, Mail, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { UserRole } from '@earthos/types';

const verifySchema = z.object({
  code: z.string().length(6, 'Verification code must be exactly 6 characters')
});

type VerifyFormValues = z.infer<typeof verifySchema>;

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signupData = location.state as { email: string; name: string; role: string } | null;
  const targetEmail = signupData?.email || 'dent@earth.com';
  const targetName = signupData?.name || 'Arthur Dent';
  const targetRole = (signupData?.role as UserRole) || 'USER';

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema)
  });

  const onSubmit = async (data: VerifyFormValues) => {
    setIsLoading(true);
    setErrorMsg(null);

    // Simulate OTP verification logic
    setTimeout(() => {
      setIsLoading(false);
      if (data.code === '000000') {
        setErrorMsg('Invalid or expired code. Please request a new one.');
      } else {
        login(
          {
            id: 'mock_user_123',
            name: targetName,
            email: targetEmail,
            role: targetRole
          },
          'mock_jwt_access_token'
        );

        const roleRoutes: Partial<Record<UserRole, string>> = {
          USER: '/dashboard/user',
          NGO: '/dashboard/ngo',
          REPAIR_PARTNER: '/dashboard/repair',
          RECYCLER: '/dashboard/recycler',
          SELLER: '/dashboard/seller',
          ENTERPRISE: '/dashboard/enterprise',
          GOVERNMENT: '/dashboard/government',
          ADMIN: '/dashboard/admin',
          SUPER_ADMIN: '/dashboard/admin'
        };
        const destination = roleRoutes[targetRole] || '/dashboard/user';
        navigate(destination);
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
        <EosBadge variant="info">Verification Gateway</EosBadge>
        <Typography variant="h3" className="font-display font-bold mt-2">
          Verify Email
        </Typography>
        <Typography variant="small" className="text-gray-400">
          Enter the 6-digit access OTP code dispatched to your inbox.
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
          label="6-Digit OTP Code"
          placeholder="123456"
          icon={<Mail size={18} />}
          error={errors.code?.message}
          disabled={isLoading}
          maxLength={6}
          className="text-center tracking-widest font-mono text-lg font-bold"
          {...register('code')}
        />

        <div className="text-center text-xs mt-1 select-none font-semibold">
          <button
            type="button"
            onClick={() => alert('Verification code resent!')}
            className="text-[#7E57C2] hover:underline"
            disabled={isLoading}
          >
            Resend Verification Code
          </button>
        </div>

        <EosButton
          type="submit"
          variant="primary"
          className="w-full mt-2 font-semibold"
          isLoading={isLoading}
        >
          <ShieldCheck size={18} className="mr-1.5" />
          <span>Verify & Register Session</span>
        </EosButton>
      </form>
    </motion.div>
  );
};
export default VerifyEmail;
