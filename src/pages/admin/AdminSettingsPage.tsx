import React, { useState } from 'react';
import {
  Settings,
  Save,
  Globe,
  Share2,
  Lock,
  Search,
  CheckCircle,
  Database,
  Sparkles,
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [siteName, setSiteName] = useState('JANATHA VAANI');
  const [siteNameTe, setSiteNameTe] = useState('జనతా వాణి');
  const [tagline, setTagline] = useState('సత్యం - స్పష్టత - ప్రజా స్వరం');
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [contactEmail, setContactEmail] = useState('editor@janathavaani.com');
  const [whatsappChannel, setWhatsappChannel] = useState('https://whatsapp.com/channel/janathavaani');
  const [youtubeChannel, setYoutubeChannel] = useState('https://youtube.com/@janathavaaninews');
  const [analyticsId, setAnalyticsId] = useState('G-JVNEWS2024');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold font-telugu text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-red-600" />
            సిస్టమ్ & పోర్టల్ సెట్టింగ్‌లు (System Settings)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            వెబ్‌సైట్ కాన్ఫిగరేషన్, సోషల్ మీడియా లింకులు మరియు సెక్యూరిటీ రూల్స్
          </p>
        </div>

        <button
          form="settings-form"
          type="submit"
          className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>మార్పులను సేవ్ చేయి</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle className="w-5 h-5" />
          <span>పోర్టల్ సెట్టింగ్‌లు విజయవంతంగా నవీకరించబడ్డాయి!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form id="settings-form" onSubmit={handleSave} className="space-y-6">
        {/* General Site Config */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-telugu border-b pb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-red-600" />
            సాధారణ పోర్టల్ వివరాలు (General Settings)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">పోర్టల్ పేరు (English)</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-telugu">పోర్టల్ పేరు (తెలుగు)</label>
              <input
                type="text"
                value={siteNameTe}
                onChange={(e) => setSiteNameTe(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-telugu font-bold text-slate-900 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1 font-telugu">టాగ్ లైన్ (Tagline)</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-telugu text-slate-800 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">సంప్రదింపు ఫోన్ నంబర్</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ఈమెయిల్ అడ్రస్</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Social Media Integrations */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-telugu border-b pb-3 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-red-600" />
            సోషల్ మీడియా & చానల్స్ (Social & Distribution)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Channel URL</label>
              <input
                type="text"
                value={whatsappChannel}
                onChange={(e) => setWhatsappChannel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Channel URL</label>
              <input
                type="text"
                value={youtubeChannel}
                onChange={(e) => setYoutubeChannel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* SEO Analytics */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-telugu border-b pb-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-red-600" />
            SEO & Google Analytics కాన్ఫిగరేషన్
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Google Analytics Measurement ID</label>
            <input
              type="text"
              value={analyticsId}
              onChange={(e) => setAnalyticsId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
