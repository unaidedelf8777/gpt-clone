import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';
import { ChatEntry } from './ChatList'; // Adjust the import path if necessary

interface ChatContextType {
  chats: ChatEntry[];
  updateChatEntryById: (id: string, updatedFields: Partial<ChatEntry>) => void;
  addNewChatEntry: (newChatEntry: ChatEntry) => void;
}

export const ChatContext = createContext<ChatContextType>({
  chats: [],
  updateChatEntryById: () => {},
  addNewChatEntry: () => {}
});

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chats, setChats] = useState<ChatEntry[]>([]);

  const updateChatEntryById = useCallback((id: string, updatedFields: Partial<ChatEntry>) => {
    setChats(prevChats => prevChats.map(chat => 
      chat.chat_id === id ? { ...chat, ...updatedFields } : chat
    ));
  }, []);

  const addNewChatEntry = useCallback((newChatEntry: ChatEntry) => {
    setChats(prevChats => [...prevChats, newChatEntry]);
  }, []);

  return (
    <ChatContext.Provider value={{ chats, updateChatEntryById, addNewChatEntry }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook for easy context usage
export const useChatContext = () => useContext(ChatContext);
