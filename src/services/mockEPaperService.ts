import { EPaper } from '../types';
import { MOCK_EPAPER_EDITIONS } from '../data/mockEPaper';

const EPAPER_STORAGE_KEY = 'jv_epaper_data_v1';

export class MockEPaperService {
  private static memoryCache: EPaper[] | null = null;

  private static getStored(): EPaper[] {
    if (this.memoryCache) return this.memoryCache;
    try {
      const data = localStorage.getItem(EPAPER_STORAGE_KEY);
      if (data) {
        this.memoryCache = JSON.parse(data);
        return this.memoryCache!;
      }
    } catch (e) {
      console.error('Failed to parse epaper from localStorage', e);
    }
    this.memoryCache = MOCK_EPAPER_EDITIONS;
    localStorage.setItem(EPAPER_STORAGE_KEY, JSON.stringify(MOCK_EPAPER_EDITIONS));
    return this.memoryCache;
  }

  private static save(editions: EPaper[]): void {
    try {
      this.memoryCache = editions;
      localStorage.setItem(EPAPER_STORAGE_KEY, JSON.stringify(editions));
      window.dispatchEvent(new Event('epaper-updated'));
    } catch (e) {
      console.error('Failed to save epaper to localStorage', e);
    }
  }

  static getAll(): EPaper[] {
    return this.getStored();
  }

  static getPublished(): EPaper[] {
    return this.getAll().filter(e => e.status === 'published');
  }

  static getTodayEdition(): EPaper | undefined {
    const published = this.getPublished();
    return published[0] || this.getAll()[0];
  }

  static getById(id: string): EPaper | undefined {
    return this.getAll().find(e => e.id === id);
  }

  static create(data: Partial<EPaper>): EPaper {
    const list = this.getAll();
    const newEdition: EPaper = {
      id: `ep-${Date.now()}`,
      editionName: data.editionName || 'Special Edition',
      editionNameTe: data.editionNameTe || 'ప్రత్యేక ఎడిషన్',
      district: data.district || 'Hyderabad',
      date: data.date || new Date().toISOString().split('T')[0],
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
      pdfUrl: data.pdfUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      totalPages: data.totalPages || 6,
      status: data.status || 'published',
      views: 0,
      downloads: 0,
      createdAt: new Date().toISOString(),
      pages: data.pages || [
        { pageNumber: 1, title: 'ముఖ్యాంశాలు', imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80' },
        { pageNumber: 2, title: 'రాష్ట్ర వార్తలు', imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80' },
        { pageNumber: 3, title: 'జిల్లా సమాచారం', imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' },
        { pageNumber: 4, title: 'క్రీడలు & వినోదం', imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80' },
      ],
    };
    list.unshift(newEdition);
    this.save(list);
    return newEdition;
  }

  static update(id: string, updates: Partial<EPaper>): EPaper | undefined {
    const list = this.getAll();
    const index = list.findIndex(e => e.id === id);
    if (index === -1) return undefined;
    const updated = { ...list[index], ...updates };
    list[index] = updated;
    this.save(list);
    return updated;
  }

  static delete(id: string): boolean {
    const list = this.getAll();
    const filtered = list.filter(e => e.id !== id);
    if (filtered.length === list.length) return false;
    this.save(filtered);
    return true;
  }

  static incrementViews(id: string): void {
    const item = this.getById(id);
    if (item) {
      this.update(id, { views: item.views + 1 });
    }
  }

  static incrementDownloads(id: string): void {
    const item = this.getById(id);
    if (item) {
      this.update(id, { downloads: item.downloads + 1 });
    }
  }
}
