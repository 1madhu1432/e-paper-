import React, { useState } from 'react';
import { Mail, CheckCircle, Bell, TrendingUp, Newspaper, Briefcase, ChevronRight } from 'lucide-react';

const TOPICS = [
  { id: 'breaking', icon: Bell, label: 'బ్రేకింగ్ న్యూస్', desc: 'అత్యవసర వార్తలు వెంటనే' },
  { id: 'politics', icon: TrendingUp, label: 'రాజకీయాలు', desc: 'రాజకీయ విశ్లేషణలు' },
  { id: 'morning', icon: Newspaper, label: 'మార్నింగ్ బ్రీఫింగ్', desc: 'ప్రతిరోజూ ఉదయం 7 గంటలకు' },
  { id: 'jobs', icon: Briefcase, label: 'ఉద్యోగ అలర్ట్స్', desc: 'తాజా ఉద్యోగ అవకాశాలు' },
];

const FREQUENCIES = ['వెంటనే', 'రోజువారీ', 'వారపు', 'నెలవారీ'];

export const NewsletterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['morning']);
  const [frequency, setFrequency] = useState('రోజువారీ');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">సభ్యత్వం స్వీకరించబడింది!</h2>
          <p className="text-slate-500 mb-2">{email} కు నిర్ధారణ మెయిల్ పంపబడింది.</p>
          <p className="text-slate-400 text-sm mb-8">ఇప్పటి నుండి మీకు ఎంచుకున్న అంశాలపై వార్తలు అందుతాయి.</p>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6">
            <p className="text-slate-500 text-sm mb-3 font-medium">మీరు సభ్యత్వం తీసుకున్నారు:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedTopics.map(t => {
                const topic = TOPICS.find(tp => tp.id === t);
                return topic ? (
                  <span key={t} className="bg-red-50 text-red-700 text-sm px-3 py-1 rounded-full border border-red-200">{topic.label}</span>
                ) : null;
              })}
            </div>
          </div>
          <button onClick={() => { setSubmitted(false); setEmail(''); }}
            className="text-red-600 hover:text-red-700 font-medium text-sm">
            వేరే ఇమెయిల్ నమోదు చేయండి
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 py-16 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">న్యూస్‌లెటర్ సభ్యత్వం</h1>
          <p className="text-red-200 leading-relaxed">
            తెలుగు వార్తలు, విశ్లేషణలు నేరుగా మీ ఇన్‌బాక్స్‌కు. ఉచితంగా, ప్రతిరోజూ.
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">ఇమెయిల్ చిరునామా</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="yourname@example.com"
                className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 text-slate-900"
              />
            </div>
          </div>

          {/* Topic selection */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-4">అంశాలు ఎంచుకోండి</label>
            <div className="space-y-3">
              {TOPICS.map(({ id, icon: Icon, label, desc }) => (
                <label key={id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedTopics.includes(id)
                      ? 'border-red-500 bg-red-50'
                      : 'border-slate-100 hover:border-red-200 bg-slate-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selectedTopics.includes(id) ? 'bg-red-600' : 'bg-white border border-slate-200'}`}>
                    <Icon className={`w-5 h-5 ${selectedTopics.includes(id) ? 'text-white' : 'text-slate-500'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800 text-sm">{label}</div>
                    <div className="text-slate-500 text-xs">{desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(id)}
                    onChange={() => toggleTopic(id)}
                    className="w-5 h-5 accent-red-600 rounded"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-4">పంపించే పౌనఃపున్యం</label>
            <div className="grid grid-cols-2 gap-3">
              {FREQUENCIES.map(f => (
                <button type="button" key={f} onClick={() => setFrequency(f)}
                  className={`py-3 rounded-xl font-medium text-sm transition-all border-2 ${
                    frequency === f ? 'border-red-500 bg-red-600 text-white' : 'border-slate-200 text-slate-600 hover:border-red-300'
                  }`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!email || selectedTopics.length === 0 || loading}
            className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-3"
          >
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> నమోదు అవుతోంది...</>
            ) : (
              <><Mail className="w-5 h-5" /> ఉచితంగా సభ్యత్వం తీసుకోండి <ChevronRight className="w-5 h-5" /></>
            )}
          </button>

          <p className="text-center text-xs text-slate-400">
            మీ ఇమెయిల్ సురక్షితం. ఎప్పుడైనా సభ్యత్వం రద్దు చేయవచ్చు.
          </p>
        </form>
      </div>
    </div>
  );
};
