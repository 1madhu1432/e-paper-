import { Article, ArticleStatus } from '../types';
import { MOCK_ARTICLES } from '../data/mockArticles';

const STORAGE_KEY = 'jv_articles_data_v2';

export class MockNewsService {
  private static memoryCache: Article[] | null = null;

  private static getStoredArticles(): Article[] {
    if (this.memoryCache && this.memoryCache.length >= MOCK_ARTICLES.length) {
      return this.memoryCache;
    }
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length >= MOCK_ARTICLES.length) {
          this.memoryCache = parsed;
          return this.memoryCache!;
        }
      }
    } catch (e) {
      console.error('Failed to parse articles from localStorage', e);
    }
    this.memoryCache = MOCK_ARTICLES;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ARTICLES));
    } catch (e) {}
    return this.memoryCache;
  }

  private static saveArticles(articles: Article[], shouldNotify = true): void {
    try {
      this.memoryCache = articles;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
      // Dispatch custom event so reactive UI across tabs or components updates
      if (shouldNotify) {
        window.dispatchEvent(new Event('articles-updated'));
      }
    } catch (e) {
      console.error('Failed to save articles to localStorage', e);
    }
  }

  static getAll(): Article[] {
    return this.getStoredArticles();
  }

  static getPublished(): Article[] {
    return this.getAll().filter(a => a.status === 'published');
  }

  static getById(id: string): Article | undefined {
    return this.getAll().find(a => a.id === id);
  }

  static getBySlug(slug: string): Article | undefined {
    return this.getAll().find(a => a.slug === slug || a.id === slug);
  }

  static getByCategory(categorySlug: string): Article[] {
    if (!categorySlug || categorySlug === 'latest') {
      return this.getPublished().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
    const cleanSlug = categorySlug.toLowerCase().trim();
    
    // Category aliases mapping (English slugs <-> Telugu terms and subcategories)
    const categoryAliases: Record<string, string[]> = {
      'cinema': ['cinema', 'టాలీవుడ్', 'బాక్సాఫీస్', 'సినిమా', 'movies', 'entertainment'],
      'business': ['business', 'మార్కెట్', 'స్టాక్స్', 'వ్యాపారం', 'వ్యవసాయ మార్కెట్', 'పరిశ్రమలు', 'విద్యుత్ & పరిశ్రమలు'],
      'crime': ['crime', 'క్రైమ్', 'సైబర్ క్రైమ్', 'పోలీస్'],
      'education': ['education', 'విద్య', 'కౌన్సెలింగ్', 'ఉపాధ్యాయ పోస్టులు', 'పరీక్షలు'],
      'sports': ['sports', 'క్రీడలు', 'క్రికెట్', 'ఐపీఎల్', 'కబడ్డీ', 'అథ్లెటిక్స్'],
      'jobs': ['jobs', 'ఉద్యోగాలు', 'నోటిఫికేషన్లు', 'బ్యాంకింగ్', 'రైల్వే ఉద్యోగాలు', 'ఐటీ'],
      'politics': ['politics', 'రాజకీయాలు', 'జాతీయ', 'ఎన్నికలు', 'అసెంబ్లీ'],
      'telangana': ['telangana', 'తెలంగాణ', 'బడ్జెట్', 'రైతు సంక్షేమం', 'వ్యవసాయం'],
      'andhra-pradesh': ['andhra-pradesh', 'ఆంధ్రప్రదేశ్', 'రాజధాని', 'పోలవరం'],
      'hyderabad': ['hyderabad', 'హైదరాబాద్', 'ట్రాఫిక్ & రవాణా', 'ట్రాఫిక్', 'జీహెచ్ఎంసీ', 'రియల్ ఎస్టేట్', 'నగర విశేషాలు'],
      'special-stories': ['special-stories', 'ప్రత్యేక కథనాలు', 'ఆధ్యాత్మికం', 'భక్తి', 'సాగునీరు', 'వ్యవసాయం & జీవనం', 'వారసత్వం', 'సైన్స్ & టెక్నాలజీ', 'జీవనశైలి', 'వైద్య ఆరోగ్యం'],
    };

    const aliases = categoryAliases[cleanSlug] || [cleanSlug];
    return this.getPublished().filter(a => {
      const cat = (a.category || '').toLowerCase();
      const sub = (a.subcategory || '').toLowerCase();
      return aliases.some(alias => cat === alias.toLowerCase() || sub === alias.toLowerCase());
    });
  }

  static getBreaking(): Article[] {
    return this.getPublished().filter(a => a.isBreaking);
  }

  static getFeatured(): Article[] {
    return this.getPublished().filter(a => a.isFeatured);
  }

  static getTrending(): Article[] {
    return this.getPublished().filter(a => a.isTrending);
  }

  static getByAuthor(authorId: string): Article[] {
    return this.getAll().filter(a => a.authorId === authorId);
  }

  static getByStatus(status: ArticleStatus): Article[] {
    return this.getAll().filter(a => a.status === status);
  }

  static create(articleData: Partial<Article>): Article {
    const articles = this.getAll();
    const newArticle: Article = {
      id: `art-${Date.now()}`,
      slug: (articleData.title || 'article')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`,
      title: articleData.title || '',
      titleTe: articleData.titleTe || articleData.title || '',
      summary: articleData.summary || '',
      summaryTe: articleData.summaryTe || articleData.summary || '',
      content: articleData.content || '',
      contentTe: articleData.contentTe || articleData.content || '',
      category: articleData.category || 'latest',
      subcategory: articleData.subcategory || '',
      district: articleData.district || 'Hyderabad',
      authorId: articleData.authorId || 'rep-1',
      authorName: articleData.authorName || 'జనతా వాణి న్యూస్ బ్యూరో',
      authorAvatar: articleData.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      imageUrl: articleData.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
      imageCaption: articleData.imageCaption || '',
      status: articleData.status || 'draft',
      isBreaking: !!articleData.isBreaking,
      isFeatured: !!articleData.isFeatured,
      isTrending: !!articleData.isTrending,
      views: 0,
      readingTimeMinutes: Math.max(1, Math.ceil((articleData.content?.length || 500) / 400)),
      publishedAt: articleData.status === 'published' ? new Date().toISOString() : '',
      updatedAt: new Date().toISOString(),
      tags: articleData.tags || ['జనతా వాణి', 'తాజా వార్తలు'],
      seoTitle: articleData.seoTitle || articleData.titleTe,
      seoDescription: articleData.seoDescription || articleData.summaryTe,
      seoKeywords: articleData.seoKeywords || '',
      socialCaption: articleData.socialCaption || '',
      editorComments: articleData.editorComments || '',
    };

    articles.unshift(newArticle);
    this.saveArticles(articles);
    return newArticle;
  }

  static update(id: string, updates: Partial<Article>): Article | undefined {
    const articles = this.getAll();
    const index = articles.findIndex(a => a.id === id);
    if (index === -1) return undefined;

    const existing = articles[index];
    const updated: Article = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
      publishedAt: (updates.status === 'published' && !existing.publishedAt) 
        ? new Date().toISOString() 
        : existing.publishedAt,
    };

    articles[index] = updated;
    this.saveArticles(articles);
    return updated;
  }

  static delete(id: string): boolean {
    const articles = this.getAll();
    const filtered = articles.filter(a => a.id !== id);
    if (filtered.length === articles.length) return false;
    this.saveArticles(filtered);
    return true;
  }

  static toggleBreaking(id: string): boolean {
    const article = this.getById(id);
    if (!article) return false;
    this.update(id, { isBreaking: !article.isBreaking });
    return true;
  }

  static search(query: string, category?: string, author?: string): Article[] {
    const term = query.toLowerCase().trim();
    return this.getPublished().filter(art => {
      const matchQuery = !term || 
        art.title.toLowerCase().includes(term) ||
        art.titleTe.toLowerCase().includes(term) ||
        art.summaryTe.toLowerCase().includes(term) ||
        art.contentTe.toLowerCase().includes(term) ||
        art.tags.some(t => t.toLowerCase().includes(term));

      const matchCat = !category || category === 'all' || art.category.toLowerCase() === category.toLowerCase();
      const matchAuthor = !author || author === 'all' || art.authorId === author || art.authorName.toLowerCase().includes(author.toLowerCase());

      return matchQuery && matchCat && matchAuthor;
    });
  }

  static incrementViews(id: string): void {
    const articles = this.getAll();
    const index = articles.findIndex(a => a.id === id);
    if (index !== -1) {
      articles[index] = { ...articles[index], views: articles[index].views + 1 };
      this.saveArticles(articles, false);
    }
  }

  static resetToDefault(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ARTICLES));
    window.dispatchEvent(new Event('articles-updated'));
  }
}
