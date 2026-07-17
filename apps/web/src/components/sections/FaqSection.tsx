import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, EosCard, Container } from '@earthos/ui';
import { Plus, Minus } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does the AI Scanner determine material configurations?",
      a: "Our vision models isolate objects and match structural profiles against standardized CAS registries and SDS datasheets, calculating purity coefficients."
    },
    {
      q: "What standard frameworks does the Earth Passport support?",
      a: "It fully aligns with the upcoming European Union Digital Product Passport (DPP) standards, logging custody changes and material lineages securely."
    },
    {
      q: "Can we integrate EARTHOS AI with existing ERP databases?",
      a: "Yes. Our platform provides unified API endpoints for major ERP integrations like SAP, Oracle, and Salesforce, syncing material inflows automatically."
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0B1220] border-t border-[#B0BEC5]/20 dark:border-[#263238]/20 relative overflow-hidden">
      <Container className="max-w-3xl flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="text-center flex flex-col gap-4">
          <Typography variant="small" className="text-[#2E7D32] uppercase tracking-widest font-mono font-bold">
            Platform FAQ
          </Typography>
          <Typography variant="h2" className="tracking-tight text-[#1F2937] dark:text-[#F8FAFC]">
            Common Inquiries
          </Typography>
        </div>

        {/* Collapsible Accordion Group */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <EosCard
                key={idx}
                variant="default"
                className="p-5 border-[#B0BEC5]/20 dark:border-[#263238]/20 select-none cursor-pointer"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="font-display font-semibold text-base text-[#1F2937] dark:text-[#F8FAFC]">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-400">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-[#B0BEC5]/10 dark:border-[#263238]/10 mt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </EosCard>
            );
          })}
        </div>

      </Container>
    </section>
  );
};
export default FaqSection;
