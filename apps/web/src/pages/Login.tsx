import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, EosBadge } from '@earthos/ui';
import { 
  User as UserIcon, 
  Heart, 
  Hammer, 
  Recycle, 
  ShoppingBag, 
  Building2, 
  Globe, 
  ArrowRight,
  Mail,
  KeyRound,
  Chrome,
  AlertCircle,
  ShieldAlert,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { UserRole } from '@earthos/types';
import { roleRoutes } from '../components/RouteProtection';

interface PortalSpec {
  role: UserRole;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  desc: string;
  colorClass: string;     // Active card text/border
  activeBg: string;       // Active card background
  btnClass: string;       // Dynamic primary login button color
  focusRing: string;      // Input focus borders
  accentText: string;     // Custom text highlights
}

const PORTALS: PortalSpec[] = [
  {
    role: 'USER',
    title: 'User Portal',
    subtitle: '👤 Personal circular ledger & eco passport',
    icon: UserIcon,
    desc: 'Register assets, scan product labels, calculate manufacturing carbon offsets, and track lifecycle histories.',
    colorClass: 'text-green-400 border-green-500/30',
    activeBg: 'bg-green-500/5',
    btnClass: 'bg-green-500 hover:bg-green-600 text-[#0B1220] focus:ring-green-400',
    focusRing: 'focus:border-green-500 focus:ring-green-500/20',
    accentText: 'text-green-400'
  },
  {
    role: 'NGO',
    title: 'NGO Portal',
    subtitle: '❤️ Donation redistribution & charity hubs',
    icon: Heart,
    desc: 'Coordinate donation drives, monitor sorting logistics, manage municipal collection sites, and allocate circular resources.',
    colorClass: 'text-pink-400 border-pink-500/30',
    activeBg: 'bg-pink-500/5',
    btnClass: 'bg-pink-500 hover:bg-pink-600 text-white focus:ring-pink-400',
    focusRing: 'focus:border-pink-500 focus:ring-pink-500/20',
    accentText: 'text-pink-400'
  },
  {
    role: 'REPAIR_PARTNER',
    title: 'Repair Partner Portal',
    subtitle: '🔧 Circular diagnostics & parts reclamation',
    icon: Hammer,
    desc: 'Verify product warranties, register technician service logs, calculate offsets, and reclaim spare parts.',
    colorClass: 'text-orange-400 border-orange-500/30',
    activeBg: 'bg-orange-500/5',
    btnClass: 'bg-orange-500 hover:bg-orange-600 text-[#0B1220] focus:ring-orange-400',
    focusRing: 'focus:border-orange-500 focus:ring-orange-500/20',
    accentText: 'text-orange-400'
  },
  {
    role: 'RECYCLER',
    title: 'Recycler Portal',
    subtitle: '♻️ Material recovery & sorting nodes',
    icon: Recycle,
    desc: 'Log recovered batch yields, track purity vectors via Gemini Vision, and trace secondary raw material inputs.',
    colorClass: 'text-emerald-400 border-emerald-500/30',
    activeBg: 'bg-emerald-500/5',
    btnClass: 'bg-emerald-500 hover:bg-emerald-600 text-[#0B1220] focus:ring-emerald-400',
    focusRing: 'focus:border-emerald-500 focus:ring-emerald-500/20',
    accentText: 'text-emerald-400'
  },
  {
    role: 'SELLER',
    title: 'Marketplace Seller',
    subtitle: '🛒 Reclaimed material circular exchange',
    icon: ShoppingBag,
    desc: 'List batch material contracts, verify escrow transaction records, and coordinate secondary sales.',
    colorClass: 'text-purple-400 border-purple-500/30',
    activeBg: 'bg-purple-500/5',
    btnClass: 'bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-400',
    focusRing: 'focus:border-purple-500 focus:ring-purple-500/20',
    accentText: 'text-purple-400'
  },
  {
    role: 'ENTERPRISE',
    title: 'Enterprise Portal',
    subtitle: '🏢 Scope 3 ESG supply chain audit',
    icon: Building2,
    desc: 'Generate circular product passports at scale, monitor Scope 3 carbon compliance, and evaluate circular tax benefits.',
    colorClass: 'text-blue-400 border-blue-500/30',
    activeBg: 'bg-blue-500/5',
    btnClass: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400',
    focusRing: 'focus:border-blue-500 focus:ring-blue-500/20',
    accentText: 'text-blue-400'
  },
  {
    role: 'GOVERNMENT',
    title: 'Government Portal',
    subtitle: '🏛️ Regional circular economy registry',
    icon: Globe,
    desc: 'Audit municipal recycling indexes, manage circular grant allocation programs, and enforce material regulatory compliance.',
    colorClass: 'text-amber-400 border-amber-500/30',
    activeBg: 'bg-amber-500/5',
    btnClass: 'bg-[#D4AF37] hover:bg-[#C59B27] text-[#0B1220] focus:ring-amber-400',
    focusRing: 'focus:border-amber-500 focus:ring-amber-500/20',
    accentText: 'text-amber-400'
  }
];

const PORTAL_TITLE_MAP: Record<UserRole, string> = {
  USER: 'User Portal',
  NGO: 'NGO Portal',
  REPAIR_PARTNER: 'Repair Partner Portal',
  RECYCLER: 'Recycler Portal',
  SELLER: 'Marketplace Seller Portal',
  ENTERPRISE: 'Enterprise Portal',
  GOVERNMENT: 'Government Portal',
  ADMIN: 'Administrator Control Console',
  SUPER_ADMIN: 'Super Administrator Console'
};

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  // Persistence (Sprint 10.8.2)
  const initialRole = (sessionStorage.getItem('earthos_selected_portal') as UserRole) || 'USER';
  const initialIdx = PORTALS.findIndex((p) => p.role === initialRole);
  
  const [selectedIdx, setSelectedIdx] = useState<number>(initialIdx !== -1 ? initialIdx : 0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const isSubmitting = useRef(false);

  // Mismatch Gateway Modal State (Sprint 10.8.4)
  const [mismatchData, setMismatchData] = useState<{
    correctRole: UserRole;
    correctPortalTitle: string;
    user: any;
    token: string;
  } | null>(null);

  const selectedPortal = PORTALS[selectedIdx];

  useEffect(() => {
    sessionStorage.setItem('earthos_selected_portal', selectedPortal.role);
  }, [selectedPortal]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    
    // Front-end Form Validation
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      isSubmitting.current = false;
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      isSubmitting.current = false;
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setMismatchData(null);

    try {
      // Connect Authentication: Hit the real backend (Sprint 10.8.4)
      const resData = await api.post('/auth/login', { email, password });
      const { accessToken, user } = resData.data;
      const userRole = user.role as UserRole;

      // Check if selected portal matches user role (Sprint 10.8.4)
      if (selectedPortal.role !== userRole) {
        // Trigger Mismatch warnings
        setMismatchData({
          correctRole: userRole,
          correctPortalTitle: PORTAL_TITLE_MAP[userRole] || 'Registered Workspace',
          user,
          token: accessToken
        });
        isSubmitting.current = false;
        return;
      }

      // Success matching path: Redirect user
      login(user, accessToken);
      const destination = roleRoutes[userRole];
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
      isSubmitting.current = false;
    }
  };

  const handleProceedToCorrectPortal = () => {
    if (!mismatchData) return;
    
    login(mismatchData.user, mismatchData.token);
    const destination = roleRoutes[mismatchData.correctRole];
    
    setMismatchData(null);
    if (destination) {
      navigate(destination);
    } else {
      navigate('/invalid-role');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedIdx(index);
    }
  };

  const IconComponent = selectedPortal.icon;

  return (
    <div className="min-h-screen w-screen flex flex-col lg:flex-row bg-[#0B1220] text-white font-sans overflow-y-auto lg:overflow-hidden select-none relative">
      
      {/* LEFT SIDE: PORTAL SELECTION CARD LIST */}
      <div className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col justify-between lg:h-screen lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/5">
        
        {/* Brand Header */}
        <div className="flex items-center gap-2 select-none justify-start pb-4">
          <Globe className="text-[#2E7D32]" size={28} />
          <span className="text-lg font-bold font-display tracking-wider text-white">
            EARTHOS AI
          </span>
        </div>

        {/* Form Body */}
        <div className="my-auto py-8 max-w-xl w-full mx-auto lg:mx-0">
          <div className="text-left mb-8">
            <Typography variant="h2" className="font-bold font-display tracking-tight text-white leading-tight">
              Choose Your Portal
            </Typography>
            <Typography variant="body" className="text-slate-400 mt-2">
              Select your workspace to continue. Access levels are strictly scoped according to user roles.
            </Typography>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none gap-3.5 pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PORTALS.map((portal, index) => {
              const CardIcon = portal.icon;
              const isSelected = selectedIdx === index;
              return (
                <div
                  key={portal.role}
                  tabIndex={0}
                  role="button"
                  onClick={() => setSelectedIdx(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between gap-4 cursor-pointer outline-none transition-all duration-300 min-w-[75vw] sm:min-w-[45vw] md:min-w-0 md:w-full snap-center shrink-0 ${
                    isSelected 
                      ? `${portal.colorClass} ${portal.activeBg} shadow-lg shadow-black/35 scale-[1.01]` 
                      : 'border-white/5 hover:border-white/10 hover:bg-white/5 bg-[#0F172A]/40'
                  }`}
                  aria-selected={isSelected}
                  aria-label={`${portal.title}. ${portal.desc}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <span className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 bg-white/5 border border-white/5 ${isSelected ? portal.colorClass : 'text-slate-400'}`}>
                      <CardIcon size={20} />
                    </span>
                    <div>
                      <Typography variant="body" className="font-semibold text-white text-sm">
                        {portal.title}
                      </Typography>
                      <Typography variant="small" className="text-slate-400 text-xs mt-0.5 line-clamp-1">
                        {portal.desc}
                      </Typography>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <motion.div layoutId="active-indicator" className="h-2 w-2 rounded-full bg-current" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 max-w-xl w-full mx-auto lg:mx-0 flex justify-between items-center text-xs text-slate-500 font-semibold">
          <span>Nothing useful should ever become waste.</span>
          <button onClick={() => navigate('/admin/login')} className="hover:underline hover:text-slate-300">
            System Console
          </button>
        </div>

      </div>

      {/* RIGHT SIDE: DYNAMIC LOGIN PANEL */}
      <div className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center relative overflow-hidden bg-[#0F172A] lg:h-screen lg:overflow-y-auto">
        {/* Background Glow (Sprint 10.8.6) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#00BCD4]/5 to-transparent rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#2E7D32]/5 to-transparent rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-md w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPortal.role}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-[#0B1220] border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative w-full text-left"
            >
              {/* Dynamic Header Badge & Welcome Message (Sprint 10.8.6) */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className={`h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${selectedPortal.colorClass}`}>
                    <IconComponent size={24} />
                  </span>
                  <div>
                    <Typography variant="h3" className="font-bold text-white leading-tight">
                      Login to {selectedPortal.title}
                    </Typography>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">
                      {selectedPortal.subtitle}
                    </span>
                  </div>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  {selectedPortal.desc}
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 flex items-start gap-2.5 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-semibold animate-shake">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Dynamic Login Form */}
              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                {/* Email Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email-input" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-500">
                      <Mail size={16} />
                    </span>
                    <input 
                      id="email-input"
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="agent@earthos.ai" 
                      className={`w-full bg-[#0F172A]/80 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none transition-all ${selectedPortal.focusRing} ${errorMsg?.includes('email') ? 'border-red-500' : ''}`}
                      required
                      maxLength={100}
                      aria-label="Email Address"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password-input" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-500">
                      <KeyRound size={16} />
                    </span>
                    <input 
                      id="password-input"
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="••••••••" 
                      className={`w-full bg-[#0F172A]/80 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none transition-all ${selectedPortal.focusRing} ${errorMsg?.includes('Password') ? 'border-red-500' : ''}`}
                      required
                      minLength={8}
                      maxLength={50}
                      aria-label="Password"
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex justify-between items-center text-xs mt-1 select-none font-semibold">
                  <label htmlFor="remember-me" className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white transition-colors">
                    <input 
                      id="remember-me"
                      type="checkbox" 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)} 
                      className="rounded border-white/10 bg-white/5 text-cyan-500 focus:ring-0 focus:ring-offset-0 h-4 w-4"
                      aria-label="Remember Me"
                    />
                    <span>Remember Me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className={`hover:underline ${selectedPortal.accentText}`}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Dynamic Login Action Button Theme (Sprint 10.8.6) */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full mt-4 flex items-center justify-between px-6 py-3.5 rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B1220] ${selectedPortal.btnClass}`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2 w-full justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying Node...
                    </span>
                  ) : (
                    <>
                      <span>Proceed to Dashboard</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {/* Google Sign In Integration */}
                <button
                  type="button"
                  onClick={() => alert('Initiating Google Federated Sign-in...')}
                  className="w-full flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl py-3 text-xs font-semibold mt-2 transition-all"
                >
                  <Chrome size={16} className="text-[#DB4437]" />
                  <span>Authenticate with Google</span>
                </button>

              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* PORTAL MISMATCH MODAL GATE (Sprint 10.8.4) */}
      <AnimatePresence>
        {mismatchData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121622] border-2 border-red-500/20 max-w-md w-full rounded-[2.5rem] p-8 shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setMismatchData(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 text-red-500 mb-4">
                <span className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                  <ShieldAlert size={20} />
                </span>
                <Typography variant="h4" className="font-bold text-white leading-tight">
                  Portal Role Mismatch
                </Typography>
              </div>

              <div className="my-6">
                <p className="text-sm text-slate-300 leading-relaxed">
                  You are attempting to access the <strong className="text-white font-semibold">{selectedPortal.title}</strong>. However, this account is registered under administrative clearances for the:
                </p>
                <div className="bg-black/25 border border-white/5 p-4 rounded-xl flex items-center justify-between gap-3 mt-4">
                  <span className="text-sm font-semibold text-[#00BCD4]">{mismatchData.correctPortalTitle}</span>
                  <EosBadge variant="info" className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5">Correct Gateway</EosBadge>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleProceedToCorrectPortal}
                  className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-[#00BCD4] hover:bg-[#0097A7] text-black font-bold text-sm"
                >
                  <span>Continue to Correct Portal</span>
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={() => setMismatchData(null)}
                  className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white font-semibold text-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Login;
