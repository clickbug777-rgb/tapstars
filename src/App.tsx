import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// 1. Marketing & Public Pages
import { HomePage } from './pages/marketing/HomePage';
import { BusinessProfilePage } from './pages/public/BusinessProfilePage';
import { NfcRedirectPage } from './pages/public/NfcRedirectPage';
import { CardTapLandingPage } from './pages/public/CardTapLandingPage';
import { LoginPage } from './pages/auth/LoginPage';

// 2. Client Dashboard Pages
import { ClientLayout } from './components/dashboard/ClientLayout';
import { DashboardOverviewPage as ClientOverview } from './pages/dashboard/DashboardOverviewPage';
import { NfcAnalyticsPage } from './pages/dashboard/NfcAnalyticsPage';
import { QrAnalyticsPage } from './pages/dashboard/QrAnalyticsPage';
import { MyCardsPage } from './pages/dashboard/MyCardsPage';
import { GoogleReviewsPage } from './pages/dashboard/GoogleReviewsPage';
import { ReportsPage } from './pages/dashboard/ReportsPage';
import { BusinessProfilePage as ClientProfileSettings } from './pages/dashboard/BusinessProfilePage';
import { SettingsPage as ClientSettings } from './pages/dashboard/SettingsPage';

// 3. Platform Admin Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { DashboardOverview as AdminOverview } from './pages/admin/DashboardOverview';
import { BusinessesPage } from './pages/admin/BusinessesPage';
import { CardsPage } from './pages/admin/CardsPage';
import { QrStudioPage } from './pages/admin/QrStudioPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { SettingsPage as AdminSettings } from './pages/admin/SettingsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. Public Marketing Website */}
            <Route path="/" element={<HomePage />} />

            {/* 2. Customer Contactless Touchpoints */}
            {/* Digital Business Profile */}
            <Route path="/p/:slug" element={<BusinessProfilePage />} />

            {/* Direct Edge Card Tracking Endpoint */}
            <Route path="/t/:cardUid" element={<CardTapLandingPage />} />
            <Route path="/t-view/:cardUid" element={<CardTapLandingPage />} />
            <Route path="/q/:cardUid" element={<CardTapLandingPage />} />

            {/* Backward Compatible Legacy NFC Redirect */}
            <Route path="/r/:slug" element={<NfcRedirectPage />} />

            {/* 3. Authentication & Onboarding */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<LoginPage />} />

            {/* 4. Client Dashboard (Business Owners) */}
            <Route path="/dashboard" element={<ClientLayout />}>
              <Route index element={<ClientOverview />} />
              <Route path="nfc-analytics" element={<NfcAnalyticsPage />} />
              <Route path="qr-analytics" element={<QrAnalyticsPage />} />
              <Route path="cards" element={<MyCardsPage />} />
              <Route path="reviews" element={<GoogleReviewsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="profile" element={<ClientProfileSettings />} />
              <Route path="settings" element={<ClientSettings />} />
            </Route>

            {/* 5. Protected TapStars Admin Workspace (Platform Administrators) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="businesses" element={<BusinessesPage />} />
              <Route path="cards" element={<CardsPage />} />
              <Route path="qr-studio" element={<QrStudioPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
