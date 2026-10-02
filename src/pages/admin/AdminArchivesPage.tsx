import React from 'react';
import { useData } from '../../context/DataContext';
import { Archive, Eye, Trash2, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminArchivesPage: React.FC = () => {
  const { epapers } = useData();

  const archivedEpapers = epapers.filter(ep => ep.status === 'archived' || new Date(ep.date) < new Date('2026-10-02'));

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-serif text-[#0b1d3a]">E-Paper Archive Management</h1>
          <p className="text-xs text-slate-500">Historical publications repository &amp; archival records</p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
          {archivedEpapers.length} Archived Issues
        </span>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                <th className="p-4">Date</th>
                <th className="p-4">Edition</th>
                <th className="p-4">State &amp; District</th>
                <th className="p-4">Pages</th>
                <th className="p-4">Readers</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {archivedEpapers.map(ep => (
                <tr key={ep.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-mono font-bold text-slate-900">{ep.date}</td>
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <Archive className="w-4 h-4 text-amber-500" />
                    <span>{ep.editionName}</span>
                  </td>
                  <td className="p-4 text-slate-700">{ep.stateName} • {ep.subEditionName}</td>
                  <td className="p-4 font-bold">{ep.totalPages} Pages</td>
                  <td className="p-4 text-slate-900 font-bold">{(ep.readers || 0).toLocaleString()} Readers</td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/epaper/reader/${ep.id}`}
                      className="bg-[#1e40af] hover:bg-[#0b1d3a] text-white text-[11px] font-bold px-3 py-1 rounded transition"
                    >
                      Read Archive
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
