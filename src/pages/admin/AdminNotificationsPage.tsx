import React, { useState } from 'react';
import {
  Bell,
  Send,
  Users,
  Smartphone,
  Globe,
  MessageCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../../data/mockNotifications';
import { PushNotification } from '../../types';

export const AdminNotificationsPage: React.FC = () => {
  const [notificationsList, setNotificationsList] = useState<PushNotification[]>(MOCK_NOTIFICATIONS as any);

  const [titleTe, setTitleTe] = useState('');
  const [messageTe, setMessageTe] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [audience, setAudience] = useState('All Users');

  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleTe || !messageTe) return;

    setIsSending(true);

    setTimeout(() => {
      const newNotif: PushNotification = {
        id: `notif-${Date.now()}`,
        title: titleTe,
        titleTe,
        message: messageTe,
        messageTe,
        category: 'బ్రేకింగ్',
        sentAt: 'ఇప్పుడే (Just now)',
        clicks: 0,
        reach: 850000,
        status: 'sent',
        targetAudience: audience as any,
      };

      setNotificationsList([newNotif, ...notificationsList]);
      setIsSending(false);
      setSentSuccess(true);
      setTitleTe('');
      setMessageTe('');
      setTargetUrl('');

      setTimeout(() => setSentSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold font-telugu text-slate-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-red-600" />
            పుష్ నోటిఫికేషన్ల వ్యవస్థ (Push Notifications)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            మొబైల్ PWA మరియు వెబ్ బ్రౌజర్ పాఠకులకు అత్యవసర బ్రేకింగ్ వార్తలు పంపండి
          </p>
        </div>

        <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-xl border border-red-200 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-red-600" />
          <span>మొత్తం చందాదారులు: 8.5 లక్షల మంది</span>
        </div>
      </div>

      {/* Audience Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">మొబైల్ యాప్ చందాదారులు</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">4,20,000</h3>
            <span className="text-[11px] text-emerald-600 font-bold">FCM Push Active</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">వెబ్ బ్రౌజర్ నోటిఫికేషన్లు</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">1,80,000</h3>
            <span className="text-[11px] text-blue-600 font-bold">Web Push Active</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">వాట్సాప్ చానల్ సబ్‌స్క్రైబర్లు</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">2,50,000</h3>
            <span className="text-[11px] text-emerald-600 font-bold">WhatsApp Channel</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Form + History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form (1 col) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-telugu border-b pb-3 flex items-center gap-2">
            <Send className="w-4 h-4 text-red-600" />
            క్రొత్త నోటిఫికేషన్ పంపండి
          </h3>

          {sentSuccess && (
            <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>నోటిఫికేషన్ 8.5L చందాదారులకు పంపబడింది!</span>
            </div>
          )}

          <form onSubmit={handleSendNotification} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">నోటిఫికేషన్ శీర్షిక (Title) *</label>
              <input
                type="text"
                required
                value={titleTe}
                onChange={(e) => setTitleTe(e.target.value)}
                placeholder="ఉదా: 🚨 బ్రేకింగ్: తెలంగాణ బడ్జెట్ ఆమోదం"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-telugu font-bold text-slate-900 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">వార్త సందేశం (Body Message) *</label>
              <textarea
                rows={3}
                required
                value={messageTe}
                onChange={(e) => setMessageTe(e.target.value)}
                placeholder="మరిన్ని వివరాల కోసం ఇక్కడ క్లిక్ చేసి వార్త చూడండి..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-telugu text-slate-800 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">లక్ష్యిత పాఠకులు (Target Audience)</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-red-500"
              >
                <option value="All Users">అందరూ పాఠకులు (All Subscribers)</option>
                <option value="Telangana Region">తెలంగాణ పాఠకులు మాత్రమే</option>
                <option value="Andhra Pradesh Region">ఆంధ్రప్రదేశ్ పాఠకులు మాత్రమే</option>
                <option value="Breaking News Alerts">బ్రేకింగ్ ఆలేర్ట్ చందాదారులు</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSending ? (
                <span>నోటిఫికేషన్ రన్ అవుతోంది...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>వెంటనే పుష్ పంపు ({audience})</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* History Table (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-telugu border-b pb-3">
            ఇటీవల పంపిన నోటిఫికేషన్లు (Notification History)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">శీర్షిక & సందేశం</th>
                  <th className="py-3 px-2">సమయం</th>
                  <th className="py-3 px-2">లక్ష్యం</th>
                  <th className="py-3 px-2">క్లిక్‌లు (Clicks)</th>
                  <th className="py-3 px-2">CTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {notificationsList.map((notif) => (
                  <tr key={notif.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 max-w-xs">
                      <p className="font-bold text-slate-900 font-telugu text-sm">{notif.titleTe || notif.title}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{notif.messageTe || notif.message}</p>
                    </td>
                    <td className="py-3 px-2 whitespace-nowrap text-slate-500">{notif.sentAt}</td>
                    <td className="py-3 px-2 whitespace-nowrap">
                      <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                        {notif.targetAudience || 'All Users'}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-bold text-slate-900 whitespace-nowrap">
                      {(notif.clicks || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-2 font-bold text-emerald-600 whitespace-nowrap">
                      {(((notif.clicks || 0) / 400000) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
