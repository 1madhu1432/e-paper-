import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { initialVisitorAnalytics } from '../../data/analytics';
import { Article } from '../../types';
import {
  BarChart3, Users, BookOpen, FileText, MapPin, Layers,
  Search, Info, X
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart as RePieChart, Pie, Cell
} from 'recharts';

export const AdminAnalyticsPage: React.FC = () => {
  const { epapers, news, states, editions } = useData();

  const [activeTab, setActiveTab] = useState<'visitors' | 'epaper' | 'news' | 'editions' | 'pagewise'>('visitors');
  const [selectedNewsForDetail, setSelectedNewsForDetail] = useState<Article | null>(null);

  const [newsSearch, setNewsSearch] = useState('');
  const [newsCategoryFilter, setNewsCategoryFilter] = useState('All');
  const [newsSortBy, setNewsSortBy] = useState<'most' | 'least' | 'latest'>('most');

  // Filter and Sort News
  const filteredNews = news
    .filter(n => {
      const matchesCat = newsCategoryFilter === 'All' || n.category === newsCategoryFilter;
      const matchesSearch = n.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
                            (n.titleTe && n.titleTe.toLowerCase().includes(newsSearch.toLowerCase()));
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (newsSortBy === 'most') return b.views - a.views;
      if (newsSortBy === 'least') return a.views - b.views;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  // Edition-wise Performance Data
  const editionPerformanceData = editions.map(ed => {
    const edEpapers = epapers.filter(ep => ep.editionId === ed.id);
    const totalViews = edEpapers.reduce((acc, ep) => acc + ep.views, 0) || Math.floor(Math.random() * 15000 + 5000);
    const totalReaders = edEpapers.reduce((acc, ep) => acc + (ep.readers || 0), 0) || Math.floor(totalViews * 0.7);
    const totalDownloads = edEpapers.reduce((acc, ep) => acc + ep.downloads, 0) || Math.floor(totalViews * 0.1);
    const totalShares = edEpapers.reduce((acc, ep) => acc + (ep.shares || 0), 0) || Math.floor(totalViews * 0.05);

    return {
      editionName: ed.name,
      stateName: ed.stateName,
      subEditionName: ed.subEditionName,
      views: totalViews,
      readers: totalReaders,
      downloads: totalDownloads,
      shares: totalShares
    };
  });

  // State-wise Analytics Data
  const statePerformanceData = states.map(st => {
    const stEpapers = epapers.filter(ep => ep.stateId === st.id);
    const totalEpaperViews = stEpapers.reduce((acc, ep) => acc + ep.views, 0) || (st.code === 'TS' ? 128400 : 84200);
    const totalVisitors = st.code === 'TS' ? 248000 : st.code === 'AP' ? 185000 : 42000;
    const totalNewsViews = st.code === 'TS' ? 142000 : st.code === 'AP' ? 95000 : 28000;

    return {
      stateName: st.name,
      code: st.code,
      visitors: totalVisitors,
      epaperViews: totalEpaperViews,
      newsViews: totalNewsViews
    };
  });

  // E-Paper Page-wise views for Hero Epaper
  const heroEpaper = epapers[0];
  const pageWiseData = heroEpaper?.pages?.map(p => ({
    pageNumber: `Page ${p.pageNumber}`,
    views: p.viewsCount || 15240 - (p.pageNumber * 800),
    uniqueReaders: p.uniqueReaders || 11200 - (p.pageNumber * 600),
    avgTimeSeconds: p.avgTimeSeconds || 120 - (p.pageNumber * 4)
  })) || [];

  const pieColors = ['#1e40af', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0b1d3a] text-white p-6 rounded-2xl border-b-4 border-amber-500 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-white">Publishing Analytics Dashboard</h1>
          <p className="text-xs text-slate-300">Deep reader engagement, news view metrics &amp; page-wise epaper analytics</p>
        </div>

        <div className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
          <Info className="w-4 h-4 text-amber-400" />
          <span>DEMO ANALYTICS (Stored Locally)</span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto">
        {[
          { id: 'visitors', label: 'Visitor Analytics', icon: Users },
          { id: 'epaper', label: 'E-Paper Performance', icon: BookOpen },
          { id: 'news', label: 'News Performance', icon: FileText },
          { id: 'editions', label: 'Edition & State Analytics', icon: Layers },
          { id: 'pagewise', label: 'E-Paper Page-Wise', icon: BarChart3 },
        ].map(tab => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                isActive ? 'bg-[#1e40af] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: VISITOR ANALYTICS */}
      {activeTab === 'visitors' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Unique Visitors</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">{initialVisitorAnalytics.uniqueVisitors.toLocaleString()}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Visits</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">{initialVisitorAnalytics.totalVisits.toLocaleString()}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Returning Visitors</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">{initialVisitorAnalytics.returningVisitors.toLocaleString()}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">New Visitors</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">{initialVisitorAnalytics.newVisitors.toLocaleString()}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Page Views</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">{initialVisitorAnalytics.pageViews.toLocaleString()}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Pages / Visit</div>
              <div className="text-xl font-black text-[#1e40af] font-mono mt-1">{initialVisitorAnalytics.avgPagesPerVisit}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold font-serif text-[#0b1d3a]">Visitors by Day</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={initialVisitorAnalytics.dailyVisitors}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip />
                    <Bar dataKey="visitors" fill="#1e40af" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold font-serif text-[#0b1d3a]">Visitors by Month</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={initialVisitorAnalytics.monthlyVisitors}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip />
                    <Area type="monotone" dataKey="visitors" stroke="#d97706" fill="#fef3c7" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: E-PAPER PERFORMANCE */}
      {activeTab === 'epaper' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Readers</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">158,420</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Today's Readers</div>
              <div className="text-xl font-black text-amber-600 font-mono mt-1">31,450</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total E-Paper Views</div>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">452,800</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Pages Read</div>
              <div className="text-xl font-black text-blue-700 font-mono mt-1">8.4 Pages</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Most Read Edition</div>
              <div className="text-sm font-black text-slate-900 font-serif mt-1">Hyderabad Main</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Most Viewed Date</div>
              <div className="text-sm font-black text-slate-900 font-mono mt-1">02 Oct 2026</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NEWS PERFORMANCE (NEWS-WISE VIEWS & DRILLDOWN) */}
      {activeTab === 'news' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Search news headline..."
                  value={newsSearch}
                  onChange={(e) => setNewsSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              <select
                value={newsCategoryFilter}
                onChange={(e) => setNewsCategoryFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold"
              >
                <option value="All">All Categories</option>
                <option value="State News">State News</option>
                <option value="Latest News">Latest News</option>
                <option value="Sports">Sports</option>
                <option value="Business">Business</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-500">Sort By:</span>
              <button
                onClick={() => setNewsSortBy('most')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${newsSortBy === 'most' ? 'bg-[#1e40af] text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                Most Viewed
              </button>
              <button
                onClick={() => setNewsSortBy('latest')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${newsSortBy === 'latest' ? 'bg-[#1e40af] text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                Latest
              </button>
            </div>
          </div>

          {/* News Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                    <th className="p-4">News Headline</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Published Date</th>
                    <th className="p-4">Total Views</th>
                    <th className="p-4">Unique Readers</th>
                    <th className="p-4">Shares</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredNews.map(n => (
                    <tr key={n.id} className="hover:bg-slate-50/80 transition cursor-pointer" onClick={() => setSelectedNewsForDetail(n)}>
                      <td className="p-4 font-bold text-slate-900 font-serif flex items-center gap-3">
                        <img src={n.imageUrl} alt={n.title} className="w-10 h-8 rounded object-cover border shrink-0" />
                        <span className="line-clamp-1">{n.titleTe || n.title}</span>
                      </td>
                      <td className="p-4 font-bold text-blue-700">{n.category}</td>
                      <td className="p-4 font-mono text-slate-600">{new Date(n.publishedAt).toLocaleDateString()}</td>
                      <td className="p-4 font-black font-mono text-emerald-700">{n.views.toLocaleString()} views</td>
                      <td className="p-4 font-bold text-slate-800">{(n.uniqueReaders || 0).toLocaleString()} readers</td>
                      <td className="p-4 font-bold text-slate-600">{n.shares || 0} shares</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedNewsForDetail(n);
                          }}
                          className="bg-blue-50 text-[#1e40af] hover:bg-[#1e40af] hover:text-white text-[11px] font-bold px-3 py-1 rounded transition"
                        >
                          View Analytics
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EDITION & STATE ANALYTICS */}
      {activeTab === 'editions' && (
        <div className="space-y-6">
          {/* Edition Performance Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold font-serif text-[#0b1d3a]">Edition-wise Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                    <th className="p-3">Edition Name</th>
                    <th className="p-3">State &amp; District</th>
                    <th className="p-3">Views</th>
                    <th className="p-3">Readers</th>
                    <th className="p-3">Downloads</th>
                    <th className="p-3">Shares</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {editionPerformanceData.map((ed, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-bold font-serif text-slate-900">{ed.editionName}</td>
                      <td className="p-3 text-slate-600">{ed.stateName} • {ed.subEditionName}</td>
                      <td className="p-3 font-mono font-bold text-blue-700">{ed.views.toLocaleString()}</td>
                      <td className="p-3 font-mono text-slate-800">{ed.readers.toLocaleString()}</td>
                      <td className="p-3 font-mono text-emerald-700">{ed.downloads.toLocaleString()}</td>
                      <td className="p-3 font-mono text-slate-600">{ed.shares}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* State Performance Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold font-serif text-[#0b1d3a]">State-wise Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                    <th className="p-3">State</th>
                    <th className="p-3">Total Visitors</th>
                    <th className="p-3">E-Paper Views</th>
                    <th className="p-3">News Views</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {statePerformanceData.map((st, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-500" />
                        <span>{st.stateName} ({st.code})</span>
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-900">{st.visitors.toLocaleString()}</td>
                      <td className="p-3 font-mono font-bold text-blue-700">{st.epaperViews.toLocaleString()}</td>
                      <td className="p-3 font-mono font-bold text-purple-700">{st.newsViews.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: E-PAPER PAGE-WISE ANALYTICS */}
      {activeTab === 'pagewise' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div>
              <h3 className="text-base font-bold font-serif text-[#0b1d3a]">Page-wise E-Paper Views (Hyderabad Edition)</h3>
              <p className="text-xs text-slate-500">Track page-by-page reader retention for 12 pages</p>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pageWiseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="pageNumber" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="views" fill="#1e40af" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                    <th className="p-3">Page Number</th>
                    <th className="p-3">Views</th>
                    <th className="p-3">Unique Readers</th>
                    <th className="p-3">Avg Time (Sec)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {pageWiseData.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-bold font-serif text-slate-900">{p.pageNumber}</td>
                      <td className="p-3 font-mono font-bold text-blue-700">{p.views.toLocaleString()}</td>
                      <td className="p-3 font-mono text-slate-800">{p.uniqueReaders.toLocaleString()}</td>
                      <td className="p-3 font-mono text-emerald-700">{p.avgTimeSeconds}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* NEWS DETAIL ANALYTICS MODAL */}
      {selectedNewsForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-700" />
                <h3 className="text-lg font-bold font-serif text-[#0b1d3a]">News Detail Analytics</h3>
              </div>
              <button onClick={() => setSelectedNewsForDetail(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">
                {selectedNewsForDetail.category}
              </span>
              <h4 className="text-xl font-bold font-serif text-slate-900 leading-snug">
                {selectedNewsForDetail.titleTe || selectedNewsForDetail.title}
              </h4>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <div className="text-[10px] font-bold text-blue-800 uppercase">Total Views</div>
                <div className="text-lg font-black text-blue-900 font-mono mt-0.5">{selectedNewsForDetail.views.toLocaleString()}</div>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                <div className="text-[10px] font-bold text-emerald-800 uppercase">Unique Readers</div>
                <div className="text-lg font-black text-emerald-900 font-mono mt-0.5">{(selectedNewsForDetail.uniqueReaders || 0).toLocaleString()}</div>
              </div>
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <div className="text-[10px] font-bold text-amber-800 uppercase">Total Shares</div>
                <div className="text-lg font-black text-amber-900 font-mono mt-0.5">{selectedNewsForDetail.shares || 0}</div>
              </div>
              <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-600 uppercase">Avg Read Time</div>
                <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{selectedNewsForDetail.averageReadingTime || '2.5 min'}</div>
              </div>
            </div>

            {/* Line Chart: Views Over Time */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h5 className="text-xs font-bold text-slate-700 uppercase">News Views Over Time (Daily)</h5>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedNewsForDetail.dailyViews || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} />
                    <Tooltip />
                    <Area type="monotone" dataKey="views" stroke="#1e40af" fill="#93c5fd" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
