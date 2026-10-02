export function generateNewspaperSVG(
  pageNumber: number,
  editionName: string = 'హైదరాబాద్ (Hyderabad)',
  dateStr: string = '02 అక్టోబర్ 2026 (02-10-2026)',
  volumeStr: string = 'సంపుటి 01 | సంచిక 365',
  totalPages: number = 12
): string {
  const width = 1200;
  const height = 1680;

  // Clean district title
  const cleanEditionTitle = editionName.replace(/\(.*?\)/g, '').trim() || 'హైదరాబాద్';

  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <style>
      .bg { fill: #ffffff; }
      .header-bg { fill: #0b1d3a; }
      .brand-red { fill: #dc2626; }
      .brand-blue { fill: #1e40af; }
      .text-dark { fill: #0f172a; font-family: 'Noto Sans Telugu', 'Plus Jakarta Sans', sans-serif; }
      .text-red { fill: #b91c1c; font-family: 'Noto Sans Telugu', 'Plus Jakarta Sans', sans-serif; }
      .text-muted { fill: #334155; font-family: 'Noto Sans Telugu', 'Plus Jakarta Sans', sans-serif; }
      .text-white { fill: #ffffff; font-family: 'Noto Sans Telugu', 'Plus Jakarta Sans', sans-serif; }
      .headline { font-weight: 900; line-height: 1.15; }
      .border-thin { stroke: #cbd5e1; stroke-width: 1; }
      .border-thick { stroke: #0b1d3a; stroke-width: 3; }
      .border-red { stroke: #dc2626; stroke-width: 2.5; }
    </style>
    <linearGradient id="photoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
  </defs>

  <!-- Newsprint Page Base -->
  <rect width="${width}" height="${height}" class="bg" />
  <rect x="15" y="15" width="${width - 30}" height="${height - 30}" fill="none" stroke="#94a3b8" stroke-width="1.5" />

  ${
    pageNumber === 1
      ? `
    <!-- Top Date & Edition Bar -->
    <g transform="translate(30, 30)">
      <rect width="1140" height="28" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="15" y="19" class="text-dark" font-size="13" font-weight="bold">శుక్రవారం అక్టోబరు 2, 2026</text>
      <text x="350" y="19" class="brand-blue" font-size="13" font-weight="bold">${cleanEditionTitle} ఎడిషన్</text>
      <text x="750" y="19" class="text-muted" font-size="12">${volumeStr}</text>
      <text x="1125" y="19" class="text-dark" font-size="13" font-weight="bold" text-anchor="end">పేజీ 1 (మొత్తం ${totalPages})</text>
    </g>

    <!-- Main Front Page Masthead (Eenadu Style Big Telugu Title & Red Box) -->
    <g transform="translate(30, 68)">
      <rect width="1140" height="110" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
      
      <!-- Big Telugu Brand Title -->
      <text x="30" y="75" fill="#0b1d3a" font-size="64" font-weight="900" font-family="'Noto Sans Telugu', sans-serif">పబ్లిక్ మూడ్</text>
      
      <!-- District Red Badge Box (Right side of logo) -->
      <rect x="740" y="15" width="380" height="80" fill="url(#redGrad)" rx="4" />
      <text x="930" y="52" class="text-white" font-size="34" font-weight="900" text-anchor="middle" font-family="'Noto Sans Telugu', sans-serif">పబ్లిక్ మూడ్</text>
      <text x="930" y="80" fill="#fef08a" font-size="22" font-weight="bold" text-anchor="middle" font-family="'Noto Sans Telugu', sans-serif">${cleanEditionTitle}</text>
    </g>

    <!-- Thin Divider Line -->
    <line x1="30" y1="188" x2="1170" y2="188" class="border-thick" />

    <!-- Top Headline Banner Article -->
    <g transform="translate(30, 198)">
      <rect width="700" height="135" fill="#fff5f5" stroke="#fecaca" rx="2" />
      <text x="15" y="32" class="text-red headline" font-size="32">ఏలికల సిఫారసు.. ఏజెన్సీల తిరస్కాసు</text>
      
      <g transform="translate(15, 48)">
        <circle cx="6" cy="12" r="4" fill="#dc2626" />
        <text x="18" y="16" class="text-dark" font-size="13" font-weight="bold">కలెక్టర్, కమిషనర్ల స్థాయి అధికారుల నివేదికలను సైతం పక్కన పెడుతున్న ఉన్నతాధికారులు.</text>
        
        <circle cx="6" cy="36" r="4" fill="#dc2626" />
        <text x="18" y="40" class="text-dark" font-size="13" font-weight="bold">హైదరాబాద్ ఐటీ రంగానికి రూ. 12,000 కోట్ల నిధుల మంజూరుపై స్పష్టత.</text>
        
        <circle cx="6" cy="60" r="4" fill="#dc2626" />
        <text x="18" y="64" class="text-dark" font-size="13" font-weight="bold">రీజనల్ రింగ్ రోడ్డు పనులను త్వరితగతిన పూర్తి చేయాలని ప్రభుత్వం ఆదేశం.</text>
      </g>

      <!-- Side Box Right of Main Banner -->
      <g transform="translate(720, 0)">
        <rect width="420" height="135" fill="#f8fafc" stroke="#cbd5e1" rx="2" />
        <text x="15" y="30" class="text-red headline" font-size="22">అడ్దె గోదామే గతి - ధాన్యం నిల్వల ఇబ్బందులు</text>
        <text x="15" y="55" class="text-muted" font-size="13">ఉమ్మడి జిల్లాల్లో కొనుగోలు చేసిన ధాన్యం నిల్వ ఉంచేందుకు సర్కారీ గోదాములు సరిపోక ప్రైవేటు గిడ్డంగులను ఆశ్రయిస్తున్నారు. నిధుల విడుదల ఆలస్యంతో రైతులు ఇబ్బందులు పడుతున్నారని ఫిర్యాదులు.</text>
      </g>
    </g>

    <!-- Main Front Page Grid (Left Lead Article + Center Photo + Right Column) -->
    <g transform="translate(30, 348)">
      
      <!-- Left Column Article (Width 360) -->
      <g transform="translate(0, 0)">
        <rect width="360" height="1260" fill="#ffffff" stroke="#e2e8f0" />
        <rect width="360" height="30" fill="#0b1d3a" />
        <text x="15" y="20" class="text-white" font-size="14" font-weight="bold">రాష్ట్ర వార్తలు &amp; అభివృద్ధి నివేదికలు</text>

        <g transform="translate(15, 45)">
          <text x="0" y="22" class="text-red headline" font-size="22">వృద్ధులను గౌరవిద్దాం - సంక్షేమ పథకాలు</text>
          <text x="0" y="48" class="text-muted" font-size="13">మహబూబ్‌నగర్, కలెక్టరేట్: వృద్ధుల సంక్షేమానికి ఉద్దేశించిన నూతన పింఛన్ పథకాలు మరియు ఉచిత వైద్య సేవలు తక్షణమే అమల్లోకి వస్తాయని అధికారులు వెల్లడించారు. ప్రభుత్వం చేపట్టిన ప్రజా పాలన కార్యక్రమాలకు ప్రజల నుంచి విశేష స్పందన లభిస్తోంది.</text>
          <text x="0" y="115" class="text-muted" font-size="13">ప్రతీ జిల్లా కేంద్రంలో సీనియర్ సిటిజన్స్ కోసం ప్రత్యేక కౌన్సెలింగ్ కేంద్రాలను ఏర్పాటు చేస్తున్నారు.</text>

          <line x1="0" y1="165" x2="330" y2="165" class="border-thin" />

          <text x="0" y="195" class="text-dark headline" font-size="20">ఉక్కపోతతో ఉక్కిరిబిక్కిరి.. సాగునీరు విడుదల</text>
          <text x="0" y="220" class="text-muted" font-size="13">ఎండ తీవ్రత పెరగడంతో పంట కాలువలకు 15,000 క్యూసెక్కుల నీరు విడుదల చేశారు. నాగార్జునసాగర్, శ్రీశైలం ప్రాజెక్టుల్లో నీటి మట్టాలు పూర్తిస్థాయికి చేరుకున్నాయని నీటిపారుదల అధికారులు తెలిపారు.</text>

          <line x1="0" y1="290" x2="330" y2="290" class="border-thin" />

          <text x="0" y="320" class="text-red headline" font-size="20">స్థానిక సంస్కృతి - పండుగ శుభాకాంక్షలు</text>
          <text x="0" y="345" class="text-muted" font-size="13">రాష్ట్రవ్యాప్తంగా బతుకమ్మ, దసరా ఉత్సవాల ఏర్పాట్లు ముమ్మరంగా సాగుతున్నాయి. దేవాలయాల వద్ద ప్రత్యేక క్యూలైన్లు మరియు సీసీ కెమెరాల నిఘా ఏర్పాటు చేశారు.</text>

          <!-- Middle Article Block -->
          <line x1="0" y1="420" x2="330" y2="420" class="border-thin" />
          <text x="0" y="450" class="text-dark headline" font-size="20">ఆర్టీసీ బస్సుల్లో మహిళలకు సురక్షిత ప్రయాణం</text>
          <text x="0" y="475" class="text-muted" font-size="13">మహాలక్ష్మి పథకం ద్వారా ఇప్పటి వరకు 85 కోట్ల మంది మహిళలకు ఉచిత రవాణా సౌకర్యం కల్పించినట్లు రవాణా శాఖ నివేదిక సమర్పించింది.</text>

          <line x1="0" y1="550" x2="330" y2="550" class="border-thin" />
          <text x="0" y="580" class="text-red headline" font-size="20">టీ20 కప్: భారత్ ఘన విజయం</text>
          <text x="0" y="605" class="text-muted" font-size="13">చివరి ఓవర్లో అద్భుత బౌలింగ్ తో భారత జట్టు పసిడి పతకం గెలుపొందింది. దేశవ్యాప్తంగా క్రీడాభిమానుల సంబరాలు.</text>

          <!-- Bottom Box inside Left Col -->
          <rect x="0" y="700" width="330" height="520" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
          <text x="165" y="735" class="text-red headline" font-size="18" text-anchor="middle">పబ్లిక్ మూడ్ పత్రిక ప్రత్యేక వార్తలు</text>
          <line x1="15" y1="750" x2="315" y2="750" stroke="#cbd5e1" />
          
          <text x="15" y="780" class="text-dark" font-size="14" font-weight="bold">• శంషాబాద్ ఎయిర్‌పోర్టు విస్తరణ పనులు ప్రారంభం</text>
          <text x="15" y="800" class="text-muted" font-size="12">నూతన టెర్మినల్ నిర్మాణం ద్వారా ఏడాదికి 4 కోట్ల మంది ప్రయాణికులకు సేవలు అందించవచ్చని జీఎంఆర్ అధికారులు ప్రకటించారు.</text>

          <text x="15" y="860" class="text-dark" font-size="14" font-weight="bold">• ఫార్మా సిటీ నూతన పాలసీ విడుదల</text>
          <text x="15" y="880" class="text-muted" font-size="12">కాలుష్య రహిత గ్రీన్ ఫార్మా పరిశ్రమల స్థాపనకు రూ. 20,000 కోట్ల పెట్టుబడులు రానున్నాయి.</text>

          <text x="15" y="940" class="text-dark" font-size="14" font-weight="bold">• ఐటీ రంగంలో నిరుద్యోగులకు ఉచిత శిక్షణ</text>
          <text x="15" y="960" class="text-muted" font-size="12">తెలంగాణ అకాడమీ ఫర్ స్కిల్ అండ్ నాలెడ్జ్ (TASK) ద్వారా 50,000 మందికి శిక్షణ.</text>
        </g>
      </g>

      <!-- Center Main Photo & Lead Story (Width 460) -->
      <g transform="translate(380, 0)">
        <!-- Photo Graphic Placeholder -->
        <rect width="460" height="300" fill="url(#photoGrad)" rx="4" />
        <circle cx="230" cy="130" r="50" fill="#dc2626" opacity="0.8" />
        <path d="M160 240 Q230 150 300 240" stroke="#60a5fa" stroke-width="14" fill="none" />
        <text x="230" y="250" class="text-white headline" font-size="20" text-anchor="middle">హైదరాబాద్ అభివృద్ధిపై ఉన్నత స్థాయి సమీక్ష</text>
        <text x="230" y="280" fill="#cbd5e1" font-size="12" text-anchor="middle">చిత్రం: పబ్లిక్ మూడ్ చీఫ్ ఫొటోగ్రాఫర్, హైదరాబాద్</text>

        <!-- Main Photo Story Below -->
        <g transform="translate(0, 315)">
          <text x="0" y="28" class="text-red headline" font-size="26">హైదరాబాద్ మెట్రో ఫేజ్ 2 కి గ్రీన్ సిగ్నల్:</text>
          <text x="0" y="58" class="text-dark headline" font-size="24">రూ. 12,000 కోట్ల నిధులు మంజూరు చేసిన ప్రభుత్వం</text>
          <text x="0" y="90" class="text-muted" font-size="14">శంషాబాద్ ఎయిర్‌పోర్టు మార్గంలో రవాణా కష్టాలు తీరనున్నాయి. రాయదుర్గం నుండి మైండ్ స్పేస్ వరకు నూతన మెట్రో కనెక్టివిటీకి కేబినెట్ ఆమోదం తెలిపిందని రవాణా శాఖ స్పష్టం చేసింది.</text>

          <line x1="0" y1="150" x2="460" y2="150" class="border-thick" />

          <!-- Story Grid Row 2 -->
          <text x="0" y="185" class="text-dark headline" font-size="22">వ్యవసాయ రంగానికి 24 గంటల ఉచిత విద్యుత్ సరఫరా</text>
          <text x="0" y="212" class="text-muted" font-size="14">రైతాంగానికి సాగునీరు మరియు ఉచిత విద్యుత్ లో ఎలాంటి అవాంతరాలు లేకుండా పటిష్టమైన చర్యలు తీసుకున్నామని విద్యుత్ శాఖ తెలిపింది.</text>

          <rect x="0" y="270" width="460" height="420" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
          <text x="20" y="305" class="text-dark headline" font-size="20">📊 ప్రజల అభిప్రాయం - పబ్లిక్ మూడ్ సర్వే:</text>
          
          <text x="20" y="340" class="text-dark" font-size="14" font-weight="bold">నగర రహదారుల అభివృద్ధిపై సంతృప్తి: 89%</text>
          <rect x="20" y="352" width="420" height="14" fill="#e2e8f0" rx="7" />
          <rect x="20" y="352" width="374" height="14" fill="#1e40af" rx="7" />

          <text x="20" y="390" class="text-dark" font-size="14" font-weight="bold">ఉచిత విద్యుత్ &amp; సాగునీరు సరఫరా: 94%</text>
          <rect x="20" y="402" width="420" height="14" fill="#e2e8f0" rx="7" />
          <rect x="20" y="402" width="395" height="14" fill="#16a34a" rx="7" />

          <text x="20" y="440" class="text-dark" font-size="14" font-weight="bold">మహిళా భద్రత &amp; శాంతిభద్రతలు: 96%</text>
          <rect x="20" y="452" width="420" height="14" fill="#e2e8f0" rx="7" />
          <rect x="20" y="452" width="403" height="14" fill="#dc2626" rx="7" />
        </g>
      </g>

      <!-- Right Column Weather & Bulletins (Width 300) -->
      <g transform="translate(860, 0)">
        <rect width="280" height="1260" fill="#ffffff" stroke="#e2e8f0" />
        <rect width="280" height="30" fill="#dc2626" />
        <text x="15" y="20" class="text-white" font-size="14" font-weight="bold">వాతావరణం &amp; విపణి ధరలు</text>

        <!-- Weather Box -->
        <g transform="translate(15, 45)">
          <rect width="250" height="80" fill="#f0fdf4" stroke="#bbf7d0" rx="4" />
          <text x="12" y="24" fill="#166534" font-size="13" font-weight="bold">${cleanEditionTitle} వాతావరణం</text>
          <text x="12" y="48" fill="#15803d" font-size="22" font-weight="bold">28°C / నిర్మలం ☀️</text>
          <text x="12" y="70" fill="#166534" font-size="11">తేమ: 60% | గాలి వేగం: 12 km/h</text>
        </g>

        <!-- Gold & Silver Box -->
        <g transform="translate(15, 135)">
          <rect width="250" height="80" fill="#fffbeb" stroke="#fef08a" rx="4" />
          <text x="12" y="24" fill="#92400e" font-size="13" font-weight="bold">పసిడి &amp; వెండి ధరలు</text>
          <text x="12" y="48" fill="#b45309" font-size="16" font-weight="bold">22K బంగారం (10g): ₹72,400 ↑</text>
          <text x="12" y="70" fill="#92400e" font-size="12">వెండి (1 kg): ₹94,500</text>
        </g>

        <!-- Bulletins list -->
        <g transform="translate(15, 230)">
          <text x="0" y="20" class="text-red headline" font-size="16">📌 భూముల రీ-సర్వే పూర్తి</text>
          <text x="0" y="40" class="text-muted" font-size="12">డిజిటల్ మ్యాపింగ్ ద్వారా భూ వివాదాల పరిష్కారానికి నూతన చర్యలు.</text>

          <line x1="0" y1="75" x2="250" y2="75" class="border-thin" />

          <text x="0" y="98" class="text-red headline" font-size="16">📌 సింగరేణిలో బొగ్గు ఉత్పత్తి పెంపు</text>
          <text x="0" y="118" class="text-muted" font-size="12">వార్షిక లక్ష్య సాధనకు కార్మికులు కృషి చేయాలని సీఎండీ పిలుపు.</text>

          <line x1="0" y1="155" x2="250" y2="155" class="border-thin" />

          <text x="0" y="178" class="text-red headline" font-size="16">📌 ఆర్టీసీ కార్మికులకు దసరా బోనస్</text>
          <text x="0" y="198" class="text-muted" font-size="12">ఉద్యోగుల ఖాతాల్లో నగదు జమ చేసిన యాజమాన్యం.</text>

          <line x1="0" y1="235" x2="250" y2="250" class="border-thin" />

          <text x="0" y="260" class="text-red headline" font-size="16">📌 టాలీవుడ్ కొత్త చిత్రాలు విడుదల</text>
          <text x="0" y="280" class="text-muted" font-size="12">ఈ వారంలో 4 భారీ సినిమాలు థియేటర్లలో సందడి చేయనున్నాయి.</text>
        </g>
      </g>
    </g>

    <!-- Bottom Page Footer Bar -->
    <g transform="translate(30, 1625)">
      <rect width="1140" height="35" fill="#0b1d3a" rx="2" />
      <text x="20" y="23" class="text-white" font-size="13" font-weight="bold">పబ్లిక్ మూడ్ దినపత్రిక • ${cleanEditionTitle} ఎడిషన్ • 100% ఉచిత డిజిటల్ ఈ-పేపర్</text>
      <text x="1120" y="23" class="text-white" font-size="13" font-weight="bold" text-anchor="end">© 2026 PUBLIC MOOD • ALL RIGHTS RESERVED</text>
    </g>
    `
      : `
    <!-- Inside Page Header Bar (Pages 2 to 12) -->
    <g transform="translate(30, 30)">
      <rect width="1140" height="45" fill="#0b1d3a" />
      <text x="20" y="28" class="text-white" font-size="16" font-weight="bold">పబ్లిక్ మూడ్ (${cleanEditionTitle})</text>
      <text x="570" y="28" class="text-white" font-size="16" font-weight="bold" text-anchor="middle">పేజీ ${pageNumber}: ${editionName} ప్రత్యేక వార్తలు</text>
      <text x="1120" y="28" class="text-white" font-size="14" font-weight="bold" text-anchor="end">${dateStr} • పేజీ ${pageNumber}/${totalPages}</text>
    </g>

    <!-- Inside Page Content 3-Column Grid -->
    <g transform="translate(30, 90)">
      <rect width="1140" height="1540" fill="#ffffff" stroke="#cbd5e1" />
      
      <!-- Col 1 -->
      <g transform="translate(20, 20)">
        <rect width="350" height="1500" fill="#ffffff" stroke="#e2e8f0" />
        <rect width="350" height="28" fill="#1e40af" />
        <text x="15" y="19" class="text-white" font-size="14" font-weight="bold">రాష్ట్ర నివేదికలు - పేజీ ${pageNumber}</text>

        <g transform="translate(15, 45)">
          <text x="0" y="22" class="text-red headline" font-size="20">ప్రజా పాలన ప్రగతి సమీక్ష</text>
          <text x="0" y="48" class="text-muted" font-size="13">ప్రభుత్వ సంక్షేమ పథకాలు ప్రజలకు నేరుగా తక్కువ సమయంలో అందుతున్నాయి. విద్యా, వైద్య రంగాలు మరింత పటిష్టం చేయబడ్డాయి.</text>
          
          <line x1="0" y1="120" x2="320" y2="120" class="border-thin" />
          <text x="0" y="148" class="text-dark headline" font-size="18">స్వయం సహాయక సంఘాలకు రుణాలు</text>
          <text x="0" y="172" class="text-muted" font-size="13">డ్వాక్రా మహిళలకు రూ. 500 కోట్ల సున్నా వడ్డీ రుణాలు పంపిణీ చేయబడ్డాయి.</text>

          <line x1="0" y1="240" x2="320" y2="240" class="border-thin" />
          <rect x="0" y="260" width="320" height="220" fill="#1e293b" rx="4" />
          <text x="160" y="375" class="text-white headline" font-size="16" text-anchor="middle">పేజీ ${pageNumber} ప్రత్యేక చిత్రం</text>
        </g>
      </g>

      <!-- Col 2 -->
      <g transform="translate(395, 20)">
        <rect width="350" height="1500" fill="#ffffff" stroke="#e2e8f0" />
        <rect width="350" height="28" fill="#0b1d3a" />
        <text x="15" y="19" class="text-white" font-size="14" font-weight="bold">ప్రత్యేక విశ్లేషణ - పేజీ ${pageNumber}</text>

        <g transform="translate(15, 45)">
          <text x="0" y="22" class="text-dark headline" font-size="20">పరిశ్రమలకు విద్యుత్ రాయితీలు</text>
          <text x="0" y="48" class="text-muted" font-size="13">సూక్ష్మ, చిన్న తరహా పరిశ్రమల ప్రోత్సాహానికి కొత్త రాయితీ పథకం ప్రారంభమైనట్లు పరిశ్రమల శాఖ తెలిపింది.</text>

          <line x1="0" y1="120" x2="320" y2="120" class="border-thin" />
          <text x="0" y="148" class="text-red headline" font-size="18">రహదారుల గుంతల పూడ్చివేత</text>
          <text x="0" y="172" class="text-muted" font-size="13">వర్షాల ధాటికి దెబ్బతిన్న రోడ్లకు వెంటనే మరమ్మతులు చేయాలని మున్సిపల్ అధికారులు నిర్ణయించారు.</text>

          <rect x="0" y="260" width="320" height="380" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
          <text x="160" y="295" class="text-dark headline" font-size="16" text-anchor="middle">పబ్లిక్ మూడ్ - పేజీ ${pageNumber} సారాంశం</text>
        </g>
      </g>

      <!-- Col 3 -->
      <g transform="translate(770, 20)">
        <rect width="350" height="1500" fill="#ffffff" stroke="#e2e8f0" />
        <rect width="350" height="28" fill="#dc2626" />
        <text x="15" y="19" class="text-white" font-size="14" font-weight="bold">జిల్లా సమాచారం &amp; ప్రకటనలు</text>

        <g transform="translate(15, 45)">
          <text x="0" y="22" class="text-red headline" font-size="20">ఉచిత వైద్య శిబిరాలు నిర్వహణ</text>
          <text x="0" y="48" class="text-muted" font-size="13">మండల కేంద్రాలలో ఉచిత రక్తపరీక్షలు, కంటి వైద్య శిబిరాలు విజయవంతం అయ్యాయి.</text>

          <rect x="0" y="140" width="320" height="600" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
          <text x="160" y="175" class="text-dark headline" font-size="16" text-anchor="middle">పబ్లిక్ మూడ్ క్లాసిఫైడ్స్</text>
          <text x="160" y="200" class="text-muted" font-size="13" text-anchor="middle">అడ్వర్టైజ్‌మెంట్‌ల కోసం: 1800-888-999</text>
        </g>
      </g>
    </g>
    `
  }
</svg>
`;

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent);
}
