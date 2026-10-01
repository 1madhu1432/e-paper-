import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Send,
  Sparkles,
  Image as ImageIcon,
  Flame,
  Star,
  Tag,
  FileText,
  UserCheck,
  CheckCircle,
  Wand2,
} from 'lucide-react';
import { MockNewsService } from '../../services/mockNewsService';
import { CATEGORIES } from '../../data/categories';
import { REPORTERS } from '../../data/reporters';

export const AdminArticleEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const existingArticle = id ? MockNewsService.getById(id) : undefined;

  const [titleTe, setTitleTe] = useState(existingArticle?.titleTe || '');
  const [titleEn, setTitleEn] = useState(existingArticle?.title || '');
  const [category, setCategory] = useState(existingArticle?.category || CATEGORIES[0].slug);
  const [excerptTe, setExcerptTe] = useState(existingArticle?.summaryTe || '');
  const [content, setContent] = useState(
    existingArticle?.contentTe ||
      existingArticle?.summaryTe ||
      ''
  );
  const [featuredImage, setFeaturedImage] = useState(
    existingArticle?.imageUrl ||
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80'
  );
  const [authorName, setAuthorName] = useState(existingArticle?.authorName || REPORTERS[0].nameTe);
  const [isBreaking, setIsBreaking] = useState(existingArticle?.isBreaking || false);
  const [isFeatured, setIsFeatured] = useState(existingArticle?.isFeatured || false);
  const [tags, setTags] = useState(existingArticle?.tags?.join(', ') || 'తెలంగాణ, ముఖ్య వార్తలు, లైవ్ అప్‌డేట్స్');

  const [aiGenerating, setAiGenerating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAiEnhance = () => {
    setAiGenerating(true);
    setTimeout(() => {
      if (!titleTe) {
        setTitleTe('హైదరాబాద్‌లో భారీ అభివృద్ధి ప్రాజెక్టులకు శ్రీకారం చుట్టిన ప్రభుత్వం');
        setTitleEn('Government launches mega infrastructure development projects in Hyderabad');
      }
      if (!excerptTe) {
        setExcerptTe('నగర ప్రజల రవాణా సౌకర్యార్థం మరియు పర్యావరణ పరిరక్షణ లక్ష్యంగా నూతన మాస్టర్ ప్లాన్ ఆమోదం.');
      }
      if (!content) {
        setContent(
          'హైదరాబాద్‌లో రవాణా వ్యవస్థను ఆధునీకరించేందుకు ప్రభుత్వం భారీ ప్రణాళికను సిద్ధం చేసింది. ముఖ్యమంత్రి అధికారులతో నిర్వహించిన సమీక్షా సమావేశంలో ప్రాజెక్టు వివరాలను వెల్లడించారు. మెట్రో విస్తరణ మరియు గ్రీన్ కారిడార్ల ఏర్పాటుపై ప్రత్యేక దృష్టి సారించారు.'
        );
      }
      setAiGenerating(false);
    }, 800);
  };

  const handleSave = (status: 'draft' | 'pending_review' | 'published') => {
    const articlePayload = {
      title: titleEn || titleTe,
      titleTe: titleTe || titleEn,
      summary: excerptTe,
      summaryTe: excerptTe,
      content: content,
      contentTe: content,
      category: category,
      authorName: authorName,
      imageUrl: featuredImage,
      isBreaking: isBreaking,
      isFeatured: isFeatured,
      status: status,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    if (isEditing && id) {
      MockNewsService.update(id, articlePayload);
    } else {
      MockNewsService.create(articlePayload);
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      navigate('/admin/articles');
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/articles"
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold font-telugu text-slate-900">
              {isEditing ? 'వార్తను సవరించండి (Edit Article)' : 'కొత్త వార్త రచించండి (Create Article)'}
            </h1>
            <p className="text-xs text-slate-500">
              {isEditing ? `ID: ${id}` : 'తెలుగు మరియు ఇంగ్లీష్ శీర్షికలతో వార్తను ప్రచురించండి'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleSave('draft')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>డ్రాఫ్ట్‌గా సేవ్ చేయి</span>
          </button>
          <button
            onClick={() => handleSave('pending_review')}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>సమీక్షకు పంపు (Submit for Review)</span>
          </button>
          <button
            onClick={() => handleSave('published')}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>వెంటనే ప్రచురించు</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-600 text-white p-4 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle className="w-5 h-5" />
          <span>వార్త విజయవంతంగా సేవ్ చేయబడింది! రీడైరెక్ట్ అవుతోంది...</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor Form (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
            {/* AI Prompt Header */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/60 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-telugu">AI జర్నలిజం అసిస్టెంట్</h4>
                  <p className="text-[11px] text-slate-600">ఒక్క క్లిక్‌తో శీర్షిక మరియు విశ్లేషణను మెరుగుపరచండి</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAiEnhance}
                disabled={aiGenerating}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>{aiGenerating ? 'రచిస్తోంది...' : 'AI ఆటో-జనరేట్'}</span>
              </button>
            </div>

            {/* Telugu Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 font-telugu mb-1.5">
                తెలుగు శీర్షిక (Telugu Headline) *
              </label>
              <input
                type="text"
                value={titleTe}
                onChange={(e) => setTitleTe(e.target.value)}
                placeholder="ఉదా: హైదరాబాదులో భారీ వర్షాలు, హెచ్చరిక జారీ చేసిన వాతావరణ శాఖ..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-telugu font-bold text-slate-900 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* English Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                English Headline (Search & Slug)
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="e.g. Heavy rains lash Hyderabad, IMD issues red alert"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold text-slate-700 font-telugu mb-1.5">
                వార్తా సారాంశం (Excerpt / Subtitle)
              </label>
              <textarea
                rows={2}
                value={excerptTe}
                onChange={(e) => setExcerptTe(e.target.value)}
                placeholder="వార్త యొక్క సంక్షిప్త సారాంశాన్ని ఇక్కడ రాయండి..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-telugu text-slate-800 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Full Content */}
            <div>
              <label className="block text-xs font-bold text-slate-700 font-telugu mb-1.5">
                పూర్తి కథనం వివరణ (Full Body Content) *
              </label>
              <textarea
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="వివరమైన వార్త సమాచారాన్ని ఇక్కడ రాయండి..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-telugu leading-relaxed text-slate-900 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Controls (1 col) */}
        <div className="space-y-6">
          {/* Metadata Controls */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 font-telugu border-b pb-3">పబ్లిషింగ్ సెట్టింగ్‌లు</h3>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">వార్త వర్గం (Category)</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-red-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.nameTe}>
                    {c.nameTe} ({c.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Reporter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">రచయిత / విలేఖరి (Reporter)</label>
              <select
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-red-500"
              >
                {REPORTERS.map((r) => (
                  <option key={r.id} value={r.nameTe}>
                    {r.nameTe} ({r.district})
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL & Preview */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-slate-500" /> ప్రధాన చిత్రం (Featured Image URL)
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500"
              />
              {featuredImage && (
                <img
                  src={featuredImage}
                  alt="Preview"
                  className="mt-2 w-full h-32 object-cover rounded-xl border border-slate-200"
                />
              )}
            </div>

            {/* Breaking & Featured Toggles */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <label className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-200 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-amber-900">బ్రేకింగ్ న్యూస్ గా మార్చు</span>
                </div>
                <input
                  type="checkbox"
                  checked={isBreaking}
                  onChange={(e) => setIsBreaking(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-0 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-200 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-purple-900">హోమ్‌పేజీ ఫీచర్డ్ వార్త</span>
                </div>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-0 w-4 h-4"
                />
              </label>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-slate-500" /> ట్యాగ్‌లు (Comma Separated Tags)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
