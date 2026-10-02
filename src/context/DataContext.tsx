import React, { createContext, useContext, useState, useEffect } from 'react';
import { State, SubEdition, Edition, EPaper, Article, SiteSettings } from '../types';
import { initialStates } from '../data/states';
import { initialSubEditions } from '../data/subEditions';
import { initialEditions } from '../data/editions';
import { initialEPapers } from '../data/epapers';
import { initialNewsArticles } from '../data/news';
import { trackNewsView, trackEpaperView, trackEpaperPageView, trackShare, trackDownload } from '../utils/analytics';

interface DataContextType {
  // Data lists
  states: State[];
  subEditions: SubEdition[];
  editions: Edition[];
  epapers: EPaper[];
  news: Article[];
  settings: SiteSettings;

  // State selection flow
  selectedStateId: string;
  setSelectedStateId: (id: string) => void;
  selectedSubEditionId: string;
  setSelectedSubEditionId: (id: string) => void;
  selectedEditionId: string;
  setSelectedEditionId: (id: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;

  // CRUD Operations for States
  addState: (state: Omit<State, 'id'>) => void;
  updateState: (id: string, state: Partial<State>) => void;
  deleteState: (id: string) => void;

  // CRUD Operations for SubEditions
  addSubEdition: (subEdition: Omit<SubEdition, 'id'>) => void;
  updateSubEdition: (id: string, subEdition: Partial<SubEdition>) => void;
  deleteSubEdition: (id: string) => void;

  // CRUD Operations for Editions
  addEdition: (edition: Omit<Edition, 'id'>) => void;
  updateEdition: (id: string, edition: Partial<Edition>) => void;
  deleteEdition: (id: string) => void;

  // CRUD Operations for E-Papers
  addEPaper: (epaper: Omit<EPaper, 'id' | 'createdAt' | 'views' | 'readers' | 'downloads' | 'shares'>) => EPaper;
  updateEPaper: (id: string, epaper: Partial<EPaper>) => void;
  deleteEPaper: (id: string) => void;

  // CRUD Operations for News
  addNews: (news: Omit<Article, 'id' | 'publishedAt' | 'updatedAt' | 'views' | 'uniqueReaders' | 'shares' | 'averageReadingTime'>) => void;
  updateNews: (id: string, news: Partial<Article>) => void;
  deleteNews: (id: string) => void;

  // Settings
  updateSettings: (newSettings: Partial<SiteSettings>) => void;

  // Increment counters for demo analytics
  incrementNewsView: (newsId: string) => void;
  incrementEPaperView: (epaperId: string) => void;
  incrementEPaperPageView: (epaperId: string, pageNumber: number) => void;
  incrementEPaperDownload: (epaperId: string) => void;
  incrementShare: (type: 'news' | 'epaper', id: string) => void;
}

const defaultSettings: SiteSettings = {
  brandName: 'PUBLIC MOOD',
  tagline: 'Voice of the People',
  logoUrl: '/public-mood-logo.jpg',
  defaultState: 'st-telangana',
  defaultSubEdition: 'sub-hyd',
  defaultEdition: 'ed-hyd-main',
  contactEmail: 'contact@publicmood.com',
  contactPhone: '+91 40 2345 6789',
  address: 'Public Mood Towers, Road No. 12, Banjara Hills, Hyderabad, Telangana - 500034',
  socialLinks: {
    facebook: 'https://facebook.com/publicmood',
    twitter: 'https://x.com/publicmood',
    instagram: 'https://instagram.com/publicmood',
    youtube: 'https://youtube.com/publicmood',
    whatsapp: 'https://wa.me/919848012345',
    telegram: 'https://t.me/publicmood',
  },
  readerSettings: {
    defaultZoom: 100,
    autoFitWidth: true,
    showPageThumbnails: true,
  },
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or initial fallback
  const [states, setStates] = useState<State[]>(() => {
    const local = localStorage.getItem('pm_states');
    return local ? JSON.parse(local) : initialStates;
  });

  const [subEditions, setSubEditions] = useState<SubEdition[]>(() => {
    const local = localStorage.getItem('pm_sub_editions');
    return local ? JSON.parse(local) : initialSubEditions;
  });

  const [editions, setEditions] = useState<Edition[]>(() => {
    const local = localStorage.getItem('pm_editions');
    return local ? JSON.parse(local) : initialEditions;
  });

  const [epapers, setEpapers] = useState<EPaper[]>(() => {
    const local = localStorage.getItem('pm_epapers');
    return local ? JSON.parse(local) : initialEPapers;
  });

  const [news, setNews] = useState<Article[]>(() => {
    const local = localStorage.getItem('pm_news');
    return local ? JSON.parse(local) : initialNewsArticles;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const local = localStorage.getItem('pm_settings');
    return local ? JSON.parse(local) : defaultSettings;
  });

  // State selection flow defaults
  const [selectedStateId, setSelectedStateId] = useState<string>('st-telangana');
  const [selectedSubEditionId, setSelectedSubEditionId] = useState<string>('sub-hyd');
  const [selectedEditionId, setSelectedEditionId] = useState<string>('ed-hyd-main');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-02');

  // Persist state updates to localStorage
  useEffect(() => { localStorage.setItem('pm_states', JSON.stringify(states)); }, [states]);
  useEffect(() => { localStorage.setItem('pm_sub_editions', JSON.stringify(subEditions)); }, [subEditions]);
  useEffect(() => { localStorage.setItem('pm_editions', JSON.stringify(editions)); }, [editions]);
  useEffect(() => { localStorage.setItem('pm_epapers', JSON.stringify(epapers)); }, [epapers]);
  useEffect(() => { localStorage.setItem('pm_news', JSON.stringify(news)); }, [news]);
  useEffect(() => { localStorage.setItem('pm_settings', JSON.stringify(settings)); }, [settings]);

  // Keep state selection cascading valid
  useEffect(() => {
    const activeSubEditions = subEditions.filter(s => s.stateId === selectedStateId);
    if (activeSubEditions.length > 0 && !activeSubEditions.some(s => s.id === selectedSubEditionId)) {
      setSelectedSubEditionId(activeSubEditions[0].id);
    }
  }, [selectedStateId, subEditions, selectedSubEditionId]);

  useEffect(() => {
    const activeEditions = editions.filter(e => e.subEditionId === selectedSubEditionId);
    if (activeEditions.length > 0 && !activeEditions.some(e => e.id === selectedEditionId)) {
      setSelectedEditionId(activeEditions[0].id);
    }
  }, [selectedSubEditionId, editions, selectedEditionId]);

  // CRUD for States
  const addState = (stateData: Omit<State, 'id'>) => {
    const newState: State = { ...stateData, id: `st-${Date.now()}`, subEditionCount: 0 };
    setStates(prev => [...prev, newState]);
  };

  const updateState = (id: string, updated: Partial<State>) => {
    setStates(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteState = (id: string) => {
    setStates(prev => prev.filter(s => s.id !== id));
    setSubEditions(prev => prev.filter(se => se.stateId !== id));
  };

  // CRUD for SubEditions
  const addSubEdition = (subData: Omit<SubEdition, 'id'>) => {
    const newSub: SubEdition = { ...subData, id: `sub-${Date.now()}` };
    setSubEditions(prev => [...prev, newSub]);
    setStates(prev => prev.map(s => s.id === subData.stateId ? { ...s, subEditionCount: (s.subEditionCount || 0) + 1 } : s));
  };

  const updateSubEdition = (id: string, updated: Partial<SubEdition>) => {
    setSubEditions(prev => prev.map(se => se.id === id ? { ...se, ...updated } : se));
  };

  const deleteSubEdition = (id: string) => {
    setSubEditions(prev => prev.filter(se => se.id !== id));
  };

  // CRUD for Editions
  const addEdition = (edData: Omit<Edition, 'id'>) => {
    const newEd: Edition = { ...edData, id: `ed-${Date.now()}` };
    setEditions(prev => [...prev, newEd]);
  };

  const updateEdition = (id: string, updated: Partial<Edition>) => {
    setEditions(prev => prev.map(ed => ed.id === id ? { ...ed, ...updated } : ed));
  };

  const deleteEdition = (id: string) => {
    setEditions(prev => prev.filter(ed => ed.id !== id));
  };

  // CRUD for E-Papers
  const addEPaper = (epaperData: Omit<EPaper, 'id' | 'createdAt' | 'views' | 'readers' | 'downloads' | 'shares'>): EPaper => {
    const newEPaper: EPaper = {
      ...epaperData,
      id: `epaper-${Date.now()}`,
      createdAt: new Date().toISOString(),
      views: 1,
      readers: 1,
      downloads: 0,
      shares: 0
    };
    setEpapers(prev => [newEPaper, ...prev]);
    return newEPaper;
  };

  const updateEPaper = (id: string, updated: Partial<EPaper>) => {
    setEpapers(prev => prev.map(ep => ep.id === id ? { ...ep, ...updated } : ep));
  };

  const deleteEPaper = (id: string) => {
    setEpapers(prev => prev.filter(ep => ep.id !== id));
  };

  // CRUD for News
  const addNews = (newsData: Omit<Article, 'id' | 'publishedAt' | 'updatedAt' | 'views' | 'uniqueReaders' | 'shares' | 'averageReadingTime'>) => {
    const now = new Date().toISOString();
    const newArticle: Article = {
      ...newsData,
      id: `news-${Date.now()}`,
      publishedAt: now,
      updatedAt: now,
      views: 1,
      uniqueReaders: 1,
      shares: 0,
      averageReadingTime: '2.5 min'
    };
    setNews(prev => [newArticle, ...prev]);
  };

  const updateNews = (id: string, updated: Partial<Article>) => {
    const now = new Date().toISOString();
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...updated, updatedAt: now } : n));
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Analytics increment functions
  const incrementNewsView = (newsId: string) => {
    setNews(prev => prev.map(n => {
      if (n.id === newsId) {
        const newViews = n.views + 1;
        const newUnique = (n.uniqueReaders || 0) + (Math.random() > 0.3 ? 1 : 0);
        return { ...n, views: newViews, uniqueReaders: newUnique };
      }
      return n;
    }));
    trackNewsView(newsId);
  };

  const incrementEPaperView = (epaperId: string) => {
    setEpapers(prev => prev.map(ep => {
      if (ep.id === epaperId) {
        return {
          ...ep,
          views: ep.views + 1,
          readers: (ep.readers || 0) + (Math.random() > 0.4 ? 1 : 0)
        };
      }
      return ep;
    }));
    trackEpaperView(epaperId);
  };

  const incrementEPaperPageView = (epaperId: string, pageNumber: number) => {
    setEpapers(prev => prev.map(ep => {
      if (ep.id === epaperId && ep.pages) {
        const updatedPages = ep.pages.map(p => p.pageNumber === pageNumber ? { ...p, viewsCount: (p.viewsCount || 0) + 1 } : p);
        return { ...ep, pages: updatedPages };
      }
      return ep;
    }));
    trackEpaperPageView(epaperId, pageNumber);
  };

  const incrementEPaperDownload = (epaperId: string) => {
    setEpapers(prev => prev.map(ep => ep.id === epaperId ? { ...ep, downloads: ep.downloads + 1 } : ep));
    trackDownload('epaper', epaperId);
  };

  const incrementShare = (type: 'news' | 'epaper', id: string) => {
    if (type === 'news') {
      setNews(prev => prev.map(n => n.id === id ? { ...n, shares: (n.shares || 0) + 1 } : n));
    } else {
      setEpapers(prev => prev.map(ep => ep.id === id ? { ...ep, shares: (ep.shares || 0) + 1 } : ep));
    }
    trackShare(type, id);
  };

  return (
    <DataContext.Provider
      value={{
        states,
        subEditions,
        editions,
        epapers,
        news,
        settings,

        selectedStateId,
        setSelectedStateId,
        selectedSubEditionId,
        setSelectedSubEditionId,
        selectedEditionId,
        setSelectedEditionId,
        selectedDate,
        setSelectedDate,

        addState,
        updateState,
        deleteState,

        addSubEdition,
        updateSubEdition,
        deleteSubEdition,

        addEdition,
        updateEdition,
        deleteEdition,

        addEPaper,
        updateEPaper,
        deleteEPaper,

        addNews,
        updateNews,
        deleteNews,

        updateSettings,

        incrementNewsView,
        incrementEPaperView,
        incrementEPaperPageView,
        incrementEPaperDownload,
        incrementShare,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
