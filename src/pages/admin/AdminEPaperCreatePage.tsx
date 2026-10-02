import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { generateNewspaperSVG } from '../../utils/generateNewspaperPageSVG';
import { ArrowLeft, Upload, FileText, CheckCircle, Info, Eye } from 'lucide-react';

export const AdminEPaperCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { states, subEditions, editions, addEPaper } = useData();

  const [stateId, setStateId] = useState(states[0]?.id || '');
  const [subEditionId, setSubEditionId] = useState(subEditions[0]?.id || '');
  const [editionId, setEditionId] = useState(editions[0]?.id || '');
  const [date, setDate] = useState('2026-10-02');
  const [volume, setVolume] = useState('Vol 01');
  const [issue, setIssue] = useState('Issue 366');
  const [totalPages, setTotalPages] = useState(12);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const activeSubEditions = subEditions.filter(se => se.stateId === stateId);
  const activeEditions = editions.filter(ed => ed.subEditionId === subEditionId);

  const stateObj = states.find(s => s.id === stateId);
  const subObj = subEditions.find(se => se.id === subEditionId);
  const editionObj = editions.find(e => e.id === editionId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handlePublish = (status: 'published' | 'draft') => {
    const title = `Public Mood ${editionObj?.name || 'Edition'} - ${date}`;
    const edName = editionObj?.name || 'Main Edition';
    const subName = subObj?.name || 'District';
    const stateName = stateObj?.name || 'State';

    // Generate high quality demo SVG pages
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push({
        pageNumber: i,
        imageUrl: generateNewspaperSVG(i, `${subName} (${edName})`, date, `${volume} | ${issue}`, totalPages),
        title: i === 1 ? 'Front Page' : `Page ${i}`,
        category: 'District',
        viewsCount: 1,
        uniqueReaders: 1,
        avgTimeSeconds: 120
      });
    }

    const newEpaper = addEPaper({
      title,
      date,
      stateId,
      subEditionId,
      editionId,
      stateName,
      subEditionName: subName,
      editionName: edName,
      volume,
      issue,
      totalPages,
      pages,
      coverImage: pages[0].imageUrl,
      pdfUrl: selectedFile ? URL.createObjectURL(selectedFile) : '/samples/public-mood-hyderabad-02-10-2026.pdf',
      fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '12.5 MB',
      status
    });

    setIsSuccess(true);
    setTimeout(() => {
      navigate('/admin/epapers');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      <Link
        to="/admin/epapers"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-700 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to E-Papers</span>
      </Link>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-2xl font-black font-serif text-[#0b1d3a]">Upload &amp; Create E-Paper</h1>
            <p className="text-xs text-slate-500">Add a new daily digital newspaper issue to the platform</p>
          </div>
          <span className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold">
            LOCAL DEMO UPLOAD
          </span>
        </div>

        {isSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex items-center gap-2 font-bold animate-in fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>E-Paper created and published successfully! Redirecting to list...</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">State</label>
            <select
              value={stateId}
              onChange={(e) => setStateId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {states.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sub Edition / District</label>
            <select
              value={subEditionId}
              onChange={(e) => setSubEditionId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {activeSubEditions.map(se => (
                <option key={se.id} value={se.id}>{se.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Master Edition</label>
            <select
              value={editionId}
              onChange={(e) => setEditionId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {activeEditions.map(ed => (
                <option key={ed.id} value={ed.id}>{ed.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Publication Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Volume &amp; Issue</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="Vol 01"
                className="w-1/2 px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold"
              />
              <input
                type="text"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Issue 366"
                className="w-1/2 px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Total Page Count</label>
            <input
              type="number"
              min={1}
              max={32}
              value={totalPages}
              onChange={(e) => setTotalPages(Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        {/* PDF File Upload Zone */}
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 rounded-2xl p-8 text-center space-y-3 transition">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <label htmlFor="pdf-upload" className="cursor-pointer text-sm font-bold text-blue-700 hover:underline">
              Choose PDF Newspaper File
            </label>
            <input
              id="pdf-upload"
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-xs text-slate-400 mt-1">Supports high-res PDF or image documents</p>
          </div>

          {selectedFile ? (
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-4 py-2 rounded-xl text-xs font-bold">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>{selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)</span>
            </div>
          ) : (
            <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg max-w-sm mx-auto font-medium">
              Demo Mode: If no file selected, high-res sample e-paper will be generated automatically.
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => handlePublish('draft')}
            className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition"
          >
            Save Draft
          </button>
          <button
            onClick={() => handlePublish('published')}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition shadow-md"
          >
            PUBLISH E-PAPER
          </button>
        </div>
      </div>
    </div>
  );
};
