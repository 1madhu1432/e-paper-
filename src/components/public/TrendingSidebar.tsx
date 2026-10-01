import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types';
import { TrendingUp, Flame, Eye } from 'lucide-react';

interface TrendingSidebarProps {
  articles: Article[];
}

export const TrendingSidebar: React.FC<TrendingSidebarProps> = ({ articles }) => {
  if (articles.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
        <div className="p-1.5 bg-red-100 text-red-600 rounded-lg">
          <TrendingUp className="w-4 h-4" />
        </div>
        <h3 className="text-base font-black text-slate-900 font-telugu">
          ట్రెండింగ్ కథనాలు (Trending)
        </h3>
      </div>

      <div className="space-y-3.5 divide-y divide-slate-100">
        {articles.slice(0, 7).map((art, index) => (
          <div key={art.id} className="pt-3.5 first:pt-0 flex items-start gap-3 group">
            {/* Rank index */}
            <span
              className={`text-lg font-black shrink-0 w-6 text-center leading-none ${
                index === 0
                  ? 'text-red-600 text-2xl'
                  : index === 1
                  ? 'text-amber-600 text-xl'
                  : index === 2
                  ? 'text-orange-500 text-lg'
                  : 'text-slate-400'
              }`}
            >
              {index + 1}
            </span>

            <div className="flex-1 min-w-0">
              <Link to={`/article/${art.slug}`}>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                  {art.titleTe}
                </h4>
              </Link>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                <span className="uppercase text-red-600 font-bold">{art.category}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <Eye className="w-3 h-3" /> {(art.views / 1000).toFixed(1)}k వీక్షణలు
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
