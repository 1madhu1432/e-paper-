import React, { useState } from 'react';
import { Bell, BellOff, Filter, Check, Trash2, Settings, Radio, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';

const CATEGORY_ICONS: Record<string, string> = {
  'Breaking News': '🔴',
  'Breaking': '🔴',
  'Politics': '🏛️',
  'Weather': '🌧️',
  'Sports': '🏏',
  'Jobs': '💼',
  'Cinema': '🎬',
  'Business': '📈',
  'Crime': '🚔',
  'Education': '🎓',
  'Hyderabad': '🏙️',
};

export const NotificationsPage: React.FC = () => {
  const { notifications, markAllAsRead, clearAllNotifications, unreadCount } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [localRead, setLocalRead] = useState<Set<string>>(new Set());

  const displayed = filter === 'unread'
    ? notifications.filter(n => !localRead.has(n.id))
    : notifications;

  const handleMarkRead = (id: string) => {
    setLocalRead(prev => new Set([...prev, id]));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-telugu">నోటిఫికేషన్లు</h1>
                <p className="text-slate-400 text-sm">
                  {unreadCount > 0 ? `${unreadCount} కొత్త అప్‌డేట్‌లు` : 'మీకు అన్ని అప్‌డేట్‌లు చదివారు'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={() => { markAllAsRead(); setLocalRead(new Set(notifications.map(n => n.id))); }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-xl border border-white/20 transition-colors cursor-pointer font-telugu"
                >
                  <Check className="w-4 h-4" /> అన్నీ చదివినట్టు మార్చు
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={() => { clearAllNotifications(); setLocalRead(new Set()); }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-medium rounded-xl border border-rose-500/40 transition-colors cursor-pointer font-telugu"
                >
                  <Trash2 className="w-4 h-4" /> క్లియర్ చేయి (Clear All)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {(['all', 'unread'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                filter === f
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-red-300'
              }`}
            >
              {f === 'all' ? `అన్నీ (${notifications.length})` : `చదవనివి (${unreadCount})`}
            </button>
          ))}
        </div>

        {/* Notification List */}
        {displayed.length === 0 ? (
          <div className="text-center py-20">
            <BellOff className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 text-lg font-medium font-telugu">నోటిఫికేషన్లు లేవు</p>
            <p className="text-slate-400 text-sm mt-1">మీరు అన్ని అప్‌డేట్‌లు చదివారు!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayed.map(notif => {
              const isRead = localRead.has(notif.id);
              const icon = CATEGORY_ICONS[notif.category] || '📰';
              return (
                <div
                  key={notif.id}
                  className={`bg-white rounded-xl border shadow-xs overflow-hidden transition-all ${
                    isRead ? 'border-slate-100 opacity-75' : 'border-red-100 ring-1 ring-red-100/80'
                  }`}
                >
                  <div className="flex items-start gap-4 p-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl ${
                      isRead ? 'bg-slate-100' : 'bg-red-50'
                    }`}>
                      {icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        {!isRead && (
                          <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                        )}
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          isRead ? 'bg-slate-100 text-slate-500' : 'bg-red-100 text-red-700'
                        }`}>
                          {notif.category}
                        </span>
                        {(notif.category === 'Breaking' || notif.category === 'Breaking News') && !isRead && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-red-600">
                            <Radio className="w-3 h-3" /> LIVE
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-telugu leading-snug mb-0.5">
                        {notif.titleTe}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 font-telugu">{notif.messageTe}</p>
                      <p className="text-[11px] text-slate-400 mt-1.5">
                        {(notif.category === 'Breaking' || notif.category === 'Breaking News') ? '🔴 బ్రేకింగ్ న్యూస్' : 'జనతా వాణి అప్‌డేట్'}
                      </p>
                    </div>

                    {/* Actions */}
                    {!isRead && (
                      <button
                        onClick={() => handleMarkRead(notif.id)}
                        className="shrink-0 p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        title="చదివినట్టు మార్చు"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Push notification settings CTA */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Settings className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold">పుష్ నోటిఫికేషన్లు నిర్వహించండి</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            బ్రేకింగ్ వార్తలు, ఉద్యోగ నోటిఫికేషన్లు, మరియు ఇష్టమైన వర్గాల అప్‌డేట్‌లు నేరుగా మీ ఫోన్‌కు పొందండి.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs mb-4">
            {['బ్రేకింగ్ న్యూస్', 'ఉద్యోగ నోటిఫికేషన్లు', 'వాతావరణ హెచ్చరికలు', 'రాజకీయ విశ్లేషణ'].map(topic => (
              <label key={topic} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-red-600 focus:ring-0" />
                <span className="text-slate-300 font-telugu">{topic}</span>
              </label>
            ))}
          </div>
          <button className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer">
            నోటిఫికేషన్లు సేవ్ చేయి
          </button>
        </div>
      </div>
    </div>
  );
};
