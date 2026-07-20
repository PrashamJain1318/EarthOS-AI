import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, EosBadge, EosButton, EosCard } from '@earthos/ui';
import { 
  User as UserIcon, 
  Heart, 
  Hammer, 
  Recycle, 
  ShoppingBag, 
  Building2, 
  Globe, 
  ArrowRight,
  ShieldAlert,
  Coins,
  Activity,
  Award,
  BookOpen,
  Leaf
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
  color: string;
  glow: string;
  badge: string;
}

const PORTALS: PortalSpec[] = [
  {
    role: 'USER',
    title: 'User Portal',
    subtitle: '👤 Personal circular ledger & eco passport',
    icon: UserIcon,
    desc: 'Register assets, scan product labels, calculate manufacturing carbon offsets, and track lifecycle histories.',
    color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
    glow: 'from-cyan-500/10 to-transparent',
    badge: 'bg-cyan-500/10 text-cyan-400'
  },
  {
    role: 'NGO',
    title: 'NGO Portal',
    subtitle: '❤️ Donation redistribution & charity hubs',
    icon: Heart,
    desc: 'Coordinate donation drives, monitor sorting logistics, manage municipal collection sites, and allocate circular resources.',
    color: 'text-red-400 border-red-500/20 bg-red-500/5',
    glow: 'from-red-500/10 to-transparent',
    badge: 'bg-red-500/10 text-red-400'
  },
  {
    role: 'REPAIR_PARTNER',
    title: 'Repair Partner Portal',
    subtitle: '🔧 Circular diagnostics & parts reclamation',
    icon: Hammer,
    desc: 'Verify product warranties, register technician service logs, calculate offsets, and reclaim spare parts.',
    color: 'text-orange-400 border-orange-500/20 bg-orange-500/5',
    glow: 'from-orange-500/10 to-transparent',
    badge: 'bg-orange-500/10 text-orange-400'
  },
  {
    role: 'RECYCLER',
    title: 'Recycler Portal',
    subtitle: '♻️ Material recovery & sorting nodes',
    icon: Recycle,
    desc: 'Log recovered batch yields, track purity vectors via Gemini Vision, and trace secondary raw material inputs.',
    color: 'text-teal-400 border-teal-500/20 bg-teal-500/5',
    glow: 'from-teal-500/10 to-transparent',
    badge: 'bg-teal-500/10 text-teal-400'
  },
  {
    role: 'SELLER',
    title: 'Marketplace Seller',
    subtitle: '🛒 Reclaimed material circular exchange',
    icon: ShoppingBag,
    desc: 'List batch material contracts, verify escrow transaction records, and coordinate secondary sales.',
    color: 'text-pink-400 border-pink-500/20 bg-pink-500/5',
    glow: 'from-pink-500/10 to-transparent',
    badge: 'bg-pink-500/10 text-pink-400'
  },
  {
    role: 'ENTERPRISE',
    title: 'Enterprise Portal',
    subtitle: '🏢 Scope 3 ESG supply chain audit',
    icon: Building2,
    desc: 'Generate circular product passports at scale, monitor Scope 3 carbon compliance, and evaluate circular tax benefits.',
    color: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
    glow: 'from-blue-500/10 to-transparent',
    badge: 'bg-blue-500/10 text-blue-400'
  },
  {
    role: 'GOVERNMENT',
    title: 'Government Portal',
    subtitle: '🏛️ Regional circular economy registry',
    icon: Globe,
    desc: 'Audit municipal recycling indexes, manage circular grant allocation programs, and enforce material regulatory compliance.',
    color: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
    glow: 'from-purple-500/10 to-transparent',
    badge: 'bg-purple-500/10 text-purple-400'
  }
];

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const selectedPortal = PORTALS[selectedIdx];

  const handleEnterWorkspace = () => {
    setLoading(true);
    setTimeout(() => {
      const role = selectedPortal.role;
      login(
        {
          id: `mock_${role.toLowerCase()}_123`,
          name: `${selectedPortal.title} Agent`,
          email: `${role.toLowerCase()}@earthos.ai`,
          role: role
        },
        'mock_jwt_access_token'
      );
      
      const destination = roleRoutes[role];
      if (destination) {
        navigate(destination);
      } else {
        navigate('/invalid-role');
      }
      setLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedIdx(index);
    }
  };

  // Render Right Side Portal Specific Previews
  const renderRightPanelContent = () => {
    const role = selectedPortal.role;
    
    switch (role) {
      case 'USER':
        return (
          <div className="flex flex-col gap-8 text-left">
            <div>
              <EosBadge variant="info" className={selectedPortal.badge}>USER DASHBOARD MOCKUP</EosBadge>
              <Typography variant="h3" className="font-bold text-white mt-2">Personal Circular Inventory</Typography>
              <Typography variant="small" className="text-slate-400 mt-1">Track circular custody and passport lineage for owned items.</Typography>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <Coins className="text-cyan-400 mb-2" size={24} />
                <Typography variant="body" className="font-bold text-white">240.50 EOS</Typography>
                <Typography variant="small" className="text-slate-500">Circular Rewards Balance</Typography>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <Leaf className="text-green-400 mb-2" size={24} />
                <Typography variant="body" className="font-bold text-white">412 kg CO2e</Typography>
                <Typography variant="small" className="text-slate-500">Total Carbon Saved</Typography>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
              <Typography variant="body" className="font-semibold text-white">Active Object Passport Preview</Typography>
              <div className="flex justify-between items-center bg-black/25 p-3 rounded-lg border border-white/5 text-xs">
                <span className="font-mono text-cyan-400">EARTH-2026-X83A1B</span>
                <span className="text-green-400 font-bold">VERIFIED</span>
              </div>
            </div>
          </div>
        );
      case 'NGO':
        return (
          <div className="flex flex-col gap-8 text-left">
            <div>
              <EosBadge variant="info" className={selectedPortal.badge}>NGO HUD PREVIEW</EosBadge>
              <Typography variant="h3" className="font-bold text-white mt-2">Resource Redistribution</Typography>
              <Typography variant="small" className="text-slate-400">Coordinate regional allocation programs and donation drop-offs.</Typography>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-slate-400">Active Drop-off Locations</span>
                <span className="text-red-400 font-bold font-mono">8 Stations</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-slate-400">Redistribution Velocity</span>
                <span className="text-green-400 font-bold font-mono">84.2% Success</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Monthly Reallocated Weight</span>
                <span className="text-white font-bold font-mono">4.2 Tons</span>
              </div>
            </div>
          </div>
        );
      case 'REPAIR_PARTNER':
        return (
          <div className="flex flex-col gap-8 text-left">
            <div>
              <EosBadge variant="info" className={selectedPortal.badge}>REPAIR CONSOLE PREVIEW</EosBadge>
              <Typography variant="h3" className="font-bold text-white mt-2">Diagnostics & Diagnostics Queue</Typography>
              <Typography variant="small" className="text-slate-400">Log technical maintenance records directly onto the product passport.</Typography>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <Activity className="text-orange-400 mb-2" size={24} />
                <Typography variant="body" className="font-bold text-white">12 Pending</Typography>
                <Typography variant="small" className="text-slate-500">Service Queue Tickets</Typography>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <Award className="text-green-400 mb-2" size={24} />
                <Typography variant="body" className="font-bold text-white">18.4 Hours</Typography>
                <Typography variant="small" className="text-slate-500">Avg Turnaround Time</Typography>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between text-xs">
              <span className="text-slate-400">Reclaimed Spare Parts Catalog</span>
              <span className="font-bold text-orange-400">142 In Stock</span>
            </div>
          </div>
        );
      case 'RECYCLER':
        return (
          <div className="flex flex-col gap-8 text-left">
            <div>
              <EosBadge variant="info" className={selectedPortal.badge}>RECYCLING NODE PREVIEW</EosBadge>
              <Typography variant="h3" className="font-bold text-white mt-2">Material Recovery Processing</Typography>
              <Typography variant="small" className="text-slate-400">Track raw post-industrial yields and sorting classification purity.</Typography>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-slate-400">Gemini Sorting Accuracy</span>
                <span className="text-teal-400 font-bold font-mono">99.2% Accuracy</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-slate-400">Weekly Reclaimed Copper Yield</span>
                <span className="text-white font-bold font-mono">5.8 Tons</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Active Scrap Processing Lines</span>
                <span className="text-teal-400 font-bold font-mono">4 Active</span>
              </div>
            </div>
          </div>
        );
      case 'SELLER':
        return (
          <div className="flex flex-col gap-8 text-left">
            <div>
              <EosBadge variant="info" className={selectedPortal.badge}>SELLER REGISTRY PREVIEW</EosBadge>
              <Typography variant="h3" className="font-bold text-white mt-2">Marketplace Trading Dashboard</Typography>
              <Typography variant="small" className="text-slate-400">Review transacted batch volumes and escrow contract balances.</Typography>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <Coins className="text-pink-400 mb-2" size={24} />
                <Typography variant="body" className="font-bold text-white">$4,520 USD</Typography>
                <Typography variant="small" className="text-slate-500">Escrow Security Balance</Typography>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <Activity className="text-green-400 mb-2" size={24} />
                <Typography variant="body" className="font-bold text-white">98.6%</Typography>
                <Typography variant="small" className="text-slate-500">Circular Custodian Score</Typography>
              </div>
            </div>
          </div>
        );
      case 'ENTERPRISE':
        return (
          <div className="flex flex-col gap-8 text-left">
            <div>
              <EosBadge variant="info" className={selectedPortal.badge}>ENTERPRISE PORTAL PREVIEW</EosBadge>
              <Typography variant="h3" className="font-bold text-white mt-2">Scope 3 Traceability Ledger</Typography>
              <Typography variant="small" className="text-slate-400">Monitor carbon footprint audits and ESG conformance indicators.</Typography>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-slate-400">Corporate circular ESG Grade</span>
                <span className="text-blue-400 font-bold font-mono">A- (Excellent)</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-slate-400">DPP Mint Velocity</span>
                <span className="text-white font-bold font-mono">82,400 Passports/mo</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Total Circular Tax Exemption</span>
                <span className="text-green-400 font-bold font-mono">$18,450 Saved</span>
              </div>
            </div>
          </div>
        );
      case 'GOVERNMENT':
        return (
          <div className="flex flex-col gap-8 text-left">
            <div>
              <EosBadge variant="info" className={selectedPortal.badge}>REGULATORY REGISTRY PREVIEW</EosBadge>
              <Typography variant="h3" className="font-bold text-white mt-2">Regional Economy Compliance</Typography>
              <Typography variant="small" className="text-slate-400">Audit waste diversion quotas and allocate circular grants.</Typography>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <Activity className="text-purple-400 mb-2" size={24} />
                <Typography variant="body" className="font-bold text-white">68.4%</Typography>
                <Typography variant="small" className="text-slate-500">Waste Diversion Ratio</Typography>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <BookOpen className="text-green-400 mb-2" size={24} />
                <Typography variant="body" className="font-bold text-white">$24.8M</Typography>
                <Typography variant="small" className="text-slate-500">Circular Economy Grants</Typography>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-[#0B1220] overflow-hidden text-white font-sans">
      
      {/* LEFT SIDE: PORTAL SELECTION CARD LIST */}
      <div className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col justify-between overflow-y-auto min-h-screen">
        
        {/* Brand Header */}
        <div className="flex items-center gap-2 select-none justify-start pb-4">
          <Globe className="text-[#2E7D32]" size={28} />
          <span className="text-lg font-bold font-display tracking-wider text-white">
            EARTHOS AI
          </span>
        </div>

        {/* Form Body */}
        <div className="my-auto py-8 max-w-xl">
          <div className="text-left mb-8">
            <Typography variant="h2" className="font-bold font-display tracking-tight text-white leading-tight">
              Choose Your Portal
            </Typography>
            <Typography variant="body" className="text-slate-400 mt-2">
              Select your workspace to continue. Access levels are strictly scoped according to user roles.
            </Typography>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-col gap-3.5">
            {PORTALS.map((portal, index) => {
              const IconComponent = portal.icon;
              const isSelected = selectedIdx === index;
              return (
                <div
                  key={portal.role}
                  tabIndex={0}
                  role="button"
                  onClick={() => setSelectedIdx(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between gap-4 cursor-pointer outline-none transition-all duration-300 select-none ${
                    isSelected 
                      ? `${portal.color} shadow-lg shadow-black/35 scale-[1.01]` 
                      : 'border-white/5 hover:border-white/10 hover:bg-white/5 bg-[#0F172A]/40'
                  }`}
                  aria-selected={isSelected}
                  aria-label={`${portal.title}. ${portal.desc}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <span className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 bg-white/5 border border-white/5 ${isSelected ? portal.color : 'text-slate-400'}`}>
                      <IconComponent size={20} />
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

        {/* Enter Portal Action Button */}
        <div className="pt-6 max-w-xl flex flex-col gap-4">
          <EosButton
            variant="primary"
            className="w-full font-bold justify-between items-center py-3.5"
            onClick={handleEnterWorkspace}
            isLoading={loading}
          >
            <span>Proceed to {selectedPortal.title} Workspace</span>
            <ArrowRight size={18} />
          </EosButton>
          <div className="flex justify-between items-center text-xs text-slate-500 select-none font-semibold">
            <span>Nothing useful should ever become waste.</span>
            <span>OS 2.0</span>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE: PORTAL DYNAMIC PREVIEW PANEL */}
      <div className="hidden lg:flex w-1/2 bg-[#0F172A] border-l border-white/10 p-12 flex-col justify-center items-center relative overflow-hidden">
        {/* Glow Spheres */}
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
              className="bg-[#0B1220] border border-white/10 p-12 rounded-[2.5rem] shadow-2xl relative"
            >
              {/* Radial glow background corresponding to selection */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${selectedPortal.glow} rounded-bl-full pointer-events-none`} />
              
              {renderRightPanelContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default Login;
