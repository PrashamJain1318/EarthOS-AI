import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Typography, EosInput, EosButton, EosBadge } from '@earthos/ui';
import { KeyRound, CheckCircle } from 'lucide-react';

const resetSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

type ResetFormValues = z.infer<typeof resetSchema>;

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema)
  });

  const onSubmit = async (_data: ResetFormValues) => {
    setIsLoading(true);

    // Simulate password resetting verification
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
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
        <EosBadge variant="info">Security Credentials</EosBadge>
        <Typography variant="h3" className="font-display font-bold mt-2">
          Reset Password
        </Typography>
        <Typography variant="small" className="text-gray-400">
          Establish new security access keys for your profile.
        </Typography>
      </div>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 text-center p-6 bg-green-500/10 border border-green-500/20 rounded-2xl text-[#2E7D32]"
        >
          <CheckCircle size={36} />
          <div>
            <Typography variant="h4" className="text-green-500 font-bold mb-1">
              Reset Successful
            </Typography>
            <Typography variant="small" className="text-[#2E7D32]/85 text-xs">
              Your security password keys have been successfully updated in our registries.
            </Typography>
          </div>
          <EosButton variant="primary" size="sm" className="w-full mt-2" onClick={() => navigate('/login')}>
            Authenticate session
          </EosButton>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <EosInput
            label="New Password"
            type="password"
            placeholder="••••••••"
            icon={<KeyRound size={18} />}
            error={errors.password?.message}
            disabled={isLoading}
            {...register('password')}
          />

          <EosInput
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            icon={<KeyRound size={18} />}
            error={errors.confirmPassword?.message}
            disabled={isLoading}
            {...register('confirmPassword')}
          />

          <EosButton
            type="submit"
            variant="primary"
            className="w-full mt-2 font-semibold"
            isLoading={isLoading}
          >
            Update Security Credentials
          </EosButton>
        </form>
      )}
    </motion.div>
  );
};
export default ResetPassword;
