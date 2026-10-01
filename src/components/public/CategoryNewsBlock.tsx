import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types';
import { ArticleCard } from './ArticleCard';
import { ChevronRight } from 'lucide-react';

interface CategoryNewsBlockProps {
  title: string;
  titleTe: string;
  categorySlug: string;
  articles: Article[];
  accentColor?: string;
  subcategories?: string[];
}

export const CategoryNewsBlock: React.FC<CategoryNewsBlockProps> = ({
  title,
  titleTe,
  categorySlug,
  articles,
  accentColor = '#dc2626',
  subcategories = [],
}) => {
  if (articles.length === 0) return null;

  const lead = articles[0];
  const rest = articles.slice(1, 5);

  return (
    <section className="my-8">
      {/* Category Header with Accent Strip */}
      <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-slate-200">
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-6 rounded-xs"
            style={{ backgroundColor: accentColor }}
          />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-telugu">
            {titleTe}
          </h2>
          <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-slate-400">
            / {title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {subcategories.length > 0 && (
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600 mr-2">
              {subcategories.map(sub => (
                <Link 
                  key={sub} 
                  to={`/search?q=${encodeURIComponent(sub)}`}
                  className="hover:text-red-600 hover:underline cursor-pointer"
                >
                  {sub}
                </Link>
              ))}
            </div>
          )}

          <Link
            to={`/${categorySlug}`}
            className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-0.5 group"
          >
            <span>అన్నీ చూడండి</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Grid Layout: 1 Lead Horizontal + 3 Vertical Standard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.slice(0, 4).map((art, idx) => (
          <ArticleCard
            key={art.id}
            article={art}
            variant="standard"
            showCategory={false}
          />
        ))}
      </div>
    </section>
  );
};
