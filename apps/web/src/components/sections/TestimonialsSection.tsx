import React from 'react';
import { motion } from 'framer-motion';
import { Typography, EosCard, Container } from '@earthos/ui';
import { User, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      quote: "Integrating our polymer streams with EARTHOS AI saved us $140,000 in solid waste taxes while proving CSRD audit compliance instantly.",
      author: "Marcus Vane",
      role: "VP Supply Chain, EuroPolymer Corp"
    },
    {
      quote: "We now route post-consumer electronics passports directly to regional repair hubs, extending lifespan cycles by 40%.",
      author: "Dr. Elena Rostova",
      role: "Director of Sustainability, SmartCities Initiative"
    }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC]/40 dark:bg-[#162033]/20 border-t border-[#B0BEC5]/20 dark:border-[#263238]/20 relative overflow-hidden">
      <Container className="flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="max-w-2xl flex flex-col gap-4 mx-auto text-center items-center">
          <Typography variant="small" className="text-[#7E57C2] uppercase tracking-widest font-mono font-bold">
            Client Telemetry
          </Typography>
          <Typography variant="h2" className="tracking-tight text-[#1F2937] dark:text-[#F8FAFC]">
            Validated by global operators.
          </Typography>
        </div>

        {/* Reviews Cards List */}
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <EosCard variant="glass" className="flex flex-col justify-between gap-6 p-8 border-[#7E57C2]/15 shadow-md relative h-full">
                <Quote size={40} className="text-[#7E57C2]/20 absolute top-6 right-6" />
                <Typography variant="body" className="italic leading-relaxed text-gray-600 dark:text-[#CBD5E1]">
                  "{r.quote}"
                </Typography>
                
                <div className="flex items-center gap-3 border-t border-[#B0BEC5]/20 dark:border-[#263238]/20 pt-4">
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                    <User size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#1F2937] dark:text-[#F8FAFC]">{r.author}</span>
                    <span className="text-xs text-gray-400">{r.role}</span>
                  </div>
                </div>
              </EosCard>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
};
export default TestimonialsSection;
