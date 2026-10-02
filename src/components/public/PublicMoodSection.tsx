import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, CheckCircle2, ChevronRight, MessageSquare, TrendingUp, Sparkles, ThumbsUp } from 'lucide-react';

interface MoodOption {
  id: string;
  emoji: string;
  labelTe: string;
  labelEn: string;
  votes: number;
  color: string;
}

const STORAGE_KEY = 'jv_public_mood_vote_2026';

export const PublicMoodSection: React.FC = () => {
  const [options, setOptions] = useState<MoodOption[]>([
    { id: 'opt-1', emoji: '🌟', labelTe: 'పూర్తి ఆశాజనకం', labelEn: 'Very Positive', votes: 8420, color: 'bg-emerald-500' },
    { id: 'opt-2', emoji: '👍', labelTe: 'సంతృప్తికరం', labelEn: 'Satisfied', votes: 6130, color: 'bg-blue-500' },
    { id: 'opt-3', emoji: '⚖️', labelTe: 'సాధారణం', labelEn: 'Neutral', votes: 3240, color: 'bg-amber-500' },
    { id: 'opt-4', emoji: '⚠️', labelTe: 'మరింత నిధులు కేటాయించాలి', labelEn: 'Needs Improvement', votes: 4180, color: 'bg-rose-500' },
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [justVotedMsg, setJustVotedMsg] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSelectedId(saved);
        setHasVoted(true);
      }
    } catch (e) {}
  }, []);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (id: string) => {
    if (hasVoted) return;
    
    setSelectedId(id);
    setHasVoted(true);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (e) {}

    setOptions(prev =>
      prev.map(opt => (opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt))
    );

    setJustVotedMsg(true);
    setTimeout(() => setJustVotedMsg(false), 4000);
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-700/60 relative overflow-hidden font-telugu my-8">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-700/60 gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full font-sans uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              LIVE PULSE
            </span>
            <span className="text-[11px] text-amber-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> ప్రజా మూడ్ (Public Mood)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            నేటి ప్రజాభిప్రాయం: రాష్ట్ర బడ్జెట్ కేటాయింపులపై మీ తీర్పు?
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            నిజమైన ప్రజా తీర్పు • మీ అభిప్రాయాన్ని నమోదు చేసి ఫలితాలు ప్రత్యక్షంగా వీక్షించండి.
          </p>
        </div>

        <Link
          to="/polls"
          className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl border border-white/20 transition-all shrink-0 cursor-pointer"
        >
          <BarChart3 className="w-4 h-4 text-amber-300" />
          <span>అన్ని పోల్స్ చూడండి</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Thank you feedback banner */}
      {justVotedMsg && (
        <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>మీ విలువైన ఓటు నమోదయింది! ప్రజా మూడ్ ఫలితాలు క్రింద చూడండి.</span>
        </div>
      )}

      {/* Voting & Sentiment Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5 relative z-10">
        {options.map((opt) => {
          const percent = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
          const isSelected = selectedId === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              disabled={hasVoted}
              className={`w-full text-left p-4 rounded-2xl border transition-all relative overflow-hidden group cursor-pointer ${
                isSelected
                  ? 'bg-white/15 border-red-500 ring-2 ring-red-500/50 shadow-lg'
                  : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              {/* Animated Progress Bar fill */}
              <div
                className={`absolute left-0 top-0 bottom-0 opacity-20 transition-all duration-700 ease-out ${opt.color}`}
                style={{ width: `${percent}%` }}
              />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{opt.emoji}</span>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {opt.labelTe}
                    </p>
                    <p className="text-[10px] text-slate-400 font-sans">{opt.labelEn}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-base font-black text-amber-300 font-sans">{percent}%</p>
                  <p className="text-[10px] text-slate-400 font-sans">{opt.votes.toLocaleString()} ఓట్లు</p>
                </div>
              </div>

              {isSelected && (
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3 h-3" /> మీ ఎంపిక
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info & Engagement */}
      <div className="mt-5 pt-3 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 relative z-10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <ThumbsUp className="w-3.5 h-3.5 text-red-400" /> మొత్తం పోలైన ఓట్లు:{' '}
            <strong className="text-white font-sans">{totalVotes.toLocaleString()}</strong>
          </span>
          <span>•</span>
          <span className="text-slate-300">గడువు: నేటి అర్ధరాత్రి వరకు</span>
        </div>

        <div className="flex items-center gap-2">
          {!hasVoted ? (
            <span className="text-amber-300 font-bold text-[11px]">👆 మీ అభిప్రాయాన్ని తెలపడానికి పైన క్లిక్ చేయండి</span>
          ) : (
            <span className="text-emerald-400 font-bold text-[11px]">✓ మీ ఓటు విజయవంతంగా నమోదైంది</span>
          )}
        </div>
      </div>
    </section>
  );
};
