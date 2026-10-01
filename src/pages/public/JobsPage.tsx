import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, IndianRupee, Search, ChevronDown, ExternalLink, Building2 } from 'lucide-react';

const JOBS = [
  { id: 1, title: 'Software Engineer', titleTe: 'సాఫ్ట్‌వేర్ ఇంజినీర్', company: 'TCS Hyderabad', location: 'హైదరాబాద్', salary: '8-14 LPA', type: 'Full-time', exp: '2-4 years', category: 'IT', posted: '2 గంటల క్రితం', logo: 'TCS', urgent: true },
  { id: 2, title: 'Bank PO - IBPS', titleTe: 'బ్యాంక్ PO - IBPS', company: 'State Bank of India', location: 'తెలంగాణ అంతటా', salary: '₹36,000-₹63,000/నెల', type: 'Government', exp: 'Fresher', category: 'Banking', posted: '1 రోజు క్రితం', logo: 'SBI', urgent: true },
  { id: 3, title: 'Civil Engineer', titleTe: 'సివిల్ ఇంజినీర్', company: 'HMDA Projects', location: 'హైదరాబాద్', salary: '6-10 LPA', type: 'Government', exp: '1-3 years', category: 'Engineering', posted: '3 రోజుల క్రితం', logo: 'HMDA', urgent: false },
  { id: 4, title: 'Data Analyst', titleTe: 'డేటా అనలిస్ట్', company: 'Infosys', location: 'హైదరాబాద్, పుణె', salary: '7-12 LPA', type: 'Full-time', exp: '1-3 years', category: 'IT', posted: '5 గంటల క్రితం', logo: 'INFY', urgent: false },
  { id: 5, title: 'Teacher - TET', titleTe: 'ఉపాధ్యాయుడు - TET', company: 'AP Govt Schools', location: 'ఆంధ్రప్రదేశ్', salary: '₹28,000-₹44,000/నెల', type: 'Government', exp: 'TET Qualified', category: 'Education', posted: '2 రోజుల క్రితం', logo: 'GOVT', urgent: true },
  { id: 6, title: 'Nursing Staff', titleTe: 'నర్సింగ్ స్టాఫ్', company: 'AIIMS Hyderabad', location: 'హైదరాబాద్', salary: '₹32,000-₹48,000/నెల', type: 'Government', exp: 'B.Sc Nursing', category: 'Healthcare', posted: '1 రోజు క్రితం', logo: 'AIIMS', urgent: false },
  { id: 7, title: 'Product Manager', titleTe: 'ప్రొడక్ట్ మేనేజర్', company: 'Amazon', location: 'హైదరాబాద్', salary: '25-40 LPA', type: 'Full-time', exp: '5-8 years', category: 'IT', posted: '6 గంటల క్రితం', logo: 'AMZ', urgent: false },
  { id: 8, title: 'Police Constable', titleTe: 'పోలీసు కానిస్టేబుల్', company: 'Telangana Police Dept', location: 'తెలంగాణ', salary: '₹22,000-₹35,000/నెల', type: 'Government', exp: 'TSLPRB', category: 'Police', posted: '4 రోజుల క్రితం', logo: 'TS', urgent: true },
];

const CATEGORIES_LIST = ['అన్నీ', 'IT', 'Banking', 'Engineering', 'Education', 'Healthcare', 'Police', 'Government'];
const TYPE_LIST = ['అన్నీ', 'Full-time', 'Government', 'Contract'];

const typeColors: Record<string, string> = {
  'Full-time': 'bg-blue-50 text-blue-700 border-blue-200',
  'Government': 'bg-orange-50 text-orange-700 border-orange-200',
  'Contract': 'bg-purple-50 text-purple-700 border-purple-200',
};

export const JobsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('అన్నీ');
  const [activeType, setActiveType] = useState('అన్నీ');
  const [applied, setApplied] = useState<Set<number>>(new Set());
  const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);
  const [showToast, setShowToast] = useState(false);

  const filtered = JOBS.filter(j => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.titleTe.includes(search) || j.company.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'అన్నీ' || j.category === activeCategory;
    const matchType = activeType === 'అన్నీ' || j.type === activeType;
    return matchSearch && matchCat && matchType;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-blue-400" /> ఉద్యోగ అవకాశాలు
          </h1>
          <p className="text-slate-400 text-sm mb-6">తెలంగాణ & ఆంధ్రప్రదేశ్‌లో తాజా ఉద్యోగ అవకాశాలు</p>
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ఉద్యోగం, కంపెనీ వెతకండి..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/30 shadow-lg placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {CATEGORIES_LIST.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600 border-slate-200 hover:border-red-300'
                }`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            {TYPE_LIST.map(t => (
              <button key={t} onClick={() => setActiveType(t)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  activeType === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6 flex items-center gap-6 text-sm">
          <span className="text-blue-700 font-semibold">{filtered.length} ఉద్యోగాలు</span>
          <span className="text-slate-500">ఈ వారం {JOBS.filter(j => j.urgent).length} అర్జెంట్ పోస్టింగ్‌లు</span>
          <span className="ml-auto text-slate-500 text-xs">నవీకరించబడింది: ఈరోజు 9:00 AM</span>
        </div>

        {/* Jobs list */}
        <div className="space-y-4">
          {filtered.map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all p-5 group">
              <div className="flex gap-4">
                {/* Logo */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-600 text-sm shadow-sm">
                  {job.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-700 transition-colors">{job.titleTe}</h3>
                        {job.urgent && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold border border-red-200">URGENT</span>
                        )}
                      </div>
                      <p className="text-slate-500 text-sm font-medium flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" /> {job.company}
                      </p>
                    </div>
                    <span className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full border ${typeColors[job.type] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {job.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-2 mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-red-400" /> {job.location}</span>
                    <span className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5 text-green-500" /> {job.salary}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-blue-400" /> {job.exp}</span>
                    <span className="flex items-center gap-1 ml-auto"><Clock className="w-3.5 h-3.5" /> {job.posted}</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setApplied(prev => new Set([...prev, job.id]));
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 2500);
                      }}
                      className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                        applied.has(job.id)
                          ? 'bg-green-100 text-green-700 border border-green-200 cursor-default'
                          : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                      }`}
                    >
                      {applied.has(job.id) ? '✓ దరఖాస్తు చేయబడింది' : 'ఇప్పుడు దరఖాస్తు చేయండి'}
                    </button>
                    <button 
                      onClick={() => setSelectedJob(job)}
                      className="px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" /> వివరాలు
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Briefcase className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500">ఉద్యోగాలు కనుగొనబడలేదు</p>
            </div>
          )}
        </div>
      </div>

      {/* Applied Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-in fade-in">
          <span>✓ మీ దరఖాస్తు విజయవంతంగా స్వీకరించబడింది!</span>
        </div>
      )}

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                  {selectedJob.category} • {selectedJob.type}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-telugu mt-1.5">{selectedJob.titleTe}</h3>
                <p className="text-sm text-slate-500">{selectedJob.company} • {selectedJob.location}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <p><strong>వేతన శ్రేణి:</strong> {selectedJob.salary}</p>
                <p><strong>అనుభవం:</strong> {selectedJob.exp}</p>
                <p><strong>ప్రాంతం:</strong> {selectedJob.location}</p>
                <p><strong>పోస్టింగ్ సమయం:</strong> {selectedJob.posted}</p>
              </div>
              <p className="leading-relaxed">
                ఈ ఉద్యోగానికి సంబంధించిన అధికారిక నోటిఫికేషన్ మరియు అర్హతల ప్రమాణాలు వెరిఫై చేయబడ్డాయి. ఆసక్తిగల అభ్యర్థులు తమ రెజ్యూమ్‌ను సమర్పించవచ్చు.
              </p>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedJob(null)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                మూసివేయి
              </button>
              <button
                onClick={() => {
                  setApplied(prev => new Set([...prev, selectedJob.id]));
                  setSelectedJob(null);
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 2500);
                }}
                className="flex-1 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md cursor-pointer"
              >
                {applied.has(selectedJob.id) ? '✓ దరఖాస్తు పూర్తయింది' : 'ఇప్పుడే దరఖాస్తు చేయండి'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
