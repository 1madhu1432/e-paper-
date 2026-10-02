export type AITaskType =
  | 'generate-headline'
  | 'summarize'
  | 'short-description'
  | 'seo-meta'
  | 'te-to-en'
  | 'en-to-te'
  | 'instagram-caption'
  | 'facebook-post'
  | 'x-post'
  | 'whatsapp-share'
  | 'youtube-desc'
  | 'reel-script'
  | 'interview-transcription'
  | 'grammar-check';

export interface AITaskOption {
  id: AITaskType;
  label: string;
  labelTe: string;
  icon: string;
  description: string;
}

export const AI_TASKS: AITaskOption[] = [
  { id: 'generate-headline', label: 'Generate Headline', labelTe: 'ఆకట్టుకునే హెడ్‌లైన్స్ (5 రకాలు)', icon: 'Sparkles', description: 'విభిన్న శైలుల్లో క్లిక్-త్రూ రేట్ పెంచే శీర్షికలు' },
  { id: 'summarize', label: 'Summarize Article', labelTe: 'వార్తా సారాంశం (3-4 పాయింట్లు)', icon: 'FileText', description: 'కథనం లోని కీలక విషయాలను బుల్లెట్ పాయింట్లలో అందించడం' },
  { id: 'short-description', label: 'Short Description', labelTe: 'లఘు వివరణ (Short Summary)', icon: 'AlignLeft', description: 'హోమ్‌పేజీ కార్డులు మరియు బ్రీఫ్ వ్యూ కోసం 2 వాక్యాల సమాచారం' },
  { id: 'seo-meta', label: 'SEO Metadata', labelTe: 'ఎస్ఈవో శీర్షిక & కీవర్డ్స్', icon: 'Search', description: 'గూగుల్ సెర్చ్‌లో టాప్ ర్యాంకింగ్ కోసం మెటా ట్యాగ్స్' },
  { id: 'te-to-en', label: 'Telugu → English', labelTe: 'తెలుగు నుంచి ఇంగ్లీష్ అనువాదం', icon: 'Languages', description: 'నిష్పాక్షికమైన జర్నలిస్టిక్ ఇంగ్లీష్ వార్తా అనువాదం' },
  { id: 'en-to-te', label: 'English → Telugu', labelTe: 'ఇంగ్లీష్ నుంచి స్వచ్ఛమైన తెలుగు', icon: 'Languages', description: 'సులభమైన, ప్రామాణికమైన తెలుగు పదజాలంతో అనువాదం' },
  { id: 'instagram-caption', label: 'Instagram Caption', labelTe: 'ఇన్‌స్టాగ్రామ్ క్యాప్షన్ & హ్యాష్‌ట్యాగ్స్', icon: 'Instagram', description: 'ఎంగేజింగ్ ఇమోజీలు, హ్యాష్‌ట్యాగ్‌లతో కూడిన పోస్ట్' },
  { id: 'facebook-post', label: 'Facebook Post', labelTe: 'ఫేస్‌బుక్ డీటెయిల్డ్ పోస్ట్', icon: 'Facebook', description: 'చర్చను రేకెత్తించే ప్రశ్నతో కూడిన ఫేస్‌బుక్ కథనం' },
  { id: 'x-post', label: 'X (Twitter) Thread', labelTe: 'ట్విట్టర్ / ఎక్స్ బ్రేకింగ్ పోస్ట్', icon: 'Twitter', description: '280 క్యారెక్టర్ల పంచ్ లైన్ తో తాజా అప్‌డేట్' },
  { id: 'whatsapp-share', label: 'WhatsApp Broadcast', labelTe: 'వాట్సాప్ గ్రూప్స్ బులెటిన్ ఫార్మాట్', icon: 'MessageCircle', description: 'బోల్డ్ టెక్స్ట్, లింక్ ప్లేస్‌మెంట్‌తో వైరల్ మెసేజ్' },
  { id: 'youtube-desc', label: 'YouTube Video SEO', labelTe: 'యూట్యూబ్ డిస్క్రిప్షన్ & టైమ్‌స్టాంప్స్', icon: 'Youtube', description: 'వీడియో ఆప్టిమైజేషన్, టైటిల్, వివరణ, ట్యాగులు' },
  { id: 'reel-script', label: '60s Reel Script', labelTe: '60 సెకన్ల రీల్ / షార్ట్ స్క్రిప్ట్', icon: 'Video', description: 'హుక్, వాయిస్ ఓవర్ మరియు విజువల్ క్యూస్‌తో స్క్రిప్ట్' },
  { id: 'interview-transcription', label: 'Interview Polish', labelTe: 'ఆడియో ఇంటర్వ్యూ క్లీనప్ & ఎడిట్', icon: 'Mic', description: 'సంభాషణల నుంచి ముఖ్యాంశాల వేరిఫికేషన్' },
  { id: 'grammar-check', label: 'Telugu Grammar Check', labelTe: 'తెలుగు వ్యాకరణం & అక్షరదోషాల సవరణ', icon: 'CheckCircle', description: 'భాషా దోషాలను గుర్తించి స్వచ్ఛమైన పదాల సూచనలు' },
];

export class MockAIService {
  static async generate(task: AITaskType, input: string): Promise<string> {
    // Simulate brief AI processing latency
    await new Promise(resolve => setTimeout(resolve, 800));

    const sampleTopic = input.slice(0, 80) || 'తెలంగాణ అభివృద్ధి మరియు సంక్షేమం';

    switch (task) {
      case 'generate-headline':
        return `🌟 పబ్లిక్ మూడ్ AI రూపొందించిన 5 ఆకర్షణీయమైన హెడ్‌లైన్స్:

1. [బ్రేకింగ్]: ${sampleTopic} - ప్రభుత్వ తాజా మార్గదర్శకాలు విడుదల!
2. [విశ్లేషణ]: అసలు ఏం జరిగింది? ${sampleTopic} వెనుక ఉన్న వాస్తవాలు ఇవే!
3. [ప్రజా దృక్కోణం]: ప్రజలకు భారీ ఊరట.. ${sampleTopic} పై కీలక నిర్ణయం
4. [ఎక్స్‌క్లూజివ్]: గ్రౌండ్ రిపోర్ట్: ${sampleTopic} తో మారనున్న పరిస్థితులు
5. [షార్ట్ & స్వీట్]: ${sampleTopic}: పూర్తి వివరాలు మీకోసం!`;

      case 'summarize':
        return `📋 ప్రధాన ముఖ్యాంశాల సారాంశం (Key Highlights):

• 🔹 ఈ పరిణామం ద్వారా ఉభయ తెలుగు రాష్ట్రాల్లో ప్రజలకు ప్రత్యక్ష ప్రయోజనం చేకూరనుంది.
• 🔹 అధికార యంత్రాంగం క్షేత్రస్థాయి పరిశీలన పూర్తి చేసి ప్రాథమిక నివేదికను ప్రభుత్వానికి సమర్పించింది.
• 🔹 రాబోయే 15 రోజుల్లో అమలు విధివిధానాలు ఖరారు చేసి అధికారిక పోర్టల్ ద్వారా దరఖాస్తులను స్వీకరించనున్నారు.
• 🔹 ఏదైనా సందేహాలుంటే సంప్రదించడానికి ప్రత్యేక టోల్ ఫ్రీ హెల్ప్‌లైన్ నంబర్ ఏర్పాటు చేయబడింది.`;

      case 'short-description':
        return `${sampleTopic} కి సంబంధించి అధికారిక వర్గాల నుంచి కీలక సమాచారం అందింది. అర్హులైన ప్రజలు మరియు వాటాదారులకు పూర్తి ప్రయోజనాలు అందేలా మార్గదర్శకాలు జారీ అయ్యాయి.`;

      case 'seo-meta':
        return `🎯 SEO ఆప్టిమైజేషన్ మెటా డేటా:

Meta Title: ${sampleTopic} | తాజా వార్తలు - Public Mood
Meta Description: ${sampleTopic} సమగ్ర సమాచారం, కీలక మార్గదర్శకాలు మరియు తాజా విశ్లేషణ పబ్లిక్ మూడ్ డిజిటల్ నెట్‌వర్క్‌లో చదవండి.
Keywords: తెలుగు వార్తలు, తాజా సమాచారం, ఆంధ్రప్రదేశ్, తెలంగాణ, Public Mood, పబ్లిక్ మూడ్, ${sampleTopic.split(' ').slice(0, 3).join(', ')}
Canonical URL: https://publicmood.com/news/${Date.now()}
SEO Score: 96/100 (Excellent)`;

      case 'te-to-en':
        return `English Translation (Journalistic Standard):
"${sampleTopic}: The competent state authorities have officially released comprehensive guidelines aimed at enhancing citizen welfare and operational transparency. A high-level technical committee has reviewed the baseline parameters, and standard operating procedures will take effect immediately. Citizen feedback mechanisms have been activated across all regional district collectorates."`;

      case 'en-to-te':
        return `స్వచ్ఛమైన తెలుగు అనువాదం:
"${sampleTopic} సంబంధిత అంశంపై పాలనా యంత్రాంగం సమగ్రమైన మార్గదర్శకాలను అధికారికంగా జారీ చేసింది. ప్రజలకు జవాబుదారీతనం మరియు పారదర్శకతతో కూడిన సేవలను అందించడమే ధ్యేయంగా చర్యలు ముమ్మరమయ్యాయి."`;

      case 'instagram-caption':
        return `🚨 తాజా అప్‌డేట్! 🚨

${sampleTopic} గురించి మీరు తెలుసుకోవాల్సిన ముఖ్యమైన విషయాలు ఇక్కడ ఉన్నాయి! 👇

స్వైప్ చేసి పూర్తి కథనాన్ని చదవండి ➡️
మరిన్ని తాజా తెలుగు వార్తల కోసం @PublicMood ని ఇప్పుడే ఫాలో అవ్వండి! 📲

.
.
#PublicMood #TeluguNews #BreakingNewsTelugu #AndhraPradesh #Telangana #HyderabadNews #LatestUpdates`;

      case 'facebook-post':
        return `📢 [ముఖ్యాంశం]: ${sampleTopic}

ఈ నిర్ణయంపై మీ అభిప్రాయం ఏమిటి? ప్రభుత్వం తీసుకున్న ఈ చర్య సాధారణ ప్రజలకు ఎంతవరకు ఉపయోగపడుతుంది? మీ ఆలోచనలను కింద కామెంట్ సెక్షన్‌లో పంచుకోండి! 👇

పూర్తి వార్త కథనం కోసం బయోలోని లింక్ క్లిక్ చేయండి.
#PublicMood #TeluguSamacharam #PublicMoodNews`;

      case 'x-post':
        return `🔴 #BREAKING: ${sampleTopic.slice(0, 140)}

అధికారిక ప్రకటన వెలువడింది. పూర్తి వివరాలు, లైవ్ అప్‌డేట్స్ కోసం క్లిక్ చేయండి 🔗 https://publicmood.com/latest

#PublicMood #TeluguNews #Telangana #AndhraPradesh`;

      case 'whatsapp-share':
        return `*🔴 పబ్లిక్ మూడ్ బ్రేకింగ్ న్యూస్ అలర్ట్*
━━━━━━━━━━━━━━━━━━━━
*${sampleTopic}*

📌 *ప్రధాన అంశాలు:*
• సంబంధిత శాఖల నుంచి అధికారిక ఉత్తర్వులు జారీ
• పూర్తి సమాచారం కోసం క్రింది లింక్ క్లిక్ చేసి చదవండి:
👉 https://publicmood.com/article/today

_విశ్వసనీయ వార్తల కోసం మీ వాట్సాప్ గ్రూపులలో షేర్ చేయండి!_
*పబ్లిక్ మూడ్ - ప్రజా పక్షం*`;

      case 'youtube-desc':
        return `📺 YOUTUBE VIDEO METADATA:

Title: ${sampleTopic} | Public Mood Ground Report & Live Updates
Description:
తెలుగు రాష్ట్రాల సమగ్ర వార్తా విశ్లేషణ - పబ్లిక్ మూడ్ ప్రత్యేక బులెటిన్.
ఈ వీడియోలో:
00:00 - పరిచయం & ముఖ్యాంశాలు
02:15 - క్షేత్రస్థాయి విశ్లేషణ
05:30 - అధికారుల స్పందన
08:45 - ప్రజల అభిప్రాయాలు

🔔 సబ్‌స్క్రైబ్ చేయండి: https://youtube.com/@PublicMoodNews
Official Website: https://publicmood.com`;

      case 'reel-script':
        return `🎬 60-సెకన్ల రీల్ / షార్ట్స్ స్క్రిప్ట్:

[00:00 - 00:05] హుక్ (Hook - కెమెరా వైపు సీరియస్ లుక్):
"మీకు ఈ విషయం తెలుసా? ${sampleTopic.slice(0, 40)} లో సంచలన మార్పులు చోటుచేసుకున్నాయి!"

[00:05 - 00:30] బాడీ (విజువల్ కట్స్ + డాక్యుమెంట్స్):
"అధికారులు విడుదల చేసిన వివరాల ప్రకారం... మొదటిగా ప్రజలకు కలిగే ముఖ్య ప్రయోజనం ఏమిటంటే..."

[00:30 - 00:50] కీ టేక్‌అవే:
"ఈ నిబంధనలు వచ్చే వారం నుంచే అమలులోకి రానున్నాయి. ఎవరు అర్హులు, ఎవరు దరఖాస్తు చేసుకోవాలి అనే పూర్తి గైడ్..."

[00:50 - 01:00] కాల్ టు యాక్షన్ (CTA):
"ఈ ముఖ్యమైన సమాచారాన్ని మీ మిత్రులకు ఇప్పుడే షేర్ చేయండి. ఫాలో పబ్లిక్ మూడ్!"`;

      case 'interview-transcription':
        return `🎙️ ఇంటర్వ్యూ క్లీనప్ & ట్రాన్స్‌క్రిప్షన్ సారాంశం:

[ప్రశ్నకర్త]: ఈ పథకం ద్వారా లబ్ధిదారులకు ఎలాంటి సౌలభ్యం కలగనుంది?
[సమాధానం]: "గతంలో మాదిరిగా కార్యాలయాల చుట్టూ తిరిగే పనిలేకుండా సింగిల్ విండో ద్వారా డిజిటల్ పద్ధతిలో సేవలు అందుతాయి. ఎక్కడా దళారుల ప్రమేయం ఉండదు."

[ప్రధాన ముఖ్యాంశం]: పారదర్శకతకు ప్రథమ ప్రాధాన్యం ఇస్తూ 48 గంటల్లోనే పరిష్కారం అందించే వ్యవస్థను రూపొందించారు.`;

      case 'grammar-check':
        return `✅ వ్యాకరణం & అక్షరదోషాల పరిశీలన నివేదిక:

• సరిచూసిన వాక్య నిర్మాణం: సరళమైన వ్యవహారిక భాషలో వాక్యాలు నిక్కచ్చిగా ఉన్నాయి.
• సూచన 1: సంక్లిష్టమైన సంస్కృత పదాల స్థానంలో సాధారణ పాఠకులకు అర్థమయ్యే ప్రజాదరణ పొందిన పదాలను వాడటం మంచిది.
• సూచన 2: వాక్యాల మధ్య కామా (,) మరియు పూర్ణవిరామం (.) ల స్థానాలు సరైన రీతిలో సమతుల్యం చేయబడ్డాయి.
• మొత్తం నాణ్యత స్కోరు: 98% అద్భుతం. ప్రచురణకు సిద్ధం!`;

      default:
        return 'పబ్లిక్ మూడ్ AI అసిస్టెంట్ మీ అభ్యర్థనను విజయవంతంగా ప్రాసెస్ చేసింది.';
    }
  }
}
