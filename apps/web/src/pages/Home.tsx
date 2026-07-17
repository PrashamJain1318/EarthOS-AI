import * as React from 'react';
import { EosButton, EosCard, Typography, Container, Section } from '@earthos/ui';
import { useNavigate } from 'react-router-dom';
import { Globe, Shield, Sparkles, Activity } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <Section className="relative bg-gradient-to-br from-white to-[#F8FAFC] dark:from-[#0B1220] dark:to-[#162033]/20">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 items-start">
            <Typography variant="h1">
              Nothing useful should ever become waste.
            </Typography>
            <Typography variant="body" className="text-[#B0BEC5] dark:text-[#CBD5E1]">
              EARTHOS AI is the Operating System for Earth's Resources. We catalog, track, price, and route every physical molecule back into the productive economy.
            </Typography>
            <div className="flex gap-4">
              <EosButton variant="primary" onClick={() => navigate('/signup')}>
                Launch Platform
              </EosButton>
              <EosButton variant="secondary" onClick={() => navigate('/about')}>
                Read Story
              </EosButton>
            </div>
          </div>
          
          {/* Animated placeholder globe */}
          <div className="flex items-center justify-center p-8 select-none">
            <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full border border-[#2E7D32]/20 flex items-center justify-center animate-spin-slow">
              <Globe className="text-[#2E7D32] h-40 w-40 opacity-70" />
              <div className="absolute top-4 left-4 h-6 w-6 rounded-full bg-[#00BCD4]/20 animate-pulse" />
              <div className="absolute bottom-8 right-6 h-4 w-4 rounded-full bg-[#FF9800]/20 animate-pulse" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Feature grid preview */}
      <Section className="border-t border-[#B0BEC5]/30 dark:border-[#263238]/30">
        <Container className="flex flex-col gap-12">
          <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
            <Typography variant="h2">Resource Orchestration</Typography>
            <Typography variant="body" className="text-[#B0BEC5]">
              Moving beyond linear waste disposal to intelligent lifecycle tracking.
            </Typography>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <EosCard variant="glass" hoverable onClick={() => navigate('/features')}>
              <Sparkles className="text-[#00BCD4] mb-4" size={32} />
              <Typography variant="h4" className="mb-2">AI Object Scanner</Typography>
              <Typography variant="small">
                Instantly classify materials, detect chemical configurations, and predict wear states using vision models.
              </Typography>
            </EosCard>

            <EosCard variant="glass" hoverable onClick={() => navigate('/features')}>
              <Shield className="text-[#2E7D32] mb-4" size={32} />
              <Typography variant="h4" className="mb-2">Earth Passport</Typography>
              <Typography variant="small">
                Verify material origin, track custody transitions, and maintain verified Digital Product Passports.
              </Typography>
            </EosCard>

            <EosCard variant="glass" hoverable onClick={() => navigate('/features')}>
              <Activity className="text-[#FF9800] mb-4" size={32} />
              <Typography variant="h4" className="mb-2">Environmental Twin</Typography>
              <Typography variant="small">
                Visualize personal, corporate, or city-wide resource grids in real-time using 3D spatial mapping.
              </Typography>
            </EosCard>
          </div>
        </Container>
      </Section>
    </div>
  );
};
export default Home;
