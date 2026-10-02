import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2,
  Grid, X, Sparkles, Copy, Share2, Calendar, ChevronDown
} from 'lucide-react';

export const EPaperViewerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { epapers, states, subEditions, editions, incrementEPaperView, incrementEPaperPageView } = useData();

  // Find selected epaper
  const epaper = epapers.find(ep => ep.id === id) || epapers[0];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isGridViewOpen, setIsGridViewOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(epaper?.date || '2026-10-02');
  const [selectedEditionName, setSelectedEditionName] = useState<string>('Main Edition');
  const [selectedSubEditionName, setSelectedSubEditionName] = useState<string>(epaper?.subEditionName || 'HYDERABAD');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (epaper) {
      incrementEPaperView(epaper.id);
    }
  }, [epaper?.id]);

  useEffect(() => {
    if (epaper) {
      incrementEPaperPageView(epaper.id, currentPage);
    }
  }, [currentPage, epaper?.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          exitFullscreen();
        } else {
          navigate('/epaper');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, epaper, isFullscreen]);

  const totalPages = epaper ? epaper.totalPages : 12;
  const activePageData = epaper?.pages?.find(p => p.pageNumber === currentPage) || epaper?.pages?.[0];

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      exitFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error(err));
      setIsFullscreen(false);
    }
  };



  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
      className={`min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col no-copy select-none ${
        isFullscreen ? 'fixed inset-0 z-50 overflow-hidden bg-white' : ''
      }`}
    >
      {/* ========================================================= */}
      {/* SUB-HEADER TOOLBAR (INTEGRATED BRAND LOGO & CONTROLS) */}
      {/* ========================================================= */}
      <div className="bg-white border-b border-slate-300 py-2 px-4 sm:px-8 shadow-2xs">
        <div className="max-w-[1500px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-800">

          {/* Left Controls: Compact Brand Logo + Date, Main Edition, Sub-Edition, Magazine */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Compact Brand Logo */}
            <Link to="/" className="flex items-center mr-2 group">
              <img
                src="/public-mood-logo.jpg"
                alt="Public Mood Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>

            {/* Date Dropdown */}
            <div className="flex items-center border border-slate-300 bg-white px-2 py-1 rounded text-slate-700 cursor-pointer">
              <span>02-Oct-26</span>
              <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-500" />
            </div>

            {/* Main Edition Dropdown */}
            <div className="flex items-center border border-slate-300 bg-white px-2 py-1 rounded text-slate-700 cursor-pointer">
              <span>{selectedEditionName}</span>
              <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-500" />
            </div>

            {/* Sub-Edition Dropdown */}
            <div className="flex items-center border border-slate-300 bg-white px-2.5 py-1 rounded text-[#0b1d3a] font-extrabold uppercase bg-amber-50/50 cursor-pointer">
              <span>{selectedSubEditionName}</span>
              <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-500" />
            </div>

            {/* Sunday Magazine Dropdown */}
            <div className="hidden md:flex items-center border border-slate-300 bg-white px-2 py-1 rounded text-slate-700 cursor-pointer uppercase">
              <span>SUNDAY MAGAZINE</span>
              <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-500" />
            </div>
          </div>

          {/* Center & Right Controls: Page Prev/Next, Thumbnails, Zoom, Fullscreen */}
          <div className="flex items-center gap-3">

            {/* Page Navigation Switcher: ← 01: Page ▼ → */}
            <div className="flex items-center border border-slate-300 bg-white rounded overflow-hidden">
              <button
                onClick={goToPrevPage}
                disabled={currentPage <= 1}
                className="px-2 py-1 hover:bg-slate-100 disabled:opacity-40 transition border-r border-slate-300"
                title="Previous Page"
              >
                &larr;
              </button>

              <div className="flex items-center gap-1 px-2 text-xs font-bold text-slate-800">
                <span className="text-[#1e40af]">{String(currentPage).padStart(2, '0')}</span>
                <span>: Page</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage >= totalPages}
                className="px-2 py-1 hover:bg-slate-100 disabled:opacity-40 transition border-l border-slate-300"
                title="Next Page"
              >
                &rarr;
              </button>
            </div>

            {/* Grid Icon Button (Thumbnails) */}
            <button
              onClick={() => setIsGridViewOpen(!isGridViewOpen)}
              className={`p-1.5 border border-slate-300 rounded bg-white hover:bg-slate-100 transition ${
                isGridViewOpen ? 'bg-amber-100 border-amber-400' : ''
              }`}
              title="Page Thumbnails"
            >
              <Grid className="w-4 h-4 text-slate-700" />
            </button>

            {/* Zoom Controls: 🔍 - 1 + 🔍 */}
            <div className="flex items-center gap-1 border border-slate-300 bg-white px-2 py-0.5 rounded">
              <span className="text-xs">🔍</span>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 25, 50))}
                className="px-1 font-bold text-slate-700 hover:text-[#1e40af]"
              >
                -
              </button>
              <span className="text-xs font-mono px-1">{zoomLevel / 100}</span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 25, 200))}
                className="px-1 font-bold text-slate-700 hover:text-[#1e40af]"
              >
                +
              </button>
              <span className="text-xs">🔍</span>
            </div>

            {/* Fullscreen / Fit button */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 border border-slate-300 rounded bg-white hover:bg-slate-100 transition text-slate-700"
              title="Fullscreen View"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. BREAKING NEWS CYAN TICKER BAR (EXACT SCREENSHOT MATCH) */}
      {/* ========================================================= */}
      <div className="bg-[#00a8e8] text-white flex items-center text-xs font-bold overflow-hidden shadow-xs">
        <div className="bg-[#0088cc] px-4 py-1.5 text-white font-extrabold shrink-0 uppercase tracking-wide">
          BREAKING NEWS:
        </div>
        <div className="overflow-hidden whitespace-nowrap py-1.5 px-4 w-full">
          <div className="inline-block animate-marquee space-x-8 text-white font-medium">
            <span>• మహిళా హాకీలో భారత్ కు స్వర్ణం</span>
            <span>• జిలపాదుతూ తల్లి కునుకు.. నీటి సంపులో పడి చిన్నారి మృతి</span>
            <span>• ముంబాయిలో CJP ఆందోళన.. పలువురు ప్రముఖుల సంఫీభావం</span>
            <span>• తెలంగాణ అసెంబ్లీలో కొత్త ఐటీ బిల్లు ఏకగ్రీవ ఆమోదం</span>
            <span>• శంషాబాద్ మెట్రో ఫేజ్-2 పనులకు మార్గం సుగమం</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. MAIN NEWSPAPER CANVAS DISPLAY AREA */}
      {/* ========================================================= */}
      <main className="flex-1 bg-[#e2e8f0] p-4 sm:p-8 flex items-center justify-center overflow-auto relative min-h-[750px]">
        
        {/* Thumbnails Modal Drawer if Toggled */}
        {isGridViewOpen && (
          <div className="absolute top-4 left-4 z-40 bg-white border border-slate-300 rounded-xl p-4 shadow-2xl max-w-xs w-full space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-xs text-[#0b1d3a]">All {totalPages} Pages</span>
              <button onClick={() => setIsGridViewOpen(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto p-1">
              {epaper.pages?.map(p => (
                <button
                  key={p.pageNumber}
                  onClick={() => {
                    setCurrentPage(p.pageNumber);
                    setIsGridViewOpen(false);
                  }}
                  className={`border rounded overflow-hidden p-0.5 text-center transition ${
                    p.pageNumber === currentPage ? 'border-blue-600 ring-2 ring-blue-500/40' : 'border-slate-300 hover:border-slate-500'
                  }`}
                >
                  <img src={p.imageUrl} alt={`Page ${p.pageNumber}`} className="w-full aspect-[3/4] object-cover" />
                  <span className="text-[10px] font-bold text-slate-700 block mt-0.5">P.{p.pageNumber}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Newspaper Page Container */}
        <div
          className="bg-white shadow-2xl border border-slate-300 transition-transform duration-150 origin-top relative group"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            maxWidth: '1000px',
            width: '100%',
          }}
        >
          {activePageData ? (
            <>
              <img
                src={activePageData.imageUrl}
                alt={`Public Mood Page ${currentPage}`}
                className="w-full h-auto object-contain block shadow-xs"
              />


            </>
          ) : (
            <div className="w-[800px] h-[1100px] bg-white flex items-center justify-center text-slate-400 font-serif">
              Rendering E-Paper Page...
            </div>
          )}
        </div>
      </main>


    </div>
  );
};
