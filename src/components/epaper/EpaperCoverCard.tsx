import React from 'react';
import { Link } from 'react-router-dom';
import { EPaper } from '../../types';
import { ChevronRight, FileText, Calendar, Eye } from 'lucide-react';

interface EpaperCoverCardProps {
  epaper: EPaper;
  editionTitle?: string;
  badgeText?: string;
  districtsDropdown?: React.ReactNode;
  showDistrictsToggle?: boolean;
  isExpanded?: boolean;
  onToggleDistricts?: () => void;
  className?: string;
}

export const EpaperCoverCard: React.FC<EpaperCoverCardProps> = ({
  epaper,
  editionTitle,
  badgeText,
  districtsDropdown,
  showDistrictsToggle = false,
  isExpanded = false,
  onToggleDistricts,
  className = '',
}) => {
  const displayTitle = editionTitle || epaper.editionName || epaper.subEditionName;

  return (
    <div className={`flex flex-col items-center w-full ${className}`}>
      {/* Main Newspaper Cover Box */}
      <div className="relative w-full max-w-[320px] sm:max-w-[340px] bg-white border border-slate-300 shadow-md hover:shadow-2xl transition-all duration-300 rounded-sm overflow-hidden group hover:scale-[1.02] transform">
        
        {/* Cover Aspect Ratio Frame (3:4 standard newspaper ratio) */}
        <div className="relative aspect-[3/4] w-full bg-slate-100 flex items-center justify-center overflow-hidden">
          <img
            src={epaper.coverImage}
            alt={displayTitle}
            className="w-full h-full object-contain object-top transition duration-500"
          />

          {/* Badge Overlay */}
          {badgeText && (
            <div className="absolute top-3 left-3 bg-[#0b1d3a] text-white text-[10px] font-extrabold px-2.5 py-1 rounded shadow-md uppercase">
              {badgeText}
            </div>
          )}

          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs border border-slate-200">
            {epaper.totalPages} Pages
          </div>

          {/* Hover Read Overlay */}
          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
            <Link
              to={`/epaper/reader/${epaper.id}`}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition transform translate-y-2 group-hover:translate-y-0 shadow-xl flex items-center gap-2"
            >
              <span>READ E-PAPER</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <span className="text-[11px] text-slate-300 mt-2 font-medium">
              {epaper.date} • {epaper.volume || 'Vol 01'}
            </span>
          </div>
        </div>

        {/* Direct Click overlay for the whole card */}
        <Link
          to={`/epaper/reader/${epaper.id}`}
          className="absolute inset-0 z-10"
          aria-label={`Read ${displayTitle}`}
        />
      </div>

      {/* Title & Metadata below cover */}
      <div className="mt-3 text-center space-y-1 w-full max-w-[340px]">
        <Link
          to={`/epaper/reader/${epaper.id}`}
          className="font-serif font-black text-[#0b1d3a] hover:text-[#1e40af] text-base sm:text-lg uppercase tracking-tight block transition line-clamp-1"
        >
          {displayTitle}
        </Link>
        <div className="text-xs text-slate-500 font-medium">
          {epaper.date} • {epaper.totalPages} Pages
        </div>

        {/* Districts Dropdown Toggle Button */}
        {showDistrictsToggle && onToggleDistricts && (
          <div className="pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleDistricts();
              }}
              className="inline-flex items-center gap-1 text-xs font-extrabold text-[#1e40af] hover:text-[#0b1d3a] bg-blue-50 hover:bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200 transition cursor-pointer"
            >
              <span>Districts...</span>
              <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
            </button>
          </div>
        )}
      </div>

      {/* Render Districts Accordion Content if expanded */}
      {isExpanded && districtsDropdown && (
        <div className="w-full mt-4 pt-4 border-t border-slate-200 animate-in fade-in slide-in-from-top-2">
          {districtsDropdown}
        </div>
      )}
    </div>
  );
};
