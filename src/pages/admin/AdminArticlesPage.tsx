import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Flame,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { MOCK_ARTICLES } from '../../data/mockArticles';
import { CATEGORIES } from '../../data/categories';
import { Article } from '../../types';

export const AdminArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter logic
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchQuery =
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.titleTe.includes(searchTerm) ||
        art.authorName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCat =
        selectedCategory === 'All' || art.category === selectedCategory;

      const matchStatus =
        selectedStatus === 'All'
          ? true
          : selectedStatus === 'breaking'
          ? art.isBreaking
          : true;

      return matchQuery && matchCat && matchStatus;
    });
  }, [articles, searchTerm, selectedCategory, selectedStatus]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage]);

  const handleDelete = (id: string) => {
    if (window.confirm('ఈ వార్తా కథనాన్ని నిజంగా తొలగించాలనుకుంటున్నారా?')) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const toggleBreaking = (id: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isBreaking: !a.isBreaking } : a))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold font-telugu text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-red-600" />
            వార్తల మేనేజ్‌మెంట్ (Articles Management)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            మొత్తం {articles.length} వార్తా కథనాలు అందుబాటులో ఉన్నాయి
          </p>
        </div>

        <Link
          to="/admin/articles/new"
          className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>కొత్త వార్త జోడించండి</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search Field */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="శీర్షిక లేదా రచయితతో వెతకండి..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500 appearance-none cursor-pointer"
          >
            <option value="All">అన్ని వర్గాలు (All Categories)</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.nameTe}>
                {c.nameTe} ({c.name})
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="All">అన్ని స్థితులు (All Statuses)</option>
            <option value="breaking font-bold">బ్రేకింగ్ న్యూస్ (Breaking News Only)</option>
          </select>
        </div>
      </div>

      {/* Articles Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">వార్త శీర్షిక</th>
                <th className="py-3.5 px-3">వర్గం</th>
                <th className="py-3.5 px-3">రచయిత</th>
                <th className="py-3.5 px-3">తేదీ</th>
                <th className="py-3.5 px-3">బ్రేకింగ్?</th>
                <th className="py-3.5 px-4 text-right">చర్యలు</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedArticles.length > 0 ? (
                paginatedArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="flex items-start gap-3">
                        <img
                          src={art.imageUrl}
                          alt=""
                          className="w-12 h-10 object-cover rounded-lg shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 font-telugu text-sm line-clamp-1">
                            {art.titleTe || art.title}
                          </p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{art.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded border border-red-200 text-[10px]">
                        {art.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                      {art.authorName}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">{art.publishedAt}</td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <button
                        onClick={() => toggleBreaking(art.id)}
                        className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          art.isBreaking
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        <Flame className={`w-3 h-3 ${art.isBreaking ? 'text-amber-600 fill-amber-600' : ''}`} />
                        {art.isBreaking ? 'బ్రేకింగ్' : 'సాధారణ'}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/article/${art.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="వార్త చూడండి"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/articles/edit/${art.id}`}
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="ఎడిట్ చేయండి"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(art.id)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="తొలగించండి"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    <AlertCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    ఏ వార్తలు కనుగొనబడలేదు.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            పేజీ <strong className="text-slate-800">{currentPage}</strong> / {totalPages} (మొత్తం{' '}
            {filteredArticles.length} వార్తలు)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
