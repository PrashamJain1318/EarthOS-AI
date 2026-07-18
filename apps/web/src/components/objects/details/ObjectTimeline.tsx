import React, { useState } from 'react';
import { EosCard, Typography } from '@earthos/ui';
import { Clock, Hammer, Settings, Wrench, Search, ArrowUpCircle, ChevronDown, ChevronUp, FileText, Plus } from 'lucide-react';
import { ObjectItem } from '../../../services/objectService';
import { useUpdateObject } from '../../../hooks/useObjects';
import { AddMaintenanceModal } from './AddMaintenanceModal';

interface ObjectTimelineProps {
  object: ObjectItem;
}

export const ObjectTimeline: React.FC<ObjectTimelineProps> = ({ object }) => {
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const updateObject = useUpdateObject();

  const getIconForType = (type: string) => {
    switch (type) {
      case 'REPAIR': return <Hammer size={14} className="text-red-500" />;
      case 'PREVENTATIVE': return <Settings size={14} className="text-green-500" />;
      case 'UPGRADE': return <ArrowUpCircle size={14} className="text-blue-500" />;
      case 'INSPECTION': return <Search size={14} className="text-purple-500" />;
      default: return <Wrench size={14} className="text-gray-500" />;
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'REPAIR': return 'bg-red-500';
      case 'PREVENTATIVE': return 'bg-green-500';
      case 'UPGRADE': return 'bg-blue-500';
      case 'INSPECTION': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'SCHEDULED': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'IN_PROGRESS': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'CANCELLED': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
      default: return '';
    }
  };

  // Build the timeline array
  const events = [
    {
      id: 'creation',
      date: new Date(object.createdAt),
      type: 'CREATION',
      title: 'Object Registered',
      description: 'Initial catalog entry created in EarthOS.',
      sortDate: new Date(object.createdAt).getTime(),
    },
  ];

  if (object.maintenanceRecords && object.maintenanceRecords.length > 0) {
    object.maintenanceRecords.forEach((record) => {
      events.push({
        id: record.recordId,
        date: new Date(record.date),
        type: record.type,
        title: record.title,
        description: record.technicianNotes || 'No technician notes provided.',
        sortDate: new Date(record.date).getTime(),
        record: record,
      });
    });
  }

  // Sort descending (newest first)
  events.sort((a, b) => b.sortDate - a.sortDate);

  return (
    <EosCard variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 border-b border-[#B0BEC5]/20 dark:border-slate-800 pb-3 w-full justify-between">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-[#2E7D32]" />
            <Typography variant="h4" className="font-bold">Maintenance & History</Typography>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] hover:text-[#1B5E20] transition-colors p-1.5 rounded-lg hover:bg-[#2E7D32]/10"
          >
            <Plus size={14} /> Log Event
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-0 pl-2 border-l-2 border-gray-100 dark:border-white/10 ml-2 mt-2">
        {events.map((event, index) => {
          const isCreation = event.type === 'CREATION';
          const isExpanded = expandedRecord === event.id;

          return (
            <div key={event.id} className={`relative pl-6 ${index !== events.length - 1 ? 'pb-8' : ''}`}>
              {/* Node Dot */}
              <div 
                className={`absolute -left-[27px] top-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${isCreation ? 'bg-gray-400' : getColorForType(event.type)}`} 
              />
              
              <div className="flex items-center justify-between mb-1">
                <Typography variant="small" className="text-gray-400 font-semibold">
                  {event.date.toLocaleDateString()}
                </Typography>
                
                {!isCreation && event.record && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(event.record.status)}`}>
                    {event.record.status}
                  </span>
                )}
              </div>

              <div 
                className={`flex items-center justify-between ${!isCreation ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 p-1 -ml-1 rounded' : ''}`}
                onClick={() => !isCreation && setExpandedRecord(isExpanded ? null : event.id)}
              >
                <div className="flex items-center gap-1.5">
                  {!isCreation && getIconForType(event.type)}
                  <Typography variant="h6" className={`font-bold text-sm ${isCreation ? 'text-gray-600 dark:text-gray-400' : 'text-[#1F2937] dark:text-[#F8FAFC]'}`}>
                    {event.title}
                  </Typography>
                </div>
                {!isCreation && (
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                )}
              </div>

              {isCreation ? (
                <Typography variant="small" className="text-gray-500 text-xs mt-1">
                  {event.description}
                </Typography>
              ) : (
                isExpanded && event.record && (
                  <div className="mt-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
                    {event.record.cost !== undefined && event.record.cost !== null && (
                      <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200 dark:border-white/10">
                        <span className="text-xs font-semibold text-gray-500">Service Cost</span>
                        <span className="font-mono font-bold text-sm text-[#2E7D32]">${event.record.cost.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-1.5 mb-3">
                      <span className="text-xs font-semibold text-gray-500">Technician Notes</span>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {event.record.technicianNotes || 'No notes provided.'}
                      </p>
                    </div>

                    {event.record.receipts && event.record.receipts.length > 0 && (
                      <div className="flex flex-col gap-1.5 mt-4 pt-3 border-t border-gray-200 dark:border-white/10">
                        <span className="text-xs font-semibold text-gray-500">Documents & Receipts</span>
                        <div className="flex flex-wrap gap-2">
                          {event.record.receipts.map((receipt, i) => (
                            <a 
                              key={i} 
                              href={receipt} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#0B1220] border border-gray-200 dark:border-white/10 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors text-xs font-medium text-blue-600 dark:text-blue-400"
                            >
                              <FileText size={14} />
                              Receipt {i + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>

      <AddMaintenanceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (data) => {
          try {
            const currentRecords = object.maintenanceRecords || [];
            const nextMaintenanceDate = data.status === 'SCHEDULED' ? data.date : object.maintenanceDate;
            const isRepair = data.type === 'REPAIR';
            
            await updateObject.mutateAsync({
              id: object._id,
              data: {
                maintenanceRecords: [data, ...currentRecords],
                maintenanceDate: nextMaintenanceDate,
                repairCount: isRepair ? (object.repairCount || 0) + 1 : object.repairCount
              }
            });
            // Auto refetch happens via react-query invalidation
          } catch (error) {
            console.error('Failed to add maintenance record', error);
            throw error;
          }
        }}
      />
    </EosCard>
  );
};
