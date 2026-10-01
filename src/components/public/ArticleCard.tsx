import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types';
import { Clock, Eye, Bookmark, Share2, Flame } from 'lucide-react';
import { useSavedArticles } from '../../context/SavedArticlesContext';

interface ArticleCardProps {
  article: Article;
  variant?: 'hero' | 'featured' | 'horizontal' | 'compact' | 'standard';
  showCategory?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'standard',
  showCategory = true,
}) => {
  const { isSaved, toggleSave } = useSavedArticles();
  const saved = isSaved(article.id);

  // Format relative time (e.g. 2 గంటల క్రితం)
  const formatTime = (isoDate: string) => {
    if (!isoDate) return 'ఇప్పుడే';
    const diffHours = Math.max(1, Math.floor((Date.now() - new Date(isoDate).getTime()) / 3600000));
    if (diffHours < 24) return `${diffHours} గంటల క్రితం`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} రోజుల క్రితం`;
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.titleTe,
        url: window.location.origin + `/article/${article.slug}`,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin + `/article/${article.slug}`);
      alert('లింక్ కాపీ చేయబడింది!');
    }
  };

  // Compact Variant (Used in sidebars or trending lists)
  if (variant === 'compact') {
    return (
      <div className="flex gap-3 items-center group py-2 border-b border-slate-100 last:border-b-0">
        <Link to={`/article/${article.slug}`} className="w-20 h-16 sm:w-24 sm:h-18 rounded-lg overflow-hidden shrink-0 relative bg-slate-100">
          <img
            src={article.imageUrl}
            alt={article.titleTe}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
          {article.isBreaking && (
            <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-black px-1 rounded">
              బ్రేకింగ్
            </span>
          )}
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/article/${article.slug}`} className="block">
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-red-600 transition-colors">
              {article.titleTe}
            </h4>
          </Link>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
            <span>{formatTime(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.category}</span>
          </div>
        </div>
      </div>
    );
  }

  // Horizontal Variant (Full width in feeds)
  if (variant === 'horizontal') {
    return (
      <div className="flex flex-col sm:flex-row gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-xs border border-slate-200/80 hover:shadow-md transition-shadow group">
        <Link to={`/article/${article.slug}`} className="sm:w-56 md:w-64 h-44 sm:h-36 rounded-lg overflow-hidden shrink-0 relative bg-slate-100">
          <img
            src={article.imageUrl}
            alt={article.titleTe}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
          {article.isBreaking && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
              🔴 బ్రేకింగ్
            </span>
          )}
        </Link>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                {article.subcategory || article.category}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {formatTime(article.publishedAt)}
              </span>
            </div>
            <Link to={`/article/${article.slug}`}>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                {article.titleTe}
              </h3>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1.5 font-normal">
              {article.summaryTe}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{article.authorName}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[11px]">
                <Clock className="w-3.5 h-3.5" /> {article.readingTimeMinutes} నిమి.
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleSave(article.id);
                }}
                className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                  saved ? 'text-red-600 fill-red-600' : 'text-slate-400 hover:text-slate-700'
                }`}
                title={saved ? 'Remove Bookmark' : 'Save Article'}
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={handleShare}
                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                title="Share Article"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Hero Big Lead Card
  if (variant === 'hero') {
    return (
      <div className="relative rounded-2xl overflow-hidden shadow-lg group bg-slate-900 text-white min-h-[360px] sm:min-h-[460px] flex flex-col justify-end">
        <img
          src={article.imageUrl}
          alt={article.titleTe}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="relative p-5 sm:p-8 z-10 space-y-3">
          <div className="flex items-center gap-2">
            {article.isBreaking && (
              <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md">
                <Flame className="w-3.5 h-3.5 fill-white" /> బ్రేకింగ్ న్యూస్
              </span>
            )}
            <span className="bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
              {article.category}
            </span>
            <span className="text-xs text-slate-300 font-medium">
              {formatTime(article.publishedAt)}
            </span>
          </div>

          <Link to={`/article/${article.slug}`} className="block">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-amber-300 transition-colors leading-tight">
              {article.titleTe}
            </h1>
          </Link>

          <p className="text-xs sm:text-base text-slate-200 line-clamp-2 sm:line-clamp-3 font-normal max-w-3xl">
            {article.summaryTe}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-white/20 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">{article.authorName}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readingTimeMinutes} నిమిషాల పఠనం
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleSave(article.id);
                }}
                className={`p-1.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors ${
                  saved ? 'text-amber-400' : 'text-white'
                }`}
                title="Save Article"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={handleShare}
                className="p-1.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Card (Vertical Grid)
  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden hover:shadow-md transition-shadow group flex flex-col justify-between">
      <div>
        <Link to={`/article/${article.slug}`} className="block relative aspect-video overflow-hidden bg-slate-100">
          <img
            src={article.imageUrl}
            alt={article.titleTe}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
          {article.isBreaking && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm">
              🔴 బ్రేకింగ్
            </span>
          )}
          {showCategory && (
            <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              {article.category}
            </span>
          )}
        </Link>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>{article.district}</span>
            <span>{formatTime(article.publishedAt)}</span>
          </div>

          <Link to={`/article/${article.slug}`} className="block">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
              {article.titleTe}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 font-normal">
            {article.summaryTe}
          </p>
        </div>
      </div>

      <div className="px-4 pb-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="truncate max-w-[140px] font-medium text-slate-700">{article.authorName}</span>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSave(article.id);
            }}
            className={`p-1 rounded hover:bg-slate-100 ${
              saved ? 'text-red-600' : 'text-slate-400'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <button
            onClick={handleShare}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
