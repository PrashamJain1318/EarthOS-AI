import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EosCard, Typography } from '@earthos/ui';
import { 
  Cpu, 
  ShoppingBag, 
  Wrench, 
  Heart, 
  ShieldCheck, 
  ArrowRight,
  Clock
} from 'lucide-react';

type EventType = 'OBJECT' | 'MARKETPLACE' | 'REPAIR' | 'DONATION' | 'PASSPORT';

interface ActivityEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  time: string;
  meta?: string;
}

const mockEvents: ActivityEvent[] = [
  {
    id: 'evt-1',
    type: 'PASSPORT',
    title: 'Passport Minted',
    description: 'Cryptographic resource passport token generated for object #EO-8849 (Aluminium Batch).',
    time: '12 minutes ago',
    meta: 'EO-8849 / 2.4 Tons'
  },
  {
    id: 'evt-2',
    type: 'OBJECT',
    title: 'Biomass Stream Registered',
    description: 'Organic byproduct stream from facility B logged. Carbon abatement rating: A+.',
    time: '45 minutes ago',
    meta: 'Facility B / organic'
  },
  {
    id: 'evt-3',
    type: 'MARKETPLACE',
    title: 'Circular Match Completed',
    description: 'Sold 1.5 tons post-consumer PET stream to Recycler Inc. transaction complete.',
    time: '2 hours ago',
    meta: '+$840 Credit'
  },
  {
    id: 'evt-4',
    type: 'REPAIR',
    title: 'Hardware Restored',
    description: 'Batch 12 smart microprocessors completed inspection and returned to circulation.',
    time: '4 hours ago',
    meta: 'Longevity: 96%'
  },
  {
    id: 'evt-5',
    type: 'DONATION',
    title: 'NGO Grant Allocated',
    description: 'Dispatched $150 carbon offset credits to Ocean Cleanup NGO initiative.',
    time: '1 day ago',
    meta: 'Offset ID: #DON-99'
  },
  {
    id: 'evt-6',
    type: 'PASSPORT',
    title: 'Ownership Transferred',
    description: 'Object #EO-3829 ownership verified and signed to recycle partner B.',
    time: '1 day ago',
    meta: 'EO-3829 / copper'
  }
];

const categoryFilters: { label: string; value: EventType | 'ALL' }[] = [
  { label: 'All Activity', value: 'ALL' },
  { label: 'Objects', value: 'OBJECT' },
  { label: 'Marketplace', value: 'MARKETPLACE' },
  { label: 'Repairs', value: 'REPAIR' },
  { label: 'Donations', value: 'DONATION' },
  { label: 'Passports', value: 'PASSPORT' }
];

export const RecentActivity: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<EventType | 'ALL'>('ALL');

  const filteredEvents = mockEvents.filter(
    (event) => activeFilter === 'ALL' || event.type === activeFilter
  );

  const getEventIcon = (type: EventType) => {
    switch (type) {
      case 'OBJECT':
        return <Cpu size={16} />;
      case 'MARKETPLACE':
        return <ShoppingBag size={16} />;
      case 'REPAIR':
        return <Wrench size={16} />;
      case 'DONATION':
        return <Heart size={16} />;
      case 'PASSPORT':
        return <ShieldCheck size={16} />;
    }
  };

  const getEventColorClass = (type: EventType) => {
    switch (type) {
      case 'OBJECT':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'MARKETPLACE':
        return 'bg-[#FFA726]/10 text-[#FFA726] border-[#FFA726]/20';
      case 'REPAIR':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'DONATION':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'PASSPORT':
        return 'bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/20';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      
      {/* Header with filters row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#B0BEC5]/20 dark:border-[#263238]/30 pb-4">
        <div>
          <Typography variant="h4" className="font-display font-bold">Recent Telemetry Events</Typography>
          <Typography variant="small" className="text-gray-400">Resource passport logs and matching streams activity.</Typography>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categoryFilters.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                activeFilter === tab.value
                  ? 'bg-[#2E7D32] border-[#2E7D32] text-white'
                  : 'bg-white/50 dark:bg-[#162033]/20 border-[#B0BEC5]/20 dark:border-[#263238]/30 text-gray-400 hover:text-gray-600 dark:hover:text-[#F8FAFC]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List (Framer Motion Animation) */}
      <div className="relative pl-6 flex flex-col gap-6">
        
        {/* Timeline connector line vertical vector */}
        <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#B0BEC5]/20 dark:border-l dark:border-[#263238]/30" />

        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              layout
              className="relative"
            >
              {/* Left Timeline Indicator Node */}
              <div className={`absolute -left-[29px] top-1.5 h-4 w-4 rounded-full border-2 border-white dark:border-[#0B1220] flex items-center justify-center ${
                event.type === 'PASSPORT' ? 'bg-[#2E7D32]' :
                event.type === 'OBJECT' ? 'bg-blue-500' :
                event.type === 'MARKETPLACE' ? 'bg-[#FFA726]' :
                event.type === 'REPAIR' ? 'bg-gray-500' : 'bg-red-500'
              }`} />

              {/* Event Content Card Layout */}
              <EosCard 
                variant="glass" 
                className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-[#B0BEC5]/10 dark:border-[#263238]/20 hover:border-[#2E7D32]/20 transition-all duration-200"
              >
                
                {/* Left side details */}
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${getEventColorClass(event.type)}`}>
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-sm font-bold text-[#1F2937] dark:text-[#F8FAFC]">{event.title}</span>
                    <Typography variant="small" className="text-gray-400 text-xs leading-relaxed max-w-xl">
                      {event.description}
                    </Typography>
                  </div>
                </div>

                {/* Right side telemetry meta metrics */}
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0 border-t border-[#B0BEC5]/10 sm:border-t-0 pt-2 sm:pt-0">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium font-mono">
                    <Clock size={12} />
                    <span>{event.time}</span>
                  </div>
                  {event.meta && (
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#B0BEC5]/20 dark:border-[#263238]/30 bg-gray-50/50 dark:bg-black/10 text-[10px] font-mono font-bold text-gray-400">
                      <span>{event.meta}</span>
                      <ArrowRight size={10} className="text-gray-400" />
                    </div>
                  )}
                </div>

              </EosCard>

            </motion.div>
          ))}
        </AnimatePresence>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400 border border-dashed border-[#B0BEC5]/20 dark:border-[#263238]/30 rounded-2xl bg-white/20 dark:bg-[#162033]/5"
          >
            No events match selected category filter scope.
          </motion.div>
        )}

      </div>

    </div>
  );
};
export default RecentActivity;
