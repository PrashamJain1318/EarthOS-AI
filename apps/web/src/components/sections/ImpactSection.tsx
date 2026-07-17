import React from 'react';
import { motion } from 'framer-motion';
import { Typography, EosCard, Container } from '@earthos/ui';
import { BarChart3, TrendingUp, Sparkles } from 'lucide-react';

export const ImpactSection: React.FC = () => {
  const metrics = [
    { value: '428K', label: 'Tons CO2 Abated', icon: <TrendingUp size={20} /> },
    { value: '1.2M', label: 'Registered Passports', icon: <Sparkles size={20} /> },
    { value: '94.2%', label: 'Material Purity Avg', icon: <BarChart3 size={20} /> }
  ];

  // SVG representation data for municipal waste redirection levels (Hamburg, Chicago, Houston)
  const chartData = [
    { city: 'Hamburg', rate: 82, color: '#2E7D32' },
    { city: 'Chicago', rate: 64, color: '#00BCD4' },
    { city: 'Houston', rate: 58, color: '#7E57C2' }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0B1220] border-t border-[#B0BEC5]/20 dark:border-[#263238]/20 relative overflow-hidden">
      <Container className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Statistics Text Column */}
        <div className="flex flex-col gap-8 items-start">
          <div className="flex flex-col gap-4">
            <Typography variant="small" className="text-[#2E7D32] uppercase tracking-widest font-mono font-bold">
              Planetary Ledger
            </Typography>
            <Typography variant="h2" className="tracking-tight text-[#1F2937] dark:text-[#F8FAFC]">
              Quantifying the abatement velocity.
            </Typography>
            <Typography variant="body" className="text-gray-500 dark:text-[#CBD5E1]">
              Every chemical compound cataloged, passport minted, and material stream redirected reduces solid waste depletion. Our ledgers trace these abated metrics transparently.
            </Typography>
          </div>

          <div className="grid grid-cols-3 gap-6 w-full">
            {metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-extrabold text-[#2E7D32] font-display">{m.value}</span>
                <Typography variant="small" className="text-xs text-gray-500 dark:text-gray-400">
                  {m.label}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Custom SVG Chart Column */}
        <div>
          <EosCard variant="glass" className="p-8 border-[#2E7D32]/10 shadow-lg">
            <Typography variant="h4" className="mb-6 font-display">
              Zero-Waste Diversion Rates
            </Typography>
            
            <div className="flex flex-col gap-6">
              {chartData.map((data, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-gray-500 dark:text-[#CBD5E1]">
                    <span>{data.city} Grid Nodes</span>
                    <span>{data.rate}% Redirected</span>
                  </div>
                  {/* Chart Progress Bar Wrapper */}
                  <div className="w-full bg-gray-100 dark:bg-[#162033]/60 h-3 rounded-full overflow-hidden border border-[#B0BEC5]/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${data.rate}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: data.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-[#B0BEC5]/20 dark:border-[#263238]/30 my-6" />
            
            <div className="flex items-start gap-2.5 text-xs text-gray-400">
              <BarChart3 size={16} className="text-green-500 shrink-0 mt-0.5" />
              <span>Real-time municipal node statistics compiled from regional collection dashboards.</span>
            </div>
          </EosCard>
        </div>

      </Container>
    </section>
  );
};
export default ImpactSection;
