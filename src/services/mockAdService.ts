import { Advertisement, AdPlacement } from '../types';
import { MOCK_ADVERTISEMENTS } from '../data/mockAds';

const ADS_STORAGE_KEY = 'jv_ads_data_v1';

export class MockAdService {
  private static memoryCache: Advertisement[] | null = null;

  private static getStoredAds(): Advertisement[] {
    if (this.memoryCache && this.memoryCache.length > 0) return this.memoryCache;
    try {
      const data = localStorage.getItem(ADS_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.memoryCache = parsed;
          return this.memoryCache!;
        }
      }
    } catch (e) {
      console.error('Failed to parse ads from localStorage', e);
    }
    this.memoryCache = MOCK_ADVERTISEMENTS;
    try {
      localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(MOCK_ADVERTISEMENTS));
    } catch (e) {}
    return this.memoryCache;
  }

  private static saveAds(ads: Advertisement[], shouldNotify = true): void {
    try {
      this.memoryCache = ads;
      localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(ads));
      if (shouldNotify) {
        window.dispatchEvent(new Event('ads-updated'));
      }
    } catch (e) {
      console.error('Failed to save ads to localStorage', e);
    }
  }

  static getAll(): Advertisement[] {
    return this.getStoredAds();
  }

  static getById(id: string): Advertisement | undefined {
    return this.getAll().find(a => a.id === id);
  }

  static getActiveByPlacement(placement: AdPlacement): Advertisement | undefined {
    const activeAds = this.getAll().filter(
      ad => ad.status === 'active' && ad.placement === placement
    );
    if (!activeAds.length) return undefined;
    // pick highest priority or random for realistic rotation
    return activeAds.sort((a, b) => {
      const pMap = { high: 3, medium: 2, low: 1 };
      return pMap[b.priority] - pMap[a.priority];
    })[0];
  }

  static create(adData: Partial<Advertisement>): Advertisement {
    const ads = this.getAll();
    const newAd: Advertisement = {
      id: `ad-${Date.now()}`,
      sponsorName: adData.sponsorName || 'Unknown Sponsor',
      campaignName: adData.campaignName || 'General Campaign',
      adTitle: adData.adTitle || '',
      desktopBanner: adData.desktopBanner || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&h=160&q=80',
      mobileBanner: adData.mobileBanner || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&h=200&q=80',
      targetUrl: adData.targetUrl || 'https://janathavaani.com',
      placement: adData.placement || 'home-top',
      priority: adData.priority || 'medium',
      status: adData.status || 'active',
      startDate: adData.startDate || new Date().toISOString().split('T')[0],
      endDate: adData.endDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      impressions: 0,
      clicks: 0,
      impressionLimit: adData.impressionLimit,
      clickLimit: adData.clickLimit,
      revenue: adData.revenue || 50000,
    };
    ads.unshift(newAd);
    this.saveAds(ads);
    return newAd;
  }

  static update(id: string, updates: Partial<Advertisement>): Advertisement | undefined {
    const ads = this.getAll();
    const index = ads.findIndex(a => a.id === id);
    if (index === -1) return undefined;

    const updated = { ...ads[index], ...updates };
    ads[index] = updated;
    this.saveAds(ads);
    return updated;
  }

  static delete(id: string): boolean {
    const ads = this.getAll();
    const filtered = ads.filter(a => a.id !== id);
    if (filtered.length === ads.length) return false;
    this.saveAds(filtered);
    return true;
  }

  static trackImpression(id: string): void {
    const ads = this.getAll();
    const index = ads.findIndex(a => a.id === id);
    if (index !== -1) {
      ads[index] = { ...ads[index], impressions: (ads[index].impressions || 0) + 1 };
      this.saveAds(ads, false);
    }
  }

  static trackClick(id: string): void {
    const ads = this.getAll();
    const index = ads.findIndex(a => a.id === id);
    if (index !== -1) {
      ads[index] = { ...ads[index], clicks: (ads[index].clicks || 0) + 1 };
      this.saveAds(ads, false);
    }
  }
}
