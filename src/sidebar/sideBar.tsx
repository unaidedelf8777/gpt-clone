import React, { useEffect, useState, useCallback, useRef } from 'react';
import fetchUserConversations from '../utils/getConversations';
import { ChatEntry } from './ChatList'; // Make sure this path is correct
import ChatList from './ChatList';
import NewChatButton from './NewChatButton';
import ProfileModal from './user/ProfileModal';
import { Session } from '@supabase/supabase-js';
import { useChatContext } from './ChatContext';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  logout: () => void;
  session?: Session;
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

const groupChatsByDate = (chats: ChatEntry[]): Record<string, ChatEntry[]> => {
  const groups: Record<string, ChatEntry[]> = {};

  // First, sort chats based on their updated_at field
  chats.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  chats.forEach((chat) => {
    const date = new Date(chat.updated_at);
    const label = getDateLabel(date);

    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(chat);
  });

  return groups;
};



const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar, logout, session }) => {
  const { chats, addNewChatEntry } = useChatContext();
  const [offset, setOffset] = useState(0);
  const limit = 30;
  const loader = useRef<HTMLDivElement>(null);

  const loadMoreChats = useCallback(async () => {
    if (session?.user?.id) {
      const data = await fetchUserConversations(session.user.id, limit, offset);
      if ('error' in data) {
        console.error(data.error);
      } else {
        const r = await data.json();
        if (r.items) {
          r.items.forEach((item: ChatEntry) => addNewChatEntry(item));
          setOffset(prevOffset => prevOffset + r.items.length);
        }
      }
    }
  }, [session?.user?.id, offset, addNewChatEntry]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMoreChats();
      }
    }, { threshold: 1.0 });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loadMoreChats]);
  
  const width = sidebarOpen ? '260px' : '0px';

  const handleNewChatClick = () => {
    // Implement logic for adding a new chat
    console.log("New Chat Clicked");
  };

  const sortedChatGroups = Object.entries(groupChatsByDate(chats))
    .sort((a, b) => {
      // Get the most recent date in each group
      const mostRecentDateA = new Date(a[1][0].updated_at).getTime();
      const mostRecentDateB = new Date(b[1][0].updated_at).getTime();

      return mostRecentDateB - mostRecentDateA;
    });
  return (
    <div
      className="dark flex-shrink-0 overflow-x-hidden bg-black"
      style={{ width: width, visibility: sidebarOpen ? 'visible' : 'hidden' }}
    >
      <div className="h-full w-[260px]">
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex h-full min-h-0 flex-col transition-opacity opacity-100">
            <div className="scrollbar-trigger relative h-full w-full flex-1 items-start border-white/20">
              <h2 style={{ position: 'absolute', border: '0px', width: '1px', height: '1px', padding: '0px', margin: '-1px', overflow: 'hidden', clip: 'rect(0px, 0px, 0px, 0px)', whiteSpace: 'nowrap', overflowWrap: 'normal' }}>Chat history</h2>
              <nav aria-label="Chat history" className="flex h-full w-full flex-col px-3 pb-3.5">
                <NewChatButton onClick={handleNewChatClick} />
                <div className="flex-col flex-1 transition-opacity duration-500 -mr-2 pr-2 overflow-y-auto">
                  <div className="flex flex-col gap-2 pb-2 dark:text-gray-100 text-gray-800 text-sm">
                    <div>
                      <span>
                        {Object.entries(sortedChatGroups).map(([, [label, chats]]: [string, [string, ChatEntry[]]]) => (
                          <ChatList key={label} label={label} chats={chats} />
                        ))}
                      </span>
                    </div>
                    <div ref={loader} style={{ height: '1px' }}></div> {/* Sentinel element */}
                  </div>
                </div>
                <ProfileModal logout={logout} />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
