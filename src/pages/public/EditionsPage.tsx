import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { EditionCard } from '../../components/epaper/EditionCard';
import { Layers, MapPin, Search } from 'lucide-react';

export const EditionsPage: React.FC = () => {
  const { editions, states, subEditions } = useData();
  const [selectedState, setSelectedState] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredEditions = editions.filter(ed => {
    const matchesState = selectedState === 'all' || ed.stateId === selectedState;
    const matchesSearch = ed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ed.subEditionName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 font-sans">
      <div className="bg-[#0b1d3a] text-white p-8 rounded-2xl border-b-4 border-amber-500 shadow-lg">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>State &amp; District Editions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">All Public Mood Newspaper Editions</h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Browse all metro and district editions across Telangana, Andhra Pradesh, Karnataka, and Maharashtra.
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* State Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <button
            onClick={() => setSelectedState('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              selectedState === 'all' ? 'bg-[#1e40af] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All States ({editions.length})
          </button>
          {states.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedState(s.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                selectedState === s.id ? 'bg-[#1e40af] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search edition name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Editions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEditions.map(ed => (
          <EditionCard key={ed.id} edition={ed} />
        ))}
      </div>

      {filteredEditions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500">
          No editions match your criteria. Try resetting state filter or search query.
        </div>
      )}
    </div>
  );
};
