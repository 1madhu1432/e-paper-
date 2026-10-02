import React, { useEffect, useState } from 'react';
import { MockNewsService } from '../../services/mockNewsService';
import { MockVideoService } from '../../services/mockVideoService';
import { Article, VideoItem } from '../../types';
import { HeroSection } from '../../components/public/HeroSection';
import { CategoryNewsBlock } from '../../components/public/CategoryNewsBlock';
import { VideoSection } from '../../components/public/VideoSection';
import { EPaperPromoBlock } from '../../components/public/EPaperPromoBlock';
import { TrendingSidebar } from '../../components/public/TrendingSidebar';
import { NewsletterSection } from '../../components/public/NewsletterSection';
import { AdBanner } from '../../components/common/AdBanner';
import { ArticleCard } from '../../components/public/ArticleCard';
import { Flame, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicMoodSection } from '../../components/public/PublicMoodSection';

export const HomePage: React.FC = () => {
  const [allArticles, setAllArticles] = useState<Article[]>(() => MockNewsService.getPublished());
  const [videos, setVideos] = useState<VideoItem[]>(() => MockVideoService.getAll());

  const loadData = () => {
    setAllArticles(MockNewsService.getPublished());
    setVideos(MockVideoService.getAll());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('articles-updated', handleUpdate);
    window.addEventListener('videos-updated', handleUpdate);
    return () => {
      window.removeEventListener('articles-updated', handleUpdate);
      window.removeEventListener('videos-updated', handleUpdate);
    };
  }, []);

  // Slices
  const featuredArticles = allArticles.filter(a => a.isFeatured);
  const leadArticle = featuredArticles[0] || allArticles[0];
  const secondaryArticles = featuredArticles.slice(1, 4).length > 0 ? featuredArticles.slice(1, 4) : allArticles.slice(1, 4);

  const telanganaNews = allArticles.filter(a => a.category === 'telangana');
  const apNews = allArticles.filter(a => a.category === 'andhra-pradesh');
  const hyderabadNews = allArticles.filter(a => a.category === 'hyderabad');
  const politicsNews = allArticles.filter(a => a.category === 'politics');
  const jobsNews = allArticles.filter(a => a.category === 'jobs');
  const educationNews = allArticles.filter(a => a.category === 'education');
  const businessNews = allArticles.filter(a => a.category === 'business');
  const crimeNews = allArticles.filter(a => a.category === 'crime');
  const sportsNews = allArticles.filter(a => a.category === 'sports');
  const cinemaNews = allArticles.filter(a => a.category === 'cinema');
  const specialStories = allArticles.filter(a => a.category === 'special-stories');
  const trendingArticles = MockNewsService.getTrending();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* 1. Top Sponsor Ad (home-top) */}
      <div className="mb-6">
        <AdBanner placement="home-top" />
      </div>

      {/* 2. Hero Section: Lead Story + 3 Secondary Headlines */}
      <section className="mb-10">
        <HeroSection leadArticle={leadArticle} secondaryArticles={secondaryArticles} />
      </section>

      {/* 3. Main Two-Column Layout: Left (Editorial Feed) + Right (Trending & Ads) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Primary Categories */}
        <div className="lg:col-span-8 space-y-10">
          {/* Latest News Feed Strip */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <Link to="/latest" className="flex items-center gap-2 group cursor-pointer" title="తాజా వార్తల పేజీకి వెళ్లండి">
                <span className="w-2.5 h-6 bg-red-600 rounded-xs group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black font-telugu text-slate-900 group-hover:text-red-600 transition-colors">
                  తాజా వార్తలు (Latest Updates)
                </h3>
              </Link>
              <Link
                to="/latest"
                className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                title="అన్ని తాజా వార్తలు చూడండి"
              >
                <span>మరిన్ని వార్తలు</span> <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {allArticles.slice(4, 7).map(art => (
                <ArticleCard key={art.id} article={art} variant="horizontal" />
              ))}
            </div>
          </div>

          {/* Telangana Category */}
          <CategoryNewsBlock
            title="Telangana"
            titleTe="తెలంగాణ సమగ్ర సమాచారం"
            categorySlug="telangana"
            articles={telanganaNews}
            accentColor="#ea580c"
            subcategories={['హైదరాబాద్', 'వరంగల్', 'కరీంనగర్', 'నల్లగొండ']}
          />

          {/* Mid Feed Sponsor Ad Banner */}
          <AdBanner placement="home-middle" />

          {/* Andhra Pradesh Category */}
          <CategoryNewsBlock
            title="Andhra Pradesh"
            titleTe="ఆంధ్రప్రదేశ్ ముఖ్యాంశాలు"
            categorySlug="andhra-pradesh"
            articles={apNews}
            accentColor="#0284c7"
            subcategories={['అమరావతి', 'విజయవాడ', 'విశాఖ', 'తిరుపతి']}
          />

          {/* Hyderabad City Round-up */}
          <CategoryNewsBlock
            title="Hyderabad"
            titleTe="గ్రేటర్ హైదరాబాద్ సిటీ రౌండప్"
            categorySlug="hyderabad"
            articles={hyderabadNews}
            accentColor="#7c3aed"
            subcategories={['ట్రాఫిక్', 'ఐటీ కారిడార్', 'జీహెచ్ఎంసీ', 'రియల్ ఎస్టేట్']}
          />

          {/* Politics Category */}
          <CategoryNewsBlock
            title="Politics"
            titleTe="రాజకీయాలు & విశ్లేషణలు"
            categorySlug="politics"
            articles={politicsNews}
            accentColor="#b91c1c"
            subcategories={['అసెంబ్లీ', 'పార్లమెంట్', 'ఎన్నికలు']}
          />

          {/* Public Mood / People's Pulse Interactive Section */}
          <PublicMoodSection />

          {/* Jobs & Education Combined Highlights */}
          <section className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-emerald-600 rounded-xs" />
                <h3 className="text-xl font-black font-telugu text-slate-900">
                  ఉద్యోగాలు & విద్యా సమాచారం (Jobs & Education)
                </h3>
              </div>
              <Link to="/jobs" className="text-xs font-bold text-emerald-600 hover:underline flex items-center">
                అన్ని నోటిఫికేషన్లు <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...jobsNews.slice(0, 2), ...educationNews.slice(0, 2)].map(art => (
                <ArticleCard key={art.id} article={art} variant="standard" />
              ))}
            </div>
          </section>

          {/* Cinema & Entertainment */}
          <CategoryNewsBlock
            title="Cinema"
            titleTe="టాలీవుడ్ & సినీ వినోదం"
            categorySlug="cinema"
            articles={cinemaNews}
            accentColor="#e11d48"
            subcategories={['రివ్యూలు', 'బాక్సాఫీస్', 'ఇంటర్వ్యూలు', 'ఓటీటీ']}
          />

          {/* Sports Desk */}
          <CategoryNewsBlock
            title="Sports"
            titleTe="క్రీడా జగత్తు"
            categorySlug="sports"
            articles={sportsNews}
            accentColor="#16a34a"
            subcategories={['క్రికెట్', 'ఐపీఎల్', 'కబడ్డీ', 'అథ్లెటిక్స్']}
          />

          {/* Business & Crime Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                <h4 className="text-base font-bold font-telugu text-amber-700">వ్యాపారం & మార్కెట్</h4>
                <Link to="/business" className="text-xs text-red-600 font-bold hover:underline">చూడండి →</Link>
              </div>
              <div className="space-y-3">
                {businessNews.slice(0, 3).map(art => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                <h4 className="text-base font-bold font-telugu text-rose-800">క్రైమ్ & ఇన్వెస్టిగేషన్</h4>
                <Link to="/crime" className="text-xs text-red-600 font-bold hover:underline">చూడండి →</Link>
              </div>
              <div className="space-y-3">
                {crimeNews.slice(0, 3).map(art => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>
          </div>

          {/* Special Stories & Field Investigations */}
          <CategoryNewsBlock
            title="Special Stories"
            titleTe="ప్రత్యేక కథనాలు & పరిశోధనలు"
            categorySlug="special-stories"
            articles={specialStories}
            accentColor="#4f46e5"
          />
        </div>

        {/* Right Sidebar (4 cols): Trending, E-paper promo, Sponsor ads, Citizen Tip button */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Trending Articles Widget */}
          <TrendingSidebar articles={trendingArticles} />

          {/* Sidebar Sponsor Ad */}
          <AdBanner placement="sidebar" />

          {/* Citizen Reporter Card */}
          <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl p-5 text-white shadow-md space-y-3">
            <div className="inline-block bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase">
              ప్రజావాణి • Citizen Reporting
            </div>
            <h3 className="text-lg font-black font-telugu">మీ ప్రాంతంలో సమస్య ఉందా? వార్త పంపండి!</h3>
            <p className="text-xs text-red-100 leading-relaxed font-telugu">
              రోడ్లు, తాగునీరు, డ్రైనేజీ లేదా అవినీతి సమస్యలపై ఫోటోలు లేదా వివరాలు పంపండి. జనతా వాణి ప్రభుత్వం దృష్టికి తీసుకెళ్తుంది.
            </p>
            <Link
              to="/report-news"
              className="inline-flex items-center justify-center w-full py-2.5 bg-white text-red-700 font-bold text-xs rounded-xl shadow-xs hover:bg-red-50 transition-colors"
            >
              ఇప్పుడే ఫిర్యాదు నమోదు చేయండి →
            </Link>
          </div>

          {/* Weather & AP/TG Districts Selector Shortcut */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              జిల్లా వారీ వార్తలు (District Editions)
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {['హైదరాబాద్', 'విజయవాడ', 'విశాఖ', 'వరంగల్', 'గుంటూరు', 'తిరుపతి', 'కరీంనగర్', 'కర్నూలు', 'నల్లగొండ', 'ఖమ్మం', 'కడప', 'అనంతపురం'].map(dist => (
                <Link
                  key={dist}
                  to={`/search?q=${encodeURIComponent(dist)}`}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-lg text-slate-700 font-medium transition-colors"
                >
                  {dist}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 4. Janatha Vaani Videos Hub */}
      <VideoSection videos={videos} />

      {/* 5. E-Paper Promotion Banner */}
      <EPaperPromoBlock />

      {/* 6. Bottom Sponsor Ad (home-bottom) */}
      <div className="my-8">
        <AdBanner placement="home-bottom" />
      </div>

      {/* 7. Morning Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
};
