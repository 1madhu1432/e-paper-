import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Zap, FileQuestion } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl shadow-xl border border-slate-200/80 space-y-5 animate-in fade-in zoom-in-95">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-red-50 text-red-600 flex items-center justify-center shadow-inner">
          <FileQuestion className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-black bg-red-100 text-red-700 px-3 py-1 rounded-full uppercase tracking-wider">
            404 Error
          </span>
          <h1 className="text-2xl font-black text-slate-900 font-telugu mt-3">
            పేజీ కనుగొనబడలేదు (Page Not Found)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-telugu mt-2 leading-relaxed">
            మీరు వెతుకుతున్న పేజీ లేదా కథనం తొలగించబడి ఉండవచ్చు లేదా లింక్ చిరునామా తప్పుగా ఉండవచ్చు.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer font-telugu"
          >
            <Home className="w-4 h-4" />
            <span>హోమ్‌పేజీ (Go Home)</span>
          </Link>
          <Link
            to="/latest"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-amber-300 font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer font-telugu"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>తాజా వార్తలు (Latest News)</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
