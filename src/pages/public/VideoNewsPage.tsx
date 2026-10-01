import React, { useState, useMemo, useEffect } from 'react';
import { Play, Eye, Clock, Filter, ChevronDown } from 'lucide-react';
import { MOCK_VIDEOS } from '../../data/mockVideos';
import { CATEGORIES } from '../../data/categories';
import { VideoItem } from '../../types';

const VideoPlayerModal: React.FC<{ video: VideoItem; onClose: () => void }> = ({ video, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
    <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
      <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
        {/* Fake video player */}
        <div className="relative bg-slate-900 aspect-video flex items-center justify-center">
          <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 rounded-full bg-red-600/90 flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </div>
            <p className="text-white/70 text-sm">వీడియో ప్లేయర్ (డెమో మోడ్)</p>
          </div>
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div className="h-full bg-red-500 w-1/3" />
          </div>
        </div>
        <div className="bg-slate-900 p-4">
          <h3 className="text-white font-bold text-lg leading-snug mb-1 font-telugu">{video.titleTe || video.title}</h3>
          <p className="text-slate-400 text-sm">{video.reporterName} • {video.publishedAt}</p>
        </div>
      </div>
      <button onClick={onClose} className="mt-4 w-full text-white/60 hover:text-white text-sm transition-colors cursor-pointer">
        ✕ మూసివేయి
      </button>
    </div>
  </div>
);

export const VideoNewsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [playing, setPlaying] = useState<VideoItem | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    document.body.style.overflow = playing ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [playing]);

  const videoCategories = ['all', 'తెలంగాణ', 'ఆంధ్రప్రదేశ్', 'రాజకీయాలు', 'సినిమా', 'క్రీడలు'];

  const filtered = useMemo(() => {
    let vids = (MOCK_VIDEOS as VideoItem[]);
    if (activeCategory !== 'all') {
      vids = vids.filter(v => v.category === activeCategory);
    }
    return sortBy === 'popular' ? [...vids].sort((a, b) => (b.views || 0) - (a.views || 0)) : vids;
  }, [activeCategory, sortBy]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 pt-8 pb-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-red-500 rounded-full" />
            <h1 className="text-3xl font-bold text-white font-telugu">వీడియో వార్తలు</h1>
          </div>
          <p className="text-slate-400 ml-5 text-sm">తాజా వీడియో నివేదికలు, ప్రత్యక్ష ప్రసారాలు మరియు ప్రత్యేక కార్యక్రమాలు</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {videoCategories.map(cat => {
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 font-telugu cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat === 'all' ? 'అన్నీ' : cat}
              </button>
            );
          })}
          <div className="ml-auto relative shrink-0">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm hover:bg-slate-700 transition-all font-telugu cursor-pointer"
            >
              <Filter className="w-4 h-4" />
              {sortBy === 'latest' ? 'తాజావి' : 'జనప్రిరయమైనవి'}
              <ChevronDown className="w-3 h-3" />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-2 bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden z-20 font-telugu">
                {(['latest', 'popular'] as const).map(s => (
                  <button key={s} onClick={() => { setSortBy(s); setShowSort(false); }}
                    className={`block w-full px-5 py-2.5 text-left text-sm transition-colors cursor-pointer ${sortBy === s ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>
                    {s === 'latest' ? 'తాజావి' : 'జనప్రిరయమైనవి'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Featured Video */}
        {featured && (
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group mb-8 shadow-2xl"
            onClick={() => setPlaying(featured)}
          >
            <div className="aspect-video relative">
              <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-10 h-10 text-white fill-white ml-1" />
                </div>
              </div>
              {featured.isBreaking && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg font-telugu">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> బ్రేకింగ్ వీడియో
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded mb-2 inline-block">
                  {featured.duration}
                </span>
                <h2 className="text-white text-2xl font-bold leading-snug mb-2 drop-shadow-lg font-telugu">
                  {featured.titleTe || featured.title}
                </h2>
                <div className="flex items-center gap-4 text-slate-300 text-sm">
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {(featured.views || 0).toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featured.publishedAt}</span>
                  <span>{featured.reporterName}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {rest.map(video => (
            <div
              key={video.id}
              className="bg-slate-900 rounded-xl overflow-hidden cursor-pointer group hover:ring-2 hover:ring-red-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              onClick={() => setPlaying(video)}
            >
              <div className="relative aspect-video">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-mono">
                  {video.duration}
                </div>
                {video.isBreaking && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 font-telugu">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> బ్రేకింగ్
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-white text-sm font-semibold leading-snug mb-2 line-clamp-2 group-hover:text-red-400 transition-colors font-telugu">
                  {video.titleTe || video.title}
                </h3>
                <div className="flex items-center gap-3 text-slate-500 text-xs">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {(video.views || 0).toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {video.publishedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Play className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 text-lg font-telugu">ఈ వర్గంలో వీడియోలు అందుబాటులో లేవు</p>
          </div>
        )}
      </div>

      {playing && <VideoPlayerModal video={playing} onClose={() => setPlaying(null)} />}
    </div>
  );
};
