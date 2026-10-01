import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Type, 
  MapPin, 
  Bell, 
  Bookmark, 
  Check, 
  Save, 
  ArrowLeft,
  Sliders,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useUserPreferences, FontSizeOption } from '../../context/UserPreferencesContext';
import { CATEGORIES } from '../../data/categories';

export const PreferencesPage: React.FC = () => {
  const { 
    fontSize, 
    setFontSize, 
    preferredDistrict, 
    setPreferredDistrict, 
    subscribedCategories, 
    toggleCategorySubscription, 
    notificationsEnabled, 
    setNotificationsEnabled 
  } = useUserPreferences();

  const [savedSuccess, setSavedSuccess] = useState(false);

  const districts = [
    'హైదరాబాద్ (Hyderabad)',
    'విజయవాడ (Vijayawada)',
    'విశాఖపట్నం (Visakhapatnam)',
    'వరంగల్ (Warangal)',
    'గుంటూరు (Guntur)',
    'తిరుపతి (Tirupati)',
    'కరీంనగర్ (Karimnagar)',
    'నిజామాబాద్ (Nizamabad)',
    'కర్నూలు (Kurnool)',
    'నెల్లూరు (Nellore)',
  ];

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>హోమ్‌పేజీకి తిరిగి వెళ్లండి</span>
          </Link>
          <span className="text-xs text-slate-400 font-medium">Janatha Vaani Settings</span>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-full text-[11px] font-bold text-amber-300">
              <Sliders className="w-3.5 h-3.5" /> యూజర్ సెట్టింగ్‌లు
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-telugu">
              పాఠకుల ప్రాధాన్యతలు (Preferences)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-telugu">
              మీ పఠన అనుభవాన్ని, ఫాంట్ పరిమాణాన్ని మరియు ఆసక్తుల విభాగాలను మీ ఇష్టానుసారం అనుకూలీకరించుకోండి.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-600 text-white rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
            <CheckCircle2 className="w-5 h-5" />
            <span>మీ ప్రాధాన్యతలు విజయవంతంగా భద్రపరచబడ్డాయి!</span>
          </div>
        )}

        {/* Settings Form Blocks */}
        <div className="space-y-6">
          {/* 1. Font Size Preference */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                  <Type className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-telugu">అక్షరాల పరిమాణం (Font Size)</h3>
                  <p className="text-xs text-slate-500">కథనాలు చదవడానికి మీకు అనుకూలమైన ఫాంట్ పరిమాణాన్ని ఎంచుకోండి</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { size: 'small' as FontSizeOption, label: 'చిన్నది (Small)', sample: '14px', iconText: 'A-' },
                { size: 'medium' as FontSizeOption, label: 'మధ్యస్థం (Medium)', sample: '16px', iconText: 'A' },
                { size: 'large' as FontSizeOption, label: 'పెద్దది (Large)', sample: '18px', iconText: 'A+' },
              ].map(opt => (
                <button
                  key={opt.size}
                  type="button"
                  onClick={() => setFontSize(opt.size)}
                  className={`p-4 rounded-xl border-2 text-center transition-all cursor-pointer ${
                    fontSize === opt.size
                      ? 'border-red-600 bg-red-50/50 text-red-700 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="text-xl font-black block mb-1">{opt.iconText}</span>
                  <span className="text-xs font-bold block">{opt.label}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{opt.sample}</span>
                </button>
              ))}
            </div>

            {/* Live Preview */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                లైవ్ ప్రివ్యూ:
              </span>
              <p
                className={`font-telugu text-slate-800 ${
                  fontSize === 'small' ? 'text-sm' : fontSize === 'medium' ? 'text-base' : 'text-lg'
                }`}
              >
                జనతా వాణి: రెండు తెలుగు రాష్ట్రాల తాజా రాజకీయ, సామాజిక, క్రీడా మరియు వినోద వార్తలు.
              </p>
            </div>
          </div>

          {/* 2. Primary Location / District Preference */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-telugu">ప్రధాన జిల్లా (Primary District)</h3>
                <p className="text-xs text-slate-500">మీ ప్రాంతీయ వార్తలు మరియు వాతావరణ సమాచారానికి ప్రాధాన్యత ఇవ్వబడుతుంది</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {districts.map(dist => {
                const distKey = dist.split(' ')[0];
                const isSelected = preferredDistrict.includes(distKey) || preferredDistrict === distKey;
                return (
                  <button
                    key={dist}
                    type="button"
                    onClick={() => setPreferredDistrict(distKey)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{dist}</span>
                    {isSelected && <Check className="w-4 h-4 text-red-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Subscribed Categories */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-telugu">ఇష్టమైన వర్గాలు (Topic Subscriptions)</h3>
                  <p className="text-xs text-slate-500">హోమ్‌పేజీలో మీరు ఎక్కువగా చూడాలనుకునే వార్తా విభాగాలు</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CATEGORIES.map(cat => {
                const isSub = subscribedCategories.includes(cat.slug);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategorySubscription(cat.slug)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                      isSub
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className="block font-telugu">{cat.nameTe}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{cat.name}</span>
                    </div>
                    {isSub && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Notification Alerts */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-telugu">బ్రేకింగ్ న్యూస్ పుష్ నోటిఫికేషన్లు</h3>
                <p className="text-xs text-slate-500">ముఖ్యమైన వార్తలు వెలువడిన వెంటనే బ్రౌజర్ అలర్ట్‌లు పొందండి</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                notificationsEnabled ? 'bg-red-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              రద్దు చేయి
            </Link>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>ప్రాధాన్యతలు భద్రపరచండి</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
