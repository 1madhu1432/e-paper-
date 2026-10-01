import React, { useState } from 'react';
import {
  AlertTriangle,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  MapPin,
  FileText,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import { MOCK_NEWS_TIPS } from '../../data/mockNewsTips';
import { NewsTip } from '../../types';

export const AdminNewsTipsPage: React.FC = () => {
  const [tipsList, setTipsList] = useState<NewsTip[]>(MOCK_NEWS_TIPS as any);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedTip, setSelectedTip] = useState<NewsTip | null>(null);

  const filteredTips = tipsList.filter((tip) => {
    const matchSearch =
      (tip.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (tip.description || '').toLowerCase().includes(search.toLowerCase()) ||
      (tip.district || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || tip.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, newStatus: NewsTip['status']) => {
    setTipsList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    if (selectedTip && selectedTip.id === id) {
      setSelectedTip({ ...selectedTip, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold font-telugu text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            ప్రజా ఫిర్యాదులు & సిటిజన్ వార్తలు (News Tips)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            పాఠకులు మరియు సిటిజన్ రిపోర్టర్ల నుండి వచ్చిన సమాచారం మరియు వార్తా కథనాలు
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-200 text-xs font-bold">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>{tipsList.filter((t) => t.status === 'New' || t.status === 'Under Review').length} పరిశీలనలో ఉన్నాయి</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="జిల్లా, పేరు లేదా వివరాలతో వెతకండి..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="All">అన్ని స్థితులు (All Statuses)</option>
            <option value="New">కొత్తవి (New)</option>
            <option value="Under Review">పరిశీలనలో ఉన్నవి (Under Review)</option>
            <option value="Verified">ధృవీకరించబడినవి (Verified)</option>
            <option value="Converted to Article">వార్తగా ప్రచురించబడినవి (Converted)</option>
            <option value="Rejected">తిరస్కరించబడినవి (Rejected)</option>
          </select>
        </div>
      </div>

      {/* Tips List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">ఫిర్యాదు శీర్షిక / అంశం</th>
                <th className="py-3.5 px-3">జిల్లా / ప్రాంతం</th>
                <th className="py-3.5 px-3">పంపినవారు</th>
                <th className="py-3.5 px-3">తేదీ</th>
                <th className="py-3.5 px-3">స్థితి</th>
                <th className="py-3.5 px-4 text-right">చర్యలు</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTips.map((tip) => (
                <tr key={tip.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-bold text-slate-900 font-telugu text-sm line-clamp-1">{tip.issueType || 'ఫిర్యాదు'}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{tip.description}</p>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded text-[10px]">
                      {tip.district}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                    {tip.name}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">{tip.submittedAt}</td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        tip.status === 'Converted to Article' || tip.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : tip.status === 'Under Review'
                          ? 'bg-blue-100 text-blue-800'
                          : tip.status === 'New'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tip.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedTip(tip)}
                      className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      వివరాలు చూడండి
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tip Detail Drawer / Modal */}
      {selectedTip && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-xs bg-red-100 text-red-800 font-bold px-2.5 py-0.5 rounded">
                జిల్లా: {selectedTip.district} ({selectedTip.issueType})
              </span>
              <button onClick={() => setSelectedTip(null)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕ మూసివేయి
              </button>
            </div>

            <h3 className="text-lg font-bold font-telugu text-slate-900">{selectedTip.issueType} ఫిర్యాదు</h3>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs text-slate-600">
              <p>
                <strong>రిపోర్టర్ పేరు:</strong> {selectedTip.name}
              </p>
              <p>
                <strong>ఫోన్ నంబర్:</strong> {selectedTip.phone}
              </p>
              <p>
                <strong>సమర్పించిన సమయం:</strong> {selectedTip.submittedAt}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">వివరణ (Description):</h4>
              <p className="text-xs font-telugu text-slate-800 leading-relaxed bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                {selectedTip.description}
              </p>
            </div>

            {selectedTip.imageUrl && (
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">జతచేసిన ఇమేజ్:</h4>
                <img
                  src={selectedTip.imageUrl}
                  alt=""
                  className="w-full h-48 object-cover rounded-xl border border-slate-200"
                />
              </div>
            )}

            <div className="pt-4 border-t flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-500 font-bold">చర్య ఎంచుకోండి:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateStatus(selectedTip.id, 'Rejected')}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold"
                >
                  తిరస్కరించు
                </button>
                <button
                  onClick={() => updateStatus(selectedTip.id, 'Under Review')}
                  className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-xs font-bold"
                >
                  పరిశీలనకు పంపు
                </button>
                <button
                  onClick={() => updateStatus(selectedTip.id, 'Converted to Article')}
                  className="px-4 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-xs font-bold shadow-md"
                >
                  వార్తగా మార్చి ప్రచురించు
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
