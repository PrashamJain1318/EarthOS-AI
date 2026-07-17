import * as React from 'react';
import { Typography, Container, Section, EosCard, EosButton } from '@earthos/ui';
import { Check } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <Section>
      <Container className="flex flex-col gap-12">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
          <Typography variant="h2">Transparent Pricing</Typography>
          <Typography variant="body" className="text-[#B0BEC5]">
            Choose the subscription model aligned with your organization's material scale.
          </Typography>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Individual */}
          <EosCard variant="glass" className="flex flex-col justify-between gap-6 p-8">
            <div className="flex flex-col gap-2">
              <Typography variant="h3">Free Tier</Typography>
              <Typography variant="small" className="text-[#B0BEC5]">For conscious individuals and families.</Typography>
              <span className="text-3xl font-bold text-[#1F2937] dark:text-[#F8FAFC] my-4">$0</span>
              <ul className="flex flex-col gap-3 text-sm text-[#B0BEC5]">
                <li className="flex items-center gap-2"><Check size={16} className="text-[#2E7D32]" /> Scan up to 50 items/mo</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-[#2E7D32]" /> Standard Earth Score</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-[#2E7D32]" /> Local donation listings</li>
              </ul>
            </div>
            <EosButton variant="secondary" className="w-full">Get Started</EosButton>
          </EosCard>

          {/* Enterprise */}
          <EosCard variant="default" className="flex flex-col justify-between gap-6 p-8 border-2 border-[#2E7D32]/40 relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2E7D32] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
            <div className="flex flex-col gap-2">
              <Typography variant="h3">Enterprise</Typography>
              <Typography variant="small" className="text-[#B0BEC5]">For manufacturing plants and brands.</Typography>
              <span className="text-3xl font-bold text-[#1F2937] dark:text-[#F8FAFC] my-4">$499<span className="text-sm font-normal text-[#B0BEC5]">/mo</span></span>
              <ul className="flex flex-col gap-3 text-sm text-[#B0BEC5]">
                <li className="flex items-center gap-2"><Check size={16} className="text-[#2E7D32]" /> Unlimited material tracking</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-[#2E7D32]" /> Automated ERP synchronization</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-[#2E7D32]" /> Scope 3 Audit exports (CSRD)</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-[#2E7D32]" /> Dynamic pricing API hooks</li>
              </ul>
            </div>
            <EosButton variant="primary" className="w-full">Start Free Trial</EosButton>
          </EosCard>

          {/* Government */}
          <EosCard variant="glass" className="flex flex-col justify-between gap-6 p-8">
            <div className="flex flex-col gap-2">
              <Typography variant="h3">Public Sector</Typography>
              <Typography variant="small" className="text-[#B0BEC5]">For smart cities and solid waste divisions.</Typography>
              <span className="text-3xl font-bold text-[#1F2937] dark:text-[#F8FAFC] my-4">Custom</span>
              <ul className="flex flex-col gap-3 text-sm text-[#B0BEC5]">
                <li className="flex items-center gap-2"><Check size={16} className="text-[#2E7D32]" /> Regional resource heatmaps</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-[#2E7D32]" /> Waste fleet route optimization</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-[#2E7D32]" /> EPR compliance logging</li>
              </ul>
            </div>
            <EosButton variant="secondary" className="w-full">Contact Sales</EosButton>
          </EosCard>
        </div>
      </Container>
    </Section>
  );
};
export default Pricing;
