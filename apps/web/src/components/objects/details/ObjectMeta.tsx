import React from 'react';
import { EosCard, Typography, EosBadge, EosButton } from '@earthos/ui';
import { QrCode, FileText, AlignLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ObjectItem } from '../../../services/objectService';

interface ObjectMetaProps {
  object: ObjectItem;
}

export const ObjectMeta: React.FC<ObjectMetaProps> = ({ object }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      
      {/* QR Code */}
      <EosCard variant="glass" className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <QrCode size={20} className="text-[#2E7D32]" />
          <Typography variant="h5" className="font-bold">Digital Identity</Typography>
        </div>
        <div className="flex flex-col gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white p-1 rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
              <QRCodeSVG 
                value={`${window.location.origin}/objects/${object._id}/passport`} 
                size={70} 
                level="L" 
                includeMargin={false}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Typography variant="h6" className="font-bold">{object.objectId}</Typography>
              <Typography variant="small" className="text-gray-500 text-xs line-clamp-2">
                Scan this QR code to quickly access this object's cryptographic digital passport.
              </Typography>
            </div>
          </div>
          <EosButton 
            variant="primary" 
            onClick={() => navigate(`/objects/${object._id}/passport`)}
            className="w-full justify-center"
          >
            <ExternalLink size={16} className="mr-2" />
            View Digital Passport
          </EosButton>
        </div>
      </EosCard>

      {/* Notes */}
      {object.notes && (
        <EosCard variant="glass" className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <AlignLeft size={20} className="text-[#2E7D32]" />
            <Typography variant="h5" className="font-bold">Notes</Typography>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10 whitespace-pre-wrap">
            {object.notes}
          </div>
        </EosCard>
      )}

      {/* Files Placeholder */}
      <EosCard variant="glass" className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-[#2E7D32]" />
            <Typography variant="h5" className="font-bold">Files & Documents</Typography>
          </div>
          <EosBadge variant="secondary" className="px-2 py-0.5">0 Files</EosBadge>
        </div>
        
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-center gap-2">
          <FileText size={24} className="text-gray-400" />
          <Typography variant="small" className="text-gray-500">
            No files attached to this object yet.
          </Typography>
        </div>
      </EosCard>
      
    </div>
  );
};
