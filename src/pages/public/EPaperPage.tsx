import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MockEPaperService } from '../../services/mockEPaperService';
import { EPaper } from '../../types';
import { FileText, BookOpen, Download, Calendar, MapPin, Search, ChevronRight, Archive } from 'lucide-react';
import { AdBanner } from '../../components/common/AdBanner';

export const EPaperPage: React.FC = () => {
  const [editions, setEditions] = useState<EPaper[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    setEditions(MockEPaperService.getAll());
  }, []);

  const todayEdition = editions.find(e => e.status === 'published') || editions[0];
  const previousEditions = editions.filter(e => e.id !== todayEdition?.id);

  const filteredArchives = previousEditions.filter(ed => {
    const matchDistrict = selectedDistrict === 'all' || ed.district.toLowerCase().includes(selectedDistrict.toLowerCase());
    const matchDate = !selectedDate || ed.date === selectedDate;
    return matchDistrict && matchDate;
  });

  const districts = ['all', 'Hyderabad', 'Vijayawada / Amaravati', 'Visakhapatnam', 'Warangal', 'Tirupati'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
        <Link to="/" className="hover:text-red-600">హోమ్</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 font-bold">జనతా వాణి ఈ-పేపర్ (E-Paper)</span>
      </div>

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Today Cover Feature */}
          {todayEdition && (
            <div className="md:col-span-5 flex justify-center">
              <div className="relative group max-w-xs shadow-2xl rounded-xl overflow-hidden border-4 border-white/20">
                <img
                  src={todayEdition.coverImage}
                  alt={todayEdition.editionNameTe}
                  className="w-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                  <Link
                    to={`/epaper/${todayEdition.id}`}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-full shadow-lg flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" /> పూర్తి పేపర్ చదవండి
                  </Link>
                  <a
                    href={todayEdition.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => MockEPaperService.incrementDownloads(todayEdition.id)}
                    className="px-5 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-full border border-white/30 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> PDF డౌన్‌లోడ్
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-red-600/30 text-red-300 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>నేటి తాజా సంచిక ({todayEdition?.date})</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-telugu text-white">
              {todayEdition?.editionNameTe}
            </h1>

            <p className="text-xs sm:text-base text-slate-300 font-telugu leading-relaxed">
              అసలైన వార్తాపత్రిక అనుభూతిని మీ స్క్రీన్‌పై పొందండి. పేజీల వారీగా జూమ్ చేసుకుని స్పష్టంగా చదవడానికి కింద ఇచ్చిన రీడ్ బటన్ క్లిక్ చేయండి.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              {todayEdition && (
                <>
                  <Link
                    to={`/epaper/${todayEdition.id}`}
                    className="px-7 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>నేటి ఈ-పేపర్ చదవండి</span>
                  </Link>

                  <a
                    href={todayEdition.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => MockEPaperService.incrementDownloads(todayEdition.id)}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>పీడీఎఫ్ డౌన్‌లోడ్</span>
                  </a>
                </>
              )}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800">
              <span>మొత్తం పేజీలు: <strong className="text-white">{todayEdition?.totalPages}</strong></span>
              <span>•</span>
              <span>వీక్షణలు: <strong className="text-white">{todayEdition?.views.toLocaleString()}</strong></span>
              <span>•</span>
              <span>డౌన్‌లోడ్లు: <strong className="text-white">{todayEdition?.downloads.toLocaleString()}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6">
        <AdBanner placement="home-middle" />
      </div>

      {/* Archives Section */}
      <section className="mt-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-red-600" />
            <h2 className="text-xl sm:text-2xl font-black font-telugu text-slate-900">
              గత సంచికలు & జిల్లా ఎడిషన్లు (Archive Editions)
            </h2>
          </div>

          {/* District & Date Filters */}
          <div className="flex flex-wrap items-center gap-3 text-xs w-full sm:w-auto">
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              {districts.map(d => (
                <option key={d} value={d}>
                  {d === 'all' ? 'అన్ని జిల్లాలు' : d}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Editions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredArchives.map(ed => (
            <div
              key={ed.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <Link to={`/epaper/${ed.id}`} className="block relative aspect-[3/4] overflow-hidden bg-slate-100">
                  <img
                    src={ed.coverImage}
                    alt={ed.editionNameTe}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {ed.totalPages} పేజీలు
                  </span>
                </Link>
                <div className="p-3">
                  <div className="text-[10px] text-red-600 font-bold mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {ed.date}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2">
                    {ed.editionNameTe}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{ed.district}</p>
                </div>
              </div>

              <div className="p-3 pt-0 border-t border-slate-50 flex items-center justify-between text-xs mt-2">
                <Link
                  to={`/epaper/${ed.id}`}
                  className="font-bold text-red-600 hover:underline flex items-center gap-1 text-[11px]"
                >
                  <BookOpen className="w-3.5 h-3.5" /> చదవండి
                </Link>
                <a
                  href={ed.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => MockEPaperService.incrementDownloads(ed.id)}
                  className="text-slate-500 hover:text-slate-800 p-1"
                  title="డౌన్‌లోడ్"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
