import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Video, 
  Camera, 
  Share2, 
  Globe, 
  MessageCircle, 
  Send, 
  FileText, 
  AlertCircle, 
  ShieldCheck, 
  Heart,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-16 lg:pb-12 border-t-4 border-red-600 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-black text-red-500 font-telugu">పబ్లిక్ మూడ్</span>
              <span className="block text-xs font-bold uppercase tracking-widest text-slate-400">PUBLIC MOOD</span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-telugu max-w-md">
              పబ్లిక్ మూడ్ - రెండు తెలుగు రాష్ట్రాల ప్రజల విశ్వసనీయ సమాచార వేదిక. రాజకీయ, సామాజిక, నేర, క్రీడా, ఉద్యోగ, వినోద వార్తలను నిక్కచ్చిగా, నిష్పక్షపాతంగా మీ ముంగిటకు చేర్చుతోంది.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>పబ్లిక్ మూడ్ మీడియా భవన్, బంజారా హిల్స్ రోడ్ నం. 12, హైదరాబాద్ - 500034</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>editor@publicmood.com | ads@publicmood.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>+91 040-23456789 / +91 98480 11223</span>
              </p>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">సోషల్ మీడియాలో ఫాలో అవ్వండి</p>
              <div className="flex items-center gap-2.5">
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-colors" title="YouTube">
                  <Video className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-pink-600/20 text-pink-500 hover:bg-pink-600 hover:text-white rounded-lg transition-colors" title="Instagram">
                  <Camera className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-blue-600/20 text-blue-500 hover:bg-blue-600 hover:text-white rounded-lg transition-colors" title="Facebook">
                  <Share2 className="w-4 h-4" />
                </a>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 text-slate-300 hover:bg-white hover:text-black rounded-lg transition-colors" title="X (Twitter)">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="p-2 bg-emerald-600/20 text-emerald-500 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors" title="WhatsApp Channel">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href="https://telegram.org" target="_blank" rel="noreferrer" className="p-2 bg-sky-600/20 text-sky-400 hover:bg-sky-600 hover:text-white rounded-lg transition-colors" title="Telegram">
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Categories Col 1 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 border-l-2 border-red-600 pl-2">
              ప్రధాన విభాగాలు
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {CATEGORIES.slice(0, 6).map(c => (
                <li key={c.id}>
                  <Link to={`/${c.slug}`} className="hover:text-red-400 transition-colors">
                    {c.nameTe}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Col 2 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 border-l-2 border-red-600 pl-2">
              మరిన్ని విభాగాలు
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {CATEGORIES.slice(6, 12).map(c => (
                <li key={c.id}>
                  <Link to={`/${c.slug}`} className="hover:text-red-400 transition-colors">
                    {c.nameTe}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/videos" className="text-amber-400 hover:underline">
                  ప్రత్యేక వీడియోలు
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful links & Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 border-l-2 border-red-600 pl-2">
              ముఖ్యమైన లింకులు
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/epaper" className="flex items-center gap-1.5 text-amber-300 hover:underline">
                  <FileText className="w-3.5 h-3.5" /> నేటి ఈ-పేపర్
                </Link>
              </li>
              <li>
                <Link to="/report-news" className="flex items-center gap-1.5 text-rose-400 hover:underline font-bold">
                  <AlertCircle className="w-3.5 h-3.5" /> వార్త పంపండి (Citizen Tip)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-red-400 transition-colors">
                  మా గురించి (About Us)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-400 transition-colors">
                  సంప్రదించండి (Contact)
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-red-400 transition-colors">
                  గోప్యతా విధానం (Privacy)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-red-400 transition-colors">
                  నిబంధనలు (Terms & Conditions)
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> న్యూస్‌రూమ్ CMS లాగిన్
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} పబ్లిక్ మూడ్ (Public Mood Digital Network). సర్వ హక్కులు ప్రత్యేకించబడ్డాయి.</p>
          <div className="flex items-center gap-4">
            <span>RNI Regd. No. TEL/2026/89402</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              తెలుగు ప్రజల కోసం <Heart className="w-3 h-3 text-red-500 fill-red-500" /> తో రూపొందించబడింది
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
