import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Smartphone,
  Download,
  Calendar,
  Share2,
  MapPin,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  MOCK_DAILY_TRAFFIC,
  MOCK_TRAFFIC_SOURCES,
  MOCK_DEVICE_SPLIT,
  MOCK_DISTRICT_READERSHIP,
  MOCK_CATEGORY_METRICS,
} from '../../data/mockAnalytics';

export const AdminAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('14days');

  const handleExport = () => {
    alert('విశ్లేషణ నివేదిక (Analytics Report CSV) విజయవంతంగా డౌన్‌లోడ్ చేయబడింది!');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold font-telugu text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-red-600" />
            ట్రాఫిక్ & పాఠకుల విశ్లేషణ (Analytics & Insights)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            తెలంగాణ & ఆంధ్రప్రదేశ్ ప్రాంతాల పాఠకుల సందర్శన వివరాల సమగ్ర నివేదిక
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
          >
            <option value="7days">గత 7 రోజులు</option>
            <option value="14days">గత 14 రోజులు</option>
            <option value="30days">ఈ నెల (30 రోజులు)</option>
          </select>

          <button
            onClick={handleExport}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>నివేదికను డౌన్‌లోడ్ చేయి</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">మొత్తం పేజీ వీక్షణలు</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">86,95,000</h3>
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +24.5% గత వారంతో పోలిస్తే
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">యూనిక్ సందర్శకులు (Unique)</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">30,45,000</h3>
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +19.2% పెరుగుదల
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">ఈ-పేపర్ డిజిటల్ వీక్షణలు</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">6,31,000</h3>
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +12.8% వృద్ధి
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">సగటు సందర్శన సమయం</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">4 నిమిషాల 32 సెకన్లు</h3>
          <span className="text-xs text-blue-600 font-bold flex items-center gap-1 mt-1">
            <Sparkles className="w-3.5 h-3.5" /> అధిక ఎంగేజ్‌మెంట్
          </span>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Full Pageviews & Visitors Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-telugu">ట్రాఫిక్ ట్రెండ్ (Pageviews vs Visitors)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DAILY_TRAFFIC} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Legend />
                <Area type="monotone" dataKey="pageViews" name="పేజీ వీక్షణలు" stroke="#dc2626" strokeWidth={3} fill="url(#colorPv2)" />
                <Area type="monotone" dataKey="visitors" name="సందర్శకులు" stroke="#2563eb" strokeWidth={2} fill="url(#colorVis)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-telugu">ట్రాఫిక్ మూలాలు (Traffic Sources)</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_TRAFFIC_SOURCES} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                  {MOCK_TRAFFIC_SOURCES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {MOCK_TRAFFIC_SOURCES.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.name}
                </span>
                <span className="font-bold text-slate-900">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* District Readership Bar Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-telugu">జిల్లాల వారీగా రీడర్‌షిప్ వివరాలు</h3>
            <p className="text-xs text-slate-500">తెలంగాణ మరియు ఆంధ్రప్రదేశ్‌లోని టాప్ 10 జనాదరణ పొందిన జిల్లాలు</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-600 rounded-full" />
            <span className="text-xs font-semibold text-slate-600">పాఠకుల సంఖ్య</span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_DISTRICT_READERSHIP} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="district" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              <Bar dataKey="readers" name="పాఠకులు" fill="#dc2626" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
