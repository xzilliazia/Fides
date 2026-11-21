import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getSupabaseClient } from "../services/supabase";

type AuthContextValue = {
  session: Session | null;
  loading: boolean;
  configError: string | null;
  signUp: (email: string, password: string) => Promise<{ needsEmailConfirmation: boolean }>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let client;

    try {
      client = getSupabaseClient();
    } catch (error) {
      setConfigError(error instanceof Error ? error.message : "Supabase is not configured.");
      setLoading(false);
      return () => { active = false; };
    }

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, nextSession) => {
      if (active) {
        setSession(nextSession);
        setLoading(false);
      }
    });

    void client.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) setConfigError(error.message);
      setSession(data.session);
      setLoading(false);
    }).catch((error: unknown) => {
      if (!active) return;
      setConfigError(error instanceof Error ? error.message : "Could not restore the session.");
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    loading,
    configError,
    signUp: async (email, password) => {
      const { data, error } = await getSupabaseClient().auth.signUp({ email, password });
      if (error) throw error;
      return { needsEmailConfirmation: !data.session };
    },
    signIn: async (email, password) => {
      const { error } = await getSupabaseClient().auth.signInWithPassword({ email, password });
      if (error) throw error;
    },
    signOut: async () => {
      const { error } = await getSupabaseClient().auth.signOut();
      if (error) throw error;
    },
  }), [session, loading, configError]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
