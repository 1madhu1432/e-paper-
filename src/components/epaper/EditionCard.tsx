import React from 'react';
import { Link } from 'react-router-dom';
import { Edition } from '../../types';
import { MapPin, ArrowRight, Layers, FileText } from 'lucide-react';

interface EditionCardProps {
  edition: Edition;
  onSelect?: (edition: Edition) => void;
}

export const EditionCard: React.FC<EditionCardProps> = ({ edition, onSelect }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-200 transition group flex flex-col justify-between">
      <div>
        <div className="relative h-44 bg-slate-100 overflow-hidden">
          <img
            src={edition.thumbnail}
            alt={edition.name}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-[#0b1d3a] text-white text-[10px] font-extrabold px-2.5 py-1 rounded uppercase">
              {edition.stateName}
            </span>
            <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded">
              {edition.subEditionName}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-serif font-extrabold text-lg text-white group-hover:text-amber-300 transition">
              {edition.name}
            </h3>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {edition.description}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
            <MapPin className="w-3.5 h-3.5 text-blue-700" />
            <span>District Edition • 12 Pages Daily</span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Link
          to={`/epaper/reader/epaper-hyd-2026-10-02`}
          className="w-full bg-slate-900 hover:bg-[#1e40af] text-white font-bold py-2 px-4 rounded-lg text-xs transition flex items-center justify-center gap-2"
        >
          <span>READ TODAY'S EDITION</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
