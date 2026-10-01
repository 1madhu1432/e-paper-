import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Users,
  Eye,
  AlertTriangle,
  Plus,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowUpRight,
  Flame,
  Bell,
  FileCheck,
  CheckCircle,
  XCircle,
  MoreVertical,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';
import { MOCK_DAILY_TRAFFIC, MOCK_CATEGORY_METRICS } from '../../data/mockAnalytics';
import { MOCK_ARTICLES } from '../../data/mockArticles';
import { MOCK_NEWS_TIPS } from '../../data/mockNewsTips';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { currentUser, currentRole } = useAuth();

  const [breakingNewsActive, setBreakingNewsActive] = useState(true);
  const [articlesList, setArticlesList] = useState(MOCK_ARTICLES.slice(0, 6));

  const stats = [
    {
      title: 'నేటి మొత్తం వీక్షణలు (Today Views)',
      value: '9,60,450',
      change: '+18.4%',
      isPositive: true,
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'లైవ్ రీడర్లు (Active Now)',
      value: '14,280',
      change: '+6.2%',
      isPositive: true,
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'మొత్తం వ్యాసాలు (Total Articles)',
      value: '52',
      change: '12 ప్రచురితం',
      isPositive: true,
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'పరిశీలించాల్సిన టిప్స్ (News Tips)',
      value: '8 పెంజింగ్',
      change: '4 అత్యవసరం',
      isPositive: false,
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> న్యూస్‌రూమ్ డాష్‌బోర్డ్
          </div>
          <h1 className="text-2xl font-bold font-telugu text-white">
            స్వాగతం, {currentUser.name}!
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            మీరు ప్రస్తుతం <span className="text-amber-400 font-bold">{currentRole}</span> హోదాలో ఉన్నారు. తాజా వార్తల వివరాలు, ట్రాఫిక్ గణాంకాలు మరియు వార్తా శీర్షికలను ఇక్కడ నిర్వహించండి.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/articles/new"
            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>క్రొత్త వార్త రాయండి</span>
          </Link>
          <Link
            to="/admin/notifications"
            className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span>నోటిఫికేషన్ పంపు</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">{stat.title}</p>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold mt-1 ${
                    stat.isPositive ? 'text-emerald-600' : 'text-amber-600'
                  }`}
                >
                  <TrendingUp className="w-3 h-3" /> {stat.change}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-telugu">లైవ్ ట్రాఫిక్ గణాంకాలు (Daily Views)</h3>
              <p className="text-xs text-slate-500">గత 14 రోజుల పాఠకుల సందర్శన సంఖ్య</p>
            </div>
            <span className="text-xs bg-slate-100 px-3 py-1 rounded-lg text-slate-600 font-semibold border border-slate-200">
              రియల్‌టైమ్ డేటా
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DAILY_TRAFFIC} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="pageViews" name="పేజీ వీక్షణలు" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Views Bar Chart (1 col) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-telugu">వర్గాల వారీగా రీడర్‌షిప్</h3>
            <p className="text-xs text-slate-500">విభాగాల ప్రజాదరణ శాతాలు</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CATEGORY_METRICS.slice(0, 5)} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis dataKey="categoryTe" type="category" tick={{ fontSize: 11 }} width={80} stroke="#475569" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="percentage" name="శాతం (%)" fill="#2563eb" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Breaking News Toggle & Action Toolbar */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-telugu">బ్రేకింగ్ న్యూస్ బ్యానర్ స్థితి</h4>
            <p className="text-xs text-slate-600">హోమ్‌పేజీ మరియు వార్తా పేజీలలో పైభాగంలో లైవ్ టిక్కర్ డిస్‌ప్లే</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${breakingNewsActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
            {breakingNewsActive ? 'ప్రస్తుతం రన్ అవుతోంది (LIVE)' : 'ఆఫ్‌లైన్‌లో ఉంది'}
          </span>
          <button
            onClick={() => setBreakingNewsActive(!breakingNewsActive)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              breakingNewsActive ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {breakingNewsActive ? 'టిక్కర్ ఆపివేయి' : 'టిక్కర్ ప్రారంభించు'}
          </button>
        </div>
      </div>

      {/* Recent Articles & Citizen News Tips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Articles Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-telugu">ఇటీవలి వార్తా వ్యాసాలు</h3>
              <p className="text-xs text-slate-500">న్యూస్‌రూమ్‌లో చివరిగా అప్‌డేట్ చేసిన కథనాలు</p>
            </div>
            <Link to="/admin/articles" className="text-xs text-red-600 hover:underline font-bold flex items-center gap-1">
              అన్నీ చూడండి <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">వార్త శీర్షిక</th>
                  <th className="py-3 px-2">వర్గం</th>
                  <th className="py-3 px-2">రచయిత</th>
                  <th className="py-3 px-2">స్థితి</th>
                  <th className="py-3 px-2 text-right">చర్యలు</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articlesList.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 max-w-xs">
                      <p className="font-bold text-slate-900 font-telugu truncate">{art.titleTe || art.title}</p>
                      <span className="text-[10px] text-slate-400">{art.publishedAt}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                        {art.category}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-medium text-slate-700">{art.authorName}</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <CheckCircle className="w-3 h-3" /> ప్రచురితం
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Link
                        to={`/admin/articles/edit/${art.id}`}
                        className="text-xs text-blue-600 font-bold hover:underline px-2 py-1 bg-blue-50 rounded"
                      >
                        ఎడిట్
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Citizen Tips Sidebar (1 col) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-telugu">ప్రజా ఫిర్యాదులు (News Tips)</h3>
              <p className="text-xs text-slate-500">సిటిజన్ రిపోర్టర్ల నుండి వచ్చిన వార్తలు</p>
            </div>
            <Link to="/admin/news-tips" className="text-xs text-red-600 font-bold hover:underline">
              అన్నీ ({MOCK_NEWS_TIPS.length})
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_NEWS_TIPS.slice(0, 4).map((tip) => (
              <div key={tip.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">
                    {tip.district}
                  </span>
                  <span className="text-[10px] text-slate-400">{tip.submittedAt}</span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 font-telugu line-clamp-1">{tip.issueType} ఫిర్యాదు</h5>
                <p className="text-[11px] text-slate-600 line-clamp-2">{tip.description}</p>
                <div className="pt-1 flex items-center justify-between border-t border-slate-200 text-[10px] text-slate-500">
                  <span>పంపినవారు: {tip.name}</span>
                  <Link to="/admin/news-tips" className="text-red-600 font-bold hover:underline">
                    పరిశీలించు →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
