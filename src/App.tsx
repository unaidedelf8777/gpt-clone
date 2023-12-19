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
    <div className="flex h-screen">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col p-10">
        {/* Content section */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold mb-8">How can I help you today?</h1>
          {/* Grid content, if any */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {/* ... Content cards ... */}
          </div>
        </div>
        <div className="w-full">
          <SidebarToggle onClick={toggleSidebar} isOpen={sidebarOpen} />
          <ChatInput />
        </div>
      </div>
    </div>
  );
}

export default App;
