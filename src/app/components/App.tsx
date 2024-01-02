"use client";
import React, { useState, useEffect } from 'react';
import {Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar/sideBar';
import SidebarToggle from './sidebar/toggle';
import './App.css';
import Chat from './chat/Chat';
import AuthModal from './auth/AuthModal';
import { supabase } from './auth/SupabaseClient';
import { useAuth } from './auth/useAuth';
import { useKey } from './KeyContext';
import Providers from './Providers';

const App: React.FC = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { session, setSession } = useAuth();
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
      try {
        // @ts-ignore
        authListener.unsubscribe();
      } catch (error) {
        console.error(error);
      }
    };
  }, []);

  function logout() {

    supabase.auth.signOut();
    console.log("logged out");
  }
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { key, setKey } = useKey();
  const getChatDisplay = (path: string) => {
    if (path === "/") {
      return <Chat key={key} />;
    }

    const id = path.split('/').pop(); // Extract the id from the path

    return <Chat key={key} id={id} />; // THE KEY IS KEY.. normally redirecting would re-render, resetting its states, but with this we can control that ourself.
  };

  return (

    <div className="relative z-0 flex h-full w-full overflow-hidden">
      <div className="relative z-0 flex h-full w-full overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} logout={logout} session={session} onNewChat={() => {
          console.log("hello")
          setKey(Math.random())
        }} />
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
      {!user_logged_in && !loading && ( // Render AuthModal based on both user_logged_in and loading
        <div className="absolute inset-0">
          <AuthModal />
        </div>
      )}
    </div>
  );
}


const AppWrapper: React.FC = () => {
  return (
    <Providers>
      <App />
    </Providers>
  );
};

export default AppWrapper;