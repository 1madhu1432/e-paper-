import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { initialVisitorAnalytics, initialLiveActivity } from '../../data/analytics';
import {
  Users, Eye, BookOpen, Newspaper, MapPin, Layers, FileText, Info, ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart as RePieChart, Pie, Cell
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { states, subEditions, editions, epapers, news } = useData();

  const [timeRange, setTimeRange] = useState<'today' | '7days' | '30days' | 'all'>('7days');

  // Summary Metrics calculations
  const totalVisitors = initialVisitorAnalytics.totalVisitors;
  const todayVisitors = initialVisitorAnalytics.todayVisitors;
  const totalPageViews = initialVisitorAnalytics.pageViews;
  const todayPageViews = initialVisitorAnalytics.todayPageViews;

  const totalEPaperReaders = epapers.reduce((acc, ep) => acc + (ep.readers || 0), 0);
  const todayEPaperReaders = Math.round(totalEPaperReaders * 0.18);

  const totalNewsViews = news.reduce((acc, n) => acc + n.views, 0);
  const todayNewsViews = Math.round(totalNewsViews * 0.22);

  const statCards = [
    { title: "TOTAL VISITORS", value: totalVisitors.toLocaleString(), change: "+14%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "TODAY'S VISITORS", value: todayVisitors.toLocaleString(), change: "+8%", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "TOTAL PAGE VIEWS", value: totalPageViews.toLocaleString(), change: "+18%", icon: Eye, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "TODAY'S PAGE VIEWS", value: todayPageViews.toLocaleString(), change: "+12%", icon: Eye, color: "text-sky-600", bg: "bg-sky-50" },
    { title: "TOTAL E-PAPER READERS", value: totalEPaperReaders.toLocaleString(), change: "+24%", icon: BookOpen, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "TODAY'S E-PAPER READERS", value: todayEPaperReaders.toLocaleString(), change: "+15%", icon: BookOpen, color: "text-[#1e40af]", bg: "bg-blue-50" },
    { title: "TOTAL NEWS VIEWS", value: totalNewsViews.toLocaleString(), change: "+20%", icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "TODAY'S NEWS VIEWS", value: todayNewsViews.toLocaleString(), change: "+10%", icon: FileText, color: "text-rose-600", bg: "bg-rose-50" },
    { title: "TOTAL STATES", value: states.length, change: "Active", icon: MapPin, color: "text-cyan-600", bg: "bg-cyan-50" },
    { title: "TOTAL SUB EDITIONS", value: subEditions.length, change: "Active", icon: Layers, color: "text-teal-600", bg: "bg-teal-50" },
    { title: "TOTAL EDITIONS", value: editions.length, change: "Active", icon: Newspaper, color: "text-blue-700", bg: "bg-blue-50" },
    { title: "PUBLISHED E-PAPERS", value: epapers.length, change: "Ready", icon: Newspaper, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "TOTAL NEWS", value: news.length, change: "Published", icon: FileText, color: "text-slate-700", bg: "bg-slate-100" },
  ];

  const pieColors = ['#1e40af', '#10b981', '#f59e0b', '#8b5cf6'];

  const deviceData = [
    { name: 'Mobile', value: initialVisitorAnalytics.deviceBreakdown.mobile },
    { name: 'Desktop', value: initialVisitorAnalytics.deviceBreakdown.desktop },
    { name: 'Tablet', value: initialVisitorAnalytics.deviceBreakdown.tablet },
  ];

  const trafficData = [
    { name: 'Direct', value: initialVisitorAnalytics.trafficSources.direct },
    { name: 'Search', value: initialVisitorAnalytics.trafficSources.search },
    { name: 'Social', value: initialVisitorAnalytics.trafficSources.social },
    { name: 'Referral', value: initialVisitorAnalytics.trafficSources.referral },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0b1d3a] text-white p-6 sm:p-8 rounded-2xl border-b-4 border-amber-500 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-white">Good Evening, Admin</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Public Mood Digital E-Paper CMS &amp; Publishing Management Overview
          </p>
        </div>

        <div className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
          <Info className="w-4 h-4 text-amber-400" />
          <span>DEMO ANALYTICS (Stored Locally)</span>
        </div>
      </div>

      {/* Top Statistic Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {statCards.map((card, i) => {
          const IconComp = card.icon;
          return (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-2 hover:shadow-md transition">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="line-clamp-1">{card.title}</span>
                <div className={`p-1.5 rounded-md ${card.bg}`}>
                  <IconComp className={`w-3.5 h-3.5 ${card.color}`} />
                </div>
              </div>
              <div className="text-lg font-black text-slate-900 font-mono">
                {card.value}
              </div>
              <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                <span>{card.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Overview Chart: Daily Visitors */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold font-serif text-[#0b1d3a]">Daily Visitors Overview</h2>
            <p className="text-xs text-slate-500">Real-time daily reader traffic trend across website &amp; e-paper pages</p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-bold">
            {(['today', '7days', '30days', 'all'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1 rounded-md capitalize transition ${
                  timeRange === t ? 'bg-[#1e40af] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t === '7days' ? '7 Days' : t === '30days' ? '30 Days' : t}
              </button>
            ))}
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={initialVisitorAnalytics.dailyVisitors}>
              <defs>
                <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e40af" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1d3a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="visitors" stroke="#1e40af" strokeWidth={3} fillOpacity={1} fill="url(#visitorGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Visitor Breakdown & Traffic Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold font-serif text-[#0b1d3a]">Device Breakdown</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={deviceData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                  {deviceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-2 border-t border-slate-100">
            <div>
              <span className="text-blue-700 block">Mobile</span>
              <span className="text-slate-900">{initialVisitorAnalytics.deviceBreakdown.mobile}%</span>
            </div>
            <div>
              <span className="text-emerald-600 block">Desktop</span>
              <span className="text-slate-900">{initialVisitorAnalytics.deviceBreakdown.desktop}%</span>
            </div>
            <div>
              <span className="text-amber-500 block">Tablet</span>
              <span className="text-slate-900">{initialVisitorAnalytics.deviceBreakdown.tablet}%</span>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold font-serif text-[#0b1d3a]">Traffic Sources</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Bar dataKey="value" fill="#d97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs font-bold text-slate-500 pt-2 border-t border-slate-100">
            Direct (48%) &amp; Search (28%) remain top reader gateways
          </div>
        </div>

        {/* DEMO LIVE ACTIVITY */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-serif text-[#0b1d3a]">Demo Live Activity</h3>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
              DEMO SIMULATION
            </span>
          </div>

          <div className="space-y-3 max-h-56 overflow-y-auto">
            {initialLiveActivity.map(act => (
              <div key={act.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{act.userText}</span>
                  <span className="text-[10px] text-slate-400">{act.timeAgo}</span>
                </div>
                <div className="text-slate-600 text-[11px]">{act.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
