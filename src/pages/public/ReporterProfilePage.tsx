import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Mail, Award, Clock, Share2 } from 'lucide-react';
import { REPORTERS } from '../../data/reporters';
import { MOCK_ARTICLES } from '../../data/mockArticles';
import { ArticleCard } from '../../components/public/ArticleCard';

export const ReporterProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reporter = REPORTERS.find(r => r.id === id);

  if (!reporter) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-xl font-bold text-slate-600 mb-2">రిపోర్టర్ కనుగొనబడలేదు</h2>
        <Link to="/" className="text-red-600 hover:underline text-sm">హోమ్‌పేజ్‌కు తిరిగి వెళ్ళు</Link>
      </div>
    );
  }

  const reporterArticles = MOCK_ARTICLES.filter(a => a.authorId === reporter.id).slice(0, 8);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Profile Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <img
                src={reporter.avatar || `https://ui-avatars.com/api/?name=${reporter.name}&background=dc2626&color=fff&size=120`}
                alt={reporter.name}
                className="w-28 h-28 rounded-2xl object-cover shadow-2xl ring-4 ring-red-600/50"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Award className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">{reporter.nameTe || reporter.name}</h1>
              <p className="text-red-400 font-medium text-sm mb-2">{reporter.role}</p>
              {reporter.district && <p className="text-slate-400 text-sm mb-3">జిల్లా: {reporter.district}</p>}
              <p className="text-slate-300 text-sm leading-relaxed max-w-xl mb-5">{reporter.bio || 'అనుభవజ్ఞుడైన జర్నలిస్ట్, తెలుగు మీడియాలో పదేళ్ళకు పైగా అనుభవం.'}</p>

              <div className="flex items-center justify-center sm:justify-start gap-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>2018 నుండి సేవలు</span>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: `${reporter.nameTe || reporter.name} - జనతా వాణి విలేఖరి`, url: window.location.href }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('రిపోర్టర్ ప్రొఫైల్ లింక్ కాపీ చేయబడింది!');
                      }
                    }}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-blue-500/20 flex items-center justify-center transition-colors cursor-pointer"
                    title="ప్రొఫైల్ షేర్ చేయండి"
                  >
                    <Share2 className="w-4 h-4 text-blue-400" />
                  </button>
                  {reporter.email && (
                    <a href={`mailto:${reporter.email}`}
                      className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-500/20 flex items-center justify-center transition-colors">
                      <Mail className="w-4 h-4 text-red-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex sm:flex-col gap-4 sm:gap-3">
              <div className="bg-white/10 rounded-2xl p-4 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-white">{reporter.articlesCount || reporterArticles.length}</div>
                <div className="text-slate-400 text-xs">కథనాలు</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-slate-400 text-xs">అవార్డులు</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            {reporter.nameTe || reporter.name} రాసిన కథనాలు
          </h2>
          <span className="text-slate-400 text-sm">{reporterArticles.length} కథనాలు</span>
        </div>

        {reporterArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {reporterArticles.map(article => (
              <ArticleCard key={article.id} article={article} variant="compact" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <ExternalLink className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400">ఈ రిపోర్టర్ యొక్క కథనాలు అందుబాటులో లేవు</p>
          </div>
        )}
      </div>
    </div>
  );
};
