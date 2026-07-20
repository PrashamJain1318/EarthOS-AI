import React, { useState, useEffect } from 'react';
import { Typography, EosCard, EosBadge, EosButton } from '@earthos/ui';
import { ShoppingBag, Eye, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Marketplace: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/v1/passports/marketplace/listings');
        const resData = await response.json();
        if (response.ok) {
          setItems(resData.data || []);
        }
      } catch (err) {
        console.error('Error fetching marketplace listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Default fallback mock listings if none exist in the database
  const fallbackListings = [
    {
      objectId: 'EO-9844',
      passportId: 'EARTH-2026-POLY98A',
      objectName: '12 Tons Clean Polyethylene',
      category: 'PLASTICS',
      brand: 'Gulf Coast Polymers',
      condition: 'NEW',
      purchasePrice: 420,
      currency: 'USD',
      images: []
    },
    {
      objectId: 'EO-3419',
      passportId: 'EARTH-2026-COPR88B',
      objectName: '5.8 Tons Secondary Copper Scrap',
      category: 'METALS',
      brand: 'Chicago Scrap Corp',
      condition: 'GOOD',
      purchasePrice: 6200,
      currency: 'USD',
      images: []
    }
  ];

  const activeListings = items.length > 0 ? items : fallbackListings;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto py-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <Typography variant="h3">Circular Marketplace</Typography>
          <Typography variant="small" className="text-[#B0BEC5]">
            Search and trade verified secondary assets, parts, and materials with attached Digital Product Passports.
          </Typography>
        </div>
        <EosBadge variant="info" className="px-3 py-1 font-bold">
          {activeListings.length} Active Listings
        </EosBadge>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh] gap-3">
          <Loader2 className="animate-spin text-[#00BCD4]" size={32} />
          <Typography variant="body">Loading Circular Exchange...</Typography>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeListings.map((item, idx) => (
            <EosCard 
              key={item.objectId || idx} 
              variant="glass" 
              className="flex flex-col gap-4 border border-[#00BCD4]/10 bg-cyan-50/5 relative overflow-hidden"
            >
              {/* Glow backdrop */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00BCD4]/5 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex justify-between items-start gap-4 text-left">
                <div>
                  <Typography variant="h4" className="font-bold text-white leading-snug">
                    {item.objectName}
                  </Typography>
                  <Typography variant="small" className="text-slate-400 font-mono text-[10px] uppercase mt-1">
                    Category: {item.category} | Brand: {item.brand || 'Unregistered'}
                  </Typography>
                </div>
                <EosBadge variant="success" className="font-mono px-2 py-0.5 text-xs font-bold shrink-0">
                  {item.purchasePrice ? `${item.currency === 'USD' || !item.currency ? '$' : item.currency}${item.purchasePrice} / Unit` : 'Offer'}
                </EosBadge>
              </div>

              {/* Material preview image */}
              <div className="h-40 w-full rounded-xl overflow-hidden bg-black/45 border border-white/5 flex items-center justify-center">
                {item.images && item.images.length > 0 ? (
                  <img src={item.images[0]} alt={item.objectName} className="w-full h-full object-cover" />
                ) : (
                  <ShoppingBag size={48} className="text-white/10" />
                )}
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Asset Condition</span>
                <span className="font-bold text-[#00BCD4]">{item.condition}</span>
              </div>

              <hr className="border-white/5" />

              {/* Automatic Passport Attachment (Sprint 12.13) */}
              <div className="flex gap-2">
                <EosButton 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-white/10 text-white hover:bg-white/5 text-xs font-semibold"
                  onClick={() => window.open(`/passport/${item.passportId || item.objectId}`, '_blank')}
                >
                  <Eye size={14} className="mr-1.5" /> View Passport
                </EosButton>
                <EosButton 
                  variant="primary" 
                  size="sm" 
                  className="flex-1 bg-[#00BCD4] hover:bg-[#0097A7] text-black font-bold text-xs"
                  onClick={() => alert(`Initiating circular transfer details for: ${item.objectName}`)}
                >
                  Contact Custodian <ArrowRight size={14} className="ml-1.5" />
                </EosButton>
              </div>
            </EosCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
