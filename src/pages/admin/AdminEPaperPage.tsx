import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Newspaper, Plus, Eye, Download, Share2, Trash2, Edit, CheckCircle, Clock, Archive } from 'lucide-react';

export const AdminEPaperPage: React.FC = () => {
  const navigate = useNavigate();
  const { epapers, updateEPaper, deleteEPaper } = useData();

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black font-serif text-[#0b1d3a]">E-Paper Management</h1>
          <p className="text-xs text-slate-500">Manage published digital e-papers, drafts, and archives</p>
        </div>

        <Link
          to="/admin/epapers/create"
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-lg text-xs transition flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New E-Paper</span>
        </Link>
      </div>

      {/* E-Papers Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                <th className="p-4">Publication Date</th>
                <th className="p-4">Edition Details</th>
                <th className="p-4">State &amp; District</th>
                <th className="p-4">Pages</th>
                <th className="p-4">Readers &amp; Views</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {epapers.map(ep => (
                <tr key={ep.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-bold text-slate-900 font-mono">
                    {ep.date}
                  </td>
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
                    <img src={ep.coverImage} alt={ep.title} className="w-10 h-14 rounded object-cover border" />
                    <div>
                      <span className="block font-serif text-sm font-extrabold text-[#0b1d3a]">{ep.editionName}</span>
                      <span className="text-[10px] text-slate-400">{ep.volume} • {ep.issue}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="block font-bold text-blue-700">{ep.stateName}</span>
                    <span className="text-[10px] text-slate-500">{ep.subEditionName}</span>
                  </td>
                  <td className="p-4 font-bold text-slate-800">{ep.totalPages} Pages</td>
                  <td className="p-4 space-y-0.5 text-[11px]">
                    <div className="text-slate-900 font-bold">{(ep.readers || 0).toLocaleString()} Readers</div>
                    <div className="text-slate-500">{ep.views.toLocaleString()} Pageviews</div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => updateEPaper(ep.id, {
                        status: ep.status === 'published' ? 'draft' : 'published'
                      })}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                        ep.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ep.status === 'published' ? <CheckCircle className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
                      <span>{ep.status}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-1.5">
                    <Link
                      to={`/epaper/reader/${ep.id}`}
                      className="p-1.5 inline-block text-blue-600 hover:bg-blue-50 rounded transition"
                      title="View Reader"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => updateEPaper(ep.id, { status: 'archived' })}
                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition"
                      title="Archive E-Paper"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteEPaper(ep.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                      title="Delete E-Paper"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
