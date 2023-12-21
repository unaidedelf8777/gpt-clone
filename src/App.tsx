import React, { useState } from 'react';
import Sidebar from './sidebar/sideBar';
import SidebarToggle from './sidebar/toggle';
import './App.css';
import ChatDisplay from './chat/ChatDisplay.tsx';


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
          <ChatDisplay />
            
        </main>
      </div>
    </div>
  );
}

export default App;
