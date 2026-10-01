import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminNavbar } from '../components/admin/AdminNavbar';
import { ToastNotification } from '../components/common/ToastNotification';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { currentRole } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-900 font-sans">
      {/* Desktop Sidebar (Fixed 64) */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-full h-full bg-slate-900 shadow-2xl z-10 animate-in slide-in-from-left">
            <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

        {/* Role Demo Banner */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 sm:px-6 py-2 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>డెమో మోడ్ యాక్టివ్:</strong> మీరు ప్రస్తుతం{' '}
              <strong className="text-red-700 font-bold">{currentRole}</strong> అధికారాలతో ఉన్నారు. (డ్యాష్‌బోర్డ్, ఎడిటింగ్ మరియు ఆమోద ప్రక్రియలను పరీక్షించవచ్చు).
            </span>
          </div>
        </div>

        {/* Page View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <ToastNotification />
    </div>
  );
};
