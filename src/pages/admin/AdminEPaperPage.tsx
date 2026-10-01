import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Calendar,
  Download,
  Eye,
  Trash2,
  ExternalLink,
  Upload,
  CheckCircle,
  X,
} from 'lucide-react';
import { MockEPaperService } from '../../services/mockEPaperService';
import { EPaper } from '../../types';

export const AdminEPaperPage: React.FC = () => {
  const [editions, setEditions] = useState<EPaper[]>(() => MockEPaperService.getAll());
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showUploadModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showUploadModal]);

  // Upload Form state
  const [editionName, setEditionName] = useState('');
  const [editionNameTe, setEditionNameTe] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [pagesCount, setPagesCount] = useState(16);

  const refreshEditions = () => setEditions(MockEPaperService.getAll());

  useEffect(() => {
    window.addEventListener('epaper-updated', refreshEditions);
    return () => window.removeEventListener('epaper-updated', refreshEditions);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('ఈ ఈ-పేపర్ ఎడిషన్‌ను తొలిగించాలనుకుంటున్నారా?')) {
      MockEPaperService.delete(id);
      refreshEditions();
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editionNameTe) return;

    MockEPaperService.create({
      editionName: editionName || 'Main Edition',
      editionNameTe,
      date,
      district: 'Hyderabad',
      totalPages: Number(pagesCount),
      status: 'published',
    });

    setEditionNameTe('');
    setEditionName('');
    setShowUploadModal(false);
    refreshEditions();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold font-telugu text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-red-600" />
            డిజిటల్ ఈ-పేపర్ మేనేజ్‌మెంట్ (E-Paper Manager)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            దినపత్రిక ఈ-పేపర్ పిడిఎఫ్ ఎడిషన్ల అప్‌లోడ్ మరియు కటింగ్ క్లిప్పింగ్‌లు
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>నూతన ఈ-పేపర్ ఎడిషన్ అప్‌లోడ్</span>
        </button>
      </div>

      {/* Editions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {editions.map((ed) => (
          <div key={ed.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-48 bg-slate-950 overflow-hidden">
                <img src={ed.coverImage} alt={ed.editionNameTe} className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-xs font-bold bg-red-600 px-2.5 py-0.5 rounded-full font-telugu">
                    {ed.editionNameTe}
                  </span>
                  <span className="text-xs text-slate-300 font-mono">{ed.date}</span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-bold text-slate-900 font-telugu text-sm">{ed.editionNameTe} డిజిటల్ ఎడిషన్</h3>
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <span>మొత్తం పేజీలు: {ed.totalPages}</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-bold">PDF సిద్దంగా ఉంది</span>
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2">
              <a
                href={`/epaper/${ed.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>వీక్షించండి</span>
              </a>

              <button
                onClick={() => handleDelete(ed.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold font-telugu text-slate-900">కొత్త ఈ-పేపర్ అప్‌లోడ్</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ఎడిషన్ పేరు (తెలుగు)</label>
                <input
                  type="text"
                  required
                  value={editionNameTe}
                  onChange={(e) => setEditionNameTe(e.target.value)}
                  placeholder="ఉదా: హైదరాబాద్ ప్రధాన ఎడిషన్"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ప్రచురణ తేదీ</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">మొత్తం పేజీల సంఖ్య</label>
                <input
                  type="number"
                  required
                  value={pagesCount}
                  onChange={(e) => setPagesCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50">
                <Upload className="w-8 h-8 mx-auto text-slate-400 mb-1" />
                <p className="text-xs font-bold text-slate-700">PDF ఫైల్‌ను ఇక్కడ డ్రాప్ చేయండి</p>
                <p className="text-[10px] text-slate-400">లేదా బ్రౌజ్ చేయడానికి క్లిక్ చేయండి (Max 50MB)</p>
              </div>

              <div className="pt-3 border-t flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold"
                >
                  రద్దు చేయి
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-red-500"
                >
                  అప్‌లోడ్ చేయి
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
