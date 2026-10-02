import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>హోమ్‌పేజీకి తిరిగి వెళ్లండి</span>
        </Link>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="inline-flex items-center gap-2 bg-red-600/30 text-red-300 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>చట్టబద్ధ నిబంధనలు (Legal Terms)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-telugu">
            నిబంధనలు & షరతులు (Terms & Conditions)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 font-telugu max-w-2xl">
            పబ్లిక్ మూడ్ డిజిటల్ న్యూస్ పోర్టల్ మరియు ఈ-పేపర్ సేవలను వినియోగించుకోవడానికి సంబంధించిన మార్గదర్శకాలు.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 text-slate-700 font-telugu text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-5 bg-red-600 rounded-xs" />
              1. సేవా నిబంధనల అంగీకారం
            </h2>
            <p>
              పబ్లిక్ మూడ్ (Public Mood) వెబ్‌సైట్, మొబైల్ ప్లాట్‌ఫామ్ లేదా ఈ-పేపర్ సేవలను యాక్సెస్ చేయడం ద్వారా మీరు ఈ క్రింది నియమ నిబంధనలకు కట్టుబడి ఉంటారని అంగీకరిస్తున్నారు. ఈ నిబంధనలను ఎప్పటికప్పుడు సవరించే అధికారం యాజమాన్యానికి ఉంటుంది.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-5 bg-red-600 rounded-xs" />
              2. కంటెంట్ కాపీరైట్ మరియు యాజమాన్య హక్కులు
            </h2>
            <p>
              ఈ పోర్టల్‌లో ప్రచురించబడే అన్ని వార్తా కథనాలు, విశ్లేషణలు, చిత్రాలు, గ్రాఫిక్స్ మరియు వీడియోలు పబ్లిక్ మూడ్ యొక్క మేధో సంపత్తి (Intellectual Property). వీటిని రాతపూర్వక అనుమతి లేకుండా వ్యాపార ప్రయోజనాల కోసం కాపీ చేయడం, పునర్ముద్రించడం చట్టవిరుద్ధం.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-5 bg-red-600 rounded-xs" />
              3. సిటిజన్ జర్నలిజం మరియు పాఠకుల వ్యాఖ్యలు
            </h2>
            <p>
              పాఠకులు పంపే వార్తా సమాచారం మరియు కామెంట్లలో విద్వేషపూరితమైన, అసత్యమైన లేదా వ్యక్తుల వ్యక్తిత్వ హననానికి దారితీసే సమాచారాన్ని అనుమతించము. అటువంటి వ్యాఖ్యలను తొలగించే లేదా తిరస్కరించే సంపూర్ణ అధికారం సంపాదక వర్గానికి ఉంది.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-5 bg-red-600 rounded-xs" />
              4. ఈ-పేపర్ డౌన్‌లోడ్స్ మరియు వినియోగం
            </h2>
            <p>
              పబ్లిక్ మూడ్ ఈ-పేపర్ పిడిఎఫ్ సంచికలు వ్యక్తిగత పఠనం కోసం మాత్రమే ఉద్దేశించబడ్డాయి. అనధికారిక టెలిగ్రామ్ ఛానళ్లు లేదా గ్రూపులలో వాణిజ్యపరంగా పంపిణీ చేయడం నిషేధించబడింది.
            </p>
          </section>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>చివరిగా నవీకరించబడింది: అక్టోబర్ 2026</span>
            <Link to="/contact" className="text-red-600 font-bold hover:underline">
              సందేహాలు ఉంటే సంప్రదించండి →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
