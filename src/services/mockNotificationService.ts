import { PushNotification } from '../types';
import { MOCK_NOTIFICATIONS } from '../data/mockNotifications';

const NOTIFICATIONS_STORAGE_KEY = 'jv_notifications_data_v1';

export class MockNotificationService {
  private static getStored(): PushNotification[] {
    try {
      const data = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse notifications from localStorage', e);
    }
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(MOCK_NOTIFICATIONS));
    return MOCK_NOTIFICATIONS;
  }

  private static save(notifs: PushNotification[]): void {
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifs));
      window.dispatchEvent(new Event('notifications-updated'));
    } catch (e) {
      console.error('Failed to save notifications to localStorage', e);
    }
  }

  static getAll(): PushNotification[] {
    return this.getStored();
  }

  static getSent(): PushNotification[] {
    return this.getAll().filter(n => n.status === 'sent');
  }

  static getById(id: string): PushNotification | undefined {
    return this.getAll().find(n => n.id === id);
  }

  static create(data: Partial<PushNotification>): PushNotification {
    const list = this.getAll();
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title: data.title || '',
      titleTe: data.titleTe || data.title || '',
      message: data.message || '',
      messageTe: data.messageTe || data.message || '',
      category: data.category || 'Breaking News',
      targetAudience: data.targetAudience || 'All Users',
      scheduledTime: data.scheduledTime,
      sentAt: data.status === 'sent' ? new Date().toISOString() : undefined,
      status: data.status || 'draft',
      clicks: 0,
      reach: data.status === 'sent' ? Math.floor(Math.random() * 200000) + 100000 : 0,
    };
    list.unshift(newNotif);
    this.save(list);
    return newNotif;
  }

  static send(id: string): PushNotification | undefined {
    const list = this.getAll();
    const index = list.findIndex(n => n.id === id);
    if (index === -1) return undefined;

    list[index].status = 'sent';
    list[index].sentAt = new Date().toISOString();
    list[index].reach = Math.floor(Math.random() * 300000) + 200000;
    this.save(list);
    return list[index];
  }

  static broadcastBreaking(titleTe: string, messageTe: string, category: string = 'Breaking News'): PushNotification {
    const notif = this.create({
      title: `🔴 Breaking News Alert`,
      titleTe: `🔴 బ్రేకింగ్ న్యూస్ అలర్ట్`,
      message: messageTe,
      messageTe: `${titleTe} - పూర్తి వివరాలు చూడండి.`,
      category,
      targetAudience: 'All Users',
      status: 'sent',
    });
    return notif;
  }

  static delete(id: string): boolean {
    const list = this.getAll();
    const filtered = list.filter(n => n.id !== id);
    if (filtered.length === list.length) return false;
    this.save(filtered);
    return true;
  }
}
