import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Bookmark,
  Settings,
  LogOut,
  Edit2,
  Award,
  Eye,
  Clock,
  ChevronRight,
  Star,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSavedArticles } from '../../context/SavedArticlesContext';
import { useNotifications } from '../../context/NotificationContext';

export const ProfilePage: React.FC = () => {
  const { currentUser, currentRole, logout } = useAuth();
  const navigate = useNavigate();
  const { savedArticles } = useSavedArticles();
  const { unreadCount } = useNotifications();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [district, setDistrict] = useState('హైదరాబాద్');
  const [savedEdit, setSavedEdit] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    setSavedEdit(true);
    setTimeout(() => setSavedEdit(false), 2000);
  };

  const PREFERENCES = [
    { label: 'తెలంగాణ వార్తలు', active: true },
    { label: 'రాజకీయాలు', active: true },
    { label: 'ఉద్యోగ నోటిఫికేషన్లు', active: true },
    { label: 'సినిమా', active: false },
    { label: 'క్రీడలు', active: false },
    { label: 'వ్యాపారం', active: true },
  ];

  const QUICK_LINKS = [
    { to: '/saved', icon: Bookmark, label: 'సేవ్ చేసిన వార్తలు', meta: `${savedArticles.length} వార్తలు` },
    { to: '/notifications', icon: Bell, label: 'నోటిఫికేషన్లు', meta: unreadCount > 0 ? `${unreadCount} కొత్తవి` : 'అప్‌టు డేట్' },
    { to: '/newsletter', icon: Mail, label: 'న్యూస్‌లెటర్', meta: 'చందా పొందండి' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 pt-8 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white/20 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
                {currentRole !== 'Reader' && (
                  <span className="text-[10px] font-black bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> {currentRole}
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm">{currentUser.email}</p>
              <p className="text-slate-500 text-xs mt-0.5 font-telugu">
                {currentRole === 'Super Admin' ? 'న్యూస్‌రూమ్ అడ్మినిస్ట్రేటర్' :
                 currentRole === 'Editor' ? 'సీనియర్ ఎడిటర్, జనతా వాణి' :
                 currentRole === 'Reporter' ? 'విలేఖరి, జనతా వాణి' :
                 'నమోదైన పాఠకుడు'}
              </p>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className="ml-auto p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-colors cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: 'సేవ్ చేసిన వార్తలు', value: savedArticles.length, icon: Bookmark },
              { label: 'చదివిన నిమిషాలు', value: '142', icon: Clock },
              { label: 'నోటిఫికేషన్లు', value: unreadCount, icon: Bell },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
                <stat.icon className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <p className="text-xl font-black text-white">{stat.value}</p>
                <p className="text-[10px] text-slate-400 font-telugu leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body (pulled up with negative margin) */}
      <div className="max-w-3xl mx-auto px-4 -mt-8 pb-12 space-y-4">
        {/* Success Toast */}
        {savedEdit && (
          <div className="bg-emerald-600 text-white p-3 rounded-xl text-xs font-bold text-center shadow-lg animate-in fade-in">
            ✓ ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది!
          </div>
        )}

        {/* Guest Reader Login Prompt */}
        {currentUser.id === 'guest-reader' && (
          <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
            <div>
              <p className="text-sm font-bold font-telugu">మీరు అతిథిగా ఉన్నారు (Guest Reader)</p>
              <p className="text-xs text-white/90 font-telugu mt-0.5">పూర్తి సదుపాయాలు పొందడానికి మీ మొబైల్ లేదా ఈమెయిల్‌తో లాగిన్ అవ్వండి.</p>
            </div>
            <Link
              to="/login"
              className="px-4 py-2 bg-white hover:bg-slate-100 text-red-600 font-bold text-xs rounded-xl transition-colors shadow-sm shrink-0"
            >
              లాగిన్ / సైన్ అప్ →
            </Link>
          </div>
        )}

        {/* Edit Profile Form */}
        {editMode ? (
          <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-3 font-telugu">ప్రొఫైల్ నవీకరించండి</h3>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">పేరు (Name)</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">ఫోన్ నంబర్</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">జిల్లా (District)</label>
              <select
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500"
              >
                {['హైదరాబాద్', 'విజయవాడ', 'విశాఖపట్నం', 'వరంగల్', 'గుంటూరు', 'తిరుపతి', 'కరీంనగర్'].map(d => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                సేవ్ చేయి
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
              >
                రద్దు చేయి
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-3 font-telugu">ప్రొఫైల్ వివరాలు</h3>
            {[
              { icon: Mail, label: 'ఈమెయిల్', value: currentUser.email },
              { icon: Phone, label: 'ఫోన్', value: phone },
              { icon: MapPin, label: 'జిల్లా', value: district },
              { icon: Award, label: 'హోదా', value: currentRole },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 py-1.5">
                <item.icon className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-[11px] text-slate-400 font-telugu">{item.label}</p>
                  <p className="text-sm font-medium text-slate-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Links */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <h3 className="text-sm font-bold text-slate-900 px-5 pt-4 pb-3 border-b font-telugu">శీఘ్ర అనుసంధానాలు</h3>
          {QUICK_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                <link.icon className="w-4 h-4 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800 font-telugu">{link.label}</p>
                <p className="text-[11px] text-slate-400">{link.meta}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-red-500 transition-colors" />
            </Link>
          ))}
        </div>

        {/* News Preferences */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-3 mb-4 font-telugu">వార్తా ప్రాధాన్యతలు</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {PREFERENCES.map(pref => (
              <label key={pref.label} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:border-red-200 transition-colors">
                <input
                  type="checkbox"
                  defaultChecked={pref.active}
                  className="rounded text-red-600 focus:ring-0"
                />
                <span className="text-xs font-medium text-slate-700 font-telugu">{pref.label}</span>
              </label>
            ))}
          </div>
          <button 
            type="button"
            onClick={() => {
              setSavedEdit(true);
              setTimeout(() => setSavedEdit(false), 2500);
            }}
            className="mt-4 w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ప్రాధాన్యతలు సేవ్ చేయి
          </button>
        </div>

        {/* Admin Shortcut (only if logged in with role) */}
        {currentRole !== 'Reader' && (
          <Link
            to="/admin"
            className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-red-950 rounded-2xl p-4 text-white border border-white/5 hover:opacity-90 transition-opacity"
          >
            <div>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">న్యూస్‌రూమ్ CMS</p>
              <p className="text-sm font-bold mt-0.5">అడ్మిన్ డాష్‌బోర్డ్ వెళ్లండి</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/50" />
          </Link>
        )}

        {/* Sign Out */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <button 
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-rose-600 text-sm font-bold hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>సైన్ అవుట్ (Sign Out)</span>
          </button>
          <p className="text-center text-[10px] text-slate-400 mt-2">
            ఇది డెమో ఖాతా నుండి సైన్ అవుట్ చేస్తుంది.
          </p>
        </div>
      </div>
    </div>
  );
};
