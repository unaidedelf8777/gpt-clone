import React, { createContext, useState, useEffect } from 'react';
import { supabase } from './SupabaseClient';
import { Session } from '@supabase/supabase-js';

// Context type
interface AuthContextType {
  session: Session | null;
  userLoggedIn: boolean;
  loading: boolean;
}

// Creating the context
const AuthContext = createContext<AuthContextType>({
  session: null,
  userLoggedIn: false,
  loading: true,
});

// Provider component
export function AuthProvider({ children }) {
  const [session, setSession] = useState<Session | null>(null);
  const [userLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Named function fetchSession
    async function fetchSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        setSession(data?.session || null);
        setLoggedIn(data?.session !== null);
      }
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoggedIn(session !== null);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, userLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
