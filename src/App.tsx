import React, { useState } from 'react';
import ChatInput from './chatInput.tsx';
import Sidebar from './sidebar/sideBar';
import SidebarToggle from './sidebar/toggle';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';


const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
        <main className="relative h-full w-full flex-1 overflow-auto transition-width">
          <SidebarToggle onClick={toggleSidebar} isOpen={sidebarOpen} />
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-hidden">
              <div className="relative h-full">
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="mb-5 text-2xl text-white font-medium">How can I help you today?</div>
                </div>
              </div>
            </div>
            <ChatInput />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
