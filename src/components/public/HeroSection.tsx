import React from 'react';
import { Article } from '../../types';
import { ArticleCard } from './ArticleCard';

interface HeroSectionProps {
  leadArticle?: Article;
  secondaryArticles: Article[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ leadArticle, secondaryArticles }) => {
  if (!leadArticle) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
      {/* Lead Main Story (7 Cols on desktop) */}
      <div className="lg:col-span-8">
        <ArticleCard article={leadArticle} variant="hero" />
      </div>

      {/* Secondary Top Stories (4 Cols on desktop) */}
      <div className="lg:col-span-4 flex flex-col gap-3 justify-between">
        <div className="bg-slate-900 text-white px-3 py-2 rounded-t-xl flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-amber-300">
            టాప్ కథనాలు (Top Stories)
          </span>
          <span className="text-[11px] text-slate-400">లైవ్ అప్‌డేట్స్</span>
        </div>
        <div className="bg-white rounded-b-xl border border-slate-200/80 p-3 divide-y divide-slate-100 flex-1 flex flex-col justify-around">
          {secondaryArticles.slice(0, 3).map(art => (
            <ArticleCard key={art.id} article={art} variant="compact" />
          ))}
        </div>
      </div>
    </div>
  );
};
