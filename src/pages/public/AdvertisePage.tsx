import React, { useState } from 'react';
import { TrendingUp, BarChart3, Users, Eye, CheckCircle, Download, Phone, Mail, ChevronRight } from 'lucide-react';

const AD_FORMATS = [
  { name: 'హోమ్‌పేజ్ బ్యానర్', size: '970×250px', reach: '5L+/రోజు', price: '₹50,000/వారం', hot: true },
  { name: 'ఆర్టికల్ ఇన్‌ఫీడ్', size: '728×90px', reach: '3L+/రోజు', price: '₹25,000/వారం', hot: false },
  { name: 'సైడ్‌బార్ (300×600)', size: '300×600px', reach: '2L+/రోజు', price: '₹18,000/వారం', hot: false },
  { name: 'వీడియో ప్రీరోల్', size: '1920×1080px', reach: '1L+/రోజు', price: '₹40,000/వారం', hot: true },
  { name: 'మొబైల్ ఇంటర్‌స్టిషియల్', size: '320×480px', reach: '4L+/రోజు', price: '₹30,000/వారం', hot: false },
  { name: 'స్పాన్సర్డ్ కంటెంట్', size: 'ఫుల్ ఆర్టికల్', reach: '2L+/ఆర్టికల్', price: '₹75,000/కథనం', hot: true },
];

const STATS = [
  { icon: Users, value: '24L+', label: 'నెలవారీ వినియోగదారులు' },
  { icon: Eye, value: '8Cr+', label: 'నెలవారీ పేజ్‌వ్యూస్' },
  { icon: TrendingUp, value: '68%', label: 'రిటర్నింగ్ విజిటర్లు' },
  { icon: BarChart3, value: '4.2 min', label: 'సగటు స్క్రీన్ టైమ్' },
];

const TESTIMONIALS = [
  { brand: 'Aparna Constructions', quote: 'పబ్లిక్ మూడ్ ద్వారా మా బ్రాండ్ అవేర్‌నెస్ 3 నెలల్లో 40% పెరిగింది.', person: 'మార్కెటింగ్ డైరెక్టర్' },
  { brand: 'Sahasra Hospital', quote: 'మొబైల్ యూజర్లకు చాలా బాగా చేరుతుంది, ROI చాలా సంతోషకరంగా ఉంది.', person: 'CEO' },
];

export const AdvertisePage: React.FC = () => {
  const [form, setForm] = useState({ company: '', name: '', email: '', phone: '', format: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-4 h-4" /> 24 లక్షల+ తెలుగు పాఠకులకు చేరండి
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">పబ్లిక్ మూడ్ లో ప్రకటన ఇవ్వండి</h1>
          <p className="text-blue-200 text-lg mb-8">తెలుగు ప్రజల్లో మీ బ్రాండ్‌ను శక్తివంతంగా ప్రచారం చేయండి</p>
          <div className="flex gap-4 justify-center">
            <a href="tel:+914023546789" className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" /> ఇప్పుడే కాల్ చేయండి
            </a>
            <a href="mailto:ads@publicmood.com" className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" /> మెయిల్ చేయండి
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 text-center">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{value}</div>
              <div className="text-slate-500 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Formats */}
      <div className="max-w-5xl mx-auto px-4 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">ప్రకటన వర్గాలు</h2>
          <p className="text-slate-500 text-sm">మీ బడ్జెట్ మరియు లక్ష్యాలకు అనుగుణంగా ఎంచుకోండి</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AD_FORMATS.map(ad => (
            <div key={ad.name} className={`bg-white rounded-2xl shadow-sm border-2 p-6 hover:shadow-md transition-all hover:-translate-y-1 relative ${ad.hot ? 'border-blue-500' : 'border-slate-100'}`}>
              {ad.hot && (
                <span className="absolute -top-3 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">జనప్రియం</span>
              )}
              <h3 className="font-bold text-slate-800 mb-1">{ad.name}</h3>
              <p className="text-slate-400 text-sm mb-3">{ad.size}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> చేరిక</span>
                  <span className="font-semibold text-slate-700">{ad.reach}</span>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-blue-700 font-bold text-lg">{ad.price}</span>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1">
                  ఎంచుకోండి <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 mx-auto text-sm">
            <Download className="w-4 h-4" /> మీడియా కిట్ డౌన్‌లోడ్ చేయండి (PDF)
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-blue-50 border-y border-blue-100 py-12 px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-slate-800 text-center mb-8">మా ప్రకటనదారులు చెప్పేది</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.brand} className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
                <CheckCircle className="w-6 h-6 text-blue-500 mb-3" />
                <p className="text-slate-600 italic mb-4">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-slate-800 text-sm">{t.brand}</div>
                  <div className="text-slate-400 text-xs">{t.person}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="max-w-2xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">ప్రకటన విచారణ</h2>
        {submitted ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">విచారణ స్వీకరించబడింది!</h3>
            <p className="text-slate-500 text-sm">మా ప్రకటన నిపుణులు 4 గంటల్లో మీకు తిరిగి సంప్రదిస్తారు.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">కంపెనీ పేరు *</label>
                <input type="text" name="company" required value={form.company} onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">సంప్రదింపు వ్యక్తి *</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ఇమెయిల్ *</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ఫోన్ *</label>
                <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ప్రకటన వర్గం</label>
                <select name="format" value={form.format} onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white">
                  <option value="">ఎంచుకోండి</option>
                  {AD_FORMATS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">నెలవారీ బడ్జెట్</label>
                <select name="budget" value={form.budget} onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white">
                  <option value="">ఎంచుకోండి</option>
                  <option>₹10,000 - ₹25,000</option>
                  <option>₹25,000 - ₹50,000</option>
                  <option>₹50,000 - ₹1,00,000</option>
                  <option>₹1,00,000+</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">అదనపు సమాచారం</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                placeholder="మీ ప్రకటన లక్ష్యాలు, టార్గెట్ ఆడియన్స్ గురించి..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none" />
            </div>
            <button type="submit"
              className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-all hover:shadow-lg flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" /> విచారణ పంపండి
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
