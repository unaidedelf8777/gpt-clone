import React from 'react';
import chats from '../chats.json';
import Chat from './chat'; // Make sure this path is correct


interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}



const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const width = sidebarOpen ? '260px' : '0px';
  return (
    <div
      className="dark flex-shrink-0 overflow-x-hidden bg-black transition-width duration-300"
      style={{ width: width, visibility: sidebarOpen ? 'visible' : 'hidden' }}
    >
      <div className="h-full w-full">
        <button
          onClick={toggleSidebar}
          className="text-white text-lg mb-5 cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          {/* Adjust icon based on sidebar state */}
          <i className={`fas ${sidebarOpen ? 'fa-arrow-left' : 'fa-bars'}`}></i>
        </button>
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex h-full min-h-0 flex-col transition-opacity opacity-100">
            <div className="scrollbar-trigger relative h-full w-full flex-1 items-start border-white/20">
              <h2 style={{ position: 'absolute', border: '0px', width: '1px', height: '1px', padding: '0px', margin: '-1px', overflow: 'hidden', clip: 'rect(0px, 0px, 0px, 0px)', whiteSpace: 'nowrap', overflowWrap: 'normal' }}>Chat history</h2>

              <nav aria-label="Chat history" className="flex h-full w-full flex-col px-3 pb-3.5">
                {/* ... other static content ... */}
                <div className="flex-col flex-1 transition-opacity duration-500 -mr-2 pr-2 overflow-y-auto">
                  {/* ... other static content ... */}
                  <div className="flex flex-col gap-2 pb-2 dark:text-gray-100 text-gray-800 text-sm">
                    <div className="relative mt-5" style={{ height: 'auto', opacity: 1 }}>
                      <div>
                        <span>
                          <div className="relative mt-5" style={{ height: 'auto', opacity: 1, transform: 'none', transformOrigin: '50% 50% 0px' }}>
                            <ol>
                              {chats.items.map(chat => (
                                <Chat key={chat.id} id={chat.id} title={chat.title} />
                              ))}
                            </ol>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
