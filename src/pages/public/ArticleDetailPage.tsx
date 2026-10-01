import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MockNewsService } from '../../services/mockNewsService';
import { Article, Comment } from '../../types';
import { 
  Clock, 
  Eye, 
  Share2, 
  Bookmark, 
  Printer, 
  Type, 
  ChevronLeft, 
  ChevronRight, 
  ThumbsUp, 
  MessageCircle, 
  Flame, 
  Send,
  Calendar,
  User,
  Heart,
  ExternalLink
} from 'lucide-react';
import { useSavedArticles } from '../../context/SavedArticlesContext';
import { useUserPreferences, FontSizeOption } from '../../context/UserPreferencesContext';
import { AdBanner } from '../../components/common/AdBanner';
import { ArticleCard } from '../../components/public/ArticleCard';
import { TrendingSidebar } from '../../components/public/TrendingSidebar';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [reactions, setReactions] = useState<{ likes: number; loves: number; userReacted: string | null }>({
    likes: 142,
    loves: 89,
    userReacted: null,
  });
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      articleId: '',
      userName: 'రామకృష్ణ (హైదరాబాద్)',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      comment: 'చాలా స్పష్టమైన విశ్లేషణ అందించారు. జనతా వాణి నిక్కచ్చి వార్తలకు ధన్యవాదాలు.',
      createdAt: '2 గంటల క్రితం',
      likes: 12,
    },
    {
      id: 'c2',
      articleId: '',
      userName: 'సునీత రావు (విజయవాడ)',
      userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
      comment: 'ప్రభుత్వ అధికారులు ఈ కథనంపై తక్షణమే స్పందించి సమస్యను పరిష్కరించాలని కోరుతున్నాను.',
      createdAt: '4 గంటల క్రితం',
      likes: 8,
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const { isSaved, toggleSave } = useSavedArticles();
  const { fontSize, setFontSize } = useUserPreferences();

  useEffect(() => {
    if (slug) {
      const found = MockNewsService.getBySlug(slug);
      setArticle(found);
      if (found) {
        MockNewsService.incrementViews(found.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [slug]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-slate-800">కథనం కనుగొనబడలేదు (Article Not Found)</h2>
        <p className="text-sm text-slate-500 mt-2">మీరు వెతుకుతున్న వార్తా కథనం తొలగించబడి ఉండవచ్చు లేదా లింక్ తప్పుగా ఉండవచ్చు.</p>
        <Link to="/" className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded-xl text-xs font-bold">
          హోమ్‌పేజీకి వెళ్లండి
        </Link>
      </div>
    );
  }

  const saved = isSaved(article.id);
  const relatedArticles = MockNewsService.getByCategory(article.category).filter(a => a.id !== article.id);
  const trendingArticles = MockNewsService.getTrending();
  const allPublished = MockNewsService.getPublished();
  const currentIndex = allPublished.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allPublished[currentIndex - 1] : undefined;
  const nextArticle = currentIndex < allPublished.length - 1 ? allPublished[currentIndex + 1] : undefined;

  const [showCopyToast, setShowCopyToast] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`*${article.titleTe}*\n\nపూర్తి వార్త కథనం కోసం చదవండి:\n${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleXShare = () => {
    const text = encodeURIComponent(article.titleTe);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.titleTe,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const added: Comment = {
      id: `comm-${Date.now()}`,
      articleId: article.id,
      userName: commentAuthor.trim() || 'పాఠకుడు (Reader)',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      comment: newComment.trim(),
      createdAt: 'ఇప్పుడే',
      likes: 0,
    };
    setComments([added, ...comments]);
    setNewComment('');
  };

  // Font size classes for article body
  const bodyFontSize = {
    small: 'text-sm sm:text-base leading-relaxed',
    medium: 'text-base sm:text-lg leading-loose',
    large: 'text-lg sm:text-xl leading-loose',
  }[fontSize];

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 no-print">
        <Link to="/" className="hover:text-red-600">హోమ్</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/${article.category}`} className="hover:text-red-600 uppercase font-semibold">
          {article.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 font-medium truncate max-w-xs">{article.titleTe}</span>
      </div>

      {/* Top Sponsor Ad Banner */}
      <div className="mb-6 no-print">
        <AdBanner placement="article-top" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Article Content (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-8 border border-slate-200/80 shadow-xs">
          {/* Header Metadata */}
          <div className="space-y-3 pb-6 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              {article.isBreaking && (
                <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                  <Flame className="w-3.5 h-3.5 fill-white" /> బ్రేకింగ్ న్యూస్
                </span>
              )}
              <Link
                to={`/${article.category}`}
                className="bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase"
              >
                {article.subcategory || article.category}
              </Link>
              {article.district && (
                <span className="text-xs text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  📍 {article.district}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-telugu leading-tight">
              {article.titleTe}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed font-telugu">
              {article.summaryTe}
            </p>

            {/* Reporter Profile & Publication Date */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <Link to={`/author/${article.authorId}`} className="shrink-0">
                  <img
                    src={article.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'}
                    alt={article.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                </Link>
                <div>
                  <Link to={`/author/${article.authorId}`} className="font-bold text-slate-800 hover:text-red-600 text-sm block">
                    {article.authorName}
                  </Link>
                  <div className="flex items-center gap-3 text-slate-400 mt-0.5">
                    <span>ప్రచురణ: {new Date(article.publishedAt).toLocaleDateString('te-IN')}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {article.readingTimeMinutes} నిమిషాల పఠనం
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar (Font Size, Bookmark, WhatsApp, Print) */}
              <div className="flex items-center gap-1.5 no-print">
                {/* Font Size Selector */}
                <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                  {(['small', 'medium', 'large'] as FontSizeOption[]).map(size => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        fontSize === size ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600'
                      }`}
                      title={`Font size: ${size}`}
                    >
                      {size === 'small' ? 'A-' : size === 'medium' ? 'A' : 'A+'}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => toggleSave(article.id)}
                  className={`p-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors ${
                    saved ? 'text-red-600 fill-red-600 bg-red-50 border-red-200' : 'text-slate-600'
                  }`}
                  title={saved ? 'బుక్‌మార్క్ తొలగించండి' : 'కథనాన్ని సేవ్ చేయండి'}
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppShare}
                  className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs transition-colors"
                  title="WhatsApp లో షేర్ చేయండి"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
                  title="షేర్ చేయండి"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  onClick={handlePrint}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
                  title="కథనం ప్రింట్ చేయండి"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Hero Featured Image */}
          <div className="my-6 rounded-2xl overflow-hidden shadow-sm bg-slate-100">
            <img
              src={article.imageUrl}
              alt={article.titleTe}
              className="w-full object-cover max-h-[460px]"
            />
            {article.imageCaption && (
              <p className="text-xs text-slate-500 p-2.5 bg-slate-50 border-t border-slate-100 italic font-telugu text-center">
                {article.imageCaption}
              </p>
            )}
          </div>

          {/* Article Full Body */}
          <div className={`text-slate-800 font-telugu space-y-5 ${bodyFontSize}`}>
            {article.contentTe.split('\n\n').map((para, i) => (
              <p key={i} className="text-justify font-normal">
                {para}
              </p>
            ))}

            {/* Mid Article Sponsor Ad Placement */}
            <div className="py-6 no-print">
              <AdBanner placement="article-middle" />
            </div>

            <p className="text-justify font-normal">
              ప్రజల గొంతుకగా జనతా వాణి ఎల్లప్పుడూ క్షేత్రస్థాయి పరిశీలన జరిపి ప్రజాసమస్యలను ప్రభుత్వం దృష్టికి తెస్తుంది. ప్రజాప్రతినిధులు మరియు అధికారులు ఈ అంశంపై మరింత బాధ్యతాయుతంగా స్పందించాలని ఆశిస్తున్నాం.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">ట్యాగ్‌లు:</span>
            {article.tags.map(tag => (
              <Link
                key={tag}
                to={`/search?q=${encodeURIComponent(tag)}`}
                className="text-xs font-semibold bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 px-3 py-1 rounded-full transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Interactive Reactions */}
          <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-4 no-print">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">ఈ కథనంపై మీ స్పందన:</span>
              <button
                onClick={() => setReactions(prev => ({ ...prev, likes: prev.likes + 1, userReacted: 'like' }))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  reactions.userReacted === 'like' ? 'bg-red-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>ఉపయోగపడింది ({reactions.likes})</span>
              </button>
              <button
                onClick={() => setReactions(prev => ({ ...prev, loves: prev.loves + 1, userReacted: 'love' }))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  reactions.userReacted === 'love' ? 'bg-rose-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>అద్భుతం ({reactions.loves})</span>
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                title="WhatsApp లో షేర్ చేయండి"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleFacebookShare}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                title="Facebook లో షేర్ చేయండి"
              >
                <span>Facebook</span>
              </button>
              <button
                onClick={handleXShare}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                title="X (Twitter) లో షేర్ చేయండి"
              >
                <span>X (Twitter)</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                title="కథనం లింక్ కాపీ చేయండి"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>

          {/* Previous / Next Article Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 no-print">
            {prevArticle ? (
              <Link
                to={`/article/${prevArticle.slug}`}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-red-400 hover:bg-slate-50 transition-colors flex items-center gap-3 group"
              >
                <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-red-600 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">మునుపటి కథనం</span>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-red-600 line-clamp-1">
                    {prevArticle.titleTe}
                  </p>
                </div>
              </Link>
            ) : <div />}

            {nextArticle && (
              <Link
                to={`/article/${nextArticle.slug}`}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-red-400 hover:bg-slate-50 transition-colors flex items-center justify-between text-right gap-3 group"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">తరువాతి కథనం</span>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-red-600 line-clamp-1">
                    {nextArticle.titleTe}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-red-600 shrink-0" />
              </Link>
            )}
          </div>

          {/* Bottom Article Sponsor Ad */}
          <div className="my-8 no-print">
            <AdBanner placement="article-bottom" />
          </div>

          {/* Comments Section */}
          <section className="mt-10 pt-8 border-t border-slate-200 no-print">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-black font-telugu text-slate-900">
                పాఠకుల స్పందనలు ({comments.length})
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="mb-6 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
              <input
                type="text"
                placeholder="మీ పేరు (Optional)..."
                value={commentAuthor}
                onChange={e => setCommentAuthor(e.target.value)}
                className="w-full sm:w-1/2 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <textarea
                required
                rows={3}
                placeholder="మీ అభిప్రాయాన్ని ఇక్కడ నమోదు చేయండి..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-red-500 font-telugu"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> అభిప్రాయం పంపండి
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-3 divide-y divide-slate-100">
              {comments.map(c => (
                <div key={c.id} className="pt-3 first:pt-0 flex items-start gap-3">
                  <img
                    src={c.userAvatar}
                    alt={c.userName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{c.userName}</span>
                      <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 font-telugu">
                      {c.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Trending + Related News */}
        <aside className="lg:col-span-4 space-y-6 no-print">
          <TrendingSidebar articles={trendingArticles} />
          <AdBanner placement="sidebar" />

          {/* Related News in Category */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-sm font-black font-telugu text-slate-900 border-b border-slate-100 pb-2 mb-3">
              సంబంధిత వార్తలు ({article.category})
            </h3>
            <div className="space-y-3">
              {relatedArticles.slice(0, 4).map(rel => (
                <ArticleCard key={rel.id} article={rel} variant="compact" />
              ))}
            </div>
          </div>
        </aside>
      </div>

      {showCopyToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-in fade-in border border-slate-700">
          <span>✓ కథనం లింక్ విజయవంతంగా కాపీ చేయబడింది! (Link copied!)</span>
        </div>
      )}
    </article>
  );
};
