import React, { useState } from 'react';
import { BarChart3, ChevronUp, ChevronDown, Share2, CheckCircle } from 'lucide-react';

const POLLS = [
  {
    id: 1,
    question: 'తెలంగాణ బడ్జెట్ 2026లో ఏ రంగానికి అధిక నిధులు కేటాయించాలి?',
    options: [
      { text: 'వ్యవసాయం & రైతులు', votes: 4521 },
      { text: 'ఆరోగ్య సేవలు', votes: 3210 },
      { text: 'విద్య & పాఠశాలలు', votes: 5890 },
      { text: 'మౌలిక సదుపాయాలు', votes: 2100 },
    ],
    category: 'రాజకీయాలు',
    endDate: 'అక్టోబర్ 15, 2026',
    active: true,
  },
  {
    id: 2,
    question: 'హైదరాబాద్ మెట్రో రైలు విస్తరణ మీ జీవితాన్ని ప్రభావితం చేసిందా?',
    options: [
      { text: 'అవును, చాలా సహాయకరంగా ఉంది', votes: 7832 },
      { text: 'కొంత మేరకు', votes: 3421 },
      { text: 'లేదు, ప్రభావం లేదు', votes: 1892 },
      { text: 'నేను మెట్రో ఉపయోగించను', votes: 2100 },
    ],
    category: 'హైదరాబాద్',
    endDate: 'అక్టోబర్ 20, 2026',
    active: true,
  },
  {
    id: 3,
    question: 'ఆంధ్రప్రదేశ్ కొత్త రాజధాని నిర్మాణం గురించి మీ అభిప్రాయం?',
    options: [
      { text: 'అమరావతిలోనే ఉండాలి', votes: 12543 },
      { text: 'వికేంద్రీకరణ మంచిది', votes: 8901 },
      { text: 'నిర్ణయం ప్రజలకే వదలాలి', votes: 6234 },
    ],
    category: 'ఆంధ్రప్రదేశ్',
    endDate: 'సెప్టెంబర్ 30, 2026',
    active: false,
  },
];

const PollCard: React.FC<{ poll: typeof POLLS[0] }> = ({ poll }) => {
  const [voted, setVoted] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);
  const withVote = voted !== null
    ? poll.options.map((o, i) => ({ ...o, votes: i === voted ? o.votes + 1 : o.votes }))
    : poll.options;
  const totalWithVote = withVote.reduce((sum, o) => sum + o.votes, 0);

  const handleVote = () => {
    if (selected !== null && voted === null) setVoted(selected);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            {poll.category}
          </span>
          <div className="flex items-center gap-2">
            {poll.active ? (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                చురుకుగా ఉంది
              </span>
            ) : (
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">ముగిసింది</span>
            )}
          </div>
        </div>

        <h3 className="text-slate-800 font-bold text-base leading-snug mb-6">{poll.question}</h3>

        {/* Options */}
        <div className="space-y-3 mb-5">
          {withVote.map((opt, i) => {
            const pct = Math.round((opt.votes / totalWithVote) * 100) || 0;
            const isWinner = opt.votes === Math.max(...withVote.map(o => o.votes));
            return (
              <div key={i}>
                <div
                  className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    voted !== null
                      ? isWinner ? 'border-red-500' : 'border-slate-200'
                      : selected === i ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-red-300'
                  }`}
                  onClick={() => { if (voted === null && poll.active) setSelected(i); }}
                >
                  {voted !== null && (
                    <div
                      className={`absolute inset-0 transition-all duration-700 ${isWinner ? 'bg-red-50' : 'bg-slate-50'}`}
                      style={{ width: `${pct}%` }}
                    />
                  )}
                  <div className="relative flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      {voted === null && poll.active && (
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected === i ? 'border-red-500' : 'border-slate-300'}`}>
                          {selected === i && <div className="w-2 h-2 rounded-full bg-red-500" />}
                        </div>
                      )}
                      {voted === i && <CheckCircle className="w-4 h-4 text-red-500" />}
                      <span className="text-slate-700 text-sm font-medium">{opt.text}</span>
                    </div>
                    {voted !== null && (
                      <div className="flex items-center gap-2">
                        {isWinner && <ChevronUp className="w-4 h-4 text-red-500" />}
                        <span className={`text-sm font-bold ${isWinner ? 'text-red-600' : 'text-slate-500'}`}>{pct}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-slate-400 text-xs flex items-center gap-3">
            <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5" /> {totalVotes.toLocaleString()} ఓట్లు</span>
            <span>గడువు: {poll.endDate}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: poll.question, url: window.location.href }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('పోల్ లింక్ కాపీ చేయబడింది!');
                }
              }}
              className="p-2 text-slate-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
              title="షేర్ చేయండి"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {voted === null && poll.active && (
              <button
                onClick={handleVote}
                disabled={selected === null}
                className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                ఓటు వేయి
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PollsPage: React.FC = () => (
  <div className="min-h-screen bg-slate-50">
    <div className="bg-gradient-to-br from-purple-900 to-slate-900 py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <BarChart3 className="w-8 h-8 text-purple-400" /> ప్రజాభిప్రాయ సేకరణ
        </h1>
        <p className="text-slate-400 text-sm">మీ అభిప్రాయం తెలపండి — ప్రజల గళమే మా దిక్సూచి</p>
      </div>
    </div>
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {POLLS.map(poll => <PollCard key={poll.id} poll={poll} />)}
      </div>
    </div>
  </div>
);
