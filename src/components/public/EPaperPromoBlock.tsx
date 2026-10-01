import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, BookOpen, Calendar, ExternalLink } from 'lucide-react';
import { MockEPaperService } from '../../services/mockEPaperService';

export const EPaperPromoBlock: React.FC = () => {
  const todayEdition = MockEPaperService.getTodayEdition();

  if (!todayEdition) return null;

  return (
    <section className="my-10 bg-gradient-to-r from-red-900 via-rose-900 to-slate-900 rounded-2xl text-white p-6 sm:p-8 shadow-xl overflow-hidden relative">
      {/* Background newspaper watermark pattern */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Cover Preview (4 cols) */}
        <div className="md:col-span-4 flex justify-center">
          <Link
            to={`/epaper/${todayEdition.id}`}
            className="group relative block w-48 sm:w-56 shadow-2xl rounded-lg overflow-hidden border-4 border-white/20 transform group-hover:scale-105 transition-transform"
          >
            <img
              src={todayEdition.coverImage}
              alt={todayEdition.editionNameTe}
              className="w-full object-cover aspect-[3/4]"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                <BookOpen className="w-3.5 h-3.5" /> చదవండి
              </span>
            </div>
          </Link>
        </div>

        {/* Content (8 cols) */}
        <div className="md:col-span-8 space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>నేటి డిజిటల్ దినపత్రిక ({todayEdition.date})</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-telugu">
            జనతా వాణి ఈ-పేపర్
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-telugu max-w-xl">
            రోజువారీ వార్తా విశేషాలు, ప్రత్యేక పరిశోధనాత్మక కథనాలు, జిల్లా పేజీలు మరియు సంపాదకీయాలను మీ మొబైల్ లేదా కంప్యూటర్‌లో హై-క్వాలిటీ పీడీఎఫ్ రూపంలో స్పష్టంగా చదవండి.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <Link
              to={`/epaper/${todayEdition.id}`}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>ఈ-పేపర్ చదవండి (Read Online)</span>
            </Link>

            <Link
              to="/epaper"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>అన్ని ఎడిషన్లు & ఆర్కైవ్</span>
            </Link>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-6 text-xs text-slate-300 pt-2">
            <span>మొత్తం పేజీలు: <strong className="text-white">{todayEdition.totalPages}</strong></span>
            <span>•</span>
            <span>నేటి పాఠకులు: <strong className="text-white">{todayEdition.views.toLocaleString()}</strong></span>
            <span>•</span>
            <span>డౌన్‌లోడ్లు: <strong className="text-white">{todayEdition.downloads.toLocaleString()}</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};
