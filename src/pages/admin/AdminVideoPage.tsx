import React, { useState, useEffect } from 'react';
import {
  Video,
  Plus,
  Play,
  Trash2,
  Eye,
  Clock,
  Sparkles,
  X,
  CheckCircle,
} from 'lucide-react';
import { MOCK_VIDEOS } from '../../data/mockVideos';
import { VideoItem } from '../../types';

export const AdminVideoPage: React.FC = () => {
  const [videosList, setVideosList] = useState<VideoItem[]>(MOCK_VIDEOS as any);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showAddModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showAddModal]);

  // New Video Form State
  const [titleTe, setTitleTe] = useState('');
  const [youtubeId, setYoutubeId] = useState('L_LUpnjgPso');
  const [duration, setDuration] = useState('04:15');
  const [category, setCategory] = useState('తెలంగాణ');

  const handleDelete = (id: string) => {
    if (window.confirm('ఈ వీడియో వార్తను తొలిగించాలనుకుంటున్నారా?')) {
      setVideosList((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleTe) return;

    const newVideo: VideoItem = {
      id: `vid-${Date.now()}`,
      title: titleTe,
      titleTe,
      description: titleTe,
      youtubeId,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      category,
      duration,
      reporterName: 'పబ్లిక్ మూడ్ బ్యూరో',
      publishedAt: 'ఇప్పుడే',
      isFeatured: true,
      isBreaking: false,
      views: 150,
      type: 'Daily Bulletin',
    };

    setVideosList([newVideo, ...videosList]);
    setTitleTe('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold font-telugu text-slate-900 flex items-center gap-2">
            <Video className="w-6 h-6 text-red-600" />
            వీడియో వార్తల నిర్వహణ (Video News Manager)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            YouTube లైవ్ స్ట్రీమ్స్, బులిటెన్లు మరియు డిజిటల్ వీడియో వార్తలు
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 font-telugu"
        >
          <Plus className="w-4 h-4" />
          <span>కొత్త వీడియో జోడించండి</span>
        </button>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videosList.map((vid) => (
          <div key={vid.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative aspect-video bg-slate-950">
                <img src={vid.thumbnail} alt={vid.titleTe} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  {vid.duration}
                </span>
                {vid.isBreaking && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded animate-pulse font-telugu">
                    బ్రేకింగ్
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded font-telugu">
                  {vid.category}
                </span>
                <h3 className="font-bold text-slate-900 font-telugu text-sm line-clamp-2">{vid.titleTe || vid.title}</h3>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>వీక్షణలు: {(vid.views || 0).toLocaleString()}</span>
                  <span>{vid.publishedAt}</span>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <a
                href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 font-telugu"
              >
                YouTube లో చూడండి →
              </a>

              <button
                onClick={() => handleDelete(vid.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Video Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold font-telugu text-slate-900">కొత్త వీడియో వార్త జోడించండి</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVideo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-telugu">వీడియో శీర్షిక (తెలుగు)</label>
                <input
                  type="text"
                  required
                  value={titleTe}
                  onChange={(e) => setTitleTe(e.target.value)}
                  placeholder="ఉదా: నేటి సాయంత్రం వార్తల హెడ్‌లైన్స్..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500 font-telugu"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Video ID</label>
                <input
                  type="text"
                  required
                  value={youtubeId}
                  onChange={(e) => setYoutubeId(e.target.value)}
                  placeholder="e.g. dQw4w9WgXcQ"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-telugu">వీడియో నిడివి (Duration)</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="03:45"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-telugu">వర్గం</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500 font-telugu"
                />
              </div>

              <div className="pt-3 border-t flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold font-telugu"
                >
                  రద్దు చేయి
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-red-500 font-telugu cursor-pointer"
                >
                  వీడియో ప్రచురించు
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
