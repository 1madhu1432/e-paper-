import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { BreakingTicker } from '../components/common/BreakingTicker';
import { Footer } from '../components/common/Footer';
import { MobileBottomNav } from '../components/common/MobileBottomNav';
import { ToastNotification } from '../components/common/ToastNotification';

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const isEpaperViewer = location.pathname.startsWith('/epaper/') && location.pathname !== '/epaper';

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-red-500 selection:text-white">
      {/* Sticky/Responsive Navigation */}
      <Navbar />

      {/* Breaking News Ticker (hide on viewer if desired, or show everywhere) */}
      {!isEpaperViewer && <BreakingTicker />}

      {/* Main Outlet */}
      <main className="flex-1 w-full pb-16 lg:pb-0">
        <Outlet />
      </main>

      {/* Footer (hide on full epaper viewer to allow fullscreen reading) */}
      {!isEpaperViewer && <Footer />}

      {/* Mobile App Bottom Nav */}
      <MobileBottomNav />

      {/* Floating In-App Notifications Toast */}
      <ToastNotification />
    </div>
  );
};
