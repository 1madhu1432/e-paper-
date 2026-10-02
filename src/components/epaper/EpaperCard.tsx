import React from 'react';
import { Link } from 'react-router-dom';
import { EPaper } from '../../types';
import { Eye, Download, Share2, Calendar, MapPin, FileText, ChevronRight } from 'lucide-react';

interface EpaperCardProps {
  epaper: EPaper;
  onShare?: (epaper: EPaper) => void;
  onDownload?: (epaper: EPaper) => void;
}

export const EpaperCard: React.FC<EpaperCardProps> = ({ epaper, onShare, onDownload }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 flex flex-col group">
      {/* Front Page Thumbnail Container */}
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden border-b border-slate-200">
        <img
          src={epaper.coverImage}
          alt={epaper.title}
          className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="bg-[#0b1d3a] text-white text-[10px] font-extrabold px-2.5 py-1 rounded shadow-md uppercase">
            {epaper.subEditionName}
          </span>
          <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs">
            {epaper.stateName}
          </span>
        </div>

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-xs flex items-center gap-1">
          <FileText className="w-3 h-3 text-blue-700" />
          <span>{epaper.totalPages} Pages</span>
        </div>

        {/* Hover Read Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <Link
            to={`/epaper/reader/${epaper.id}`}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase transition transform translate-y-2 group-hover:translate-y-0 shadow-lg flex items-center gap-2"
          >
            <span>READ E-PAPER</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Card Metadata Footer */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-1">
            <Calendar className="w-3.5 h-3.5 text-blue-700" />
            <span>{epaper.date}</span>
            <span className="text-slate-300">•</span>
            <span>{epaper.volume}</span>
          </div>

          <h3 className="font-serif font-extrabold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-[#1e40af] transition">
            {epaper.editionName}
          </h3>
        </div>

        {/* Metrics & Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>{epaper.views.toLocaleString()}</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            {onShare && (
              <button
                onClick={() => onShare(epaper)}
                className="p-1.5 text-slate-500 hover:text-blue-700 rounded hover:bg-slate-100"
                title="Share E-Paper"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
            {onDownload && (
              <button
                onClick={() => onDownload(epaper)}
                className="p-1.5 text-slate-500 hover:text-emerald-700 rounded hover:bg-slate-100"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            <Link
              to={`/epaper/reader/${epaper.id}`}
              className="bg-[#1e40af] hover:bg-[#0b1d3a] text-white text-xs font-bold px-3 py-1.5 rounded transition ml-1"
            >
              READ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
