import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article } from '../types';
import { MOCK_ARTICLES } from '../data/mockArticles';

interface SavedArticlesContextType {
  savedIds: string[];
  savedArticles: Article[];
  saveArticle: (id: string) => void;
  removeArticle: (id: string) => void;
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  clearAll: () => void;
}

const SavedArticlesContext = createContext<SavedArticlesContextType | undefined>(undefined);

export const SavedArticlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const data = localStorage.getItem('jv_saved_articles');
      return data ? JSON.parse(data) : ['art-001', 'art-005'];
    } catch {
      return ['art-001', 'art-005'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jv_saved_articles', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  const savedArticles = MOCK_ARTICLES.filter(a => savedIds.includes(a.id));

  const saveArticle = (id: string) => {
    if (!savedIds.includes(id)) setSavedIds(prev => [id, ...prev]);
  };

  const removeArticle = (id: string) => {
    setSavedIds(prev => prev.filter(item => item !== id));
  };

  const toggleSave = (id: string) => {
    if (savedIds.includes(id)) removeArticle(id);
    else saveArticle(id);
  };

  const isSaved = (id: string) => savedIds.includes(id);
  const clearAll = () => setSavedIds([]);

  return (
    <SavedArticlesContext.Provider value={{ savedIds, savedArticles, saveArticle, removeArticle, toggleSave, isSaved, clearAll }}>
      {children}
    </SavedArticlesContext.Provider>
  );
};

export const useSavedArticles = () => {
  const context = useContext(SavedArticlesContext);
  if (!context) throw new Error('useSavedArticles must be used within SavedArticlesProvider');
  return context;
};
