export interface AnalyticsEvent {
  id: string;
  type: 'page_view' | 'news_view' | 'epaper_view' | 'epaper_page_view' | 'share' | 'download';
  itemId?: string;
  pageNumber?: number;
  timestamp: string;
  page: string;
  device: 'desktop' | 'mobile' | 'tablet';
}

const STORAGE_KEY = 'public_mood_analytics_events';

export function getLocalAnalyticsEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp' | 'device'>) {
  try {
    const events = getLocalAnalyticsEvents();
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const device = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

    const newEvent: AnalyticsEvent = {
      ...event,
      id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      device,
    };

    // Keep last 200 events in localStorage for lightweight browser demo persistence
    const updated = [newEvent, ...events].slice(0, 200);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to log demo analytics event:', err);
  }
}

export function trackPageView(pageName: string) {
  saveEvent({ type: 'page_view', page: pageName });
}

export function trackNewsView(newsId: string) {
  saveEvent({ type: 'news_view', itemId: newsId, page: `/news/${newsId}` });
}

export function trackEpaperView(epaperId: string) {
  saveEvent({ type: 'epaper_view', itemId: epaperId, page: `/epaper/reader/${epaperId}` });
}

export function trackEpaperPageView(epaperId: string, pageNumber: number) {
  saveEvent({ type: 'epaper_page_view', itemId: epaperId, pageNumber, page: `/epaper/reader/${epaperId}#page=${pageNumber}` });
}

export function trackShare(type: 'news' | 'epaper', itemId: string) {
  saveEvent({ type: 'share', itemId, page: `share_${type}_${itemId}` });
}

export function trackDownload(type: 'epaper', itemId: string) {
  saveEvent({ type: 'download', itemId, page: `download_${type}_${itemId}` });
}
