import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EosButton, Typography, EosBadge } from '@earthos/ui';
import { 
  ArrowLeft, 
  Printer, 
  Share2, 
  Globe, 
  ShieldCheck, 
  Leaf, 
  Activity, 
  Calendar, 
  Tag, 
  Hammer, 
  Gift, 
  ShoppingBag, 
  Recycle,
  User,
  History,
  TrendingDown,
  ArrowRight,
  FileText
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useObject } from '../hooks/useObjects';
import { ObjectDetailsSkeleton } from '../components/objects/details/ObjectDetailsSkeleton';
import { ObjectError } from '../components/objects/ObjectError';

export const DigitalPassport: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: object, isLoading, isError, error, refetch } = useObject(id!);
  const passportRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <div className="w-full max-w-[1400px] mx-auto pb-12">
        <ObjectDetailsSkeleton />
      </div>
    );
  }

  if (isError || !object) {
    return (
      <div className="w-full max-w-[1400px] mx-auto pb-12 flex flex-col gap-4">
        <EosButton variant="secondary" onClick={() => navigate(`/portal/user/objects/${id}`)} className="w-fit">
          <ArrowLeft size={16} className="mr-1.5" /> Back to Object
        </EosButton>
        <ObjectError message={(error as Error)?.message || 'Object not found.'} onRetry={() => refetch()} />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/passport/${object.passportId || object.objectId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `EarthOS Passport: ${object.objectName}`,
          text: `View the cryptographic digital passport for ${object.objectName}`,
          url,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Public Verification Passport URL copied to clipboard!');
    }
  };

  // Generate a public URL for the QR code verification page
  const verificationUrl = `${window.location.origin}/passport/${object.passportId || object.objectId}`;

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

  // Carbon Ledger Benefit calculations
  const carbonFootprint = object.scanMetadata?.carbonEstimate?.footprint || 120;
  const repairBenefit = object.scanMetadata?.carbonEstimate?.repairBenefit || Math.round(carbonFootprint * 0.75);
  const reuseBenefit = object.scanMetadata?.carbonEstimate?.reuseBenefit || Math.round(carbonFootprint * 0.90);
  const carbonSaved = repairBenefit + reuseBenefit;
  const netBalance = carbonFootprint - carbonSaved;

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
    <div className="w-full max-w-4xl mx-auto pb-12 flex flex-col gap-8 print:p-0 print:m-0 print:bg-white print:text-black">
      
      {/* Header Actions - Hidden when printing */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <EosButton variant="secondary" onClick={() => navigate(`/portal/user/objects/${id}`)} className="w-fit" aria-label="Back">
          <ArrowLeft size={16} className="mr-1.5" /> Back to Details
        </EosButton>
        <div className="flex gap-2">
          <EosButton variant="secondary" onClick={handleShare} className="font-bold">
            <Share2 size={16} className="mr-1.5" /> Share
          </EosButton>
          <EosButton variant="primary" onClick={handlePrint} className="font-bold">
            <Printer size={16} className="mr-1.5" /> Export PDF / Print
          </EosButton>
        </div>
      </div>

      {/* Printable Passport Card */}
      <div 
        ref={passportRef}
        className="bg-white dark:bg-[#0B1220] border-2 border-[#00BCD4]/30 rounded-[2rem] p-6 md:p-12 shadow-2xl relative overflow-hidden print:shadow-none print:border-4 print:border-gray-800 print:rounded-3xl"
      >
        {/* Decorative Background for screen only */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00BCD4]/10 to-transparent rounded-bl-full pointer-events-none print:hidden" />
        
        {/* Passport Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b-2 border-gray-100 dark:border-white/10 pb-8 mb-8 print:border-gray-300">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#2E7D32] print:text-black">
              <Globe size={24} />
              <Typography variant="h5" className="font-bold tracking-widest uppercase">EARTHOS Registry</Typography>
            </div>
            <div>
              <Typography variant="h2" className="font-bold font-display tracking-tight text-[#1F2937] dark:text-white print:text-black leading-tight mb-2">
                Digital Product Passport
              </Typography>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#00BCD4] print:text-black" />
                <Typography variant="body" className="font-mono text-gray-500 font-semibold uppercase tracking-wider print:text-gray-600">
                  ID: {object.passportId || object.objectId}
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/10 print:bg-white print:border-gray-300">
            <QRCodeSVG 
              value={verificationUrl} 
              size={120} 
              level="H" 
              includeMargin={true}
              className="rounded-xl shadow-sm"
            />
            <Typography variant="small" className="text-gray-400 mt-2 font-mono text-[10px] text-center max-w-[120px] break-all">
              Scan to verify authenticity
            </Typography>
          </div>
        </div>

        {/* Certificate Specs & Image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Image Box */}
          <div className="md:col-span-1 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden aspect-square flex items-center justify-center bg-gray-50 dark:bg-black/35 print:border-gray-300">
            {object.images && object.images.length > 0 ? (
              <img src={object.images[0]} alt={object.objectName} className="w-full h-full object-cover" />
            ) : (
              <FileText size={48} className="text-gray-300 dark:text-white/20" />
            )}
          </div>

          {/* Product Specifications */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/10 print:border-gray-300">
              <Typography variant="h6" className="font-bold uppercase tracking-widest text-[#00BCD4] print:text-black text-xs">Specifications</Typography>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Product Name</span>
                <span className="font-semibold text-[#1F2937] dark:text-white print:text-black">{object.objectName}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</span>
                <span className="font-semibold text-[#1F2937] dark:text-white print:text-black">{object.category} {object.subCategory ? `/ ${object.subCategory}` : ''}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Brand / Manufacturer</span>
                <span className="font-semibold text-[#1F2937] dark:text-white print:text-black">{object.brand || 'Unregistered'}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Model Ref</span>
                <span className="font-semibold text-[#1F2937] dark:text-white print:text-black">{object.model || 'N/A'}</span>
              </div>
              <div className="flex flex-col gap-0.5 col-span-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Serial Number (SN)</span>
                <span className="font-mono font-semibold text-[#1F2937] dark:text-white print:text-black">{object.serialNumber || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Circularity Metrics Column & Warranty Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Circularity Metrics */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/10 print:border-gray-300">
              <Typography variant="h6" className="font-bold uppercase tracking-widest text-green-500 print:text-black text-xs">Circularity Specs</Typography>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Lifecycle Stage</span>
                <div className="flex items-center gap-1.5 text-[#1F2937] dark:text-white print:text-black">
                  <Activity size={14} className="text-blue-500 print:text-black" />
                  <span className="font-semibold">{object.lifecycleStage}</span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Physical Condition</span>
                <span className="font-semibold text-[#1F2937] dark:text-white print:text-black">{object.condition}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Carbon Index</span>
                <div className="flex items-center gap-1.5 text-[#1F2937] dark:text-white print:text-black">
                  <Leaf size={14} className="text-green-500 print:text-black" />
                  <span className="font-semibold">{object.carbonScore} Score</span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Repairs Documented</span>
                <span className="font-semibold text-[#1F2937] dark:text-white print:text-black">{object.repairCount} Events</span>
              </div>
            </div>
          </div>

          {/* Warranty calculations */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/10 print:border-gray-300">
              <Typography variant="h6" className="font-bold uppercase tracking-widest text-orange-500 print:text-black text-xs">Warranty Protection</Typography>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl flex items-center justify-between border border-gray-100 dark:border-white/10 print:bg-transparent print:border print:border-gray-300">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Expiry Threshold</span>
                <span className="text-sm font-semibold text-[#1F2937] dark:text-white print:text-black">
                  {object.warrantyExpiry ? new Date(object.warrantyExpiry).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${warrantyStatus.color}`}>
                {warrantyStatus.label}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* LEFT: Ownership Custody Chain (Sprint 12.8) */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/10 print:border-gray-300">
              <History size={16} className="text-blue-400" />
              <Typography variant="h6" className="font-bold uppercase tracking-widest text-blue-400 text-xs text-left">Ownership Custody Chain</Typography>
            </div>
            
            <div className="flex flex-col gap-4 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 print:bg-transparent print:border print:border-gray-300">
              {/* Current Owner */}
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 print:border-gray-300 print:text-black">
                  <User size={14} />
                </div>
                <div className="text-left">
                  <Typography variant="body" className="font-semibold text-[#1F2937] dark:text-white print:text-black text-sm">
                    {object.currentOwner || 'Current Owner'}
                  </Typography>
                  <Typography variant="small" className="text-[10px] text-green-400 print:text-black font-bold uppercase tracking-wider">
                    Current Custodian
                  </Typography>
                </div>
              </div>

              {/* Connector */}
              <div className="pl-4 py-1 text-slate-500">
                <ArrowRight size={14} className="rotate-90" />
              </div>

              {/* Previous Owners */}
              {object.previousOwners && object.previousOwners.map((prev: string, index: number) => (
                <React.Fragment key={index}>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-500/10 border border-gray-100 dark:border-white/5 flex items-center justify-center text-slate-400 print:border-gray-300 print:text-black">
                      <User size={14} />
                    </div>
                    <div className="text-left">
                      <Typography variant="body" className="font-medium text-slate-500 dark:text-slate-300 print:text-black text-sm">
                        {prev}
                      </Typography>
                      <Typography variant="small" className="text-[10px] text-slate-400 dark:text-slate-500 print:text-gray-500 font-bold uppercase tracking-wider">
                        Previous Transactor #{index + 1}
                      </Typography>
                    </div>
                  </div>
                  {index < object.previousOwners.length - 1 && (
                    <div className="pl-4 py-1 text-slate-500">
                      <ArrowRight size={14} className="rotate-90" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* RIGHT: Carbon Ledger Balance (Sprint 12.9) */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/10 print:border-gray-300">
              <TrendingDown size={16} className="text-emerald-400" />
              <Typography variant="h6" className="font-bold uppercase tracking-widest text-emerald-400 text-xs text-left">Carbon Balance Ledger</Typography>
            </div>
            
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col gap-4 print:bg-transparent print:border print:border-gray-300">
              <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-white/5 pb-2 print:border-gray-300">
                <span className="text-gray-500 dark:text-slate-400 print:text-gray-700">Carbon Generated (Manufacturing)</span>
                <span className="font-mono font-semibold text-red-400 print:text-black">+{carbonFootprint} kg CO2e</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-white/5 pb-2 print:border-gray-300">
                <span className="text-gray-500 dark:text-slate-400 print:text-gray-700">Repair Benefit (Circular offset)</span>
                <span className="font-mono font-semibold text-green-400 print:text-black">-{repairBenefit} kg CO2e</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-white/5 pb-2 print:border-gray-300">
                <span className="text-gray-500 dark:text-slate-400 print:text-gray-700">Reuse Benefit (Lifespan offset)</span>
                <span className="font-mono font-semibold text-green-400 print:text-black">-{reuseBenefit} kg CO2e</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-white/5 pb-2 print:border-gray-300">
                <span className="text-gray-500 dark:text-slate-400 font-bold print:text-gray-800">Total Environmental Offsets</span>
                <span className="font-mono font-bold text-green-400 print:text-black">-{carbonSaved} kg CO2e</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[#1F2937] dark:text-white font-bold text-sm print:text-black">Net Carbon Signature</span>
                <span className={`font-mono font-bold text-base px-2.5 py-0.5 rounded print:text-black ${netBalance <= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {netBalance <= 0 ? `${netBalance} kg CO2e` : `+${netBalance} kg CO2e`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Repair Cards list (Sprint 12.7) */}
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/10 print:border-gray-300">
            <Hammer size={16} className="text-orange-400" />
            <Typography variant="h6" className="font-bold uppercase tracking-widest text-orange-400 text-xs text-left">Repair & Maintenance History</Typography>
          </div>
          
          {object.maintenanceRecords && object.maintenanceRecords.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {object.maintenanceRecords.map((rec: any) => (
                <div key={rec.recordId || rec._id} className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-3 relative overflow-hidden text-left print:bg-transparent print:border print:border-gray-300">
                  <div className="absolute top-0 right-0 h-1.5 w-full bg-orange-500" />
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <Typography variant="body" className="font-semibold text-[#1F2937] dark:text-white print:text-black text-sm">
                        {rec.title}
                      </Typography>
                      <span className="text-[10px] text-gray-500 dark:text-slate-400 font-mono">
                        {new Date(rec.date).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/10 text-orange-400 print:text-black uppercase">
                      {rec.status}
                    </span>
                  </div>
                  {rec.technicianNotes && (
                    <p className="text-xs text-gray-500 dark:text-slate-400 italic bg-white/5 dark:bg-black/25 p-3 rounded-lg border border-gray-100 dark:border-white/5 print:border-gray-300">
                      "{rec.technicianNotes}"
                    </p>
                  )}
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-slate-400 pt-2 border-t border-gray-100 dark:border-white/5 print:border-gray-300">
                    <span>Service Cost</span>
                    <span className="font-mono font-semibold text-[#1F2937] dark:text-white print:text-black">${rec.cost || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-8 rounded-2xl text-gray-400 dark:text-slate-500 text-sm print:border-gray-300">
              No circular repairs have been registered under this asset passport yet.
            </div>
          )}
        </div>

        {/* Beautiful Lifecycle Timeline UI */}
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/10 print:border-gray-300">
            <Typography variant="h6" className="font-bold uppercase tracking-widest text-gray-400 print:text-black text-xs">Product Lifecycle Timeline</Typography>
          </div>
          
          <div className="relative pl-8 border-l border-gray-100 dark:border-white/10 flex flex-col gap-8 py-2 print:border-gray-300">
            {timelineEvents.map((evt) => {
              const Icon = evt.icon;
              return (
                <div key={evt.id} className="relative flex flex-col gap-1 select-none text-left">
                  {/* Timeline Dot Node */}
                  <span className={`absolute -left-[45px] top-0.5 h-8 w-8 rounded-full border-2 bg-white dark:bg-[#0B1220] flex items-center justify-center print:bg-white print:border-gray-400 ${evt.active ? evt.color : 'border-gray-100 dark:border-white/10 text-gray-300 dark:text-white/20 print:text-gray-400'}`}>
                    <Icon size={14} />
                  </span>
                  
                  <Typography variant="body" className={`font-semibold ${evt.active ? 'text-[#1F2937] dark:text-white print:text-black' : 'text-gray-400 dark:text-white/40 print:text-gray-400'}`}>
                    {evt.title}
                  </Typography>
                  <Typography variant="small" className={`text-xs ${evt.active ? 'text-gray-500 dark:text-slate-400 print:text-gray-700' : 'text-gray-300 dark:text-slate-600 print:text-gray-400'}`}>
                    {evt.description}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>

        {/* Registration Block */}
        <div className="flex flex-col gap-6 md:col-span-2 mt-4 text-left">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/10 print:border-gray-300">
            <Typography variant="h6" className="font-bold uppercase tracking-widest text-gray-400 print:text-black text-xs">Genesis Record</Typography>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl print:bg-transparent print:border print:border-gray-300">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Minted Date</span>
              <span className="font-mono text-sm text-[#1F2937] dark:text-white print:text-black">{new Date(object.createdAt).toISOString()}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cryptographic Hash (Simulated)</span>
              <span className="font-mono text-xs text-gray-400 break-all leading-tight">
                0x{Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Global Print Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          @page {
            size: auto;
            margin: 20mm;
          }
          header, nav, footer {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
};
export default DigitalPassport;
