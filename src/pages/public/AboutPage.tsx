import React from 'react';
import { Shield, Award, Users, Globe, Heart, Newspaper, Target, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { REPORTERS } from '../../data/reporters';

const STATS = [
  { value: '52+', label: 'సంవత్సరాల అనుభవం', icon: Award },
  { value: '2.4M', label: 'నెలవారీ పాఠకులు', icon: Users },
  { value: '18', label: 'జిల్లాల్లో కార్యాలయాలు', icon: Globe },
  { value: '1,200+', label: 'ప్రచురించిన కథనాలు', icon: Newspaper },
];

const VALUES = [
  { icon: Shield, title: 'నిజాయితీ', desc: 'ప్రతి వార్తలో సత్యానికే మొదటి స్థానం ఇస్తాం.' },
  { icon: Heart, title: 'ప్రజాసేవ', desc: 'పాఠకుల ప్రయోజనాలే మా ప్రాధమ్యం.' },
  { icon: Target, title: 'బాధ్యత', desc: 'ప్రతి కథనానికి నైతిక జవాబుదారీతనం పాటిస్తాం.' },
];

export const AboutPage: React.FC = () => (
  <div className="min-h-screen bg-slate-50">
    {/* Hero */}
    <div className="relative bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-red-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-300 text-sm px-4 py-2 rounded-full mb-6">
          <Newspaper className="w-4 h-4" /> 1972 నుండి నేటి వరకు
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          జనతా వాణి గురించి
        </h1>
        <p className="text-xl text-red-200 font-semibold mb-6">జనతా వాణి - ప్రజల గళం</p>
        <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
          తెలుగు ప్రజల నమ్మకానికి పాత్రమైన వార్తా సంస్థ జనతా వాణి — 52 సంవత్సరాలుగా నిజాయితీగా, నిష్పాక్షికంగా వార్తలందిస్తోంది.
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20 mb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(({ value, label, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{value}</div>
            <div className="text-slate-500 text-sm">{label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Mission */}
    <div className="max-w-4xl mx-auto px-4 mb-16">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-5">మా మిషన్</h2>
        <p className="text-slate-600 leading-relaxed text-lg mb-6">
          జనతా వాణి 1972లో హైదరాబాద్‌లో ప్రారంభమైంది. ప్రజలకు నిష్పాక్షిక వార్తలు అందించడమే మా ఏకైక లక్ష్యం. మేము రాజకీయ, సామాజిక, ఆర్థిక అంశాలపై లోతైన విశ్లేషణాత్మక కథనాలతో పాఠకులను సాధికారులుగా చేస్తాం.
        </p>
        <p className="text-slate-600 leading-relaxed text-lg">
          డిజిటల్ యుగంలో జనతా వాణి ఇంటర్నెట్, మొబైల్ అప్లికేషన్ ద్వారా లక్షలాది పాఠకులకు చేరుతోంది. మా న్యూస్‌రూమ్‌లో 200+ జర్నలిస్టులు 24x7 పని చేస్తున్నారు.
        </p>
      </div>
    </div>

    {/* Values */}
    <div className="max-w-5xl mx-auto px-4 mb-16">
      <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">మా విలువలు</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VALUES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/30">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Team */}
    <div className="max-w-5xl mx-auto px-4 mb-16">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">మా బృందం</h2>
      <p className="text-slate-500 text-sm mb-8">నిబద్ధతతో పని చేసే మా జర్నలిస్టులు</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {REPORTERS.slice(0, 5).map(reporter => (
          <Link
            key={reporter.id}
            to={`/reporter/${reporter.id}`}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 text-center hover:shadow-md transition-all group"
          >
            <img
              src={(reporter as any).avatarUrl || reporter.avatar || `https://ui-avatars.com/api/?name=${reporter.name}&background=dc2626&color=fff&size=80`}
              alt={reporter.name}
              className="w-16 h-16 rounded-full mx-auto mb-3 object-cover group-hover:ring-2 group-hover:ring-red-500 transition-all"
            />
            <div className="font-semibold text-slate-800 text-sm group-hover:text-red-600 transition-colors">{reporter.nameTe || reporter.name}</div>
            <div className="text-slate-400 text-xs mt-1">{reporter.role}</div>
          </Link>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="bg-gradient-to-r from-red-600 to-red-800 py-12 px-4 text-center">
      <h2 className="text-2xl font-bold text-white mb-3">మాతో చేరండి</h2>
      <p className="text-red-200 mb-6">వార్తలు చదవండి, అభిప్రాయాలు పంచుకోండి</p>
      <div className="flex gap-4 justify-center">
        <Link to="/newsletter" className="bg-white text-red-700 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-colors flex items-center gap-2">
          న్యూస్‌లెటర్ <ChevronRight className="w-4 h-4" />
        </Link>
        <Link to="/citizen-reporter" className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">
          పౌర రిపోర్టర్
        </Link>
      </div>
    </div>
  </div>
);
