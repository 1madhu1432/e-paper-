import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MockEPaperService } from '../../services/mockEPaperService';
import { EPaper } from '../../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Download, 
  Share2, 
  ArrowLeft,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';

export const EPaperViewerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [edition, setEdition] = useState<EPaper | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const ed = MockEPaperService.getById(id);
      setEdition(ed);
      if (ed) {
        MockEPaperService.incrementViews(ed.id);
      }
    }
  }, [id]);

  if (!edition) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center">
        <h2 className="text-xl font-bold text-slate-800">ఈ-పేపర్ ఎడిషన్ కనుగొనబడలేదు</h2>
        <Link to="/epaper" className="inline-block mt-4 px-5 py-2 bg-red-600 text-white rounded-xl text-xs font-bold">
          ఈ-పేపర్ పేజీకి తిరిగి వెళ్లండి
        </Link>
      </div>
    );
  }

  const pages = edition.pages && edition.pages.length > 0 ? edition.pages : [
    { pageNumber: 1, title: 'ముఖ్యాంశాలు', imageUrl: edition.coverImage },
    { pageNumber: 2, title: 'రాష్ట్ర వార్తలు', imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80' },
    { pageNumber: 3, title: 'జిల్లా సమాచారం', imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' },
    { pageNumber: 4, title: 'క్రీడలు & సినిమా', imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80' },
  ];

  const activePageObj = pages[currentPage - 1] || pages[0];

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(pages.length, prev + 1));
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(200, prev + 25));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(75, prev - 25));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${edition.editionNameTe} - జనతా వాణి ఈ-పేపర్`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('ఈ-పేపర్ లింక్ కాపీ చేయబడింది!');
    }
  };

  return (
    <div className={`min-h-screen bg-slate-900 text-white flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Top Controls Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <Link
            to="/epaper"
            className="flex items-center gap-1 text-slate-300 hover:text-white text-xs font-semibold p-1 rounded-lg hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">అన్ని ఎడిషన్లు</span>
          </Link>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{edition.editionNameTe}</h1>
            <p className="text-[10px] text-slate-400">{edition.date} • {edition.district}</p>
          </div>
        </div>

        {/* Center Page Nav Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold px-2 py-1 bg-slate-800 rounded-lg text-amber-300">
            పేజీ {currentPage} / {pages.length}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === pages.length}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button onClick={handleZoomOut} className="p-1.5 text-slate-300 hover:text-white" title="Zoom Out">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button onClick={handleResetZoom} className="px-2 text-xs font-bold text-amber-300" title="Reset Zoom">
              {zoomLevel}%
            </button>
            <button onClick={handleZoomIn} className="p-1.5 text-slate-300 hover:text-white" title="Zoom In">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <a
            href={edition.pdfUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => MockEPaperService.incrementDownloads(edition.id)}
            className="p-1.5 sm:p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-1 text-xs font-bold"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">డౌన్‌లోడ్</span>
          </a>

          <button
            onClick={handleShare}
            className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Newspaper Canvas Viewport */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8 bg-slate-950/60 relative">
        <div
          className="transition-transform duration-200 ease-out shadow-2xl rounded-sm overflow-hidden bg-white max-w-full"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          <img
            src={activePageObj.imageUrl}
            alt={activePageObj.title}
            className="max-h-[82vh] w-auto object-contain select-none pointer-events-none"
          />
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="h-20 bg-slate-950 border-t border-slate-800 px-4 flex items-center gap-3 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider shrink-0">
          <Layers className="w-3.5 h-3.5" /> పేజీలు:
        </span>
        {pages.map((p, idx) => (
          <button
            key={p.pageNumber}
            onClick={() => setCurrentPage(idx + 1)}
            className={`relative rounded-md overflow-hidden h-14 w-11 shrink-0 border-2 transition-all ${
              currentPage === idx + 1
                ? 'border-red-500 scale-105 shadow-md'
                : 'border-slate-700 opacity-60 hover:opacity-100'
            }`}
          >
            <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
            <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] font-bold text-white text-center">
              {idx + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
