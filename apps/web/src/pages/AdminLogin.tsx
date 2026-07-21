import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, EosBadge, EosButton } from '@earthos/ui';
import { ShieldAlert, Mail, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { roleRoutes } from '../components/RouteProtection';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error?.message || 'Access credentials rejected.');
      }

      const { accessToken, user } = resData.data;

      // Verify Administrative Clearances (Sprint 10.8.5)
      if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
        throw new Error('ACCESS DENIED. Your credentials lack administrative clearances.');
      }

      // Proceed
      login(user, accessToken);
      const destination = roleRoutes[user.role];
      if (destination) {
        navigate(destination);
      } else {
        navigate('/invalid-role');
      }

    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#0B0D17] text-white p-4 font-sans select-none relative overflow-hidden">
      
      {/* High-security warning backdrop sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#121622] border-2 border-red-500/20 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative">
        {/* Decorative corner indicators */}
        <div className="absolute top-4 left-4 text-red-500/20 font-mono text-[9px]">SYS.AUTH.v2.restricted</div>
        <div className="absolute top-4 right-4 text-red-500/20 font-mono text-[9px]">SEC_MATRIX_ON</div>

        <div className="flex flex-col items-center gap-3 text-center mb-8">
          <span className="h-14 w-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 animate-pulse">
            <ShieldAlert size={28} />
          </span>
          <div>
            <Typography variant="h3" className="font-bold tracking-tight text-white leading-tight font-display">
              RESTRICTED ACCESS
            </Typography>
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block mt-1">
              Admin & Root Console
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-1">
            Authorized Personnel Only. All authentication events are cryptographically audited and logged in the ledger.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 flex items-start gap-2.5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-xs font-semibold animate-shake">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Credential Signature (Email)</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-500">
                <Mail size={16} />
              </span>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="administrator@earthos.ai" 
                className="w-full bg-[#0B0D17]/80 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-red-500 focus:ring-red-500/20 focus:ring-2 transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Security Passcode (Password)</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-500">
                <KeyRound size={16} />
              </span>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="w-full bg-[#0B0D17]/80 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-red-500 focus:ring-red-500/20 focus:ring-2 transition-all"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 flex items-center justify-between px-6 py-3.5 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#121622]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2 w-full justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Auditing Credentials...
              </span>
            ) : (
              <>
                <span>Unlock Secure Session</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-red-500" /> AES-256 Encrypted
          </span>
          <button onClick={() => navigate('/login')} className="hover:underline hover:text-slate-300">
            Back to Public Portals
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
