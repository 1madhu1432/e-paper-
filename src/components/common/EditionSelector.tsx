import React from 'react';
import { useData } from '../../context/DataContext';
import { MapPin, Calendar, Layers, ChevronRight, Newspaper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EditionSelectorProps {
  className?: string;
  onNavigate?: () => void;
}

export const EditionSelector: React.FC<EditionSelectorProps> = ({ className = '', onNavigate }) => {
  const navigate = useNavigate();
  const {
    states,
    subEditions,
    editions,
    epapers,
    selectedStateId,
    setSelectedStateId,
    selectedSubEditionId,
    setSelectedSubEditionId,
    selectedEditionId,
    setSelectedEditionId,
    selectedDate,
    setSelectedDate
  } = useData();

  const activeStates = states.filter(s => s.status === 'active');
  const availableSubEditions = subEditions.filter(se => se.stateId === selectedStateId && se.status === 'active');
  const availableEditions = editions.filter(ed => ed.subEditionId === selectedSubEditionId && ed.status === 'active');

  const selectedStateObj = states.find(s => s.id === selectedStateId);
  const selectedSubObj = subEditions.find(se => se.id === selectedSubEditionId);
  const selectedEdObj = editions.find(ed => ed.id === selectedEditionId);

  // Find matching e-paper in memory
  const matchingEPaper = epapers.find(ep =>
    ep.stateId === selectedStateId &&
    ep.subEditionId === selectedSubEditionId &&
    ep.date === selectedDate
  ) || epapers[0]; // fallback to hero epaper if specific date/district combination isn't preloaded

  const handleReadClick = () => {
    if (matchingEPaper) {
      navigate(`/epaper/reader/${matchingEPaper.id}`);
      if (onNavigate) onNavigate();
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden ${className}`}>
      <div className="bg-[#0b1d3a] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-amber-400" />
          <h2 className="font-extrabold text-lg font-serif">Choose Your Edition</h2>
        </div>
        <span className="text-xs bg-amber-500 text-slate-950 font-bold px-2.5 py-0.5 rounded">
          Dynamic Selector
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Step 1: Select State */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-extrabold">1</span>
            Select State
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {activeStates.map(state => {
              const isSelected = state.id === selectedStateId;
              return (
                <button
                  key={state.id}
                  onClick={() => setSelectedStateId(state.id)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#1e40af] text-white border-[#1e40af] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{state.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {state.code}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Sub Edition / District */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-extrabold">2</span>
            Select Sub Edition / District ({selectedStateObj?.name})
          </label>
          {availableSubEditions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {availableSubEditions.map(sub => {
                const isSelected = sub.id === selectedSubEditionId;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubEditionId(sub.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{sub.name}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No sub-editions created for this state yet.</p>
          )}
        </div>

        {/* Step 3: Select Date & Edition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-extrabold">3</span>
              Select Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-blue-700" />
              Edition Name
            </label>
            <select
              value={selectedEditionId}
              onChange={(e) => setSelectedEditionId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {availableEditions.map(ed => (
                <option key={ed.id} value={ed.id}>{ed.name}</option>
              ))}
              {availableEditions.length === 0 && (
                <option value="">Default Main Edition</option>
              )}
            </select>
          </div>
        </div>

        {/* Selected Summary Card & Read Button */}
        <div className="bg-gradient-to-r from-blue-950 to-slate-900 text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Target E-Paper</div>
            <div className="text-base font-extrabold font-serif">
              {selectedStateObj?.name} • {selectedSubObj?.name}
            </div>
            <div className="text-xs text-slate-300">
              Date: {selectedDate} | {matchingEPaper ? `${matchingEPaper.totalPages} Pages` : 'Available'}
            </div>
          </div>

          <button
            onClick={handleReadClick}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm shadow-md"
          >
            <span>OPEN E-PAPER</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
