import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Article } from '../../types';
import { FileText, Plus, Edit, Trash2, Zap, Star, Eye, X } from 'lucide-react';

export const AdminNewsPage: React.FC = () => {
  const { news, addNews, updateNews, deleteNews } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [headline, setHeadline] = useState('');
  const [headlineTe, setHeadlineTe] = useState('');
  const [category, setCategory] = useState('State News');
  const [summary, setSummary] = useState('');
  const [summaryTe, setSummaryTe] = useState('');
  const [content, setContent] = useState('');
  const [contentTe, setContentTe] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80');
  const [isBreaking, setIsBreaking] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const openCreateModal = () => {
    setEditingArticle(null);
    setHeadline('');
    setHeadlineTe('');
    setCategory('State News');
    setSummary('');
    setSummaryTe('');
    setContent('');
    setContentTe('');
    setIsBreaking(false);
    setIsFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (article: Article) => {
    setEditingArticle(article);
    setHeadline(article.title);
    setHeadlineTe(article.titleTe || '');
    setCategory(article.category);
    setSummary(article.summary);
    setSummaryTe(article.summaryTe || '');
    setContent(article.content);
    setContentTe(article.contentTe || '');
    setImageUrl(article.imageUrl);
    setIsBreaking(article.isBreaking);
    setIsFeatured(article.isFeatured);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle) {
      updateNews(editingArticle.id, {
        title: headline,
        titleTe: headlineTe || headline,
        category,
        summary,
        summaryTe: summaryTe || summary,
        content,
        contentTe: contentTe || content,
        imageUrl,
        isBreaking,
        isFeatured
      });
    } else {
      addNews({
        slug: headline.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: headline,
        titleTe: headlineTe || headline,
        summary,
        summaryTe: summaryTe || summary,
        content,
        contentTe: contentTe || content,
        category,
        authorId: 'admin-1',
        authorName: 'పబ్లిక్ మూడ్ ఎడిటోరియల్ బృందం',
        imageUrl,
        status: 'published',
        isBreaking,
        isFeatured,
        isTrending: true,
        tags: [category, 'పబ్లిక్ మూడ్'],
        readingTimeMinutes: 3
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black font-serif text-[#0b1d3a]">News Article Management</h1>
          <p className="text-xs text-slate-500">Create, edit, breaking news flags &amp; news publishing</p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-lg text-xs transition flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Article</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                <th className="p-4">Headline</th>
                <th className="p-4">Category</th>
                <th className="p-4">Flags</th>
                <th className="p-4">Views &amp; Readers</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {news.map(n => (
                <tr key={n.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
                    <img src={n.imageUrl} alt={n.title} className="w-12 h-10 rounded object-cover border" />
                    <div>
                      <span className="block font-serif text-sm font-extrabold text-[#0b1d3a] line-clamp-1">{n.titleTe || n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.authorName}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-blue-700">{n.category}</td>
                  <td className="p-4 space-x-1">
                    {n.isBreaking && (
                      <span className="bg-red-100 text-red-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                        BREAKING
                      </span>
                    )}
                    {n.isFeatured && (
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded">
                        FEATURED
                      </span>
                    )}
                  </td>
                  <td className="p-4 space-y-0.5 text-[11px]">
                    <div className="font-bold text-slate-900">{n.views.toLocaleString()} Views</div>
                    <div className="text-slate-500">{(n.uniqueReaders || 0).toLocaleString()} Readers</div>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(n)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                      title="Edit Article"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteNews(n.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-serif text-[#0b1d3a]">
                {editingArticle ? 'Edit Article' : 'Publish New Article'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Telugu Headline</label>
                <input
                  type="text"
                  required
                  placeholder="తెలుగు శీర్షిక..."
                  value={headlineTe}
                  onChange={(e) => setHeadlineTe(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-serif font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">English Headline</label>
                <input
                  type="text"
                  required
                  placeholder="English Headline..."
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="State News">State News</option>
                    <option value="Latest News">Latest News</option>
                    <option value="Sports">Sports</option>
                    <option value="Business">Business</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Image URL</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Summary (Telugu)</label>
                <textarea
                  rows={2}
                  value={summaryTe}
                  onChange={(e) => setSummaryTe(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Content (Telugu)</label>
                <textarea
                  rows={4}
                  value={contentTe}
                  onChange={(e) => setContentTe(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBreaking}
                    onChange={(e) => setIsBreaking(e.target.checked)}
                    className="rounded text-red-600"
                  />
                  <span>Mark as Breaking News</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-amber-500"
                  />
                  <span>Mark as Featured Story</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#1e40af] hover:bg-[#0b1d3a] text-white rounded-lg shadow-sm"
                >
                  {editingArticle ? 'Save Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
