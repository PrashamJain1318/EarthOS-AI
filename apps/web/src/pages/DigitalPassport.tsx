import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EosButton, Typography } from '@earthos/ui';
import { ArrowLeft, Printer, Share2, Globe, ShieldCheck, Leaf, Activity } from 'lucide-react';
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
        <EosButton variant="secondary" onClick={() => navigate(`/objects/${id}`)} className="w-fit">
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
    const url = window.location.href;
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
      alert('Passport URL copied to clipboard!');
    }
  };

  // Generate a public URL for the QR code verification page
  const verificationUrl = `${window.location.origin}/passport/${object.passportId || object.objectId}`;

  return (
    <div className="w-full max-w-4xl mx-auto pb-12 flex flex-col gap-8 print:p-0 print:m-0 print:bg-white print:text-black">
      
      {/* Header Actions - Hidden when printing */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <EosButton variant="secondary" onClick={() => navigate(`/objects/${id}`)} className="w-fit" aria-label="Back">
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
        className="bg-white dark:bg-[#0B1220] border-2 border-[#00BCD4]/30 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden print:shadow-none print:border-4 print:border-gray-800 print:rounded-3xl"
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

        {/* Passport Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          
          {/* Identity Block */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/10 print:border-gray-300">
              <Typography variant="h6" className="font-bold uppercase tracking-widest text-[#00BCD4] print:text-black text-xs">Identity Specs</Typography>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Classification</span>
                <span className="font-semibold text-[#1F2937] dark:text-white print:text-black">{object.objectName}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</span>
                <span className="font-semibold text-[#1F2937] dark:text-white print:text-black">{object.category} {object.subCategory ? `/ ${object.subCategory}` : ''}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Manufacturer / Brand</span>
                <span className="font-semibold text-[#1F2937] dark:text-white print:text-black">{object.brand || 'Unspecified'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Model Ref</span>
                <span className="font-semibold text-[#1F2937] dark:text-white print:text-black">{object.model || 'N/A'}</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hardware Serial (VIN/SN)</span>
                <span className="font-mono font-semibold text-[#1F2937] dark:text-white print:text-black">{object.serialNumber || 'Unregistered'}</span>
              </div>
            </div>
          </div>

          {/* Lifecycle & Environment Block */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/10 print:border-gray-300">
              <Typography variant="h6" className="font-bold uppercase tracking-widest text-[#2E7D32] print:text-black text-xs">Lifecycle & Environment</Typography>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current Stage</span>
                <div className="flex items-center gap-1.5 text-[#1F2937] dark:text-white print:text-black">
                  <Activity size={14} className="text-blue-500 print:text-black" />
                  <span className="font-semibold">{object.lifecycleStage}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Asset Condition</span>
                <span className="font-semibold text-[#1F2937] dark:text-white print:text-black">{object.condition}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Carbon Assessment</span>
                <div className="flex items-center gap-1.5 text-[#1F2937] dark:text-white print:text-black">
                  <Leaf size={14} className="text-green-500 print:text-black" />
                  <span className="font-semibold">{object.carbonScore} Score</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Circularity / Repairs</span>
                <span className="font-semibold text-[#1F2937] dark:text-white print:text-black">{object.repairCount} Registered Events</span>
              </div>
            </div>
          </div>

          {/* Registration Block */}
          <div className="flex flex-col gap-6 md:col-span-2 mt-4">
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

      </div>

      {/* Global Print Styles (Tailwind 'print:' variants handle most, but overriding some body margins helps) */}
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
