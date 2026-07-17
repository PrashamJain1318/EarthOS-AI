import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, EosCard, Container, EosButton } from '@earthos/ui';
import { Scan, Shield, Cpu, ShoppingBag, Wrench, Heart, Wallet, ChevronRight } from 'lucide-react';

export const SolutionSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: '1. Scan',
      desc: 'Capture photos, barcodes, or SDS datasheets. Our computer vision and chemical classification models analyze the composition.',
      icon: <Scan size={28} />
    },
    {
      title: '2. Passport',
      desc: 'Mints a Digital Product Passport (DPP) logging material pureness, origin telemetry, and custody transfers.',
      icon: <Shield size={28} />
    },
    {
      title: '3. AI Analysis',
      desc: 'EarthGPT reviews regulatory checklists (like CSRD / EPR) and recommends optimal loop lifecycles.',
      icon: <Cpu size={28} />
    },
    {
      title: '4. Exchange',
      desc: 'Identifies byproduct demand in our double-sided marketplace, listing industrial scrap automatically.',
      icon: <ShoppingBag size={28} />
    },
    {
      title: '5. Repair',
      desc: 'Routes structural parts to localized repair centers, updating warranty records inside the passport registry.',
      icon: <Wrench size={28} />
    },
    {
      title: '6. Donate',
      desc: 'Pairs surplus goods with local NGOs, organizing regional pickup fleets with co-loaded freight paths.',
      icon: <Heart size={28} />
    },
    {
      title: '7. Wallet Credits',
      desc: 'Logs raw carbon abated, minting transaction vouchers directly into the user\'s Carbon Wallet.',
      icon: <Wallet size={28} />
    }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC]/40 dark:bg-[#162033]/20 border-t border-[#B0BEC5]/20 dark:border-[#263238]/20 relative overflow-hidden">
      <Container className="flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="max-w-2xl flex flex-col gap-4">
          <Typography variant="small" className="text-[#2E7D32] uppercase tracking-widest font-mono font-bold">
            The Circular Engine
          </Typography>
          <Typography variant="h2" className="tracking-tight text-[#1F2937] dark:text-[#F8FAFC]">
            Resource routing in seven steps.
          </Typography>
          <Typography variant="body" className="text-gray-500 dark:text-[#CBD5E1]">
            Our operating system handles resources from origin extraction to secondary reprocessing. Click through the lifecycle milestones below to see the loop in action.
          </Typography>
        </div>

        {/* Stepper Grid Layout */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          
          {/* Stepper Link Controls */}
          <div className="flex flex-col gap-2 md:col-span-1">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BCD4] ${
                  activeStep === idx
                    ? 'border-[#2E7D32] bg-[#2E7D32]/10 text-[#2E7D32] font-semibold scale-102'
                    : 'border-[#B0BEC5]/20 dark:border-[#263238]/20 hover:border-[#B0BEC5]/60 hover:bg-black/5 dark:hover:bg-white/5 text-[#B0BEC5]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={activeStep === idx ? 'text-[#2E7D32]' : 'text-gray-400 dark:text-gray-500'}>
                    {step.icon}
                  </span>
                  <span className={activeStep === idx ? 'text-[#1F2937] dark:text-[#F8FAFC]' : ''}>
                    {step.title.split('. ')[1]}
                  </span>
                </div>
                <ChevronRight size={16} className={activeStep === idx ? 'text-[#2E7D32]' : 'text-transparent'} />
              </button>
            ))}
          </div>

          {/* Stepper Card Presentation */}
          <div className="md:col-span-2 h-full min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <EosCard variant="glass" className="h-full p-8 flex flex-col justify-between gap-8 border-[#2E7D32]/20 shadow-lg">
                  <div className="flex flex-col gap-6">
                    <div className="inline-flex p-4 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] shrink-0 self-start">
                      {steps[activeStep].icon}
                    </div>
                    <div className="flex flex-col gap-3">
                      <Typography variant="h3" className="font-display">
                        {steps[activeStep].title}
                      </Typography>
                      <Typography variant="body" className="text-gray-500 dark:text-[#CBD5E1] leading-relaxed">
                        {steps[activeStep].desc}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-t border-[#B0BEC5]/20 dark:border-[#263238]/20 pt-6">
                    <span className="text-xs font-mono font-bold text-[#B0BEC5]">
                      STEP {activeStep + 1} OF 7
                    </span>
                    <EosButton
                      variant="tertiary"
                      onClick={() => setActiveStep((activeStep + 1) % steps.length)}
                    >
                      Next Step
                    </EosButton>
                  </div>
                </EosCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </Container>
    </section>
  );
};
export default SolutionSection;
