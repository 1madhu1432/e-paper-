import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { SavedArticlesProvider } from './context/SavedArticlesContext';
import { UserPreferencesProvider } from './context/UserPreferencesContext';
import { DataProvider } from './context/DataContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { EPaperPage } from './pages/public/EPaperPage';
import { EPaperViewerPage } from './pages/public/EPaperViewerPage';
import { EditionsPage } from './pages/public/EditionsPage';
import { ArchivesPage } from './pages/public/ArchivesPage';
import { NewsPage } from './pages/public/NewsPage';
import { NewsDetailPage } from './pages/public/NewsDetailPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminEPaperPage } from './pages/admin/AdminEPaperPage';
import { AdminEPaperCreatePage } from './pages/admin/AdminEPaperCreatePage';
import { AdminStatesPage } from './pages/admin/AdminStatesPage';
import { AdminSubEditionsPage } from './pages/admin/AdminSubEditionsPage';
import { AdminEditionsPage } from './pages/admin/AdminEditionsPage';
import { AdminArchivesPage } from './pages/admin/AdminArchivesPage';
import { AdminNewsPage } from './pages/admin/AdminNewsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

import { ScrollToTop } from './components/common/ScrollToTop';

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-sans">
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-amber-400 text-xs font-bold uppercase tracking-wider">Loading Public Mood...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <NotificationProvider>
          <SavedArticlesProvider>
            <UserPreferencesProvider>
              <DataProvider>
                <Suspense fallback={<Loader />}>
                  <Routes>
                    {/* Public Website Routes */}
                    <Route element={<PublicLayout />}>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/epaper" element={<EPaperPage />} />
                      <Route path="/epaper/reader/:id" element={<EPaperViewerPage />} />
                      <Route path="/editions" element={<EditionsPage />} />
                      <Route path="/archives" element={<ArchivesPage />} />
                      <Route path="/news" element={<NewsPage />} />
                      <Route path="/news/:id" element={<NewsDetailPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Route>

                    {/* Standalone E-Paper Reader route for full viewport */}
                    <Route path="/epaper/reader/:id" element={<EPaperViewerPage />} />

                    {/* Admin Login Route */}
                    <Route path="/admin/login" element={<AdminLoginPage />} />

                    {/* Admin Protected CMS Routes */}
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<Navigate to="/admin/dashboard" replace />} />
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="epapers" element={<AdminEPaperPage />} />
                      <Route path="epapers/create" element={<AdminEPaperCreatePage />} />
                      <Route path="states" element={<AdminStatesPage />} />
                      <Route path="sub-editions" element={<AdminSubEditionsPage />} />
                      <Route path="editions" element={<AdminEditionsPage />} />
                      <Route path="archives" element={<AdminArchivesPage />} />
                      <Route path="news" element={<AdminNewsPage />} />
                      <Route path="analytics" element={<AdminAnalyticsPage />} />
                      <Route path="settings" element={<AdminSettingsPage />} />
                    </Route>
                  </Routes>
                </Suspense>
              </DataProvider>
            </UserPreferencesProvider>
          </SavedArticlesProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
