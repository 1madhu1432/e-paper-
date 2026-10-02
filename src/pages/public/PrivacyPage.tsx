import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ChevronRight } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-red-600">హోమ్</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 font-bold">గోప్యతా విధానం (Privacy Policy)</span>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white mb-8 flex items-center gap-4 shadow-xl">
        <Shield className="w-12 h-12 text-red-400 shrink-0" />
        <div>
          <h1 className="text-3xl font-black font-telugu">గోప్యతా విధానం</h1>
          <p className="text-slate-300 text-sm mt-1 font-sans">Privacy Policy — పబ్లిక్ మూడ్ డిజిటల్ మీడియా</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-8 text-slate-700 text-sm leading-relaxed">
        <p className="text-slate-600 font-telugu">
          పబ్లిక్ మూడ్ డిజిటల్ మీడియా మీ వ్యక్తిగత సమాచారాన్ని రక్షించడానికి కట్టుబడి ఉంది. ఈ గోప్యతా విధానం మీరు మా వెబ్‌సైట్‌ను ఉపయోగించినప్పుడు మేము ఏ విధంగా సమాచారాన్ని సేకరిస్తాం, ఉపయోగిస్తాం మరియు రక్షిస్తాం అనే దానిని వివరిస్తుంది.
        </p>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2 font-telugu">
            <span className="w-7 h-7 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-black">1</span>
            సేకరించే సమాచారం (Information We Collect)
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 font-telugu">
            <li>మీరు అందించే పేరు, ఇమెయిల్ చిరునామా వంటి వ్యక్తిగత వివరాలు</li>
            <li>వెబ్‌సైట్ వాడకానికి సంబంధించిన డేటా (పేజీ వీక్షణలు, బ్రౌజర్ రకం)</li>
            <li>లాగిన్ చరిత్ర మరియు ప్రాధాన్యతలు</li>
            <li>పాఠక అభిప్రాయాలు మరియు వ్యాఖ్యలు</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2 font-telugu">
            <span className="w-7 h-7 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-black">2</span>
            సమాచార వినియోగం (How We Use Your Information)
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 font-telugu">
            <li>వ్యక్తిగతీకరించిన వార్తా అనుభవం అందించడానికి</li>
            <li>తాజా వార్తా నోటిఫికేషన్లు పంపించడానికి (మీ అనుమతితో)</li>
            <li>వెబ్‌సైట్ మెరుగుదల మరియు విశ్లేషణ కోసం</li>
            <li>చట్టపరమైన అవసరాలకు లోబడి అధికారులకు నివేదించడానికి</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2 font-telugu">
            <span className="w-7 h-7 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-black">3</span>
            కుకీలు (Cookies)
          </h2>
          <p className="text-slate-600 font-telugu">
            మేము వెబ్‌సైట్ కార్యాచరణను మెరుగుపరచడానికి కుకీలను ఉపయోగిస్తాం. మీరు బ్రౌజర్ సెట్టింగ్‌ల ద్వారా కుకీలను నియంత్రించవచ్చు. అయితే, కొన్ని కుకీలను నిలిపివేయడం వెబ్‌సైట్ కొన్ని లక్షణాలను ప్రభావితం చేయవచ్చు.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2 font-telugu">
            <span className="w-7 h-7 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-black">4</span>
            మూడో పక్ష సేవలు (Third-Party Services)
          </h2>
          <p className="text-slate-600 font-telugu">
            మేము Google Analytics, WhatsApp Share API వంటి మూడో పక్ష సేవలను ఉపయోగిస్తాం. ఈ సేవలకు వారి స్వంత గోప్యతా విధానాలు వర్తిస్తాయి.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2 font-telugu">
            <span className="w-7 h-7 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-black">5</span>
            మీ హక్కులు (Your Rights)
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 font-telugu">
            <li>మీ వ్యక్తిగత డేటాను యాక్సెస్ చేయడానికి హక్కు</li>
            <li>డేటాను సరిచేయడానికి లేదా తొలగించడానికి హక్కు</li>
            <li>మార్కెటింగ్ ఇమెయిల్‌ల నుండి నిలిపివేయడానికి హక్కు</li>
            <li>డేటా ప్రాసెసింగ్‌ను పరిమితం చేయడానికి హక్కు</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2 font-telugu">
            <span className="w-7 h-7 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-black">6</span>
            సంప్రదించండి (Contact Us)
          </h2>
          <p className="text-slate-600 font-telugu">
            గోప్యతా విధానానికి సంబంధించిన ప్రశ్నల కోసం:{' '}
            <a href="mailto:privacy@publicmood.com" className="text-red-600 hover:underline">
              privacy@publicmood.com
            </a>
          </p>
        </section>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 text-right font-telugu">
          చివరి నవీకరణ: అక్టోబర్ 2026 | పబ్లిక్ మూడ్ డిజిటల్ మీడియా
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link to="/" className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors font-telugu">
          ← హోమ్‌కి తిరిగి వెళ్లండి
        </Link>
        <Link to="/terms" className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-colors font-telugu">
          నిబంధనలు & షరతులు →
        </Link>
      </div>
    </div>
  );
};
