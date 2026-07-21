import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Typography, EosInput, EosButton, EosBadge } from '@earthos/ui';
import { User, Mail, KeyRound, AlertCircle, ArrowRight, Shield } from 'lucide-react';
import { api } from '../lib/api';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['USER', 'ENTERPRISE', 'GOVERNMENT', 'NGO', 'REPAIR_SHOP', 'RECYCLER']),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

type SignupFormValues = z.infer<typeof signupSchema>;

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: 'USER'
    }
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      await api.post('/auth/signup', {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role === 'REPAIR_SHOP' ? 'REPAIR_PARTNER' : data.role
      });
      navigate('/verify-email', { state: { email: data.email, name: data.name, role: data.role } });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
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
        <EosBadge variant="info">Onboarding Console</EosBadge>
        <Typography variant="h3" className="font-display font-bold mt-2">
          Initialize Account
        </Typography>
        <Typography variant="small" className="text-gray-400">
          Create your cryptographic resource passport profile.
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
          label="Full Name"
          placeholder="Arthur Dent"
          icon={<User size={18} />}
          error={errors.name?.message}
          disabled={isLoading}
          {...register('name')}
        />

        <EosInput
          label="Email Address"
          type="email"
          placeholder="dent@earth.com"
          icon={<Mail size={18} />}
          error={errors.email?.message}
          disabled={isLoading}
          {...register('email')}
        />

        {/* Role Selector dropdown field wrapper */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-semibold text-[#1F2937] dark:text-[#CBD5E1] flex items-center gap-1.5">
            <Shield size={16} className="text-gray-400" />
            <span>Profile Authority Role</span>
          </label>
          <select
            className="w-full px-4 py-2.5 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-sm text-[#1F2937] dark:text-[#F8FAFC] transition-all duration-200 focus:outline-none focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20"
            disabled={isLoading}
            {...register('role')}
          >
            <option value="USER">Individual Account</option>
            <option value="ENTERPRISE">Enterprise (Brands / Factory)</option>
            <option value="GOVERNMENT">Government / Smart City</option>
            <option value="NGO">Non-Governmental Org (NGO)</option>
            <option value="REPAIR_SHOP">Repair / Refurbish Shop</option>
            <option value="RECYCLER">Recycling Facility</option>
          </select>
        </div>

        <EosInput
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={<KeyRound size={18} />}
          error={errors.password?.message}
          disabled={isLoading}
          {...register('password')}
        />

        <EosInput
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          icon={<KeyRound size={18} />}
          error={errors.confirmPassword?.message}
          disabled={isLoading}
          {...register('confirmPassword')}
        />

        <div className="text-center text-xs mt-1 select-none font-semibold">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-gray-400 hover:text-[#7E57C2]"
            disabled={isLoading}
          >
            Already have an profile? Authenticate
          </button>
        </div>

        <EosButton
          type="submit"
          variant="primary"
          className="w-full mt-2 font-semibold"
          isLoading={isLoading}
        >
          <span>Onboard Profile</span>
          <ArrowRight size={16} className="ml-1.5" />
        </EosButton>
      </form>
    </motion.div>
  );
};
export default Signup;
