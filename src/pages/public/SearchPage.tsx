import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Clock, User, TrendingUp, X } from 'lucide-react';
import { MOCK_ARTICLES } from '../../data/mockArticles';
import { CATEGORIES } from '../../data/categories';

const TRENDING_SEARCHES = [
  'తెలంగాణ బడ్జెట్', 'హైదరాబాద్ వరదలు', 'ఆంధ్రప్రదేశ్ ఎన్నికలు', 'పెట్రోల్ ధరలు',
  'TSRTC సమ్మె', 'రైతు బీమా', 'IT ఉద్యోగాలు', 'చంద్రయాన్'
];

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputVal, setInputVal] = useState(query);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => { setInputVal(query); }, [query]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MOCK_ARTICLES.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.titleTe?.toLowerCase().includes(q) ||
      a.summary?.toLowerCase().includes(q) ||
      a.summaryTe?.toLowerCase().includes(q) ||
      a.category?.toLowerCase().includes(q) ||
      a.tags?.some(t => t.toLowerCase().includes(q))
    );
  }, [query]);

  const filteredResults = useMemo(() => {
    if (activeCategory === 'all') return results;
    return results.filter(a => a.category === activeCategory);
  }, [results, activeCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) setSearchParams({ q: inputVal.trim() });
  };

  const categoriesInResults = useMemo(() => {
    const cats = new Set(results.map(a => a.category));
    return ['all', ...Array.from(cats)];
  }, [results]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Search Header */}
      <div className="bg-gradient-to-br from-slate-900 to-red-950 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-6 font-telugu">వార్తలు వెతకండి</h1>
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="వార్తలు, విషయాలు, వ్యక్తులు వెతకండి..."
              className="w-full pl-14 pr-16 py-4 rounded-2xl text-slate-900 text-lg bg-white shadow-2xl outline-none focus:ring-4 focus:ring-red-500/30 placeholder:text-slate-400 font-telugu"
            />
            {inputVal && (
              <button type="button" onClick={() => { setInputVal(''); setSearchParams({}); }}
                className="absolute right-16 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            )}
            <button type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-red-700 transition-colors font-telugu cursor-pointer">
              వెతకు
            </button>
          </form>

          {/* Trending searches */}
          {!query && (
            <div className="mt-6">
              <p className="text-slate-400 text-sm mb-3 flex items-center gap-2 font-telugu">
                <TrendingUp className="w-4 h-4" /> ట్రెండింగ్ శోధనలు
              </p>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map(s => (
                  <button key={s} onClick={() => setSearchParams({ q: s })}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full transition-colors border border-white/20 font-telugu cursor-pointer">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {query ? (
          <>
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 font-telugu">
                  "{query}" కోసం ఫలితాలు
                </h2>
                <p className="text-slate-500 text-sm mt-1">{results.length} వార్తలు కనుగొనబడ్డాయి</p>
              </div>
            </div>

            {/* Category filter */}
            {results.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                {categoriesInResults.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer font-telugu ${
                      activeCategory === cat ? 'bg-red-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-red-300'
                    }`}>
                    {cat === 'all' ? `అన్నీ (${results.length})` : cat}
                  </button>
                ))}
              </div>
            )}

            {/* Results list */}
            {filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map(article => (
                  <Link key={article.id} to={`/article/${article.slug}`}
                    className="flex gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all group border border-slate-100 hover:border-red-200">
                    {article.imageUrl && (
                      <img src={article.imageUrl} alt={article.title}
                        className="w-32 h-24 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded font-telugu">
                          {article.category}
                        </span>
                        {article.isBreaking && (
                          <span className="text-xs font-bold text-white bg-red-600 px-2 py-0.5 rounded font-telugu">బ్రేకింగ్</span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-800 text-base leading-snug mb-1 group-hover:text-red-600 transition-colors font-telugu">
                        {article.titleTe || article.title}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2 font-telugu">{article.summaryTe || article.summary}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.publishedAt}</span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.authorName}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500 text-lg font-medium font-telugu">ఫలితాలు కనుగొనబడలేదు</p>
                <p className="text-slate-400 text-sm mt-1">వేరే పదాలతో వెతకండి</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Search className="w-20 h-20 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 text-lg font-telugu">వార్తలు వెతకడం ప్రారంభించండి</p>
          </div>
        )}
      </div>
    </div>
  );
};
