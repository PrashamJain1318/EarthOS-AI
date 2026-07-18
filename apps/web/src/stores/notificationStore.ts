import { create } from 'zustand';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'warranty' | 'system' | 'alert';
  link?: string;
}

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'read' | 'date'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  
  addNotification: (notification) => set((state) => {
    // Prevent duplicate notifications based on title + message
    const exists = state.notifications.find(n => n.title === notification.title && n.message === notification.message);
    if (exists) return state;

    const newNotification: NotificationItem = {
      ...notification,
      id: Math.random().toString(36).substring(7),
      read: false,
      date: new Date().toISOString()
    };
    
    return {
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    };
  }),

  markAsRead: (id) => set((state) => {
    const notifications = state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    return {
      notifications,
      unreadCount: notifications.filter(n => !n.read).length
    };
  }),

  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0
  })),

  removeNotification: (id) => set((state) => {
    const notifications = state.notifications.filter(n => n.id !== id);
    return {
      notifications,
      unreadCount: notifications.filter(n => !n.read).length
    };
  })
}));
