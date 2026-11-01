import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Marketing & Public Pages
import { HomePage } from './pages/marketing/HomePage';
import { BusinessProfilePage } from './pages/public/BusinessProfilePage';
import { NfcRedirectPage } from './pages/public/NfcRedirectPage';
import { LoginPage } from './pages/auth/LoginPage';

// Admin Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { DashboardOverview } from './pages/admin/DashboardOverview';
import { BusinessesPage } from './pages/admin/BusinessesPage';
import { CardsPage } from './pages/admin/CardsPage';
import { QrStudioPage } from './pages/admin/QrStudioPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { SettingsPage } from './pages/admin/SettingsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. Public Marketing Website */}
            <Route path="/" element={<HomePage />} />

            {/* 2. Customer Touchpoints */}
            {/* Digital Business Profile */}
            <Route path="/p/:slug" element={<BusinessProfilePage />} />

            {/* NFC Permanent Tap Redirect */}
            <Route path="/r/:slug" element={<NfcRedirectPage />} />

            {/* 3. Authentication */}
            <Route path="/login" element={<LoginPage />} />

            {/* 4. Protected Admin Workspace */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="businesses" element={<BusinessesPage />} />
              <Route path="cards" element={<CardsPage />} />
              <Route path="qr-studio" element={<QrStudioPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
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
