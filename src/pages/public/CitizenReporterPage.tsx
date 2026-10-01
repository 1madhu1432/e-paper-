import React, { useState } from 'react';
import { Camera, Mic, Send, CheckCircle, AlertTriangle, MapPin, Phone, User, FileText } from 'lucide-react';

const TIPS_SUBMITTED = [
  { id: 1, title: 'రహదారి గుంతలు - కుషాయిగూడ', location: 'హైదరాబాద్', status: 'published', time: '2 గంటల క్రితం' },
  { id: 2, title: 'నీటి సరఫరా లేదు - మేడ్చల్', location: 'మేడ్చల్', status: 'under_review', time: '5 గంటల క్రితం' },
  { id: 3, title: 'చెట్టు కూలింది - సికింద్రాబాద్', location: 'సికింద్రాబాద్', status: 'published', time: '1 రోజు క్రితం' },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  published: { label: 'ప్రచురించబడింది', color: 'bg-green-100 text-green-700 border-green-200' },
  under_review: { label: 'సమీక్షలో ఉంది', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  rejected: { label: 'తిరస్కరించబడింది', color: 'bg-red-100 text-red-700 border-red-200' },
};

export const CitizenReporterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: '', phone: '', location: '', title: '', description: '', category: 'politics', anonymous: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-600 to-red-700 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">పౌర జర్నలిస్ట్</h1>
          <p className="text-orange-100 text-sm max-w-lg mx-auto">మీ ప్రాంతంలో జరిగే సంఘటనలు, సమస్యలు మాకు నివేదించండి. మీరే మా రిపోర్టర్!</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-800 mb-2">మీ నివేదిక స్వీకరించబడింది!</h2>
              <p className="text-slate-500 text-sm mb-4">మా సంపాదక బృందం సమీక్షించిన తర్వాత ప్రచురిస్తారు. ధన్యవాదాలు!</p>
              <p className="text-slate-400 text-xs mb-6">రిఫరెన్స్ నంబర్: JV-{Math.floor(Math.random() * 90000) + 10000}</p>
              <button onClick={() => { setSubmitted(false); setStep(1); setForm({ name: '', phone: '', location: '', title: '', description: '', category: 'politics', anonymous: false }); }}
                className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-red-700 transition-colors">
                మరొక నివేదిక పంపండి
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Steps */}
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center gap-4">
                {[1, 2, 3].map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {s}
                    </div>
                    <span className={`text-sm hidden sm:block ${step >= s ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                      {s === 1 ? 'మీ వివరాలు' : s === 2 ? 'సమాచారం' : 'పంపించు'}
                    </span>
                    {s < 3 && <div className={`h-0.5 w-8 ${step > s ? 'bg-red-600' : 'bg-slate-200'}`} />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">మీ వివరాలు</h2>
                    <label className="flex items-center gap-2 text-sm text-slate-600 mb-4 cursor-pointer">
                      <input type="checkbox" name="anonymous" checked={form.anonymous} onChange={handleChange}
                        className="w-4 h-4 accent-red-600" />
                      అనామకంగా నివేదించాలి (మీ పేరు చూపించబడదు)
                    </label>
                    {!form.anonymous && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">పేరు <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" name="name" value={form.name} onChange={handleChange} required={!form.anonymous}
                              placeholder="మీ పూర్తి పేరు"
                              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">ఫోన్ నంబర్</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                              placeholder="+91 XXXXX XXXXX"
                              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400" />
                          </div>
                        </div>
                      </>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">స్థానం <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" name="location" value={form.location} onChange={handleChange} required
                          placeholder="జిల్లా, మండలం, గ్రామం"
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400" />
                      </div>
                    </div>
                    <button type="button" onClick={() => setStep(2)}
                      disabled={!form.location || (!form.anonymous && !form.name)}
                      className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2">
                      తదుపరి →
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">సమాచారం నమోదు చేయండి</h2>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">వర్గం</label>
                      <select name="category" value={form.category} onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 bg-white">
                        <option value="politics">రాజకీయాలు</option>
                        <option value="crime">నేరాలు</option>
                        <option value="infrastructure">మౌలిక సదుపాయాలు</option>
                        <option value="environment">పర్యావరణం</option>
                        <option value="corruption">అవినీతి</option>
                        <option value="other">ఇతర</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">శీర్షిక <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input type="text" name="title" value={form.title} onChange={handleChange} required
                          placeholder="సంఘటన గురించి సంక్షిప్తంగా..."
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">వివరణ <span className="text-red-500">*</span></label>
                      <textarea name="description" value={form.description} onChange={handleChange} required rows={5}
                        placeholder="జరిగిన సంఘటన గురించి వివరంగా వ్రాయండి..."
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 resize-none" />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedFileName(e.target.files[0].name);
                        }
                      }}
                    />
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-red-400 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Camera className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      {uploadedFileName ? (
                        <div>
                          <p className="text-emerald-700 font-bold text-sm">✓ ఎంపిక చేయబడింది: {uploadedFileName}</p>
                          <p className="text-slate-400 text-xs mt-1">వేరే ఫైల్ ఎంచుకోవడానికి ఇక్కడ క్లిక్ చేయండి</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-slate-700 font-bold text-sm">ఫోటోలు / వీడియోలు అప్‌లోడ్ చేయండి</p>
                          <p className="text-slate-400 text-xs mt-1">JPG, PNG, MP4 (max 50MB) - ఇక్కడ క్లిక్ చేయండి</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(1)}
                        className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                        ← వెనక్కి
                      </button>
                      <button type="button" onClick={() => setStep(3)}
                        disabled={!form.title || !form.description}
                        className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors">
                        సమీక్షించు →
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 mb-4">నివేదికను సమీక్షించండి</h2>
                    <div className="bg-slate-50 rounded-xl p-4 space-y-3 mb-6 border border-slate-100">
                      <div className="flex gap-2"><span className="text-slate-500 text-sm w-24 shrink-0">స్థానం:</span><span className="text-slate-800 text-sm font-medium">{form.location}</span></div>
                      <div className="flex gap-2"><span className="text-slate-500 text-sm w-24 shrink-0">శీర్షిక:</span><span className="text-slate-800 text-sm font-medium">{form.title}</span></div>
                      <div className="flex gap-2"><span className="text-slate-500 text-sm w-24 shrink-0">వివరణ:</span><span className="text-slate-800 text-sm">{form.description.slice(0, 100)}...</span></div>
                      {!form.anonymous && <div className="flex gap-2"><span className="text-slate-500 text-sm w-24 shrink-0">నివేదికదారు:</span><span className="text-slate-800 text-sm font-medium">{form.name}</span></div>}
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 flex gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-amber-700 text-xs">మీరు నమోదు చేసిన సమాచారం నిజమైనదని ధృవీకరిస్తున్నారు. తప్పుడు నివేదికలు స్వీకరించబడవు.</p>
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(2)}
                        className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                        ← వెనక్కి
                      </button>
                      <button type="submit"
                        className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" /> నివేదిక పంపించు
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent tips */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">తాజా నివేదికలు</h3>
            <div className="space-y-3">
              {TIPS_SUBMITTED.map(tip => (
                <div key={tip.id} className="border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                  <p className="text-slate-700 text-sm font-medium leading-snug mb-1">{tip.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{tip.location}</span>
                    <span className={`text-xs px-2 py-0.5 rounded border font-medium ${statusLabels[tip.status]?.color}`}>
                      {statusLabels[tip.status]?.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-orange-50 rounded-2xl border border-orange-100 p-5">
            <h3 className="font-bold text-orange-800 mb-3 text-sm">నివేదిక మార్గదర్శకాలు</h3>
            <ul className="space-y-2 text-orange-700 text-xs">
              <li className="flex gap-2">✓ వాస్తవ సమాచారం మాత్రమే నివేదించండి</li>
              <li className="flex gap-2">✓ స్పష్టమైన ఫోటోలు / వీడియోలు పంపండి</li>
              <li className="flex gap-2">✓ స్థలం మరియు సమయం పేర్కొనండి</li>
              <li className="flex gap-2">✗ వ్యక్తిగత దాడులు, అసభ్య భాష వద్దు</li>
              <li className="flex gap-2">✗ రాజకీయ ప్రచారం స్వీకరించబడదు</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
