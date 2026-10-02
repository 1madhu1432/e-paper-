import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { EpaperCoverCard } from '../../components/epaper/EpaperCoverCard';
import { generateNewspaperSVG } from '../../utils/generateNewspaperPageSVG';
import {
  Newspaper, Calendar, MapPin, Eye, ArrowRight, Zap, ChevronRight, Layers
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { epapers, states, subEditions, editions, news, selectedDate, setSelectedDate } = useData();



  // Find matching e-papers or generate dynamically for any district
  const getEPaperForEdition = (stateId: string, subEditionId?: string, editionName?: string) => {
    let match = epapers.find(ep =>
      ep.stateId === stateId &&
      (!subEditionId || ep.subEditionId === subEditionId) &&
      ep.date === selectedDate
    );

    if (!match) {
      match = epapers.find(ep => ep.stateId === stateId && (!subEditionId || ep.subEditionId === subEditionId));
    }

    // Dynamic fallback cover generator if specific district isn't preloaded
    if (!match) {
      const edTitle = editionName || 'District Edition';
      const cover = generateNewspaperSVG(1, edTitle, selectedDate, 'Vol 01 | Issue 365', 12);
      return {
        id: `epaper-dyn-${stateId}-${subEditionId || 'main'}`,
        title: `Public Mood ${edTitle} - ${selectedDate}`,
        date: selectedDate,
        stateId,
        subEditionId: subEditionId || '',
        editionId: '',
        stateName: states.find(s => s.id === stateId)?.name || 'State',
        subEditionName: edTitle,
        editionName: edTitle,
        volume: 'Vol 01',
        issue: 'Issue 365',
        totalPages: 12,
        coverImage: cover,
        pdfUrl: '/samples/public-mood-hyderabad-02-10-2026.pdf',
        status: 'published' as const,
        views: 14200,
        readers: 9800,
        downloads: 1200,
        shares: 450,
        createdAt: new Date().toISOString(),
        pages: Array.from({ length: 12 }, (_, i) => ({
          pageNumber: i + 1,
          imageUrl: generateNewspaperSVG(i + 1, edTitle, selectedDate, 'Vol 01 | Issue 365', 12),
          title: i === 0 ? 'Front Page' : `Page ${i + 1}`
        }))
      };
    }

    return match;
  };

  // Main Editions Data
  const mainEditions = [
    {
      id: 'ed-ap',
      title: 'ANDHRA PRADESH',
      stateId: 'st-ap',
      subEditionId: 'sub-vjw',
      badgeText: 'CAPITAL EDITION',
    },
    {
      id: 'ed-hyd',
      title: 'GREATER HYDERABAD',
      stateId: 'st-telangana',
      subEditionId: 'sub-hyd',
      badgeText: 'METRO EDITION',
    },
    {
      id: 'ed-telangana',
      title: 'TELANGANA',
      stateId: 'st-telangana',
      subEditionId: 'sub-wgl',
      badgeText: 'STATE EDITION',
    },
  ];



  return (
    <div className="min-h-screen bg-[#f4f5f7] text-slate-900 pb-16 font-sans">

      {/* ========================================================= */}
      {/* PRIMARY UI EXPERIENCE: MAIN E-PAPER EDITION DIRECTORY */}
      {/* ========================================================= */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 space-y-12">



        {/* ========================================================= */}
        {/* MAIN EDITIONS ROW (EXACT SCREENSHOT MATCH: 3 CARDS IN A ROW) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 justify-items-center">
          {mainEditions.map(edition => {
            const epaper = getEPaperForEdition(edition.stateId, edition.subEditionId, edition.title);

            return (
              <div key={edition.id} className="w-full flex flex-col items-center">
                <EpaperCoverCard
                  epaper={epaper}
                  editionTitle={edition.title}
                  badgeText={edition.badgeText}
                />
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* DISTRICT / SUB-EDITION NEWSPAPERS GRID (EXACT SCREENSHOT TITLE) */}
        {/* ========================================================= */}
        <div className="space-y-6 pt-8 border-t border-slate-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-300 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-[#0b1d3a] uppercase tracking-tight">
                DISTRICT / SUB-EDITION NEWSPAPERS
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Select your district e-paper edition
              </p>
            </div>
            <Link
              to="/editions"
              className="text-xs font-bold text-[#1e40af] hover:text-[#0b1d3a] flex items-center gap-1 uppercase"
            >
              <span>View All Master Editions</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4-column Desktop, 2-column Mobile District Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
            {subEditions.slice(0, 8).map(dist => {
              const epaper = getEPaperForEdition(dist.stateId, dist.id, `${dist.name} Edition`);
              return (
                <EpaperCoverCard
                  key={dist.id}
                  epaper={epaper}
                  editionTitle={dist.name}
                  badgeText={dist.code}
                />
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* PREVIOUS EDITIONS (EXACT SCREENSHOT TITLE) */}
        {/* ========================================================= */}
        <div className="space-y-6 pt-8 border-t border-slate-300">
          <div className="flex items-center justify-between border-b border-slate-300 pb-3">
            <h2 className="text-xl sm:text-2xl font-black font-serif text-[#0b1d3a] uppercase tracking-tight">
              Previous Editions
            </h2>
            <Link to="/archives" className="text-xs font-bold text-[#1e40af] hover:underline uppercase">
              Full Archive &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
            {['2026-10-01', '2026-09-30', '2026-09-29'].map((pastDate, idx) => {
              const pastEPaper = getEPaperForEdition('st-telangana', 'sub-hyd', `Hyderabad (${pastDate})`);
              return (
                <div key={pastDate} className="w-full flex flex-col items-center">
                  <div className="w-full max-w-[280px] bg-white border border-slate-300 shadow-sm hover:shadow-lg transition rounded p-2 text-center">
                    <Link to={`/epaper/reader/${pastEPaper.id}`}>
                      <img src={pastEPaper.coverImage} alt={pastDate} className="w-full aspect-[3/4] object-contain" />
                    </Link>
                    <div className="mt-2 text-xs font-bold text-[#0b1d3a]">
                      Edition Date: {pastDate}
                    </div>
                    <Link
                      to={`/epaper/reader/${pastEPaper.id}`}
                      className="mt-1 text-[11px] font-bold text-[#1e40af] hover:underline block"
                    >
                      READ PAST EDITION &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
};
