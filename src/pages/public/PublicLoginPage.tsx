import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Phone, Mail, Lock, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Newspaper } from 'lucide-react';

export const PublicLoginPage: React.FC = () => {
  const { loginReader, loginAs, setRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  
  // Form fields
  const [phoneNumber, setPhoneNumber] = useState('9848012345');
  const [otp, setOtp] = useState('123456');
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('reader@publicmood.com');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('శ్రీకాంత్ వర్మ');
  const [district, setDistrict] = useState('హైదరాబాద్ (Hyderabad)');
  
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('దయచేసి సరైన 10 అంకెల మొబైల్ నంబరును నమోదు చేయండి.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setSuccessMsg('OTP విజయవంతంగా పంపబడింది! (డెమో OTP: 123456)');
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (loginMethod === 'phone') {
        loginReader(fullName || 'పాఠకుడు', phoneNumber, district);
      } else {
        loginReader(fullName || email.split('@')[0], email, district);
      }
      setIsLoading(false);
      navigate('/');
    }, 600);
  };

  const handleDemoReaderLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginReader('రవి తేజ (పాఠకుడు)', '9848099887', 'హైదరాబాద్');
      setIsLoading(false);
      navigate('/');
    }, 400);
  };

  const DISTRICTS = [
    'హైదరాబాద్ (Hyderabad)',
    'విజయవాడ (Vijayawada)',
    'విశాఖపట్నం (Visakhapatnam)',
    'వరంగల్ (Warangal)',
    'కరీంనగర్ (Karimnagar)',
    'తిరుపతి (Tirupati)',
    'గుంటూరు (Guntur)',
    'ఖమ్మం (Khammam)',
    'నిజామాబాద్ (Nizamabad)',
    'కర్నూలు (Kurnool)'
  ];

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-slate-50 via-white to-red-50/20 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-telugu">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        {/* Header Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white text-red-600 rounded-2xl shadow-md mb-3 font-black text-2xl">
            ప
          </div>
          <h2 className="text-2xl font-black">పబ్లిక్ మూడ్</h2>
          <p className="text-xs text-red-100 mt-1 font-sans">PUBLIC MOOD • పాఠకుల ఖాతా ప్రవేశం</p>

          {/* Tab Switcher */}
          <div className="flex bg-black/20 p-1 rounded-xl mt-5 text-xs font-bold">
            <button
              onClick={() => { setActiveTab('login'); setOtpSent(false); }}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'login' ? 'bg-white text-red-600 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              లాగిన్ (Sign In)
            </button>
            <button
              onClick={() => { setActiveTab('register'); setOtpSent(false); }}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'register' ? 'bg-white text-red-600 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              కొత్త ఖాతా (Register)
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Quick 1-Click Demo Reader Login */}
          <button
            type="button"
            onClick={handleDemoReaderLogin}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>1-క్లిక్ డెమో రీడర్ లాగిన్ (Instant Reader Access)</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              లేదా
            </span>
          </div>

          {/* Login / Register Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            {activeTab === 'register' && (
              <div>
                <label className="block text-slate-700 font-semibold mb-1">మీ పూర్తి పేరు</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="ఉదా: శ్రీకాంత్ శర్మ"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Toggle between Phone & Email */}
            <div className="flex gap-2 pb-1">
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 py-1.5 px-3 rounded-lg border text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                  loginMethod === 'phone'
                    ? 'border-red-600 bg-red-50 text-red-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Phone className="w-3.5 h-3.5" /> మొబైల్ OTP
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-1.5 px-3 rounded-lg border text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                  loginMethod === 'email'
                    ? 'border-red-600 bg-red-50 text-red-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Mail className="w-3.5 h-3.5" /> ఈమెయిల్
              </button>
            </div>

            {loginMethod === 'phone' ? (
              <>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">మొబైల్ నంబరు</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-sans font-bold text-xs">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="98480 12345"
                        className="w-full pl-12 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 font-sans text-xs transition-colors"
                      />
                    </div>
                    {!otpSent && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
                      >
                        OTP పంపండి
                      </button>
                    )}
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-slate-700 font-semibold">నమోదు చేయాల్సిన OTP</label>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-[11px] text-red-600 hover:underline"
                      >
                        మళ్ళీ పంపండి
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 font-sans text-xs tracking-widest text-center font-bold transition-colors"
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">ఈమెయిల్ అడ్రస్</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="reader@publicmood.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 text-xs transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">పాస్‌వర్డ్</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 text-xs transition-colors"
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'register' && (
              <div>
                <label className="block text-slate-700 font-semibold mb-1">ప్రాధాన్యత గల జిల్లా / ప్రాంతం</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 text-xs cursor-pointer"
                >
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>ప్రాసెస్ అవుతోంది...</span>
              ) : (
                <>
                  <span>{activeTab === 'login' ? 'లాగిన్ అవ్వండి (Sign In)' : 'ఖాతా తెరవండి (Create Account)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Reader Perks */}
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1.5 text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>వార్తలను బుక్‌మార్క్ & సేవ్ చేసుకోండి</span>
            </div>
            <div className="flex items-center gap-2">
              <Newspaper className="w-3.5 h-3.5 text-indigo-600" />
              <span>ఈ-పేపర్ ఎడిషన్లను డౌన్‌లోడ్ చేసుకోండి</span>
            </div>
          </div>

          {/* Newsroom Staff CMS Portal Link */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 mb-2">మీరు జర్నలిస్ట్ లేదా ఎడిటరా?</p>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-red-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors"
            >
              <span>న్యూస్‌రూమ్ అడ్మిన్ CMS ప్రవేశం →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
