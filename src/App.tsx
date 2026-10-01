import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { SavedArticlesProvider } from './context/SavedArticlesContext';
import { UserPreferencesProvider } from './context/UserPreferencesContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { CategoryPage } from './pages/public/CategoryPage';
import { ArticleDetailPage } from './pages/public/ArticleDetailPage';
import { EPaperPage } from './pages/public/EPaperPage';
import { EPaperViewerPage } from './pages/public/EPaperViewerPage';
import { VideoNewsPage } from './pages/public/VideoNewsPage';
import { SearchPage } from './pages/public/SearchPage';
import { SavedArticlesPage } from './pages/public/SavedArticlesPage';
import { WeatherPage } from './pages/public/WeatherPage';
import { JobsPage } from './pages/public/JobsPage';
import { CitizenReporterPage } from './pages/public/CitizenReporterPage';
import { PollsPage } from './pages/public/PollsPage';
import { HoroscopePage } from './pages/public/HoroscopePage';
import { NewsletterPage } from './pages/public/NewsletterPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { AdvertisePage } from './pages/public/AdvertisePage';
import { ReporterProfilePage } from './pages/public/ReporterProfilePage';
import { NotificationsPage } from './pages/public/NotificationsPage';
import { ProfilePage } from './pages/public/ProfilePage';
import { PreferencesPage } from './pages/public/PreferencesPage';
import { TermsPage } from './pages/public/TermsPage';
import { NotFoundPage } from './pages/public/NotFoundPage';
import { PrivacyPage } from './pages/public/PrivacyPage';
import { PublicLoginPage } from './pages/public/PublicLoginPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminArticlesPage } from './pages/admin/AdminArticlesPage';
import { AdminArticleEditorPage } from './pages/admin/AdminArticleEditorPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminAdsPage } from './pages/admin/AdminAdsPage';
import { AdminNewsTipsPage } from './pages/admin/AdminNewsTipsPage';
import { AdminEPaperPage } from './pages/admin/AdminEPaperPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminVideoPage } from './pages/admin/AdminVideoPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';

import { ScrollToTop } from './components/common/ScrollToTop';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Fallback loader
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-500 text-sm font-medium">లోడవుతోంది...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
        <NotificationProvider>
          <SavedArticlesProvider>
            <UserPreferencesProvider>
              <Suspense fallback={<Loader />}>
                <Routes>
                  {/* Public Routes */}
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={<HomePage />} />
                    {/* Category: canonical /category/:slug */}
                    <Route path="/category/:slug" element={<CategoryPage />} />
                    {/* Category slug shorthand aliases for Navbar direct links */}
                    <Route path="/latest" element={<CategoryPage />} />
                    <Route path="/telangana" element={<CategoryPage />} />
                    <Route path="/andhra-pradesh" element={<CategoryPage />} />
                    <Route path="/hyderabad" element={<CategoryPage />} />
                    <Route path="/politics" element={<CategoryPage />} />
                    <Route path="/education" element={<CategoryPage />} />
                    <Route path="/business" element={<CategoryPage />} />
                    <Route path="/crime" element={<CategoryPage />} />
                    <Route path="/sports" element={<CategoryPage />} />
                    <Route path="/cinema" element={<CategoryPage />} />
                    <Route path="/special-stories" element={<CategoryPage />} />
                    <Route path="/article/:slug" element={<ArticleDetailPage />} />
                    <Route path="/epaper" element={<EPaperPage />} />
                    <Route path="/epaper/:id" element={<EPaperViewerPage />} />
                    <Route path="/videos" element={<VideoNewsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/saved" element={<SavedArticlesPage />} />
                    <Route path="/weather" element={<WeatherPage />} />
                    <Route path="/jobs" element={<JobsPage />} />
                    {/* Citizen Reporter — accessible via /citizen-reporter and /report-news */}
                    <Route path="/citizen-reporter" element={<CitizenReporterPage />} />
                    <Route path="/report-news" element={<CitizenReporterPage />} />
                    <Route path="/polls" element={<PollsPage />} />
                    <Route path="/horoscope" element={<HoroscopePage />} />
                    <Route path="/newsletter" element={<NewsletterPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/advertise" element={<AdvertisePage />} />
                    <Route path="/reporter/:id" element={<ReporterProfilePage />} />
                    <Route path="/author/:id" element={<ReporterProfilePage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/preferences" element={<PreferencesPage />} />
                    {/* Privacy & Terms */}
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/login" element={<PublicLoginPage />} />
                    <Route path="/register" element={<PublicLoginPage />} />
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>

                  {/* Admin Login (standalone page, no layout) */}

                  {/* Admin Login (standalone page, no layout) */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="articles" element={<AdminArticlesPage />} />
                    <Route path="articles/new" element={<AdminArticleEditorPage />} />
                    <Route path="articles/edit/:id" element={<AdminArticleEditorPage />} />
                    <Route path="news" element={<AdminArticlesPage />} />
                    <Route path="news/create" element={<AdminArticleEditorPage />} />
                    <Route path="breaking" element={<AdminArticlesPage />} />
                    <Route path="featured" element={<AdminArticlesPage />} />
                    <Route path="trending" element={<AdminArticlesPage />} />
                    <Route path="media" element={<AdminArticlesPage />} />
                    <Route path="reporter-workspace" element={<AdminArticlesPage />} />
                    <Route path="pending" element={<AdminArticlesPage />} />
                    <Route path="drafts" element={<AdminArticlesPage />} />
                    <Route path="published" element={<AdminArticlesPage />} />
                    <Route path="editor-workspace" element={<AdminArticlesPage />} />
                    <Route path="videos" element={<AdminVideoPage />} />
                    <Route path="epaper" element={<AdminEPaperPage />} />
                    <Route path="users" element={<AdminUsersPage />} />
                    <Route path="roles" element={<AdminUsersPage />} />
                    <Route path="analytics" element={<AdminAnalyticsPage />} />
                    <Route path="ads" element={<AdminAdsPage />} />
                    <Route path="advertisements" element={<AdminAdsPage />} />
                    <Route path="news-tips" element={<AdminNewsTipsPage />} />
                    <Route path="notifications" element={<AdminNotificationsPage />} />
                    <Route path="social" element={<AdminNotificationsPage />} />
                    <Route path="ai" element={<AdminDashboard />} />
                    <Route path="seo" element={<AdminSettingsPage />} />
                    <Route path="security" element={<AdminSettingsPage />} />
                    <Route path="backups" element={<AdminSettingsPage />} />
                    <Route path="settings" element={<AdminSettingsPage />} />
                  </Route>
                </Routes>
              </Suspense>
            </UserPreferencesProvider>
          </SavedArticlesProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
}

export default App;
