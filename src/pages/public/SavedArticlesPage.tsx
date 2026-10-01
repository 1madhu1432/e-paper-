import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, Clock, User, BookOpen } from 'lucide-react';
import { useSavedArticles } from '../../context/SavedArticlesContext';
import { CATEGORIES } from '../../data/categories';

export const SavedArticlesPage: React.FC = () => {
  const { savedArticles, removeArticle, clearAll } = useSavedArticles();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bookmark className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-telugu">సేవ్ చేసిన వార్తలు</h1>
                <p className="text-slate-400 text-sm">{savedArticles.length} వార్తలు సేవ్ చేయబడ్డాయి</p>
              </div>
            </div>
            {savedArticles.length > 0 && (
              <button onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl text-sm font-medium transition-colors border border-red-600/30 cursor-pointer">
                <Trash2 className="w-4 h-4" />
                అన్నీ తొలగించు
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {savedArticles.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-600 mb-2 font-telugu">సేవ్ చేసిన వార్తలు లేవు</h2>
            <p className="text-slate-400 mb-6">మీరు చదవాలనుకున్న వార్తలను బుక్‌మార్క్ చేయండి</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors">
              వార్తలు చదవండి
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {savedArticles.map(article => (
              <div key={article.id} className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group overflow-hidden">
                <Link to={`/article/${article.slug}`} className="flex gap-4 p-4">
                  {article.imageUrl && (
                    <img src={article.imageUrl} alt={article.title}
                      className="w-28 h-20 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded font-telugu">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-base leading-snug mb-1 group-hover:text-red-600 transition-colors line-clamp-2 font-telugu">
                      {article.titleTe || article.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 font-telugu">{article.summaryTe || article.summary}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.publishedAt}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.authorName}</span>
                    </div>
                  </div>
                </Link>
                <div className="border-t border-slate-100 px-4 py-2 flex justify-end">
                  <button
                    onClick={() => removeArticle(article.id)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 text-xs font-medium transition-colors py-1 px-2 rounded-lg hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    తొలగించు
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
