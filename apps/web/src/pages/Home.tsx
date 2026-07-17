import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { EosButton, Typography, Container } from '@earthos/ui';
import { HeroCanvas } from '../components/HeroCanvas';
import { ChevronDown, Sparkles } from 'lucide-react';

// Middle Section components
import { ProblemSection } from '../components/sections/ProblemSection';
import { SolutionSection } from '../components/sections/SolutionSection';
import { FeaturesSection } from '../components/sections/FeaturesSection';
import { InteractiveDemo } from '../components/sections/InteractiveDemo';
import { ImpactSection } from '../components/sections/ImpactSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FaqSection } from '../components/sections/FaqSection';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // Anim refs for GSAP entrance triggers
  const taglineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal text elements sequentially with GSAP easing
    const tl = gsap.timeline();

    tl.fromTo(taglineRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    );

    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    tl.fromTo(indicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.2'
    );
  }, []);

  return (
    <div className="relative w-full bg-white dark:bg-[#0B1220] transition-colors duration-200">
      
      {/* Hero Section Container */}
      <div className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden flex items-center">
        {/* Aurora Ambient Background Effect */}
        <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] h-[350px] w-[350px] rounded-full bg-[#2E7D32]/25 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-[#00BCD4]/25 blur-[120px] animate-pulse" />
        </div>

        {/* R3F 3D Canvas Layer */}
        <HeroCanvas />

        {/* Core Presentation Content Container */}
        <Container className="relative z-10 grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)] py-12">
          <div className="flex flex-col gap-6 items-start max-w-xl">
            
            {/* AI Scanner Tagline Badge */}
            <div 
              ref={taglineRef}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono text-[#2E7D32] dark:text-[#CBD5E1] bg-green-50/50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-900/30 backdrop-blur-md select-none"
            >
              <Sparkles size={12} className="text-[#2E7D32]" />
              <span>AI Resource Operating System</span>
            </div>

            <Typography
              ref={titleRef}
              variant="h1"
              className="tracking-tight text-[#1F2937] dark:text-[#F8FAFC] font-extrabold"
            >
              Nothing useful should ever become waste.
            </Typography>

            <Typography
              ref={subtitleRef}
              variant="body"
              className="text-gray-500 dark:text-[#CBD5E1] font-medium max-w-lg leading-relaxed"
            >
              EARTHOS AI maps physical assets, tracks material purity, and coordinates global logistics streams in real-time, driving planetary resource waste to zero.
            </Typography>

            {/* Action CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 items-center w-full">
              <EosButton 
                variant="primary" 
                className="px-6 py-3 font-semibold shadow-lg hover:shadow-green-500/10 transition-shadow"
                onClick={() => navigate('/signup')}
              >
                Launch Platform
              </EosButton>
              <EosButton 
                variant="secondary" 
                className="px-6 py-3 font-semibold backdrop-blur-sm"
                onClick={() => navigate('/about')}
              >
                Read Blueprint
              </EosButton>
            </div>
          </div>

          {/* Empty right column: Reserved to highlight the 3D Canvas on desktop viewports */}
          <div className="hidden md:block h-[500px]" />
        </Container>

        {/* Floating Scroll Indicator */}
        <motion.div
          ref={indicatorRef}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer text-[#B0BEC5] hover:text-[#1F2937] dark:hover:text-[#F8FAFC] transition-colors select-none z-10"
          onClick={() => {
            window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold font-mono">Initiate Telemetry</span>
          <ChevronDown size={16} className="text-[#2E7D32]" />
        </motion.div>
      </div>

      {/* Structured Presentation Sections */}
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <InteractiveDemo />
      <ImpactSection />
      <TestimonialsSection />
      <FaqSection />
    </div>
  );
};
export default Home;
