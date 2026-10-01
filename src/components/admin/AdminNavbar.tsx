import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  Sparkles, 
  Flame, 
  FileText, 
  Megaphone, 
  Video, 
  CheckCircle,
  ExternalLink,
  ChevronDown,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { RoleSwitcher } from '../common/RoleSwitcher';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

interface AdminNavbarProps {
  onOpenMobileSidebar: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ onOpenMobileSidebar }) => {
  const { currentUser, currentRole, logout } = useAuth();
  const { notifications, unreadCount } = useNotifications();
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile hamburger & search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>లైవ్ సిస్టమ్ ఆన్‌లైన్</span>
          <span className="text-slate-300">|</span>
          <span>{new Date().toLocaleTimeString('te-IN', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Right: Quick Actions, Role Switcher, Notifications, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Action Button (+ New) */}
        <div className="relative">
          <button
            onClick={() => setQuickMenuOpen(!quickMenuOpen)}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">త్వరిత చర్యలు (Quick Action)</span>
            <span className="sm:hidden">రాయండి</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {quickMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setQuickMenuOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 p-2 text-slate-800 animate-in fade-in">
                <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  నూతన కంటెంట్ సృష్టించండి
                </p>
                <div className="space-y-1">
                  <Link
                    to="/admin/news/create"
                    onClick={() => setQuickMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-red-50 hover:text-red-700 rounded-lg"
                  >
                    <Plus className="w-3.5 h-3.5 text-red-600" /> కొత్త కథనం (New Article)
                  </Link>
                  <Link
                    to="/admin/ai"
                    onClick={() => setQuickMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-purple-50 hover:text-purple-700 rounded-lg"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" /> AI అసిస్టెంట్ (AI Studio)
                  </Link>
                  <Link
                    to="/admin/epaper"
                    onClick={() => setQuickMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-blue-50 hover:text-blue-700 rounded-lg"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" /> ఈ-పేపర్ అప్‌లోడ్ (EPaper)
                  </Link>
                  <Link
                    to="/admin/advertisements"
                    onClick={() => setQuickMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-amber-50 hover:text-amber-700 rounded-lg"
                  >
                    <Megaphone className="w-3.5 h-3.5 text-amber-600" /> ప్రకటన సృష్టించండి (Ad)
                  </Link>
                  <Link
                    to="/admin/videos"
                    onClick={() => setQuickMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
                  >
                    <Video className="w-3.5 h-3.5 text-emerald-600" /> వీడియో అప్‌లోడ్ (Video)
                  </Link>
                  <Link
                    to="/admin/notifications"
                    onClick={() => setQuickMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-rose-50 hover:text-rose-700 rounded-lg"
                  >
                    <Bell className="w-3.5 h-3.5 text-rose-600" /> పుష్ నోటిఫికేషన్ పంపండి
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Demo Role Switcher */}
        <RoleSwitcher />

        {/* Notifications Icon with Badge */}
        <Link
          to="/admin/notifications"
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          title="Push Notifications"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full" />
          )}
        </Link>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-slate-500 leading-tight">{currentRole}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {userDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 p-2 text-slate-800 animate-in fade-in">
                <div className="p-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                </div>
                <div className="space-y-1 text-xs">
                  <Link
                    to="/"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" /> ప్రజా వెబ్‌సైట్
                  </Link>
                  <Link
                    to="/admin/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-400" /> నా ప్రొఫైల్ & సెట్టింగ్‌లు
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" /> లాగ్ అవుట్
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
