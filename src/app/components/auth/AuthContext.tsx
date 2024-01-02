import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';

// Create a context for the session and setSession
const SessionContext = createContext<[Session | null, React.Dispatch<React.SetStateAction<Session | null>>]>([null, () => {}]);

// Create a provider component that sets the session
const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);

    // ... code to set the session ...

    return (
        <SessionContext.Provider value={[session, setSession]}>
            {children}
        </SessionContext.Provider>
    );
};

export { SessionContext, SessionProvider };