import React, { createContext, useContext, useState, useEffect } from 'react';
import { PushNotification } from '../types';
import { MockNotificationService } from '../services/mockNotificationService';

interface NotificationContextType {
  notifications: PushNotification[];
  unreadCount: number;
  markAllAsRead: () => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  activeToast: PushNotification | null;
  dismissToast: () => void;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<PushNotification[]>(() => MockNotificationService.getSent());
  const [unreadCount, setUnreadCount] = useState<number>(3);
  const [activeToast, setActiveToast] = useState<PushNotification | null>(null);

  const refreshNotifications = () => {
    const list = MockNotificationService.getSent();
    setNotifications(list);
  };

  useEffect(() => {
    const handler = () => {
      const list = MockNotificationService.getSent();
      setNotifications(list);
      if (list.length > 0) {
        setActiveToast(list[0]);
        setUnreadCount(prev => prev + 1);
      }
    };

    window.addEventListener('notifications-updated', handler);
    return () => window.removeEventListener('notifications-updated', handler);
  }, []);

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  const markNotificationAsRead = (id: string) => {
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const dismissToast = () => {
    setActiveToast(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAllAsRead,
        markNotificationAsRead,
        clearAllNotifications,
        activeToast,
        dismissToast,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
