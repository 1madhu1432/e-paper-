import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Eye, Share2, Calendar, User, ArrowLeft, Check } from 'lucide-react';

export const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { news, incrementNewsView, incrementShare } = useData();

  const [isCopied, setIsCopied] = useState(false);

  const article = news.find(n => n.id === id) || news[0];

  useEffect(() => {
    if (article) {
      incrementNewsView(article.id);
    }
  }, [article?.id]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-500">
        Article not found.
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    incrementShare('news', article.id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const relatedArticles = news.filter(n => n.id !== article.id).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8 font-sans">
      <button
        onClick={() => navigate('/news')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-700 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Latest News</span>
      </button>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-[#0b1d3a] text-white text-xs font-extrabold px-3 py-1 rounded uppercase">
            {article.category}
          </span>
          {article.isBreaking && (
            <span className="bg-red-600 text-white text-xs font-extrabold px-2.5 py-1 rounded uppercase">
              Breaking
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-900 leading-tight">
          {article.titleTe || article.title}
        </h1>

        {/* Metadata bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-200 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold text-slate-800">
              <User className="w-4 h-4 text-blue-700" />
              <span>{article.authorName}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{new Date(article.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-amber-500" />
              <span>{article.views.toLocaleString()} Views</span>
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 bg-blue-50 text-[#1e40af] hover:bg-blue-100 font-bold px-3 py-1.5 rounded-lg transition"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{isCopied ? 'Link Copied!' : 'Share News'}</span>
          </button>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-auto max-h-[480px] object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none text-slate-800 font-serif leading-relaxed space-y-4">
        <p className="text-base sm:text-lg font-semibold text-slate-700 bg-slate-50 p-4 rounded-xl border-l-4 border-[#1e40af]">
          {article.summaryTe || article.summary}
        </p>

        <div className="whitespace-pre-line text-sm sm:text-base leading-loose pt-2">
          {article.contentTe || article.content}
        </div>
      </div>

      {/* Related Articles */}
      <div className="pt-6 border-t border-slate-200 space-y-4">
        <h3 className="text-xl font-bold font-serif text-[#0b1d3a]">Related Headlines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedArticles.map(rel => (
            <Link
              key={rel.id}
              to={`/news/${rel.id}`}
              className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 hover:shadow-md transition block"
            >
              <span className="text-[10px] font-bold text-blue-700">{rel.category}</span>
              <h4 className="font-serif font-bold text-xs text-slate-900 line-clamp-2">
                {rel.titleTe || rel.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
