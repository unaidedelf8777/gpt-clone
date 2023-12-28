import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar/sideBar';
import SidebarToggle from './sidebar/toggle';
import './App.css';
import ChatDisplay from './chat/ChatDisplay.tsx';
import AuthModal from './auth/AuthModal.tsx';
import { supabase } from './auth/SupabaseClient.tsx';
import { Session } from '@supabase/supabase-js';
import { ChatProvider } from './sidebar/ChatContext.tsx';

const App: React.FC = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatDisplays, setChatDisplays] = useState<{ [key: string]: JSX.Element }>({});

  const [session, setSession] = useState<Session | null>(null);
  const [user_logged_in, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true); // Set loading to true at the beginning
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        setSession(data?.session || null);
        setLoggedIn(data?.session !== null);
      }
      setLoading(false); // Set loading to false after fetching the session
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

  function logout() {

    supabase.auth.signOut();
    console.log("logged out");
  }
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getChatDisplay = (path: string) => {
    if (path === "/") {
      return <ChatDisplay key={Math.random()} />;
    }

    if (!chatDisplays[path]) {
      setChatDisplays({
        ...chatDisplays,
        [path]: <ChatDisplay />,
      });
    }
    return chatDisplays[path];
  };

  return (
    <ChatProvider>
      <div className="relative z-0 flex h-full w-full overflow-hidden">
        <Router>
          <div className="relative z-0 flex h-full w-full overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} logout={logout} session={session} />
            <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
              <main className="relative h-full w-full flex-1 overflow-auto transition-width">
                <SidebarToggle onClick={toggleSidebar} isOpen={sidebarOpen} />
                <Routes>
                  <Route path="/" element={getChatDisplay("/")} />
                  <Route path="/c/:id" element={getChatDisplay("/c/:id")} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
        {!user_logged_in && !loading && ( // Render AuthModal based on both user_logged_in and loading
          <div className="absolute inset-0">
            <AuthModal />
          </div>
        )}
      </div>
    </ChatProvider>
  );
}

export default App;
