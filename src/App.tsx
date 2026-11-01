import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastContainer } from './components/ui/Toast';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { BusinessProfile } from './pages/BusinessProfile';
import { Dashboard } from './pages/Dashboard';
import { Businesses } from './pages/Businesses';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <Routes>
    <Route path="/" element={<Navigate to="/admin" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/p/:slug" element={<BusinessProfile />} />
    <Route path="/r/:slug" element={<NotFound />} />
  </Routes>;
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="businesses" element={<Businesses />} />
        <Route path="businesses/new" element={<div className="p-6"><h2>Add Business</h2></div>} />
        <Route path="businesses/:id/edit" element={<div className="p-6"><h2>Edit Business</h2></div>} />
        <Route path="cards" element={<div className="p-6"><h2>NFC Cards</h2></div>} />
        <Route path="qr" element={<div className="p-6"><h2>QR Codes</h2></div>} />
        <Route path="analytics" element={<div className="p-6"><h2>Analytics</h2></div>} />
        <Route path="settings" element={<div className="p-6"><h2>Settings</h2></div>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/p/:slug" element={<BusinessProfile />} />
            <Route path="/r/:slug" element={<NotFound />} />

            {/* Admin routes - demo mode always allowed */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer />
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}
