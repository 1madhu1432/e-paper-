import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Zap, Video, FileText, MoreHorizontal, Bookmark, Settings, AlertCircle, Shield, X } from 'lucide-react';
import { useSavedArticles } from '../../context/SavedArticlesContext';
import { useAuth } from '../../context/AuthContext';

export const MobileBottomNav: React.FC = () => {
  const [showMoreSheet, setShowMoreSheet] = useState(false);
  const { savedIds } = useSavedArticles();
  const { isSuperAdmin, isEditor, isReporter } = useAuth();

  useEffect(() => {
    if (showMoreSheet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showMoreSheet]);

  return (
    <>
      {/* Fixed bottom navigation bar for mobile views */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-1.5 px-2">
        <div className="flex items-center justify-around">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive ? 'text-red-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`
            }
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">హోమ్</span>
          </NavLink>

          <NavLink
            to="/latest"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive ? 'text-red-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`
            }
          >
            <Zap className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">తాజా</span>
          </NavLink>

          <NavLink
            to="/videos"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive ? 'text-red-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`
            }
          >
            <Video className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">వీడియోలు</span>
          </NavLink>

          <NavLink
            to="/epaper"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive ? 'text-red-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`
            }
          >
            <FileText className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">ఈ-పేపర్</span>
          </NavLink>

          <button
            onClick={() => setShowMoreSheet(true)}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-slate-600 hover:text-slate-900"
          >
            <MoreHorizontal className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">మరిన్ని</span>
          </button>
        </div>
      </div>

      {/* Mobile "More" Bottom Sheet Modal */}
      {showMoreSheet && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowMoreSheet(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-5 border-t border-slate-200 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <span className="text-sm font-bold text-slate-800">మరిన్ని సేవలు & సెట్టింగ్‌లు</span>
              <button onClick={() => setShowMoreSheet(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Link
                to="/saved"
                onClick={() => setShowMoreSheet(false)}
                className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-800"
              >
                <Bookmark className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-xs font-bold">సేవ్ చేసిన వార్తలు</p>
                  <p className="text-[10px] text-slate-500">{savedIds.length} కథనాలు</p>
                </div>
              </Link>

              <Link
                to="/report-news"
                onClick={() => setShowMoreSheet(false)}
                className="flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100 rounded-xl text-red-900"
              >
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-xs font-bold">వార్త పంపండి</p>
                  <p className="text-[10px] text-red-600">సిటిజన్ రిపోర్టింగ్</p>
                </div>
              </Link>

              <Link
                to="/preferences"
                onClick={() => setShowMoreSheet(false)}
                className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-800"
              >
                <Settings className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-xs font-bold">ప్రాధాన్యతలు</p>
                  <p className="text-[10px] text-slate-500">ఫాంట్ & అలర్ట్స్</p>
                </div>
              </Link>

              {(isSuperAdmin || isEditor || isReporter) && (
                <Link
                  to="/admin"
                  onClick={() => setShowMoreSheet(false)}
                  className="flex items-center gap-3 p-3 bg-amber-50 hover:bg-amber-100 rounded-xl text-amber-900 col-span-2"
                >
                  <Shield className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-xs font-bold">న్యూస్‌రూమ్ అడ్మిన్ ప్యానెల్</p>
                    <p className="text-[10px] text-amber-700">కథనాలు రాయడం & ఎడిటింగ్</p>
                  </div>
                </Link>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-500 font-medium">
              <Link to="/about" onClick={() => setShowMoreSheet(false)}>మా గురించి</Link>
              <Link to="/contact" onClick={() => setShowMoreSheet(false)}>సంప్రదించండి</Link>
              <Link to="/privacy" onClick={() => setShowMoreSheet(false)}>ప్రైవసీ పాలసీ</Link>
              <Link to="/terms" onClick={() => setShowMoreSheet(false)}>నిబంధనలు</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
