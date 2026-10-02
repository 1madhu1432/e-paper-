import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@publicmood.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email === 'admin@publicmood.com' && password === 'admin123') {
        localStorage.setItem('pm_admin_auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials. Use admin@publicmood.com / admin123');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 selection:bg-amber-500 selection:text-slate-950 font-sans">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Website</span>
        </Link>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6 text-white">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-[#0b1d3a] rounded-xl border border-blue-800 shadow-md">
              <img
                src="/public-mood-logo.jpg"
                alt="Public Mood Logo"
                className="h-10 w-auto bg-white p-0.5 rounded"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </div>
            <h1 className="text-2xl font-black font-serif text-white tracking-tight">Public Mood Admin CMS</h1>
            <p className="text-xs text-slate-400">Sign in to manage E-Papers, States, Sub-Editions, News &amp; Analytics</p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Demo Admin Environment</span>
              </span>
            </div>
          </div>

          {/* Quick Demo Credentials Box */}
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl text-xs space-y-2">
            <div className="font-bold text-amber-400 flex items-center justify-between">
              <span>Demo Login Credentials</span>
              <span className="text-[10px] text-slate-400 font-mono">Frontend Only</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">Email</span>
                <span className="text-white font-bold">admin@publicmood.com</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Password</span>
                <span className="text-white font-bold">admin123</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-950/80 border border-red-800 text-red-300 p-3 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Admin Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Authenticating...' : 'SIGN IN TO ADMIN CMS'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
