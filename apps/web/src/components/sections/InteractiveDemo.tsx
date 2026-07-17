import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, EosCard, Container, EosButton } from '@earthos/ui';
import { Terminal, Shield, Play, RotateCcw } from 'lucide-react';

export const InteractiveDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the terminal emulator logs on update
  useEffect(() => {
    consoleBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logMessages]);

  const addLog = (msg: string) => {
    setLogMessages((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleNextStep = () => {
    if (step === 0) {
      setStep(1);
      addLog('Initializing Neural Scan Camera...');
      setTimeout(() => addLog('Vision Model isolation: MATCH FOUND (Electronic Asset)'), 600);
      setTimeout(() => addLog('Material analysis: Acrylonitrile Butadiene Styrene (Purity 94%)'), 1200);
    } else if (step === 1) {
      setStep(2);
      addLog('Minting Digital Product Passport...');
      setTimeout(() => addLog('Generating token signature: 0x98A1...fC22'), 600);
      setTimeout(() => addLog('EPR registry check: COMPLIANT'), 1200);
    } else if (step === 2) {
      setStep(3);
      addLog('Executing dynamic circular routing...');
      setTimeout(() => addLog('Double-sided match found: Hamburg Reprocessing Plant'), 600);
      setTimeout(() => addLog('Voucher generation: +14.2 Carbon Credits pending'), 1200);
    }
  };

  const handleReset = () => {
    setStep(0);
    setLogMessages([]);
  };

  return (
    <section className="py-24 bg-[#F8FAFC]/40 dark:bg-[#162033]/20 border-t border-[#B0BEC5]/20 dark:border-[#263238]/20 relative overflow-hidden">
      <Container className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Descriptive Column */}
        <div className="flex flex-col gap-6 items-start">
          <Typography variant="small" className="text-[#7E57C2] uppercase tracking-widest font-mono font-bold">
            Interactive Sandbox
          </Typography>
          <Typography variant="h2" className="tracking-tight text-[#1F2937] dark:text-[#F8FAFC]">
            Simulate a resource loop.
          </Typography>
          <Typography variant="body" className="text-gray-500 dark:text-[#CBD5E1]">
            Test the operating system lifecycle mechanics. Click the controller buttons on the console simulator to trigger material analysis, passport generation, and matching transactions.
          </Typography>
          
          <div className="flex gap-4 items-center">
            {step < 3 ? (
              <EosButton variant="primary" onClick={handleNextStep}>
                {step === 0 ? 'Initiate Scan' : step === 1 ? 'Mint Passport' : 'Route Resource'}
              </EosButton>
            ) : (
              <EosButton variant="secondary" onClick={handleReset}>
                Reset Sandbox
              </EosButton>
            )}
          </div>
        </div>

        {/* Console Box Column */}
        <div className="relative">
          {/* Glassmorphic simulator block */}
          <EosCard variant="glass" className="border-t-4 border-t-[#7E57C2] p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-[#7E57C2]/5 rounded-bl-full" />
            
            {/* Header controls bar */}
            <div className="flex items-center justify-between border-b border-[#B0BEC5]/20 dark:border-[#263238]/30 pb-4 mb-4 select-none">
              <div className="flex items-center gap-2">
                <Terminal className="text-[#7E57C2]" size={18} />
                <span className="font-mono text-xs font-bold text-[#1F2937] dark:text-[#CBD5E1]">
                  Telemetry Terminal v1.0
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Steps Visual Panels */}
            <div className="min-h-[160px] flex items-center justify-center border border-[#B0BEC5]/20 dark:border-[#263238]/30 rounded-xl p-4 bg-white/40 dark:bg-black/20 overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <Play className="text-[#B0BEC5] animate-pulse" size={32} />
                    <Typography variant="small" className="text-[#B0BEC5] font-semibold">
                      Press "Initiate Scan" to isolate physical resources.
                    </Typography>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center gap-3 text-center w-full"
                  >
                    <div className="h-8 w-full max-w-[200px] border border-[#2E7D32]/30 rounded-lg relative overflow-hidden flex items-center justify-center">
                      <div className="absolute top-0 bottom-0 left-0 bg-[#2E7D32]/10 w-full animate-[pulse_1.5s_infinite]" />
                      <span className="text-xs font-mono font-bold text-[#2E7D32]">SCANNING MATRIX</span>
                    </div>
                    <Typography variant="small" className="text-gray-600 dark:text-[#CBD5E1]">
                      Neural networks matching structural parameters...
                    </Typography>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <Shield className="text-[#00BCD4]" size={36} />
                    <Typography variant="small" className="text-gray-600 dark:text-[#CBD5E1]">
                      Minting cryptographic Digital Product Passport keys...
                    </Typography>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <div className="p-3 rounded-full bg-green-500/10 text-[#2E7D32]">
                      <RotateCcw size={28} />
                    </div>
                    <Typography variant="small" className="text-green-500 font-semibold">
                      Loop complete! Material routed to processing facility.
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Terminal Emulator Logs console output */}
            <div className="h-32 bg-black/90 dark:bg-black/60 rounded-xl p-4 overflow-y-auto font-mono text-[10px] text-green-400 flex flex-col gap-1.5 border border-[#B0BEC5]/10 shadow-inner">
              {logMessages.length === 0 ? (
                <span className="text-gray-500">Terminal awaiting telemetry input signals...</span>
              ) : (
                logMessages.map((msg, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {msg}
                  </div>
                ))
              )}
              <div ref={consoleBottomRef} />
            </div>
          </EosCard>
        </div>

      </Container>
    </section>
  );
};
export default InteractiveDemo;
