import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { useAuth } from '../../context/AuthContext';
import { Menu, X } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Strict backend role verification:
  // 1. If not logged in -> redirect to /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. If logged in but NOT an authorized administrator -> redirect to client dashboard
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-50/70 flex antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
          <div className="relative z-10 w-64 bg-white flex flex-col justify-between">
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div onClick={() => setMobileSidebarOpen(false)}>
              <AdminSidebar />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden p-3 text-neutral-600 hover:text-neutral-900"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <AdminHeader />
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
