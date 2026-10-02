import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { EpaperCard } from '../../components/epaper/EpaperCard';
import { Archive, Calendar, Filter, Search } from 'lucide-react';

export const ArchivesPage: React.FC = () => {
  const { epapers, states, subEditions, editions } = useData();

  const [stateFilter, setStateFilter] = useState<string>('all');
  const [subFilter, setSubFilter] = useState<string>('all');
  const [monthFilter, setMonthFilter] = useState<string>('2026-10');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSubEditions = subEditions.filter(se => stateFilter === 'all' || se.stateId === stateFilter);

  const filteredEPapers = epapers.filter(ep => {
    const matchesState = stateFilter === 'all' || ep.stateId === stateFilter;
    const matchesSub = subFilter === 'all' || ep.subEditionId === subFilter;
    const matchesMonth = !monthFilter || ep.date.startsWith(monthFilter);
    const matchesSearch = (ep.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ep.editionName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSub && matchesMonth && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 font-sans">
      <div className="bg-[#0b1d3a] text-white p-8 rounded-2xl border-b-4 border-amber-500 shadow-lg">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Archive className="w-4 h-4 text-amber-400" />
            <span>Digital Newspaper Repository</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">E-Paper Archives</h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Search, filter and read past editions of Public Mood e-papers. Access past issues by date, month, state, or sub-edition.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#0b1d3a] font-serif border-b border-slate-100 pb-2">
          <Filter className="w-4 h-4 text-amber-500" />
          <span>Filter Archives</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">State</label>
            <select
              value={stateFilter}
              onChange={(e) => {
                setStateFilter(e.target.value);
                setSubFilter('all');
              }}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All States</option>
              {states.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Sub Edition / District</label>
            <select
              value={subFilter}
              onChange={(e) => setSubFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Sub Editions</option>
              {filteredSubEditions.map(se => (
                <option key={se.id} value={se.id}>{se.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Month / Year</label>
            <input
              type="month"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Search Keywords</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search archive title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Archive E-Papers Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-xl font-bold font-serif text-[#0b1d3a]">Archived Issues</h2>
          <span className="text-xs font-bold text-slate-500">{filteredEPapers.length} Issues Found</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEPapers.map(ep => (
            <EpaperCard key={ep.id} epaper={ep} />
          ))}
        </div>

        {filteredEPapers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500">
            No archived editions found for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};
