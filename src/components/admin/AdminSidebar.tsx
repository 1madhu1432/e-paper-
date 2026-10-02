import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Newspaper, MapPin, Archive, FileText, BarChart3, Settings, LogOut, ChevronDown, ChevronRight, X
} from 'lucide-react';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [epaperOpen, setEpaperOpen] = useState(true);
  const [locationsOpen, setLocationsOpen] = useState(true);
  const [newsOpen, setNewsOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('pm_admin_auth');
    navigate('/admin/login');
  };

  return (
    <aside className="h-full bg-[#0b1d3a] text-white flex flex-col justify-between border-r border-slate-800 font-sans">
      {/* Sidebar Header */}
      <div>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <img
              src="/public-mood-logo.jpg"
              alt="Public Mood Logo"
              className="h-9 w-auto bg-white p-0.5 rounded"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
            <div>
              <span className="font-extrabold text-base font-serif text-white block leading-none">PUBLIC MOOD</span>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">CMS &amp; Admin</span>
            </div>
          </Link>
          {onCloseMobile && (
            <button onClick={onCloseMobile} className="lg:hidden text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] text-xs font-semibold">
          {/* Dashboard */}
          <Link
            to="/admin/dashboard"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
              isActive('/admin/dashboard') || isActive('/admin')
                ? 'bg-[#1e40af] text-white font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-amber-400" />
            <span>Dashboard</span>
          </Link>

          {/* E-Paper Submenu */}
          <div>
            <button
              onClick={() => setEpaperOpen(!epaperOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <div className="flex items-center gap-3">
                <Newspaper className="w-4 h-4 text-amber-400" />
                <span>E-Paper</span>
              </div>
              {epaperOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {epaperOpen && (
              <div className="ml-7 pl-2 border-l border-slate-700 space-y-1 my-1">
                <Link
                  to="/admin/epapers"
                  onClick={onCloseMobile}
                  className={`block px-3 py-1.5 rounded transition ${
                    isActive('/admin/epapers') ? 'bg-[#1e40af]/40 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All E-Papers
                </Link>
                <Link
                  to="/admin/epapers/create"
                  onClick={onCloseMobile}
                  className={`block px-3 py-1.5 rounded transition ${
                    isActive('/admin/epapers/create') ? 'bg-[#1e40af]/40 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Create E-Paper
                </Link>
              </div>
            )}
          </div>

          {/* Locations Submenu */}
          <div>
            <button
              onClick={() => setLocationsOpen(!locationsOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Locations</span>
              </div>
              {locationsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {locationsOpen && (
              <div className="ml-7 pl-2 border-l border-slate-700 space-y-1 my-1">
                <Link
                  to="/admin/states"
                  onClick={onCloseMobile}
                  className={`block px-3 py-1.5 rounded transition ${
                    isActive('/admin/states') ? 'bg-[#1e40af]/40 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  States
                </Link>
                <Link
                  to="/admin/sub-editions"
                  onClick={onCloseMobile}
                  className={`block px-3 py-1.5 rounded transition ${
                    isActive('/admin/sub-editions') ? 'bg-[#1e40af]/40 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sub Editions
                </Link>
                <Link
                  to="/admin/editions"
                  onClick={onCloseMobile}
                  className={`block px-3 py-1.5 rounded transition ${
                    isActive('/admin/editions') ? 'bg-[#1e40af]/40 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Editions
                </Link>
              </div>
            )}
          </div>

          {/* Archives */}
          <Link
            to="/admin/archives"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
              isActive('/admin/archives')
                ? 'bg-[#1e40af] text-white font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Archive className="w-4 h-4 text-amber-400" />
            <span>Archives</span>
          </Link>

          {/* News Submenu */}
          <div>
            <button
              onClick={() => setNewsOpen(!newsOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>News</span>
              </div>
              {newsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {newsOpen && (
              <div className="ml-7 pl-2 border-l border-slate-700 space-y-1 my-1">
                <Link
                  to="/admin/news"
                  onClick={onCloseMobile}
                  className={`block px-3 py-1.5 rounded transition ${
                    isActive('/admin/news') ? 'bg-[#1e40af]/40 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Latest News
                </Link>
                <Link
                  to="/admin/news?filter=breaking"
                  onClick={onCloseMobile}
                  className={`block px-3 py-1.5 rounded transition text-slate-400 hover:text-white`}
                >
                  Breaking News
                </Link>
                <Link
                  to="/admin/news?filter=categories"
                  onClick={onCloseMobile}
                  className={`block px-3 py-1.5 rounded transition text-slate-400 hover:text-white`}
                >
                  Categories
                </Link>
              </div>
            )}
          </div>

          {/* Analytics */}
          <Link
            to="/admin/analytics"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
              isActive('/admin/analytics')
                ? 'bg-[#1e40af] text-white font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>Analytics</span>
          </Link>

          {/* Settings */}
          <Link
            to="/admin/settings"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
              isActive('/admin/settings')
                ? 'bg-[#1e40af] text-white font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Logout Button Footer */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-red-950/60 hover:text-red-300 transition text-xs font-bold"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          <span>Logout Admin</span>
        </button>
      </div>
    </aside>
  );
};
