import React, { useState } from 'react';
import { Mail, CheckCircle2, BellRing, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="my-10 bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 rounded-2xl text-white p-6 sm:p-10 shadow-lg border border-slate-800">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex p-3 bg-red-600/30 text-red-400 rounded-2xl border border-red-500/30">
          <BellRing className="w-6 h-6 animate-pulse" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black font-telugu">
          పబ్లిక్ మూడ్ మార్నింగ్ న్యూస్‌లెటర్
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto font-telugu">
          ప్రతిరోజూ ఉదయం 7 గంటలకు రెండు తెలుగు రాష్ట్రాల తాజా ముఖ్యాంశాలు, ఈ-పేపర్ లింక్ మరియు ఉద్యోగ సమాచారం నేరుగా మీ ఈమెయిల్‌కు అందుకోండి.
        </p>

        {subscribed ? (
          <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-xl p-4 text-emerald-300 text-sm font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>ధన్యవాదాలు! మీ సబ్‌స్క్రిప్షన్ విజయవంతమైంది. ప్రతిరోజూ ఉదయపు బులెటిన్ మీ ఇన్‌బాక్స్‌కు చేరుతుంది.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              placeholder="మీ ఈమెయిల్ ఐడీని నమోదు చేయండి..."
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-400"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-colors shrink-0"
            >
              సబ్‌స్క్రైబ్ అవ్వండి
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-6 text-[11px] text-slate-400 pt-2">
          <span>🔒 ఎటువంటి స్పామ్ ఉండదు</span>
          <span>•</span>
          <span>ఎప్పుడైనా అన్‌సబ్‌స్క్రైబ్ చేసుకోవచ్చు</span>
          <span>•</span>
          <span>100% ఉచిత సేవ</span>
        </div>
      </div>
    </section>
  );
};
