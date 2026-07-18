import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ShieldCheck, Check, Trash2, ShieldAlert } from 'lucide-react';
import { Typography, EosBadge } from '@earthos/ui';
import { useNotificationStore } from '../../stores/notificationStore';
import { useInfiniteObjects } from '../../hooks/useObjects';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, addNotification } = useNotificationStore();
  const { data: objectsData } = useInfiniteObjects({});

  // Polling logic to check for warranties expiring
  useEffect(() => {
    if (!objectsData?.pages) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const allObjects = objectsData.pages.flatMap(page => page.data);

    allObjects.forEach(obj => {
      if (obj.warrantyExpiry && obj.warranty?.reminders && obj.warranty.reminders.length > 0) {
        const expiryDate = new Date(obj.warrantyExpiry);
        expiryDate.setHours(0, 0, 0, 0);
        
        const diffTime = expiryDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (daysRemaining >= 0 && obj.warranty.reminders.includes(daysRemaining)) {
          addNotification({
            title: 'Warranty Expiring Soon',
            message: `The warranty for ${obj.objectName} expires in ${daysRemaining} days.`,
            type: 'warranty',
            link: `/objects/${obj._id}`
          });
        } else if (daysRemaining < 0 && daysRemaining > -7) {
          // Notify for recently expired
          addNotification({
            title: 'Warranty Expired',
            message: `The warranty for ${obj.objectName} has expired.`,
            type: 'alert',
            link: `/objects/${obj._id}`
          });
        }
      }
    });
  }, [objectsData, addNotification]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors focus:outline-none"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white dark:border-[#0F172A]" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-[28rem] overflow-hidden bg-white dark:bg-[#162033] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 flex flex-col z-50 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
            <Typography variant="body" className="font-bold flex items-center gap-2">
              Notifications
              {unreadCount > 0 && <EosBadge variant="primary" className="text-[10px] px-1.5 py-0">{unreadCount}</EosBadge>}
            </Typography>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-semibold text-[#2E7D32] hover:text-[#1B5E20] transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                <Bell size={24} className="text-gray-300 dark:text-gray-600" />
                <Typography variant="small" className="text-gray-500">You're all caught up!</Typography>
              </div>
            ) : (
              <div className="flex flex-col">
                {notifications.map(notif => (
                  <div 
                    key={notif.id}
                    className={`p-4 border-b border-gray-50 dark:border-white/5 flex gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group relative ${!notif.read ? 'bg-[#2E7D32]/5 dark:bg-[#2E7D32]/10' : ''}`}
                  >
                    <div className="shrink-0 pt-0.5">
                      {notif.type === 'warranty' ? (
                        <ShieldCheck size={18} className="text-orange-500" />
                      ) : notif.type === 'alert' ? (
                        <ShieldAlert size={18} className="text-red-500" />
                      ) : (
                        <Bell size={18} className="text-blue-500" />
                      )}
                    </div>
                    
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => {
                        markAsRead(notif.id);
                        if (notif.link) {
                          navigate(notif.link);
                          setIsOpen(false);
                        }
                      }}
                    >
                      <Typography variant="small" className={`font-bold ${!notif.read ? 'text-[#1F2937] dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                        {notif.title}
                      </Typography>
                      <Typography variant="small" className="text-gray-500 text-[11px] leading-tight mt-0.5 line-clamp-2">
                        {notif.message}
                      </Typography>
                      <Typography variant="small" className="text-gray-400 text-[10px] mt-1.5 block">
                        {new Date(notif.date).toLocaleDateString()}
                      </Typography>
                    </div>

                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      {!notif.read && (
                        <button onClick={() => markAsRead(notif.id)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500" title="Mark as read">
                          <Check size={14} />
                        </button>
                      )}
                      <button onClick={() => removeNotification(notif.id)} className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
