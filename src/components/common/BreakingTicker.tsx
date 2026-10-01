import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Bell, ChevronRight, Zap } from 'lucide-react';
import { MockNewsService } from '../../services/mockNewsService';
import { Article } from '../../types';

export const BreakingTicker: React.FC = () => {
  const [breakingArticles, setBreakingArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadBreaking = () => {
    const list = MockNewsService.getBreaking();
    setBreakingArticles(list);
  };

  useEffect(() => {
    loadBreaking();
    const handler = () => loadBreaking();
    window.addEventListener('articles-updated', handler);
    return () => window.removeEventListener('articles-updated', handler);
  }, []);

  useEffect(() => {
    if (breakingArticles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % breakingArticles.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [breakingArticles]);

  if (breakingArticles.length === 0) return null;

  const current = breakingArticles[currentIndex];

  return (
    <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white shadow-md border-b border-red-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3">
        {/* Clickable Breaking News Badge */}
        <Link
          to="/latest"
          className="flex items-center gap-1.5 bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-sm px-2.5 py-1 rounded text-xs font-black tracking-wider uppercase shrink-0 border border-white/20 cursor-pointer group"
          title="తాజా బ్రేకింగ్ వార్తలు"
        >
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
          <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">తాజా బ్రేకింగ్</span>
          <span className="sm:hidden">తాజా</span>
        </Link>

        {/* Content */}
        <div className="flex-1 overflow-hidden min-w-0">
          <Link
            to={`/article/${current.slug}`}
            className="flex items-center gap-2 group hover:text-amber-200 transition-colors"
          >
            <span className="inline-block bg-white/20 text-[11px] px-1.5 py-0.5 rounded uppercase font-semibold text-white/90 shrink-0">
              {current.category}
            </span>
            <span className="text-sm font-medium truncate group-hover:underline">
              {current.titleTe}
            </span>
            <ChevronRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform shrink-0 hidden sm:inline" />
          </Link>
        </div>

        {/* Ticker dots */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          {breakingArticles.slice(0, 5).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
              }`}
              title={`Item ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
