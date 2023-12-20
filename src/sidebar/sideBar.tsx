import React from 'react';
import chatsJson from '../chats.json';
import { ChatEntry } from './chatchunk'; // Make sure this path is correct
import ChatList from './chatchunk';
import NewChatButton from './NewChatButton';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

// Helper function to determine the date label
const getDateLabel = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const aWeekAgo = new Date(today);
  aWeekAgo.setDate(aWeekAgo.getDate() - 7);

  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else if (date > aWeekAgo) {
    return 'Previous 7 Days';
  } else if (date > thirtyDaysAgo) {
    return 'Previous 30 Days';
  } else {
    // Return the month name if older than 30 days
    return date.toLocaleString('default', { month: 'long' });
  }
};

// Group chats by the date label with a return type annotation
const groupChatsByDate = (chats: ChatEntry[]): Record<string, ChatEntry[]> => {
  const groups: Record<string, ChatEntry[]> = {};
  chats.forEach((chat) => {
    const date = new Date(chat.update_time);
    const label = getDateLabel(date);

    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(chat); // since chat is already of type ChatEntry, we can push it directly
  });
  
  return groups;
};


const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const chatGroups = groupChatsByDate(chatsJson.items);
  const width = sidebarOpen ? '260px' : '0px';

  const handleNewChatClick = () => {
    // Implement your logic here
    console.log("New Chat Clicked");
  };
  return (
    <div
      className="dark flex-shrink-0 overflow-x-hidden bg-black transition-width duration-300"
      style={{ width: width, visibility: sidebarOpen ? 'visible' : 'hidden' }}
    >
      <div className="h-full w-full">
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex h-full min-h-0 flex-col transition-opacity opacity-100">
            <div className="scrollbar-trigger relative h-full w-full flex-1 items-start border-white/20">
              <h2 style={{ position: 'absolute', border: '0px', width: '1px', height: '1px', padding: '0px', margin: '-1px', overflow: 'hidden', clip: 'rect(0px, 0px, 0px, 0px)', whiteSpace: 'nowrap', overflowWrap: 'normal' }}>Chat history</h2>
              <nav aria-label="Chat history" className="flex h-full w-full flex-col px-3 pb-3.5">
                <NewChatButton onClick={handleNewChatClick} />
                <div className="flex-col flex-1 transition-opacity duration-500 -mr-2 pr-2 overflow-y-auto">
                  <div className="flex flex-col gap-2 pb-2 dark:text-gray-100 text-gray-800 text-sm">
                    <span>
                      {Object.entries(chatGroups).map(([label, chats]) => (
                        <ChatList key={label} label={label} chats={chats} />
                      ))}
                    </span>
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
