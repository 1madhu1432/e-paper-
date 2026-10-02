import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { Role } from '../../types';

export const AdminLoginPage: React.FC = () => {
  const { loginAs, setRole, allDemoUsers } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@publicmood.com');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<Role>('Super Admin');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setRole(selectedRole);
      loginAs(email);
      setIsLoading(false);
      navigate('/admin/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between relative z-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-900/40">
            ప
          </div>
          <div>
            <span className="text-xl font-black font-telugu text-white tracking-tight">పబ్లిక్ మూడ్</span>
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block font-sans">
              NEWSROOM CMS v2.4
            </span>
          </div>
        </Link>
        <Link
          to="/"
          className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
        >
          ← ప్రజా సైట్‌కు తిరిగి వెళ్లండి
        </Link>
      </header>

      {/* Main Form Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10 my-8">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold font-telugu text-white">న్యూస్‌రూమ్ ప్రవేశం</h1>
            <p className="text-xs text-slate-400 mt-1">జర్నలిస్టులు మరియు ఎడిటర్ల ప్రత్యేక పోర్టల్</p>
          </div>

          {/* Quick Demo Role Selector */}
          <div className="mb-6 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
            <label className="block text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> డెమో లాగిన్ రోల్ ఎంచుకోండి:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['Super Admin', 'Editor', 'Reporter', 'Social Media Manager'] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setSelectedRole(r);
                    const matchedUser = allDemoUsers.find((u) => u.role === r);
                    if (matchedUser) setEmail(matchedUser.email);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-all border ${
                    selectedRole === r
                      ? 'bg-red-600 text-white border-red-500 font-bold shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="block truncate">{r}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">ఈమెయిల్ అడ్రస్</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="user@publicmood.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">పాస్‌వర్డ్</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-800 bg-slate-950 text-red-600 focus:ring-0" />
                <span>నన్ను గుర్తుంచుకో</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('డెమో మోడ్‌లో పాస్‌వర్డ్ అవసరం లేదు.'); }} className="text-red-400 hover:underline">
                పాస్‌వర్డ్ మరిచిపోయారా?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isLoading ? (
                <span>ప్రవేశిస్తున్నారు...</span>
              ) : (
                <>
                  <span>లాగిన్ అవ్వండి ({selectedRole})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-400">
              సురక్షితమైన 256-బిట్ SSL ఎన్‌క్రిప్షన్‌తో రక్షించబడింది
            </p>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-900 relative z-10">
        © {new Date().getFullYear()} పబ్లిక్ మూడ్ (Public Mood Media Workspace). సర్వ హక్కులు ప్రత్యేకించబడ్డాయి.
      </footer>
    </div>
  );
};
