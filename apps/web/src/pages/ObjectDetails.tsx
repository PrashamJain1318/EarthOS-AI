import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EosButton, Typography, EosBadge } from '@earthos/ui';
import { ArrowLeft, Edit2, ShieldCheck } from 'lucide-react';
import { useObject } from '../hooks/useObjects';
import { ObjectDetailsSkeleton } from '../components/objects/details/ObjectDetailsSkeleton';
import { ObjectError } from '../components/objects/ObjectError';
import { ObjectGallery } from '../components/objects/details/ObjectGallery';
import { ObjectOverview } from '../components/objects/details/ObjectOverview';
import { ObjectFinancials } from '../components/objects/details/ObjectFinancials';
import { ObjectMetrics } from '../components/objects/details/ObjectMetrics';
import { ObjectTimeline } from '../components/objects/details/ObjectTimeline';
import { ObjectLogistics } from '../components/objects/details/ObjectLogistics';
import { ObjectMeta } from '../components/objects/details/ObjectMeta';
import { ObjectWarrantyCard } from '../components/objects/details/ObjectWarrantyCard';
import { ObjectAiInsights } from '../components/objects/details/ObjectAiInsights';
import { motion } from 'framer-motion';

export const ObjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: object, isLoading, isError, error, refetch } = useObject(id!);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-[1400px] mx-auto pb-12">
        <ObjectDetailsSkeleton />
      </div>
    );
  }

  if (isError || !object) {
    return (
      <div className="w-full max-w-[1400px] mx-auto pb-12 flex flex-col gap-4">
        <EosButton variant="secondary" onClick={() => navigate('/objects')} className="w-fit">
          <ArrowLeft size={16} className="mr-1.5" /> Back to Objects
        </EosButton>
        <ObjectError message={(error as Error)?.message || 'Object not found.'} onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-12 flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <EosButton variant="secondary" onClick={() => navigate('/objects')} className="p-2 min-w-0" aria-label="Back">
            <ArrowLeft size={18} />
          </EosButton>
          <div className="flex flex-col">
            <Typography variant="h3" className="font-bold tracking-tight">Object Details</Typography>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
              <span className="font-mono bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-xs">
                {object.objectId}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {object.archived && <EosBadge variant="warning">Archived</EosBadge>}
          <EosButton variant="secondary" onClick={() => navigate(`/portal/user/objects/${object._id}/passport`)} className="font-bold border-[#00BCD4]/30 text-[#00BCD4] hover:bg-[#00BCD4]/10">
            <ShieldCheck size={16} className="mr-1.5" /> View Passport
          </EosButton>
          <EosButton variant="primary" onClick={() => navigate(`/objects/${object._id}/edit`)} className="font-bold">
            <Edit2 size={16} className="mr-1.5" /> Edit Object
          </EosButton>
        </div>
      </div>

      {/* Grid Layout */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Left Column (Primary) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <ObjectGallery images={object.images || []} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <ObjectOverview object={object} />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="h-full">
              <ObjectFinancials object={object} />
            </motion.div>
            <motion.div variants={itemVariants} className="h-full">
              <ObjectMetrics object={object} />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <ObjectLogistics object={object} />
          </motion.div>

          {/* AI Insights Section */}
          <motion.div variants={itemVariants}>
            <ObjectAiInsights object={object} />
          </motion.div>
        </div>
        
        {/* Right Column (Secondary / Meta) */}
        <div className="flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <ObjectWarrantyCard object={object} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ObjectTimeline object={object} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <ObjectMeta object={object} />
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};
