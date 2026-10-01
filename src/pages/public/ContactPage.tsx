import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, Clock } from 'lucide-react';

const OFFICES = [
  { city: 'హైదరాబాద్ (ప్రధాన కార్యాలయం)', address: '42, మీడియా హబ్, బంజారా హిల్స్, హైదరాబాద్ - 500034', phone: '+91-40-2354-6789', email: 'editor@janathavaani.com' },
  { city: 'విజయవాడ', address: '15, నంది వీధి, సుభాష్ చౌక్, విజయవాడ - 520002', phone: '+91-866-234-5678', email: 'vijayawada@janathavaani.com' },
  { city: 'విశాఖపట్నం', address: '7, బీచ్ రోడ్, వెల్తూరు నగర్, విశాఖ - 530002', phone: '+91-891-234-5678', email: 'vizag@janathavaani.com' },
];

const DEPARTMENTS = ['సంపాదకీయ విభాగం', 'ప్రకటనలు', 'సాంకేతిక సహాయం', 'సభ్యత్వం', 'ఫీడ్‌బ్యాక్', 'ఇతర'];

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', dept: 'సంపాదకీయ విభాగం', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-red-950 py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <MessageSquare className="w-8 h-8 text-red-400" /> మమ్మల్ని సంప్రదించండి
        </h1>
        <p className="text-slate-400 max-w-md mx-auto text-sm">మీ అభిప్రాయాలు, ఫిర్యాదులు, ప్రకటన విచారణలకు దిగువ ఫారమ్ పూరించండి</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Contact info */}
        <div className="space-y-5">
          {/* Quick contact */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-bold text-slate-800 mb-4">తక్షణ సంప్రదింపు</h3>
            <div className="space-y-3">
              <a href="tel:+914023546789" className="flex items-center gap-3 text-slate-600 hover:text-red-600 transition-colors group">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <Phone className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">హెల్ప్‌లైన్</div>
                  <div className="font-medium text-sm">+91-40-2354-6789</div>
                </div>
              </a>
              <a href="mailto:editor@janathavaani.com" className="flex items-center gap-3 text-slate-600 hover:text-red-600 transition-colors group">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <Mail className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">సంపాదకుడు</div>
                  <div className="font-medium text-sm">editor@janathavaani.com</div>
                </div>
              </a>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">కార్యాలయ సమయాలు</div>
                  <div className="font-medium text-sm">24/7 న్యూస్‌రూమ్</div>
                </div>
              </div>
            </div>
          </div>

          {/* Offices */}
          {OFFICES.map(office => (
            <div key={office.city} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" /> {office.city}
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-2">{office.address}</p>
              <p className="text-slate-500 text-xs">{office.phone}</p>
              <p className="text-red-600 text-xs">{office.email}</p>
            </div>
          ))}
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center h-full flex flex-col items-center justify-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-800 mb-2">మీ సందేశం స్వీకరించబడింది!</h2>
              <p className="text-slate-500 text-sm mb-6">మేము 24 గంటల్లో మీకు సమాధానం ఇస్తాం. ధన్యవాదాలు!</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', dept: 'సంపాదకీయ విభాగం', subject: '', message: '' }); }}
                className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-red-700 transition-colors">
                మరో సందేశం పంపు
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7">
              <h2 className="text-lg font-bold text-slate-800 mb-6">సందేశం పంపండి</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">పేరు <span className="text-red-500">*</span></label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder="మీ పేరు" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ఇమెయిల్ <span className="text-red-500">*</span></label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange}
                      placeholder="your@email.com" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ఫోన్</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">విభాగం</label>
                    <select name="dept" value={form.dept} onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 bg-white">
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">విషయం <span className="text-red-500">*</span></label>
                  <input type="text" name="subject" required value={form.subject} onChange={handleChange}
                    placeholder="మీ సందేశం యొక్క విషయం" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">సందేశం <span className="text-red-500">*</span></label>
                  <textarea name="message" required value={form.message} onChange={handleChange} rows={6}
                    placeholder="మీ సందేశం వివరంగా రాయండి..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 resize-none" />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-3 disabled:opacity-60">
                  {loading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> పంపుతోంది...</> : <><Send className="w-5 h-5" /> సందేశం పంపండి</>}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
