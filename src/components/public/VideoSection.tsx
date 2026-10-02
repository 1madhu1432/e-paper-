import React, { useState } from 'react';
import { VideoItem } from '../../types';
import { Play, Video, Eye, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoSectionProps {
  videos: VideoItem[];
}

export const VideoSection: React.FC<VideoSectionProps> = ({ videos }) => {
  const [activeVideoModal, setActiveVideoModal] = useState<VideoItem | null>(null);

  if (videos.length === 0) return null;

  return (
    <section className="my-10 bg-slate-900 text-white rounded-2xl p-5 sm:p-8">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-600 rounded-lg text-white">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-telugu">
              పబ్లిక్ మూడ్ వీడియోలు
            </h2>
            <p className="text-xs text-slate-400">ప్రత్యక్ష ప్రసారాలు, బులిటెన్లు & క్షేత్రస్థాయి పరిశోధనా కథనాలు</p>
          </div>
        </div>

        <Link
          to="/videos"
          className="text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
        >
          <span>మరిన్ని వీడియోలు</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.slice(0, 4).map(v => (
          <div
            key={v.id}
            onClick={() => setActiveVideoModal(v)}
            className="group cursor-pointer bg-slate-800/80 rounded-xl overflow-hidden border border-slate-700 hover:border-red-500 transition-all hover:shadow-xl"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={v.thumbnail}
                alt={v.titleTe}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center group-hover:scale-110 shadow-lg transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {/* Badges */}
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                {v.duration}
              </span>
              <span className="absolute top-2 left-2 bg-red-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                {v.type}
              </span>
            </div>

            <div className="p-3">
              <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                {v.titleTe}
              </h4>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                <span>{v.reporterName}</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {(v.views / 1000).toFixed(1)}k
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl animate-in zoom-in-95 cursor-default"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-400">{activeVideoModal.type}</span>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              {/* Responsive Video Embed Mock */}
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeId}?autoplay=1`}
                title={activeVideoModal.titleTe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <h3 className="text-base sm:text-lg font-bold text-white">{activeVideoModal.titleTe}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{activeVideoModal.description}</p>
              <div className="flex items-center justify-between mt-3 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>విశ్లేషణ: {activeVideoModal.reporterName}</span>
                <span>వీక్షణలు: {activeVideoModal.views.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
