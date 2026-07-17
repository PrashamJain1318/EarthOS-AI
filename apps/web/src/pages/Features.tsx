import * as React from 'react';
import { Typography, Container, Section, EosCard } from '@earthos/ui';
import { Scan, ShieldAlert, BadgeDollarSign, HeartHandshake } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <Section>
      <Container className="flex flex-col gap-12">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
          <Typography variant="h2">Platform Ecosystem</Typography>
          <Typography variant="body" className="text-[#B0BEC5]">
            Four integrated capabilities built to map, value, and route physical resources.
          </Typography>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <EosCard variant="default" className="flex gap-4 p-8">
            <Scan className="text-[#2E7D32]" size={36} />
            <div className="flex flex-col gap-2">
              <Typography variant="h4">1. AI Material Scanner</Typography>
              <Typography variant="small">
                Our vision models isolate objects, read batch data, parse chemical SDS files, and log purity vectors.
              </Typography>
            </div>
          </EosCard>

          <EosCard variant="default" className="flex gap-4 p-8">
            <ShieldAlert className="text-[#00BCD4]" size={36} />
            <div className="flex flex-col gap-2">
              <Typography variant="h4">2. Digital Resource Passport</Typography>
              <Typography variant="small">
                Mints cryptographic blockchain verification tokens logging ownership transfers, purity metrics, and carbon histories.
              </Typography>
            </div>
          </EosCard>

          <EosCard variant="default" className="flex gap-4 p-8">
            <BadgeDollarSign className="text-[#FF9800]" size={36} />
            <div className="flex flex-col gap-2">
              <Typography variant="h4">3. Circular Exchange Hub</Typography>
              <Typography variant="small">
                A two-sided matching engine that alerts industrial factories of byproduct availability, pricing resources dynamically.
              </Typography>
            </div>
          </EosCard>

          <EosCard variant="default" className="flex gap-4 p-8">
            <HeartHandshake className="text-[#7E57C2]" size={36} />
            <div className="flex flex-col gap-2">
              <Typography variant="h4">4. Smart Donation Engine</Typography>
              <Typography variant="small">
                Automatically routes reusable clothing and home assets to verified local NGOs, planning optimized collection paths.
              </Typography>
            </div>
          </EosCard>
        </div>
      </Container>
    </Section>
  );
};
export default Features;
