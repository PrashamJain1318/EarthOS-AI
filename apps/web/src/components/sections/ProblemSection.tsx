import React from 'react';
import { motion } from 'framer-motion';
import { Typography, EosCard, Container } from '@earthos/ui';
import { AlertTriangle, Flame, Droplet, Trash2 } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const stats = [
    { label: 'Solid Waste Annually', value: '2.12 Billion Tons', icon: <Trash2 size={24} className="text-red-500" />, desc: '91% of global materials are discarded after a single use.' },
    { label: 'Scope 3 Carbon Leakage', value: '70% Emissions', icon: <Flame size={24} className="text-red-500" />, desc: 'Supply chains conceal carbon tracking errors under legacy standards.' },
    { label: 'Materials Untracked', value: '8.6% Circular', icon: <AlertTriangle size={24} className="text-yellow-500" />, desc: 'Only a fraction of extracted resources enter reusable loops.' },
    { label: 'Ocean Polymer Influx', value: '11 Million Tons', icon: <Droplet size={24} className="text-red-500" />, desc: 'Plastics flow into marine biomes without tracking origin registries.' }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0B1220] border-t border-[#B0BEC5]/20 dark:border-[#263238]/20 relative overflow-hidden">
      {/* Background warning red ambient light overlay */}
      <div className="absolute top-[10%] left-[80%] h-[300px] w-[300px] rounded-full bg-red-500/5 blur-[120px] pointer-events-none" />

      <Container className="flex flex-col gap-16">
        <div className="max-w-2xl flex flex-col gap-4">
          <Typography variant="small" className="text-red-500 uppercase tracking-widest font-mono font-bold">
            The Ecological Deficit
          </Typography>
          <Typography variant="h2" className="tracking-tight text-[#1F2937] dark:text-[#F8FAFC]">
            Linear chains are structurally broken.
          </Typography>
          <Typography variant="body" className="text-gray-500 dark:text-[#CBD5E1]">
            Global manufacturing operates on a high-throughput linear path: extract, manufacture, discard. Without digitized tracking, resource coordination is impossible, forcing pristine materials into trash.
          </Typography>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <EosCard variant="glass" className="h-full flex flex-col justify-between gap-4 p-6 border-red-500/10 dark:border-red-950/20 hover:border-red-500/30 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-red-500/10 dark:bg-red-950/20">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest">Deficit-Vector</span>
                </div>
                <div className="flex flex-col gap-2 my-2">
                  <span className="text-2xl font-bold tracking-tight text-[#1F2937] dark:text-[#F8FAFC] font-display">
                    {stat.value}
                  </span>
                  <Typography variant="h4" className="text-sm font-bold text-gray-700 dark:text-[#CBD5E1]">
                    {stat.label}
                  </Typography>
                </div>
                <Typography variant="small" className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                  {stat.desc}
                </Typography>
              </EosCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
export default ProblemSection;
