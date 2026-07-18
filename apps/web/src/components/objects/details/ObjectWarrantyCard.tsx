import React from 'react';
import { EosCard, Typography, EosBadge, EosButton } from '@earthos/ui';
import { ShieldCheck, CalendarPlus, Clock, FileText, Phone, Store, Download } from 'lucide-react';
import { ObjectItem } from '../../../services/objectService';
import { generateICS, downloadICS } from '../../../lib/calendar';

interface ObjectWarrantyCardProps {
  object: ObjectItem;
}

export const ObjectWarrantyCard: React.FC<ObjectWarrantyCardProps> = ({ object }) => {
  if (!object.warrantyExpiry && !object.warranty?.provider) {
    return (
      <EosCard variant="glass" className="p-6 flex flex-col items-center justify-center text-center gap-3 border-dashed border-[#B0BEC5]/30">
        <div className="p-3 rounded-full bg-gray-100 dark:bg-white/5 text-gray-400">
          <ShieldCheck size={24} />
        </div>
        <div>
          <Typography variant="h5" className="font-bold text-gray-400">No Warranty Tracked</Typography>
          <Typography variant="small" className="text-gray-500">This object does not have warranty details recorded.</Typography>
        </div>
      </EosCard>
    );
  }

  const expiryDate = object.warrantyExpiry ? new Date(object.warrantyExpiry) : null;
  const isExpired = expiryDate ? expiryDate < new Date() : false;
  
  // Calculate remaining days if valid
  let remainingDays = 0;
  let totalDays = 0;
  let progress = 100;
  
  if (expiryDate && !isExpired) {
    const diffTime = Math.abs(expiryDate.getTime() - new Date().getTime());
    remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (object.purchaseDate) {
      const purchaseDate = new Date(object.purchaseDate);
      const totalTime = Math.abs(expiryDate.getTime() - purchaseDate.getTime());
      totalDays = Math.ceil(totalTime / (1000 * 60 * 60 * 24));
      
      const elapsedDays = totalDays - remainingDays;
      progress = (elapsedDays / totalDays) * 100;
    } else {
      // If no purchase date, assume 1 year warranty for progress bar
      progress = 50; 
    }
  } else if (isExpired) {
    progress = 100;
  }

  const handleAddToCalendar = () => {
    if (!expiryDate) return;
    
    // Create an all-day event for the expiry date
    const event = {
      title: `Warranty Expiry: ${object.objectName}`,
      description: `The warranty for ${object.objectName} (${object.objectId}) is expiring.\nProvider: ${object.warranty?.provider || 'N/A'}\nContact: ${object.warranty?.contact || 'N/A'}`,
      startDate: new Date(expiryDate.getFullYear(), expiryDate.getMonth(), expiryDate.getDate(), 9, 0, 0), // 9 AM
      url: window.location.href
    };
    
    const icsContent = generateICS(event);
    downloadICS(`Warranty_${object.objectId}`, icsContent);
  };

  return (
    <EosCard variant="glass" className="p-6 flex flex-col gap-6 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none ${isExpired ? 'bg-red-500' : 'bg-green-500'}`} />

      <div className="flex justify-between items-start z-10">
        <div className="flex items-center gap-2">
          <ShieldCheck size={20} className={isExpired ? 'text-red-500' : 'text-green-500'} />
          <Typography variant="h5" className="font-bold">Warranty Tracker</Typography>
        </div>
        <EosBadge variant={isExpired ? 'error' : 'success'}>
          {isExpired ? 'Expired' : 'Active'}
        </EosBadge>
      </div>

      {expiryDate && (
        <div className="flex flex-col gap-3 z-10">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <Typography variant="h3" className="font-bold tracking-tight">
                {isExpired ? '0' : remainingDays}
              </Typography>
              <Typography variant="small" className="text-gray-500 font-medium">Days Remaining</Typography>
            </div>
            <div className="text-right flex flex-col">
              <Typography variant="small" className="text-gray-500 font-medium">Expires on</Typography>
              <Typography variant="body" className="font-bold">{expiryDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
            </div>
          </div>

          <div className="w-full bg-gray-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${isExpired ? 'bg-red-500' : remainingDays < 30 ? 'bg-orange-500' : 'bg-green-500'}`} 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 z-10">
        <div className="flex flex-col gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2 text-[#1F2937] dark:text-[#F8FAFC]">
            <Store size={16} className="text-[#2E7D32]" />
            <Typography variant="body" className="font-bold">Service Provider</Typography>
          </div>
          <Typography variant="small" className="text-gray-600 dark:text-gray-400">
            {object.warranty?.provider || 'No provider recorded'}
          </Typography>
          
          <div className="flex items-center gap-2 text-[#1F2937] dark:text-[#F8FAFC] mt-2">
            <Phone size={16} className="text-[#2E7D32]" />
            <Typography variant="body" className="font-bold">Contact Info</Typography>
          </div>
          <Typography variant="small" className="text-gray-600 dark:text-gray-400">
            {object.warranty?.contact || 'No contact recorded'}
          </Typography>
        </div>

        <div className="flex flex-col gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2 text-[#1F2937] dark:text-[#F8FAFC]">
            <Clock size={16} className="text-blue-500" />
            <Typography variant="body" className="font-bold">Active Reminders</Typography>
          </div>
          <div className="flex flex-wrap gap-2">
            {object.warranty?.reminders && object.warranty.reminders.length > 0 ? (
              object.warranty.reminders.map(days => (
                <span key={days} className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {days} Days Before
                </span>
              ))
            ) : (
              <Typography variant="small" className="text-gray-500">No reminders set</Typography>
            )}
          </div>

          <div className="flex items-center gap-2 text-[#1F2937] dark:text-[#F8FAFC] mt-2">
            <FileText size={16} className="text-orange-500" />
            <Typography variant="body" className="font-bold">Documents</Typography>
          </div>
          <div className="flex flex-col gap-2">
            {object.warranty?.documents && object.warranty.documents.length > 0 ? (
              object.warranty.documents.map((doc, i) => (
                <a key={i} href={doc} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#162033] border border-gray-200 dark:border-white/10 hover:border-orange-500/50 transition-colors group">
                  <span className="text-xs font-medium truncate max-w-[120px]">Document {i + 1}</span>
                  <Download size={14} className="text-gray-400 group-hover:text-orange-500" />
                </a>
              ))
            ) : (
              <Typography variant="small" className="text-gray-500">No documents attached</Typography>
            )}
          </div>
        </div>
      </div>

      {expiryDate && (
        <EosButton variant="secondary" onClick={handleAddToCalendar} className="w-full font-bold flex items-center justify-center gap-2 mt-2 z-10">
          <CalendarPlus size={16} />
          Add to Calendar
        </EosButton>
      )}
    </EosCard>
  );
};
