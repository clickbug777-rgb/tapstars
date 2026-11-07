import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { CONFIG } from '../lib/config';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  isClient: boolean;
  isDemoMode: boolean;
  activeBusinessId: string | null;
  setActiveBusinessId: (id: string | null) => void;
  login: (email: string, password?: string) => Promise<{ error: Error | null; role?: UserRole }>;
  register: (email: string, password: string, fullName: string, businessName: string) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  enableDemoAdmin: () => void;
  loginAsDemoClient: (businessId?: string) => void;
  loginAsDemoAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_KEY = 'tapstars_active_demo_user';
const ACTIVE_BIZ_KEY = 'tapstars_active_biz_id';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!CONFIG.isSupabaseConfigured());
  const [activeBusinessId, setActiveBusinessIdState] = useState<string | null>(() => {
    return localStorage.getItem(ACTIVE_BIZ_KEY) || '00000000-0000-0000-0000-000000000001';
  });

  const setActiveBusinessId = (id: string | null) => {
    setActiveBusinessIdState(id);
    if (id) {
      localStorage.setItem(ACTIVE_BIZ_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_BIZ_KEY);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      const client = supabase;
      // 1. Supabase configured check
      if (client && CONFIG.isSupabaseConfigured()) {
        setIsDemoMode(false);
        try {
          const { data, error } = await client.auth.getSession();
          if (!error && data.session && mounted) {
            setSession(data.session);
            setUser(data.session.user);
            
            // Fetch user profile from database
            const { data: prof } = await client
              .from('profiles')
              .select('*')
              .eq('id', data.session.user.id)
              .single();

            if (prof && mounted) {
              setProfile(prof as UserProfile);
            } else if (mounted) {
              setProfile({
                id: data.session.user.id,
                email: data.session.user.email || '',
                full_name: data.session.user.user_metadata?.full_name || 'Business Owner',
                role: (data.session.user.user_metadata?.role as UserRole) || 'client',
              });
            }
          }
        } catch (err) {
          console.warn('[TapStars] Auth initialization error:', err);
        }

        const { data: listener } = client.auth.onAuthStateChange(async (_event, newSession) => {
          if (mounted) {
            setSession(newSession);
            setUser(newSession?.user || null);

            if (newSession?.user) {
              const { data: prof } = await client
                .from('profiles')
                .select('*')
                .eq('id', newSession.user.id)
                .single();
              if (prof && mounted) {
                setProfile(prof as UserProfile);
              }
            } else {
              setProfile(null);
            }
          }
        });

        if (mounted) setIsLoading(false);
        return () => {
          listener.subscription.unsubscribe();
        };
      } else {
        // 2. Demo Mode Check
        setIsDemoMode(true);
        const storedDemo = localStorage.getItem(DEMO_USER_KEY);
        if (storedDemo) {
          try {
            const parsed = JSON.parse(storedDemo);
            setUser(parsed.user);
            setProfile(parsed.profile);
          } catch {
            // Default to client demo
            loginAsDemoClient();
          }
        } else {
          // Default unauthenticated state
          setUser(null);
          setProfile(null);
        }
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, password?: string): Promise<{ error: Error | null; role?: UserRole }> => {
    setIsLoading(true);

    const client = supabase;
    if (client && CONFIG.isSupabaseConfigured() && password) {
      try {
        const { data, error } = await client.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setIsLoading(false);
          return { error };
        }

        setUser(data.user);
        setSession(data.session);

        const { data: prof } = await client
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const userRole: UserRole = (prof?.role as UserRole) || 'client';
        const userProfile: UserProfile = prof || {
          id: data.user.id,
          email: data.user.email || '',
          full_name: data.user.user_metadata?.full_name || 'User',
          role: userRole,
        };

        setProfile(userProfile);
        setIsLoading(false);
        return { error: null, role: userRole };
      } catch (err: any) {
        setIsLoading(false);
        return { error: err };
      }
    }

    // Demo Mode login fallback
    const role: UserRole = email.toLowerCase().includes('admin') ? 'super_admin' : 'client';
    const mockUser: any = {
      id: role === 'super_admin' ? 'demo-admin-id' : 'demo-client-id',
      email: email || (role === 'super_admin' ? 'admin@tapstars.dev' : 'owner@abccafe.in'),
      user_metadata: {
        name: role === 'super_admin' ? 'TapStars Administrator' : 'ABC Cafe Owner',
        role,
      },
    };

    const mockProfile: UserProfile = {
      id: mockUser.id,
      email: mockUser.email,
      full_name: mockUser.user_metadata.name,
      role,
      business_id: role === 'client' ? '00000000-0000-0000-0000-000000000001' : undefined,
    };

    setUser(mockUser);
    setProfile(mockProfile);
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ user: mockUser, profile: mockProfile }));
    setIsLoading(false);
    return { error: null, role };
  };

  const register = async (
    email: string,
    password: string,
    fullName: string,
    businessName: string
  ): Promise<{ error: Error | null }> => {
    setIsLoading(true);

    const client = supabase;
    if (client && CONFIG.isSupabaseConfigured()) {
      try {
        const { data, error } = await client.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: 'client',
              business_name: businessName,
            },
          },
        });

        if (error) {
          setIsLoading(false);
          return { error };
        }

        setUser(data.user);
        setSession(data.session);
        setProfile({
          id: data.user?.id || '',
          email,
          full_name: fullName,
          role: 'client',
        });
        setIsLoading(false);
        return { error: null };
      } catch (err: any) {
        setIsLoading(false);
        return { error: err };
      }
    }

    // Demo mode registration
    const mockUser: any = {
      id: `client-${Date.now()}`,
      email,
      user_metadata: { name: fullName, role: 'client', business_name: businessName },
    };
    const mockProfile: UserProfile = {
      id: mockUser.id,
      email,
      full_name: fullName,
      role: 'client',
    };

    setUser(mockUser);
    setProfile(mockProfile);
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ user: mockUser, profile: mockProfile }));
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
    setProfile(null);
    localStorage.removeItem(DEMO_USER_KEY);
    setIsLoading(false);
  };

  const loginAsDemoClient = (businessId = '00000000-0000-0000-0000-000000000001') => {
    const mockUser: any = {
      id: 'demo-client-id',
      email: 'owner@abccafe.in',
      user_metadata: { name: 'Rohan (ABC Cafe Owner)', role: 'client' },
    };
    const mockProfile: UserProfile = {
      id: 'demo-client-id',
      email: 'owner@abccafe.in',
      full_name: 'Rohan (ABC Cafe Owner)',
      role: 'client',
      business_id: businessId,
    };
    setUser(mockUser);
    setProfile(mockProfile);
    setActiveBusinessId(businessId);
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ user: mockUser, profile: mockProfile }));
  };

  const loginAsDemoAdmin = () => {
    const mockUser: any = {
      id: 'demo-admin-id',
      email: 'admin@tapstars.dev',
      user_metadata: { name: 'TapStars Administrator', role: 'super_admin' },
    };
    const mockProfile: UserProfile = {
      id: 'demo-admin-id',
      email: 'admin@tapstars.dev',
      full_name: 'TapStars Administrator',
      role: 'super_admin',
    };
    setUser(mockUser);
    setProfile(mockProfile);
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ user: mockUser, profile: mockProfile }));
  };

  const isAdmin = profile?.role === 'super_admin' || profile?.role === 'admin';
  const isClient = profile?.role === 'client' || (!isAdmin && Boolean(user));

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isAdmin,
        isClient,
        isDemoMode,
        activeBusinessId,
        setActiveBusinessId,
        login,
        register,
        logout,
        enableDemoAdmin: loginAsDemoAdmin,
        loginAsDemoClient,
        loginAsDemoAdmin,
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
