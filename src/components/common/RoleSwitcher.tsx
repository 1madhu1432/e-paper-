import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { ShieldCheck, UserCheck, Edit3, Share2, Eye, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setRole, currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const roles: { role: Role; label: string; icon: any; color: string; path: string }[] = [
    { role: 'Reader', label: 'Public Mode (ప్రజా మోడ్ - పాఠకుడు)', icon: Eye, color: 'bg-emerald-600 text-white', path: '/' },
    { role: 'Super Admin', label: 'Super Admin (పూర్తి యాక్సెస్)', icon: ShieldCheck, color: 'bg-red-600 text-white', path: '/admin' },
    { role: 'Editor', label: 'Editor (సమీక్ష & ఆమోదం)', icon: Edit3, color: 'bg-indigo-600 text-white', path: '/admin/editor-workspace' },
    { role: 'Reporter', label: 'Reporter (కథనాలు రాయడం)', icon: UserCheck, color: 'bg-amber-600 text-white', path: '/admin/reporter-workspace' },
    { role: 'Social Media Manager', label: 'Social Media Manager', icon: Share2, color: 'bg-pink-600 text-white', path: '/admin/social' },
  ];

  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-900 text-amber-300 border border-amber-400/40 shadow-sm hover:bg-slate-800 transition-colors cursor-pointer"
        title="Switch Mode / Role"
      >
        <span className={`w-2 h-2 rounded-full ${currentRole === 'Reader' ? 'bg-emerald-400' : 'bg-red-500 animate-pulse'}`} />
        <span className="hidden sm:inline text-slate-300">మోడ్:</span>
        <span className="font-bold text-white">
          {currentRole === 'Reader' ? 'పబ్లిక్ (Public Mode)' : currentRole}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white shadow-2xl border border-slate-200 z-50 p-2 text-slate-900 animate-in fade-in slide-in-from-top-2">
            <div className="px-3 py-2 border-b border-slate-100 mb-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">డెమో రోల్ మార్చుకోండి</p>
              <p className="text-xs font-semibold text-slate-700 mt-0.5 truncate">{currentUser.name}</p>
            </div>

            <div className="space-y-1">
              {roles.map(r => {
                const Icon = r.icon;
                const isCurrent = currentRole === r.role;
                return (
                  <button
                    key={r.role}
                    onClick={() => {
                      setRole(r.role);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg font-medium transition-colors ${
                      isCurrent
                        ? 'bg-red-50 text-red-700 font-bold border border-red-200'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`p-1 rounded ${r.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span>{r.label}</span>
                    </div>
                    {isCurrent && <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded">Active</span>}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 px-2">
              <Link
                to={location.pathname.startsWith('/admin') ? '/' : '/admin'}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 font-bold text-red-600 hover:underline"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                {location.pathname.startsWith('/admin') ? 'వెబ్‌సైట్‌కు వెళ్లండి' : 'అడ్మిన్ డ్యాష్‌బోర్డ్'}
              </Link>
              <span>Janatha Vaani Demo</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
