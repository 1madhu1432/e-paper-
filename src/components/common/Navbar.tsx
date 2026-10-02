import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Shield, Menu, X, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    selectedDate,
    setSelectedDate,
    states,
    subEditions,
    epapers
  } = useData();

  const [selectedStateId, setSelectedStateId] = useState<string>('st-telangana');
  const [selectedSubEditionId, setSelectedSubEditionId] = useState<string>('sub-hyd');

  const availableSubEditions = subEditions.filter(se => se.stateId === selectedStateId);

  const dateOptions = [
    { label: "02 Oct 2026 (Today)", value: "2026-10-02" },
    { label: "01 Oct 2026 (Yesterday)", value: "2026-10-01" },
    { label: "30 Sep 2026", value: "2026-09-30" },
    { label: "29 Sep 2026", value: "2026-09-29" },
    { label: "28 Sep 2026", value: "2026-09-28" },
  ];

  const formattedDateLabel = new Date(selectedDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/news?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleDirectRead = () => {
    // Find matching e-paper for selected state + sub-edition
    const match = epapers.find(ep => ep.stateId === selectedStateId && (ep.subEditionId === selectedSubEditionId || !ep.subEditionId));
    if (match) {
      navigate(`/epaper/reader/${match.id}`);
    } else {
      navigate('/epaper');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'E-Paper', path: '/epaper' },
    { name: 'Editions', path: '/editions' },
    { name: 'Archives', path: '/archives' },
  ];

  return (
    <header className="bg-white border-b border-slate-300 sticky top-0 z-40 shadow-xs font-sans">
      {/* Clean White Newspaper Header Bar (Matching Screenshot 1) */}
      <div className="py-4 px-4 sm:px-8 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          
          {/* Public Mood Logo */}
          <Link to="/" className="flex items-center group py-1">
            <img
              src="/public-mood-logo.jpg"
              alt="Public Mood Logo"
              className="h-16 sm:h-24 md:h-28 w-auto object-contain transition transform group-hover:scale-102"
            />
          </Link>


        </div>
      </div>

      {/* Date & Sub-Navigation Bar (Matching Screenshot 1 & 2) */}
      <div className="bg-white border-b border-slate-200 py-2.5 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">

          {/* Date Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-800 hover:text-[#1e40af] transition cursor-pointer"
            >
              <span>{formattedDateLabel}</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>

            {isDatePickerOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDatePickerOpen(false)} />
                <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-300 rounded-xl shadow-xl z-50 p-2 text-xs">
                  <div className="px-3 py-1.5 font-bold text-slate-400 uppercase text-[10px] border-b border-slate-100">
                    Select Date
                  </div>
                  <div className="space-y-1 mt-1">
                    {dateOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSelectedDate(opt.value);
                          setIsDatePickerOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg font-bold transition ${
                          selectedDate === opt.value ? 'bg-[#1e40af] text-white' : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Input */}
      {isSearchOpen && (
        <div className="p-3 bg-slate-100 border-b border-slate-200">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Search district, e-paper..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-md"
              autoFocus
            />
            <button type="submit" className="bg-[#1e40af] text-white px-4 py-2 text-sm font-bold rounded-md">
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-bold uppercase text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-200">
            <Link
              to="/admin/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#0b1d3a] text-white font-bold py-2 rounded-lg text-sm"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
