import React, { useState, useContext } from 'react';

interface Message {
  from: string;
  content: string;
}

interface Chat {
  messages: Message[];
  hash: string;
}

interface ChatContextProps {
  chats: Record<string, Chat>;
  setChats: React.Dispatch<React.SetStateAction<Record<string, Chat>>>;
}

export const ChatContext = React.createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC = ({ children }) => {
  const [chats, setChats] = useState<Record<string, Chat>>({});

  return (
    <ChatContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (id: string) => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  const { chats, setChats } = context;

  const chat = chats[id || ''];
  const setChat = (newChat: Chat) => {
    setChats(prevChats => ({ ...prevChats, [id || '']: newChat }));
  };

  // If the hashes don't match, pull the latest chat history from the server
  // and update our local version. For now, we'll assume the hashes always match.
  // TODO: Implement server functionality

  return { chat, setChat };
};
