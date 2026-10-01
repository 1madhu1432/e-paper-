import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  DollarSign,
  TrendingUp,
  Eye,
  MousePointer,
  Play,
  Pause,
  Trash2,
  ExternalLink,
  X,
  CheckCircle,
} from 'lucide-react';
import { MOCK_ADVERTISEMENTS } from '../../data/mockAds';
import { Advertisement, AdPlacement } from '../../types';

export const AdminAdsPage: React.FC = () => {
  const [adsList, setAdsList] = useState<Advertisement[]>(MOCK_ADVERTISEMENTS);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Ad Form State
  const [adTitle, setAdTitle] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [placement, setPlacement] = useState<AdPlacement>('home-top');
  const [desktopBanner, setDesktopBanner] = useState('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80');

  const toggleAdStatus = (id: string) => {
    setAdsList((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, status: ad.status === 'active' ? 'paused' : 'active' } : ad))
    );
  };

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adTitle || !sponsorName) return;

    const newAd: Advertisement = {
      id: `ad-${Date.now()}`,
      campaignName: adTitle,
      sponsorName,
      adTitle,
      desktopBanner,
      mobileBanner: desktopBanner,
      targetUrl: 'https://janathavaani.com/advertise',
      placement,
      priority: 'high',
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      impressions: 0,
      clicks: 0,
      revenue: 50000,
    };

    setAdsList([newAd, ...adsList]);
    setAdTitle('');
    setSponsorName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold font-telugu text-slate-900 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-red-600" />
            ప్రకటనల నిర్వహణ (Advertisements & Campaigns)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            పోర్టల్‌లో ప్రదర్శించబడే బ్యానర్లు, యాడ్ పొజిషన్లు మరియు రాబడి మేనేజ్‌మెంట్
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 font-telugu"
        >
          <Plus className="w-4 h-4" />
          <span>కొత్త యాడ్ క్యాంపెయిన్ సృష్టించు</span>
        </button>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">ఈ నెల అంచనా రాబడి</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹9,65,000</h3>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +15.4% పెరుగుదల
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">మొత్తం ఇంప్రెషన్లు (Impressions)</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">2.4M</h3>
            <span className="text-xs text-blue-600 font-bold flex items-center gap-1 mt-1">
              <Eye className="w-3.5 h-3.5" /> 84% పూర్తికావచ్చాయి
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">యాక్టివ్ ప్రచారాలు (Campaigns)</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {adsList.filter((a) => a.status === 'active').length} / {adsList.length}
            </h3>
            <span className="text-xs text-purple-600 font-bold flex items-center gap-1 mt-1">
              <Megaphone className="w-3.5 h-3.5" /> నడుస్తున్నవి
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Megaphone className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Ads Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">ప్రకటన బ్యానర్</th>
                <th className="py-3.5 px-3">స్పానర్</th>
                <th className="py-3.5 px-3">పొజిషన్ (Placement)</th>
                <th className="py-3.5 px-3">ఇంప్రెషన్లు</th>
                <th className="py-3.5 px-3">క్లిక్‌లు</th>
                <th className="py-3.5 px-3">CTR (%)</th>
                <th className="py-3.5 px-3">స్థితి</th>
                <th className="py-3.5 px-4 text-right">చర్యలు</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {adsList.map((ad) => {
                const ctr = ad.impressions ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : '0.00';
                return (
                  <tr key={ad.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={ad.desktopBanner}
                          alt={ad.adTitle}
                          className="w-16 h-10 object-cover rounded-lg shrink-0 border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-sm font-telugu">{ad.adTitle}</p>
                          <a
                            href={ad.targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"
                          >
                            లక్ష్య లింక్ <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-700">{ad.sponsorName}</td>
                    <td className="py-3.5 px-3">
                      <span className="bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded text-[10px]">
                        {ad.placement}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-800">
                      {ad.impressions.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-800">
                      {ad.clicks.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-emerald-600">{ctr}%</td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          ad.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {ad.status === 'active' ? 'యాక్టివ్ (Live)' : ad.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => toggleAdStatus(ad.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          ad.status === 'active'
                            ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                            : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                        }`}
                      >
                        {ad.status === 'active' ? 'పాజ్ చేయి' : 'ప్రారంభించు'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Ad Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold font-telugu text-slate-900">కొత్త ప్రకటన బ్యానర్ జోడించండి</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ప్రకటన శీర్షిక (Campaign Name)</label>
                <input
                  type="text"
                  required
                  value={adTitle}
                  onChange={(e) => setAdTitle(e.target.value)}
                  placeholder="ఉదా: రియల్ ఎస్టేట్ మెగా ఆఫర్"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">స్పానర్ కంపెనీ పేరు</label>
                <input
                  type="text"
                  required
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  placeholder="ఉదా: హైదరాబాద్ వెంచర్స్ లిమిటెడ్"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ప్రదర్శన స్థానం (Placement Position)</label>
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value as AdPlacement)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
                >
                  <option value="home-top">హెడర్ టాప్ బ్యానర్ (home-top)</option>
                  <option value="article-middle">వార్త మధ్యలో ఇన్-ఆర్టికల్ (article-middle)</option>
                  <option value="sidebar">సైడ్‌బార్ చతురస్రం (sidebar)</option>
                  <option value="mobile-sticky">మొబైల్ స్టిక్కీ ఫుటర్ (mobile-sticky)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ఇమేజ్ URL (Banner Image)</label>
                <input
                  type="text"
                  value={desktopBanner}
                  onChange={(e) => setDesktopBanner(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-3 border-t flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold"
                >
                  రద్దు చేయి
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-red-500 cursor-pointer"
                >
                  యాడ్ ప్రచురించు
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
