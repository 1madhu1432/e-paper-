import React, { useState } from 'react';
import { Star } from 'lucide-react';

const SIGNS = [
  { name: 'మేషం', english: 'Aries', symbol: '♈', date: 'మార్చి 21 - ఏప్రిల్ 19', lucky: ['ఎరుపు', 'తెలుపు'], number: 9, today: 'ఈరోజు మీకు అనుకూలమైన సమయం. కొత్త ప్రాజెక్టులు ప్రారంభించడానికి మంచి సమయం. ఆర్థికంగా లాభాలు వస్తాయి. ప్రేమ జీవితంలో సంతోషం కలుగుతుంది. ఆరోగ్యంపై శ్రద్ధ వహించండి.', rating: 4 },
  { name: 'వృషభం', english: 'Taurus', symbol: '♉', date: 'ఏప్రిల్ 20 - మే 20', lucky: ['ఆకుపచ్చ', 'నీలం'], number: 6, today: 'ఆర్థిక విషయాలలో జాగ్రత్తగా ఉండండి. కుటుంబ సభ్యులతో సమయం గడపడం మంచిది. ఉద్యోగంలో నూతన అవకాశాలు రావచ్చు. ఆరోగ్యం మాటర్.', rating: 3 },
  { name: 'మిథునం', english: 'Gemini', symbol: '♊', date: 'మే 21 - జూన్ 20', lucky: ['పసుపు', 'నారంజి'], number: 5, today: 'సృజనాత్మక కార్యాలలో విజయం లభిస్తుంది. మిత్రులతో సంబంధాలు బాగుంటాయి. ప్రయాణాలు చేయడానికి అనుకూల సమయం. ఆలోచనలు స్పష్టంగా ఉంటాయి.', rating: 5 },
  { name: 'కర్కాటకం', english: 'Cancer', symbol: '♋', date: 'జూన్ 21 - జులై 22', lucky: ['వెండి', 'తెలుపు'], number: 2, today: 'గృహ సంబంధ విషయాలలో మంచి పరిణామాలు జరుగుతాయి. భావోద్వేగాలను అదుపులో ఉంచుకోండి. పెద్దల సలహాలు స్వీకరించడం మంచిది.', rating: 3 },
  { name: 'సింహం', english: 'Leo', symbol: '♌', date: 'జులై 23 - ఆగస్టు 22', lucky: ['బంగారు', 'నారంజి'], number: 1, today: 'నాయకత్వ గుణాలు మెచ్చుకోబడతాయి. కొత్త పరిచయాలు జీవితానికి ఉపయోగపడతాయి. వ్యాపారంలో అభివృద్ధి కనిపిస్తుంది.', rating: 5 },
  { name: 'కన్య', english: 'Virgo', symbol: '♍', date: 'ఆగస్టు 23 - సెప్టెంబర్ 22', lucky: ['ఆకుపచ్చ', 'తెలుపు'], number: 6, today: 'వివరాలకు శ్రద్ధ వహించడం మీకు లాభిస్తుంది. ఆరోగ్య సమస్యలకు సకాలంలో చికిత్స తీసుకోండి. పని నిజాయితీగా చేస్తే గుర్తింపు వస్తుంది.', rating: 4 },
  { name: 'తుల', english: 'Libra', symbol: '♎', date: 'సెప్టెంబర్ 23 - అక్టోబర్ 22', lucky: ['నీలం', 'ఆకుపచ్చ'], number: 6, today: 'సంతులనం పాటించడం నేటి కీలక అంశం. సౌందర్య, కళా రంగాలలో పురోగతి కనిపిస్తుంది. మీత్రులతో గడపండి, మనస్సు శాంతిస్తుంది.', rating: 4 },
  { name: 'వృశ్చికం', english: 'Scorpio', symbol: '♏', date: 'అక్టోబర్ 23 - నవంబర్ 21', lucky: ['ఎరుపు', 'నల్లని'], number: 8, today: 'రహస్య విషయాలు వెలుగులోకి వస్తాయి. ఆత్మ పరిశోధనకు ఇది మంచి సమయం. పెట్టుబడులు జాగ్రత్తగా చేయండి.', rating: 3 },
  { name: 'ధనుస్సు', english: 'Sagittarius', symbol: '♐', date: 'నవంబర్ 22 - డిసెంబర్ 21', lucky: ['ఊదా', 'నీలం'], number: 3, today: 'విద్య మరియు ఉన్నత చదువులో విజయం. ప్రయాణాలు లాభదాయకంగా ఉంటాయి. ఆధ్యాత్మిక కార్యాలలో మనస్సు లగ్నమవుతుంది.', rating: 5 },
  { name: 'మకరం', english: 'Capricorn', symbol: '♑', date: 'డిసెంబర్ 22 - జనవరి 19', lucky: ['నల్లని', 'గోధుమ'], number: 8, today: 'కఠినమైన పని ఫలితాలు ఇస్తుంది. కెరీర్‌లో ముఖ్యమైన నిర్ణయాలు తీసుకోవాల్సిన రోజు. పెద్దల ఆశీర్వాదం మీకు అండగా ఉంటుంది.', rating: 4 },
  { name: 'కుంభం', english: 'Aquarius', symbol: '♒', date: 'జనవరి 20 - ఫిబ్రవరి 18', lucky: ['ఆకాశం నీలం', 'వెండి'], number: 4, today: 'నూతన ఆవిష్కరణలకు ఇది మంచి సమయం. సామాజిక కార్యక్రమాలలో పాల్గొనడం మంచిది. స్నేహితులతో మంచి సమయం గడుపుతారు.', rating: 4 },
  { name: 'మీనం', english: 'Pisces', symbol: '♓', date: 'ఫిబ్రవరి 19 - మార్చి 20', lucky: ['సముద్రపు నీలం', 'ఊదా'], number: 7, today: 'ఆధ్యాత్మిక చింతన మీకు శాంతి కలిగిస్తుంది. కళలు, సంగీతంలో ఆసక్తి బాగా పెరుగుతుంది. భావోద్వేగాలను జాగ్రత్తగా నిర్వహించుకోండి.', rating: 3 },
];

export const HoroscopePage: React.FC = () => {
  const [selected, setSelected] = useState<typeof SIGNS[0] | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <div className="px-4 pt-10 pb-6 text-center">
        <div className="text-5xl mb-3">✨</div>
        <h1 className="text-3xl font-bold text-white mb-2">రాశి ఫలాలు</h1>
        <p className="text-purple-300 text-sm">ఈరోజు మీ రాశి ఫలం తెలుసుకోండి — అక్టోబర్ 2, 2026</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12">
        {/* Sign grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {SIGNS.map(sign => (
            <button
              key={sign.name}
              onClick={() => setSelected(selected?.name === sign.name ? null : sign)}
              className={`p-3 rounded-2xl text-center transition-all border ${
                selected?.name === sign.name
                  ? 'bg-purple-600 border-purple-400 shadow-lg shadow-purple-900/50 scale-105'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="text-3xl mb-1">{sign.symbol}</div>
              <div className="text-white text-xs font-semibold">{sign.name}</div>
              <div className="text-purple-400 text-xs">{sign.english}</div>
              <div className="flex justify-center mt-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-2.5 h-2.5 ${i < sign.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Detail card */}
        {selected ? (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
            <div className="flex items-start gap-6">
              <div className="text-7xl">{selected.symbol}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-white">{selected.name}</h2>
                  <span className="text-purple-300 text-sm">({selected.english})</span>
                </div>
                <p className="text-purple-300 text-sm mb-4">{selected.date}</p>

                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < selected.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                  ))}
                  <span className="text-white/60 text-sm ml-2">{selected.rating}/5</span>
                </div>

                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-5">
                  <h3 className="text-purple-300 text-sm font-semibold uppercase tracking-wide mb-3">ఈరోజు రాశి ఫలం</h3>
                  <p className="text-white leading-relaxed">{selected.today}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-purple-300 text-xs mb-1 uppercase tracking-wide">అదృష్ట సంఖ్య</div>
                    <div className="text-white text-2xl font-bold">{selected.number}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-purple-300 text-xs mb-2 uppercase tracking-wide">అదృష్ట రంగులు</div>
                    <div className="flex gap-1 flex-wrap">
                      {selected.lucky.map(c => (
                        <span key={c} className="text-white text-xs bg-white/10 px-2 py-0.5 rounded-full">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-purple-400 text-lg">మీ రాశిని ఎంచుకోండి ↑</p>
          </div>
        )}
      </div>
    </div>
  );
};
