import { NewsTip } from '../types';
import { MOCK_NEWS_TIPS } from '../data/mockNewsTips';
import { MockNewsService } from './mockNewsService';

const NEWS_TIPS_STORAGE_KEY = 'jv_news_tips_data_v1';

export class MockNewsTipService {
  private static getStored(): NewsTip[] {
    try {
      const data = localStorage.getItem(NEWS_TIPS_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse news tips from localStorage', e);
    }
    localStorage.setItem(NEWS_TIPS_STORAGE_KEY, JSON.stringify(MOCK_NEWS_TIPS));
    return MOCK_NEWS_TIPS;
  }

  private static save(tips: NewsTip[]): void {
    try {
      localStorage.setItem(NEWS_TIPS_STORAGE_KEY, JSON.stringify(tips));
      window.dispatchEvent(new Event('tips-updated'));
    } catch (e) {
      console.error('Failed to save news tips to localStorage', e);
    }
  }

  static getAll(): NewsTip[] {
    return this.getStored();
  }

  static getById(id: string): NewsTip | undefined {
    return this.getAll().find(t => t.id === id);
  }

  static submitTip(tipData: Omit<NewsTip, 'id' | 'status' | 'submittedAt'>): NewsTip {
    const list = this.getAll();
    const newTip: NewsTip = {
      ...tipData,
      id: `tip-${Date.now()}`,
      status: 'New',
      submittedAt: new Date().toISOString(),
    };
    list.unshift(newTip);
    this.save(list);
    return newTip;
  }

  static updateStatus(id: string, status: NewsTip['status'], notes?: string): NewsTip | undefined {
    const list = this.getAll();
    const index = list.findIndex(t => t.id === id);
    if (index === -1) return undefined;

    const updated = {
      ...list[index],
      status,
      moderatorNotes: notes !== undefined ? notes : list[index].moderatorNotes,
    };
    list[index] = updated;
    this.save(list);
    return updated;
  }

  static convertToArticle(tipId: string): { tip: NewsTip; articleId: string } | undefined {
    const tip = this.getById(tipId);
    if (!tip) return undefined;

    // Create a new article based on this citizen tip!
    const article = MockNewsService.create({
      title: `Citizen Report: ${tip.issueType} reported in ${tip.district} (${tip.location})`,
      titleTe: `ప్రజావాణి గ్రౌండ్ రిపోర్ట్: ${tip.district} (${tip.location}) లో సమస్యపై ప్రత్యేక కథనం`,
      summary: tip.description.slice(0, 150),
      summaryTe: tip.description.slice(0, 150),
      content: tip.description + `\n\nక్షేత్రస్థాయి పరిశీలన: పౌరుడు (${tip.name}) అందించిన సమాచారం మేరకు జనతా వాణి ప్రతినిధులు స్థానిక అధికారుల దృష్టికి తీసుకెళ్లారు.`,
      contentTe: tip.description + `\n\nక్షేత్రస్థాయి పరిశీలన: పౌరుడు (${tip.name}) అందించిన సమాచారం మేరకు జనతా వాణి ప్రతినిధులు స్థానిక అధికారుల దృష్టికి తీసుకెళ్లారు.`,
      category: tip.issueType === 'Crime' ? 'crime' : tip.issueType === 'Corruption' ? 'politics' : 'telangana',
      district: tip.district,
      authorName: `సిటిజన్ రిపోర్టర్ (${tip.name})`,
      imageUrl: tip.imageUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      status: 'pending', // submitted to editor for final review!
      isBreaking: false,
      tags: ['ప్రజావాణి', 'సిటిజన్ రిపోర్టింగ్', tip.district],
    });

    // Update tip status to Converted to Article
    const list = this.getAll();
    const index = list.findIndex(t => t.id === tipId);
    if (index !== -1) {
      list[index].status = 'Converted to Article';
      list[index].convertedArticleId = article.id;
      list[index].moderatorNotes = `కథనంగా మార్చబడింది (Article ID: ${article.id})`;
      this.save(list);
    }

    return { tip: list[index], articleId: article.id };
  }

  static delete(id: string): boolean {
    const list = this.getAll();
    const filtered = list.filter(t => t.id !== id);
    if (filtered.length === list.length) return false;
    this.save(filtered);
    return true;
  }
}
