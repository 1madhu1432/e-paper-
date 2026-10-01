import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { MockNewsService } from '../../services/mockNewsService';
import { CATEGORIES } from '../../data/categories';
import { Article } from '../../types';
import { ArticleCard } from '../../components/public/ArticleCard';
import { AdBanner } from '../../components/common/AdBanner';
import { TrendingSidebar } from '../../components/public/TrendingSidebar';
import { Filter, SlidersHorizontal, ChevronRight } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  // Safely extract category slug from path for shorthand routes like /telangana
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const pathSlug = pathSegments[pathSegments.length - 1] || 'latest';
  const categorySlug = slug || pathSlug || 'latest';

  const categoryInfo = CATEGORIES.find(c => c.slug === categorySlug) || {
    id: categorySlug,
    name: categorySlug.toUpperCase(),
    nameTe: categorySlug === 'latest' ? 'తాజా వార్తలు' : categorySlug,
    slug: categorySlug,
    color: '#dc2626',
    description: 'సమగ్ర తాజా సమాచారం',
  };

  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedSub, setSelectedSub] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const list = MockNewsService.getByCategory(categorySlug);
    setArticles(list);
    setSelectedSub('all');
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categorySlug]);

  // Extract unique subcategories or districts
  const subcategories = Array.from(
    new Set(articles.map(a => a.subcategory).filter(Boolean) as string[])
  );

  // Filter & Sort
  const filtered = articles
    .filter(a => selectedSub === 'all' || a.subcategory === selectedSub)
    .sort((a, b) => {
      if (sortBy === 'popular') return b.views - a.views;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayedArticles = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const trendingArticles = MockNewsService.getTrending();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Category Header Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
        <Link to="/" className="hover:text-red-600">హోమ్</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">{categoryInfo.nameTe}</span>
      </div>

      {/* Category Banner Title */}
      <div
        className="rounded-2xl p-6 sm:p-8 text-white mb-6 shadow-md relative overflow-hidden flex flex-col justify-end min-h-[140px]"
        style={{
          background: `linear-gradient(135deg, ${categoryInfo.color} 0%, #0f172a 100%)`,
        }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-300 font-bold mb-1">
            <span>వర్గం (Category)</span>
            <span>•</span>
            <span>{categoryInfo.name}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-telugu text-white">
            {categoryInfo.nameTe}
          </h1>
          {categoryInfo.description && (
            <p className="text-xs sm:text-sm text-slate-200 mt-2 font-telugu max-w-xl">
              {categoryInfo.description}
            </p>
          )}
        </div>
      </div>

      {/* Category Top Ad */}
      <div className="mb-6">
        <AdBanner placement="category-top" />
      </div>

      {/* Filter and Sorting Controls */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200/80 shadow-xs mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Subcategories pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          <button
            onClick={() => setSelectedSub('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
              selectedSub === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            అన్నీ ({articles.length})
          </button>
          {subcategories.map(sub => (
            <button
              key={sub}
              onClick={() => setSelectedSub(sub)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                selectedSub === sub
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Sort Buttons */}
        <div className="flex items-center gap-1.5 text-xs font-semibold shrink-0 self-end sm:self-auto">
          <span className="text-slate-400 hidden sm:inline mr-1">క్రమబద్ధీకరించు:</span>
          <button
            onClick={() => {
              setSortBy('latest');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              sortBy === 'latest'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            title="తాజా వార్తల ప్రకారం క్రమబద్ధీకరించండి"
          >
            <span>తాజా వార్తలు (Latest)</span>
          </button>
          <button
            onClick={() => {
              setSortBy('popular');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              sortBy === 'popular'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            title="అత్యధిక వీక్షణల ప్రకారం క్రమబద్ధీకరించండి"
          >
            <span>అత్యధిక వీక్షణలు</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Articles List + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          {displayedArticles.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <p className="text-base font-bold text-slate-700">ఈ విభాగంలో కథనాలు లేవు.</p>
              <p className="text-xs text-slate-500 mt-1">దయచేసి మరొక ఉపవిభాగాన్ని ఎంచుకోండి.</p>
            </div>
          ) : (
            displayedArticles.map(art => (
              <ArticleCard key={art.id} article={art} variant="horizontal" />
            ))
          )}

          {/* Category Middle Ad */}
          <div className="py-4">
            <AdBanner placement="category-middle" />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
              >
                మునుపటిది
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                    currentPage === idx + 1
                      ? 'bg-red-600 text-white'
                      : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
              >
                తరువాతిది
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <TrendingSidebar articles={trendingArticles} />
          <AdBanner placement="sidebar" />
        </aside>
      </div>
    </div>
  );
};
