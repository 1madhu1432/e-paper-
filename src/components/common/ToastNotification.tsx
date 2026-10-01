import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ToastNotification: React.FC = () => {
  const { activeToast, dismissToast } = useNotifications();

  if (!activeToast) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-xl shadow-2xl border-2 border-red-500 p-4 animate-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-red-600 rounded-lg shrink-0">
          <Bell className="w-5 h-5 text-white animate-bounce" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-800">
              {activeToast.category}
            </span>
            <button onClick={dismissToast} className="text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs sm:text-sm font-bold text-white mt-1 line-clamp-2">
            {activeToast.titleTe}
          </p>
          <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">
            {activeToast.messageTe}
          </p>
          <div className="mt-2.5 flex items-center justify-between">
            <Link
              to="/notifications"
              onClick={dismissToast}
              className="text-xs text-amber-300 font-bold hover:underline flex items-center gap-1"
            >
              వివరాలు చూడండి <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={dismissToast}
              className="text-[10px] text-slate-400 hover:text-slate-200"
            >
              తీసివేయండి
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
