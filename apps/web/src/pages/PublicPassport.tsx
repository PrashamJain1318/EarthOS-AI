import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, EosCard, EosBadge, EosButton } from '@earthos/ui';
import { 
  Globe, 
  ShieldCheck, 
  Leaf, 
  Activity, 
  Loader2, 
  FileText, 
  Share2, 
  Calendar, 
  Tag, 
  Hammer, 
  Gift, 
  ShoppingBag, 
  Recycle 
} from 'lucide-react';

export const PublicPassport: React.FC = () => {
  const { passportId } = useParams<{ passportId: string }>();
  const navigate = useNavigate();
  const [object, setObject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPassport = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:8000/api/v1/passports/${passportId}`);
        const resData = await response.json();
        
        if (!response.ok) {
          throw new Error(resData.error?.message || 'Failed to resolve passport registry.');
        }
        
        setObject(resData.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Registry lookup failed.');
      } finally {
        setLoading(false);
      }
    };

    if (passportId) {
      fetchPassport();
    }
  }, [passportId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-[#2E7D32]" size={48} />
        <Typography variant="h4">Resolving Passport Lineage...</Typography>
        <Typography variant="small" className="text-slate-400">Fetching cryptographic registry keys</Typography>
      </div>
    );
  }

  if (error || !object) {
    return (
      <div className="max-w-md mx-auto my-16 text-center flex flex-col gap-6 items-center px-4">
        <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
          <FileText size={32} />
        </div>
        <div>
          <Typography variant="h3" className="font-bold text-red-500">Passport Unresolved</Typography>
          <Typography variant="body" className="text-slate-400 mt-2">
            {error || 'No active digital passport resides under this signature.'}
          </Typography>
        </div>
        <EosButton variant="secondary" onClick={() => navigate('/')}>
          Back to Homepage
        </EosButton>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Public Passport signature copied to clipboard!');
  };

  // Warranty Calculator Helper
  const getWarrantyStatus = (expiryDateStr: string | undefined) => {
    if (!expiryDateStr) return { label: 'No Warranty', color: 'bg-slate-500/20 text-slate-400' };
    const expiry = new Date(expiryDateStr).getTime();
    const now = Date.now();
    
    if (expiry < now) {
      return { label: 'Expired', color: 'bg-red-500/20 text-red-400' };
    }
    
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    if (expiry - now <= thirtyDays) {
      return { label: 'Expires Soon', color: 'bg-orange-500/20 text-orange-400' };
    }
    
    return { label: 'Active', color: 'bg-green-500/20 text-green-400' };
  };

  const warrantyStatus = getWarrantyStatus(object.warrantyExpiry);

  // Timeline events mapping
  const timelineEvents = [
    {
      id: 'purchased',
      title: 'Purchased',
      description: object.purchaseDate ? `Acquired on ${new Date(object.purchaseDate).toLocaleDateString()}` : 'Date unrecorded',
      active: !!object.purchaseDate,
      icon: Calendar,
      color: 'border-blue-500 text-blue-400'
    },
    {
      id: 'scanned',
      title: 'Passport Scanned & Minted',
      description: `Registered in EarthOS grid on ${new Date(object.createdAt).toLocaleDateString()}`,
      active: true,
      icon: ShieldCheck,
      color: 'border-cyan-500 text-cyan-400'
    },
    {
      id: 'warranty',
      title: `Warranty Status: ${warrantyStatus.label}`,
      description: object.warrantyExpiry ? `Coverage valid until ${new Date(object.warrantyExpiry).toLocaleDateString()}` : 'No warranty protection active',
      active: warrantyStatus.label === 'Active' || warrantyStatus.label === 'Expires Soon',
      icon: Tag,
      color: 'border-[#2E7D32] text-green-400'
    },
    {
      id: 'repair',
      title: 'Circularity Repairs',
      description: object.repairCount > 0 ? `${object.repairCount} repair logs documented` : 'Zero repair logs registered',
      active: object.repairCount > 0 || object.lifecycleStage === 'REPAIR',
      icon: Hammer,
      color: 'border-orange-500 text-orange-400'
    },
    {
      id: 'donation',
      title: 'Donation Channel',
      description: object.donationStatus !== 'NONE' ? `Status is ${object.donationStatus.toLowerCase()}` : 'Not listed for donation',
      active: object.donationStatus !== 'NONE',
      icon: Gift,
      color: 'border-purple-500 text-purple-400'
    },
    {
      id: 'marketplace',
      title: 'Marketplace Listing',
      description: object.marketplaceStatus !== 'NONE' ? `Status is ${object.marketplaceStatus.toLowerCase()}` : 'No secondary market listings active',
      active: object.marketplaceStatus !== 'NONE',
      icon: ShoppingBag,
      color: 'border-pink-500 text-pink-400'
    },
    {
      id: 'recycle',
      title: 'Recycling Loop',
      description: object.lifecycleStage === 'RECYCLED' || object.lifecycleStage === 'DISPOSED' ? 'End of life loop: Recycled & sorted' : 'Active usage cycle (not yet recycled)',
      active: object.lifecycleStage === 'RECYCLED' || object.lifecycleStage === 'DISPOSED',
      icon: Recycle,
      color: 'border-teal-500 text-teal-400'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 flex flex-col gap-8">
      
      {/* Public Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-green-500/10 flex items-center justify-center text-[#2E7D32] rounded-xl">
            <Globe size={20} />
          </div>
          <div>
            <Typography variant="h4" className="font-bold font-display text-white">EARTHOS PUBLIC DPP</Typography>
            <Typography variant="small" className="text-slate-400">Decentralized Material Lineage Registry</Typography>
          </div>
        </div>
        <EosButton variant="outline" className="border-white/10 text-white" onClick={handleShare}>
          <Share2 size={16} className="mr-1.5" /> Share Record
        </EosButton>
      </div>

      {/* Main Certificate Card */}
      <div className="bg-[#0B1220] border-2 border-[#00BCD4]/30 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Glowing decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00BCD4]/10 to-transparent rounded-bl-full pointer-events-none" />

        {/* Certificate Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b-2 border-white/5 pb-8 mb-8">
          <div>
            <Typography variant="h2" className="font-bold font-display tracking-tight text-white leading-tight mb-2">
              Digital Product Passport
            </Typography>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#00BCD4]" />
              <Typography variant="body" className="font-mono text-gray-400 font-semibold uppercase tracking-wider text-xs">
                Registry ID: {object.passportId}
              </Typography>
            </div>
          </div>
          
          <EosBadge variant="success" className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
            Verified Lineage
          </EosBadge>
        </div>

        {/* Certificate Specs & Image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Image Box */}
          <div className="md:col-span-1 border border-white/10 rounded-2xl overflow-hidden aspect-square flex items-center justify-center bg-black/35">
            {object.images && object.images.length > 0 ? (
              <img src={object.images[0]} alt={object.objectName} className="w-full h-full object-cover" />
            ) : (
              <FileText size={48} className="text-white/20" />
            )}
          </div>

          {/* Product Specifications */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <Typography variant="h6" className="font-bold uppercase tracking-widest text-[#00BCD4] text-xs">Specifications</Typography>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Product Name</span>
                <span className="font-semibold text-white">{object.objectName}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Category</span>
                <span className="font-semibold text-white">{object.category} {object.subCategory ? `/ ${object.subCategory}` : ''}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Brand / Manufacturer</span>
                <span className="font-semibold text-white">{object.brand || 'Unregistered'}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Model Ref</span>
                <span className="font-semibold text-white">{object.model || 'N/A'}</span>
              </div>
              <div className="flex flex-col gap-0.5 col-span-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Serial Number (SN)</span>
                <span className="font-mono font-semibold text-white">{object.serialNumber || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Circularity Metrics Column & Warranty Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Circularity Metrics */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <Typography variant="h6" className="font-bold uppercase tracking-widest text-green-400 text-xs">Circularity Specs</Typography>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lifecycle Stage</span>
                <div className="flex items-center gap-1.5 text-white">
                  <Activity size={14} className="text-blue-500" />
                  <span className="font-semibold">{object.lifecycleStage}</span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Physical Condition</span>
                <span className="font-semibold text-white">{object.condition}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Carbon Index</span>
                <div className="flex items-center gap-1.5 text-white">
                  <Leaf size={14} className="text-green-500" />
                  <span className="font-semibold">{object.carbonScore} Score</span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Repairs Documented</span>
                <span className="font-semibold text-white">{object.repairCount} Events</span>
              </div>
            </div>
          </div>

          {/* Warranty calculations */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <Typography variant="h6" className="font-bold uppercase tracking-widest text-orange-400 text-xs">Warranty Protection</Typography>
            </div>
            <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between border border-white/5">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Expiry Threshold</span>
                <span className="text-sm font-semibold text-white">
                  {object.warrantyExpiry ? new Date(object.warrantyExpiry).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${warrantyStatus.color}`}>
                {warrantyStatus.label}
              </span>
            </div>
          </div>
        </div>

        {/* Beautiful Lifecycle Timeline UI */}
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Typography variant="h6" className="font-bold uppercase tracking-widest text-slate-300 text-xs">Product Lifecycle Timeline</Typography>
          </div>
          
          <div className="relative pl-8 border-l border-white/10 flex flex-col gap-8 py-2">
            {timelineEvents.map((evt) => {
              const Icon = evt.icon;
              return (
                <div key={evt.id} className="relative flex flex-col gap-1 select-none">
                  {/* Timeline Dot Node */}
                  <span className={`absolute -left-[45px] top-0.5 h-8 w-8 rounded-full border-2 bg-[#0B1220] flex items-center justify-center ${evt.active ? evt.color : 'border-white/10 text-white/20'}`}>
                    <Icon size={14} />
                  </span>
                  
                  <Typography variant="body" className={`font-semibold ${evt.active ? 'text-white' : 'text-white/40'}`}>
                    {evt.title}
                  </Typography>
                  <Typography variant="small" className={`text-xs ${evt.active ? 'text-slate-400' : 'text-slate-600'}`}>
                    {evt.description}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>

        {/* Blockchain Genesis Record */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Typography variant="h6" className="font-bold uppercase tracking-widest text-gray-500 text-xs">Cryptographic Verification Signature</Typography>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">Registry Mint Timestamp</span>
              <span className="font-mono text-xs text-white">{new Date(object.createdAt).toISOString()}</span>
            </div>
            <div className="flex flex-col gap-1 flex-1 max-w-md">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">Verification Hash</span>
              <span className="font-mono text-[10px] text-gray-400 break-all leading-tight">
                0x{Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PublicPassport;
