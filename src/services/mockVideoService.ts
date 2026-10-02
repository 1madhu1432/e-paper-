import { VideoItem } from '../types';
import { MOCK_VIDEOS } from '../data/mockVideos';

const VIDEOS_STORAGE_KEY = 'jv_videos_data_v1';

export class MockVideoService {
  private static memoryCache: VideoItem[] | null = null;

  private static getStored(): VideoItem[] {
    if (this.memoryCache && this.memoryCache.length >= MOCK_VIDEOS.length) return this.memoryCache;
    try {
      const data = localStorage.getItem(VIDEOS_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length >= MOCK_VIDEOS.length) {
          this.memoryCache = parsed;
          return this.memoryCache!;
        }
      }
    } catch (e) {
      console.error('Failed to parse videos from localStorage', e);
    }
    this.memoryCache = MOCK_VIDEOS;
    try {
      localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(MOCK_VIDEOS));
    } catch (e) {}
    return this.memoryCache;
  }

  private static save(videos: VideoItem[]): void {
    try {
      this.memoryCache = videos;
      localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(videos));
      window.dispatchEvent(new Event('videos-updated'));
    } catch (e) {
      console.error('Failed to save videos to localStorage', e);
    }
  }

  static getAll(): VideoItem[] {
    return this.getStored();
  }

  static getById(id: string): VideoItem | undefined {
    return this.getAll().find(v => v.id === id);
  }

  static getFeatured(): VideoItem[] {
    return this.getAll().filter(v => v.isFeatured);
  }

  static getByType(type: 'Short News' | 'Daily Bulletin' | 'Ground Report'): VideoItem[] {
    return this.getAll().filter(v => v.type === type);
  }

  static create(data: Partial<VideoItem>): VideoItem {
    const list = this.getAll();
    const newVideo: VideoItem = {
      id: `vid-${Date.now()}`,
      title: data.title || '',
      titleTe: data.titleTe || data.title || '',
      description: data.description || '',
      youtubeId: data.youtubeId || 'dQw4w9WgXcQ',
      thumbnail: data.thumbnail || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
      category: data.category || 'latest',
      duration: data.duration || '05:00',
      reporterName: data.reporterName || 'పబ్లిక్ మూడ్ న్యూస్ బ్యూరో',
      publishedAt: new Date().toISOString(),
      isFeatured: !!data.isFeatured,
      isBreaking: !!data.isBreaking,
      views: 0,
      type: data.type || 'Short News',
    };
    list.unshift(newVideo);
    this.save(list);
    return newVideo;
  }

  static update(id: string, updates: Partial<VideoItem>): VideoItem | undefined {
    const list = this.getAll();
    const index = list.findIndex(v => v.id === id);
    if (index === -1) return undefined;
    const updated = { ...list[index], ...updates };
    list[index] = updated;
    this.save(list);
    return updated;
  }

  static delete(id: string): boolean {
    const list = this.getAll();
    const filtered = list.filter(v => v.id !== id);
    if (filtered.length === list.length) return false;
    this.save(filtered);
    return true;
  }

  static incrementViews(id: string): void {
    const v = this.getById(id);
    if (v) {
      this.update(id, { views: v.views + 1 });
    }
  }
}
