import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Newspaper, 
  Flame, 
  Star, 
  TrendingUp, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  Edit3, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  Megaphone, 
  Bell, 
  Share2, 
  MessageSquare, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  Lock, 
  Database, 
  Settings,
  ChevronRight,
  ExternalLink,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile }) => {
  const { currentRole, currentUser, isSuperAdmin, isEditor, isReporter, isSocialManager } = useAuth();

  const sections = [
    {
      title: 'MAIN',
      items: [
        { label: 'డ్యాష్‌బోర్డ్ (Dashboard)', path: '/admin', icon: LayoutDashboard, exact: true },
        { label: 'విశ్లేషణలు (Analytics)', path: '/admin/analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'CONTENT',
      items: [
        { label: 'వార్తలు (News)', path: '/admin/news', icon: Newspaper },
        { label: 'బ్రేకింగ్ న్యూస్ (Breaking)', path: '/admin/breaking', icon: Flame },
        { label: 'ఫీచర్డ్ స్టోరీస్ (Featured)', path: '/admin/featured', icon: Star },
        { label: 'ట్రెండింగ్ (Trending)', path: '/admin/trending', icon: TrendingUp },
        { label: 'వీడియోలు (Videos)', path: '/admin/videos', icon: Video },
        { label: 'మీడియా లైబ్రరీ (Media)', path: '/admin/media', icon: ImageIcon },
      ],
    },
    {
      title: 'NEWSROOM',
      items: [
        { label: 'నా కథనాలు (My Articles)', path: '/admin/reporter-workspace', icon: Edit3 },
        { label: 'పరిశీలనలో (Pending Review)', path: '/admin/pending', icon: Clock },
        { label: 'డ్రాఫ్టులు (Drafts)', path: '/admin/drafts', icon: FileText },
        { label: 'ప్రచురితమైనవి (Published)', path: '/admin/published', icon: CheckCircle },
        { label: 'ఎడిటర్ వర్క్‌స్పేస్ (Editor Desk)', path: '/admin/editor-workspace', icon: ShieldCheck },
      ],
    },
    {
      title: 'E-PAPER',
      items: [
        { label: 'ఈ-పేపర్ మేనేజ్‌మెంట్', path: '/admin/epaper', icon: FileText },
      ],
    },
    {
      title: 'MONETIZATION',
      items: [
        { label: 'ప్రకటనలు (Advertisements)', path: '/admin/advertisements', icon: Megaphone },
      ],
    },
    {
      title: 'COMMUNICATION',
      items: [
        { label: 'పుష్ నోటిఫికేషన్లు', path: '/admin/notifications', icon: Bell },
        { label: 'సోషల్ మీడియా డిస్ట్రిబ్యూషన్', path: '/admin/social', icon: Share2 },
      ],
    },
    {
      title: 'AI NEWSROOM',
      items: [
        { label: 'AI అసిస్టెంట్ (14 Tasks)', path: '/admin/ai', icon: Sparkles, badge: 'AI Pro' },
      ],
    },
    {
      title: 'USERS & COMMUNITY',
      items: [
        { label: 'వినియోగదారులు (Users)', path: '/admin/users', icon: Users },
        { label: 'రోల్స్ & అనుమతులు (Roles)', path: '/admin/roles', icon: ShieldCheck },
        { label: 'ప్రజా ఫిర్యాదులు (News Tips)', path: '/admin/news-tips', icon: AlertTriangle },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'SEO మేనేజ్‌మెంట్', path: '/admin/seo', icon: Search },
        { label: 'సెక్యూరిటీ డాష్‌బోర్డ్', path: '/admin/security', icon: Lock },
        { label: 'బ్యాకప్ మేనేజ్‌మెంట్', path: '/admin/backups', icon: Database },
        { label: 'సిస్టమ్ సెట్టింగ్‌లు', path: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-full flex flex-col justify-between border-r border-slate-800">
      {/* Brand & Mobile Close */}
      <div>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-lg">
              ప
            </div>
            <div>
              <span className="font-black text-white text-base tracking-tight font-telugu block leading-none">
                పబ్లిక్ మూడ్ CMS
              </span>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider font-sans">
                NEWSROOM v2.4
              </span>
            </div>
          </Link>

          {onCloseMobile && (
            <button onClick={onCloseMobile} className="lg:hidden p-1 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Card */}
        <div className="p-3 mx-3 my-2 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center gap-2.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
            <span className="text-[10px] bg-red-950 text-red-400 px-1.5 py-0.5 rounded font-bold border border-red-800/60">
              {currentRole}
            </span>
          </div>
        </div>

        {/* Scrollable Nav Sections */}
        <div className="px-3 py-2 overflow-y-auto max-h-[calc(100vh-190px)] space-y-4">
          {sections.map(sec => (
            <div key={sec.title}>
              <p className="px-2 text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                {sec.title}
              </p>
              <div className="space-y-0.5">
                {sec.items.map((itemAny: any) => {
                  const Icon = itemAny.icon;
                  return (
                    <NavLink
                      key={itemAny.path}
                      to={itemAny.path}
                      end={itemAny.exact}
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-red-600 text-white font-bold shadow-xs'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-white" />
                        <span className="truncate">{itemAny.label}</span>
                      </div>
                      {itemAny.badge && (
                        <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full font-black uppercase">
                          {itemAny.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Back to Public Site */}
      <div className="p-3 border-t border-slate-800">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>ప్రజా వెబ్‌సైట్ చూడండి</span>
        </Link>
      </div>
    </aside>
  );
};
