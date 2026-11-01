import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { CONFIG } from '../lib/config';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  isDemoMode: boolean;
  login: (email: string, password?: string) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  enableDemoAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_KEY = 'tapstars_demo_admin_active';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!CONFIG.isSupabaseConfigured());

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      // Check if Supabase client is configured
      if (supabase && CONFIG.isSupabaseConfigured()) {
        setIsDemoMode(false);
        try {
          const { data, error } = await supabase.auth.getSession();
          if (!error && data.session && mounted) {
            setSession(data.session);
            setUser(data.session.user);
          }
        } catch (err) {
          console.warn('[TapStars] Auth error:', err);
        }

        const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
          if (mounted) {
            setSession(newSession);
            setUser(newSession?.user || null);
          }
        });

        if (mounted) setIsLoading(false);

        return () => {
          listener.subscription.unsubscribe();
        };
      } else {
        // Fallback demo mode check in localStorage
        const storedDemo = localStorage.getItem(DEMO_USER_KEY);
        if (storedDemo === 'true') {
          const mockUser: any = {
            id: 'demo-admin-id',
            email: 'admin@tapstars.dev',
            user_metadata: { name: 'Demo Administrator' },
          };
          setUser(mockUser);
        }
        setIsDemoMode(true);
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, password?: string): Promise<{ error: Error | null }> => {
    setIsLoading(true);

    if (supabase && CONFIG.isSupabaseConfigured() && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setIsLoading(false);
          return { error };
        }

        setUser(data.user);
        setSession(data.session);
        setIsLoading(false);
        return { error: null };
      } catch (err: any) {
        setIsLoading(false);
        return { error: err };
      }
    }

    // In Demo Mode (or if no backend configured yet), allow demo sign-in
    const mockUser: any = {
      id: 'demo-admin-id',
      email: email || 'admin@tapstars.dev',
      user_metadata: { name: 'Demo Administrator' },
    };
    setUser(mockUser);
    localStorage.setItem(DEMO_USER_KEY, 'true');
    setIsLoading(false);
    return { error: null };
  };

  const logout = async () => {
    setIsLoading(true);
    if (supabase && CONFIG.isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Signout error', err);
      }
    }
    setUser(null);
    setSession(null);
    localStorage.removeItem(DEMO_USER_KEY);
    setIsLoading(false);
  };

  const enableDemoAdmin = () => {
    const mockUser: any = {
      id: 'demo-admin-id',
      email: 'admin@tapstars.dev',
      user_metadata: { name: 'Demo Administrator' },
    };
    setUser(mockUser);
    localStorage.setItem(DEMO_USER_KEY, 'true');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAdmin: Boolean(user),
        isDemoMode,
        login,
        logout,
        enableDemoAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
