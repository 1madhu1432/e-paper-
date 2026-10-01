import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Search, 
  FileText, 
  Bell, 
  Bookmark, 
  User as UserIcon, 
  Video, 
  Share2, 
  TrendingUp, 
  Menu, 
  X,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { RoleSwitcher } from './RoleSwitcher';
import { useNotifications } from '../../context/NotificationContext';
import { useSavedArticles } from '../../context/SavedArticlesContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const { savedIds } = useSavedArticles();
  const { currentUser, isEditor, isReporter, isSuperAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setProfileMenuOpen(false);
        setNotifDropdownOpen(false);
        setShowSearchInput(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchInput(false);
      setSearchQuery('');
    }
  };

  // Telugu Date representation
  const today = new Date();
  const daysTe = ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];
  const monthsTe = ['జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జూలై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్'];
  const formattedTeluguDate = `${today.getDate()} ${monthsTe[today.getMonth()]}, ${today.getFullYear()} | ${daysTe[today.getDay()]}`;

  return (
    <header className="w-full bg-white sticky top-0 z-40 shadow-sm">
      {/* Top Utility Bar (Desktop) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs font-medium">
            <span className="text-amber-400 font-semibold">{formattedTeluguDate}</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <div className="hidden lg:flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" /> సెన్సెక్స్: 84,950 (+310)
              </span>
              <span>బంగారం 24K: ₹82,450/10g</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/report-news"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-red-600/90 hover:bg-red-600 text-white px-2 py-0.5 rounded font-bold transition-colors"
            >
              <AlertCircle className="w-3 h-3" /> వార్త పంపండి (Citizen Reporting)
            </Link>

            <Link
              to="/epaper"
              className="hidden md:inline-flex items-center gap-1 text-slate-300 hover:text-amber-300 font-medium"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" /> ఈ-పేపర్
            </Link>

            <div className="h-3 w-px bg-slate-700 hidden sm:block" />

            {/* Demo Role Switcher */}
            <RoleSwitcher />
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 flex items-center justify-between">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 -ml-2 text-slate-700 hover:text-red-600"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="flex flex-col items-center sm:items-start group">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-red-600 drop-shadow-xs font-telugu">
              జనతా వాణి
            </span>
            <span className="hidden sm:inline-block text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-800 font-sans border-l-2 border-slate-300 pl-2">
              JANATHA VAANI
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wide">
            విశ్వసనీయ తెలుగు డిజిటల్ వార్తా వేదిక • నిజం - నిర్భయం - నిష్పక్షపాతం
          </span>
        </Link>

        {/* Right Action Icons (Desktop & Mobile) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Toggle */}
          <div className="relative">
            {showSearchInput ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <button
                  type="submit"
                  className="p-1 text-slate-500 hover:text-red-600 absolute left-2 cursor-pointer"
                  title="శోధించండి"
                >
                  <Search className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="వార్తలు శోధించండి..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-44 sm:w-64 pl-8 pr-7 py-1.5 text-xs sm:text-sm bg-slate-100 border border-red-500 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <button
                  type="button"
                  onClick={() => setShowSearchInput(false)}
                  className="ml-1 text-xs text-slate-500 hover:text-slate-800 p-1 cursor-pointer"
                  title="రద్దు చేయి"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                title="Search Articles"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* E-Paper Pill Button */}
          <Link
            to="/epaper"
            className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>నేటి ఈ-పేపర్</span>
          </Link>

          {/* Saved Articles */}
          <Link
            to="/saved"
            className="relative p-2 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Saved Articles"
          >
            <Bookmark className="w-5 h-5" />
            {savedIds.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {savedIds.length}
              </span>
            )}
          </Link>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifDropdownOpen(!notifDropdownOpen);
                if (!notifDropdownOpen) markAllAsRead();
              }}
              className="relative p-2 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
              )}
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full" />
              )}
            </button>

            {notifDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 p-3 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-red-600" /> నోటిఫికేషన్లు
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">{notifications.length} తాజా సందేశాలు</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-1.5 divide-y divide-slate-50">
                    {notifications.slice(0, 6).map(n => (
                      <Link
                        key={n.id}
                        to="/notifications"
                        onClick={() => setNotifDropdownOpen(false)}
                        className="block pt-2 first:pt-0 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <p className="text-xs font-bold text-slate-900 line-clamp-1">{n.titleTe}</p>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{n.messageTe}</p>
                        <span className="text-[10px] text-red-600 font-semibold mt-1 inline-block">{n.category}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                    <Link
                      to="/notifications"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      అన్ని నోటిఫికేషన్లు చూడండి →
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Admin / Workspace Shortcut */}
          {(isEditor || isReporter || isSuperAdmin) && (
            <Link
              to={isSuperAdmin ? '/admin' : isEditor ? '/admin/editor-workspace' : '/admin/reporter-workspace'}
              className="hidden md:inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>న్యూస్‌రూమ్ CMS</span>
            </Link>
          )}

          {/* User Profile Dropdown / Trigger */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="p-0.5 rounded-full border-2 border-slate-200 hover:border-red-500 transition-colors flex items-center justify-center bg-slate-100 cursor-pointer overflow-hidden w-8 h-8"
              title={currentUser.name}
            >
              {!avatarError && currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  onError={() => setAvatarError(true)}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.name ? currentUser.name.charAt(0) : 'J'}
                </div>
              )}
            </button>

            {profileMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-2 text-slate-800 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-black bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                      {currentUser.role}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <Link
                      to="/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 font-semibold"
                    >
                      <UserIcon className="w-4 h-4 text-slate-500" /> నా ప్రొఫైల్ (My Profile)
                    </Link>

                    <Link
                      to="/saved"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 font-semibold"
                    >
                      <div className="flex items-center gap-2.5">
                        <Bookmark className="w-4 h-4 text-slate-500" /> సేవ్ చేసిన వార్తలు
                      </div>
                      {savedIds.length > 0 && (
                        <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                          {savedIds.length}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/preferences"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 font-semibold"
                    >
                      <FileText className="w-4 h-4 text-indigo-500" /> పాఠకుల ప్రాధాన్యతలు
                    </Link>

                    <Link
                      to="/notifications"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 font-semibold"
                    >
                      <div className="flex items-center gap-2.5">
                        <Bell className="w-4 h-4 text-slate-500" /> నోటిఫికేషన్లు
                      </div>
                      {unreadCount > 0 && (
                        <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                          {unreadCount}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/report-news"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-red-50 text-red-700 font-semibold"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600" /> వార్త పంపండి (Citizen Tip)
                    </Link>

                    {(isEditor || isReporter || isSuperAdmin) && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold"
                      >
                        <Sparkles className="w-4 h-4 text-amber-400" /> న్యూస్‌రూమ్ అడ్మిన్ CMS
                      </Link>
                    )}

                    <div className="pt-1 border-t border-slate-100 mt-1">
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          logout();
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 font-bold cursor-pointer text-left"
                      >
                        <X className="w-4 h-4" /> సైన్ అవుట్ (Sign Out)
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Primary Category Navigation Bar */}
      <nav className="w-full bg-[#990000] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo in sticky nav bar */}
            <Link to="/" className="font-black text-white text-lg font-telugu mr-4 shrink-0 hidden sm:block">
              జనతా వాణి
            </Link>

            {/* Horizontal Scrollable Categories */}
            <div className="flex items-center overflow-x-auto no-scrollbar py-2 sm:py-2.5 gap-1 sm:gap-2 text-xs sm:text-sm font-semibold tracking-wide">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-3 py-1 rounded-md shrink-0 transition-colors ${
                    isActive ? 'bg-black/30 text-amber-300 font-bold' : 'hover:bg-black/20 text-white'
                  }`
                }
              >
                హోమ్ (Home)
              </NavLink>

              {CATEGORIES.map(cat => (
                <NavLink
                  key={cat.id}
                  to={`/${cat.slug}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={({ isActive }) =>
                    `px-2.5 py-1 rounded-md shrink-0 transition-colors cursor-pointer ${
                      isActive ? 'bg-black/30 text-amber-300 font-bold' : 'hover:bg-black/20 text-white/95'
                    }`
                  }
                >
                  {cat.nameTe}
                </NavLink>
              ))}

              <NavLink
                to="/videos"
                className={({ isActive }) =>
                  `px-2.5 py-1 rounded-md shrink-0 transition-colors flex items-center gap-1 ${
                    isActive ? 'bg-black/30 text-amber-300 font-bold' : 'hover:bg-black/20 text-white/95'
                  }`
                }
              >
                <Video className="w-3.5 h-3.5 text-amber-300" />
                <span>వీడియోలు</span>
              </NavLink>

              <NavLink
                to="/epaper"
                className={({ isActive }) =>
                  `px-2.5 py-1 rounded-md shrink-0 transition-colors flex items-center gap-1 ${
                    isActive ? 'bg-black/30 text-amber-300 font-bold' : 'hover:bg-black/20 text-white/95'
                  }`
                }
              >
                <FileText className="w-3.5 h-3.5 text-amber-300" />
                <span>ఈ-పేపర్</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-2xl font-black text-red-600 font-telugu">జనతా వాణి</h3>
                  <p className="text-[10px] text-slate-500 font-sans tracking-widest uppercase">JANATHA VAANI</p>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-500 hover:text-slate-800">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Demo user badge in mobile menu */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">ప్రస్తుత డెమో ఖాతా</p>
                  <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                  <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold">{currentUser.role}</span>
                </div>
                <RoleSwitcher />
              </div>

              {/* Mobile Quick Links */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Link
                  to="/epaper"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 bg-red-50 text-red-700 rounded-lg text-xs font-bold"
                >
                  <FileText className="w-4 h-4" /> నేటి ఈ-పేపర్
                </Link>
                <Link
                  to="/report-news"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 bg-amber-50 text-amber-800 rounded-lg text-xs font-bold"
                >
                  <AlertCircle className="w-4 h-4" /> వార్త పంపండి
                </Link>
              </div>

              {/* Categories Navigation */}
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">విభాగాలు (Categories)</p>
              <div className="space-y-1">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-100 rounded-lg"
                >
                  హోమ్‌పేజీ (Home)
                </Link>
                {CATEGORIES.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-red-600 rounded-lg transition-colors"
                  >
                    {cat.nameTe} ({cat.name})
                  </Link>
                ))}
                <Link
                  to="/videos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-red-600 rounded-lg transition-colors"
                >
                  వీడియోలు (Videos)
                </Link>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-amber-300 py-2.5 rounded-lg font-bold"
              >
                <Sparkles className="w-4 h-4 text-amber-400" /> అడ్మిన్ & న్యూస్‌రూమ్
              </Link>
              <div className="flex justify-around pt-2 text-[11px]">
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>మా గురించి</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>సంప్రదించండి</Link>
                <Link to="/privacy" onClick={() => setMobileMenuOpen(false)}>ప్రైవసీ</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
