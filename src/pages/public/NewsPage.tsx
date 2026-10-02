import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Eye, Search, Zap } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { news } = useData();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'State News', 'Latest News', 'Sports', 'Business', 'Entertainment'];

  const filteredNews = news.filter(n => {
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (n.titleTe && n.titleTe.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (n.summaryTe && n.summaryTe.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 font-sans">
      <div className="bg-[#0b1d3a] text-white p-8 rounded-2xl border-b-4 border-amber-500 shadow-lg">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Digital News Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">Public Mood Latest News</h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Real-time breaking news, political analysis, state stories, sports, and business updates.
          </p>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat ? 'bg-[#1e40af] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search news headlines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map(article => (
          <div key={article.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div>
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#0b1d3a] text-white text-[10px] font-extrabold px-2.5 py-1 rounded uppercase">
                  {article.category}
                </span>
                {article.isBreaking && (
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs uppercase">
                    Breaking
                  </span>
                )}
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-serif font-extrabold text-base text-slate-900 group-hover:text-[#1e40af] transition line-clamp-2">
                  {article.titleTe || article.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {article.summaryTe || article.summary}
                </p>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-blue-700" />
                <span>{article.views.toLocaleString()} Views</span>
              </span>

              <Link
                to={`/news/${article.id}`}
                className="bg-[#1e40af] hover:bg-[#0b1d3a] text-white text-xs font-bold px-3 py-1.5 rounded transition"
              >
                READ FULL
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
