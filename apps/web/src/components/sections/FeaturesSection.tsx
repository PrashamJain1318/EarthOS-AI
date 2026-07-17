import React from 'react';
import { motion } from 'framer-motion';
import { Typography, EosCard, Container } from '@earthos/ui';
import { Eye, ShieldCheck, LineChart, FileCheck } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const items = [
    {
      title: 'Neural Vision Extraction',
      desc: 'Our models analyze physical structures, identify plastic density variables, and compute wear coefficients in milliseconds.',
      icon: <Eye className="text-[#2E7D32]" size={28} />
    },
    {
      title: 'DPP Ledger Registries',
      desc: 'Generates secure passports linking raw polymers to manufacturing certificates, keeping material pureness verified.',
      icon: <ShieldCheck className="text-[#00BCD4]" size={28} />
    },
    {
      title: 'Optimal Logistics Routing',
      desc: 'Calculates cargo freight streams to co-load waste materials with active shipments, reducing emissions coefficients.',
      icon: <LineChart className="text-[#FF9800]" size={28} />
    },
    {
      title: 'EPR & CSRD Compliance audits',
      desc: 'Aggregates environmental records, compiling audit logs ready to export for European CSRD compliance frameworks.',
      icon: <FileCheck className="text-[#7E57C2]" size={28} />
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0B1220] border-t border-[#B0BEC5]/20 dark:border-[#263238]/20 relative overflow-hidden">
      <Container className="flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="max-w-2xl flex flex-col gap-4">
          <Typography variant="small" className="text-[#00BCD4] uppercase tracking-widest font-mono font-bold">
            Platform Capabilities
          </Typography>
          <Typography variant="h2" className="tracking-tight text-[#1F2937] dark:text-[#F8FAFC]">
            Engineered for resource efficiency.
          </Typography>
          <Typography variant="body" className="text-gray-500 dark:text-[#CBD5E1]">
            Our technology stack connects standard ERP systems to localized supply lines, providing automated tracking and resource management features.
          </Typography>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <EosCard variant="glass" className="flex gap-6 p-8 border-[#00BCD4]/10 hover:border-[#00BCD4]/30 hover:shadow-lg transition-all duration-300">
                <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#162033]/40 border border-[#B0BEC5]/20 dark:border-[#263238]/20 shrink-0 self-start">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <Typography variant="h4" className="font-display">
                    {item.title}
                  </Typography>
                  <Typography variant="small" className="leading-relaxed text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </Typography>
                </div>
              </EosCard>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
};
export default FeaturesSection;
