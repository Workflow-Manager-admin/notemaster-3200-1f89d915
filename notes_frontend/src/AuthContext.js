import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "./supabaseClient";

// PUBLIC_INTERFACE
// AuthContext provides user, login, logout, signup, and loading status for supabase auth.

const AuthContext = createContext({
  user: null,
  loading: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

// PUBLIC_INTERFACE
export const useAuth = () => useContext(AuthContext);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, subscribe to Auth state
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    // Get user on initial load
    supabase.auth.getUser().then(({ data, error }) => {
      setUser(data?.user || null);
      setLoading(false);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // PUBLIC_INTERFACE
  const signIn = async (email, password) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      throw error;
    }
    setLoading(false);
  };

  // PUBLIC_INTERFACE
  const signUp = async (email, password) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setLoading(false);
      throw error;
    }
    setLoading(false);
  };

  // PUBLIC_INTERFACE
  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
