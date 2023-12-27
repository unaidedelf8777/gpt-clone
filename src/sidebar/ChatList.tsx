import React from 'react';

export interface ChatEntry {
  chat_id: string;
  user_id?: string; // If not used in the component, it can be removed from the interface
  title: string;
  created_at: string;
  updated_at: string;
  first_message_id?: string | null; // Add this if needed, or remove if not used
}

const Chat: React.FC<ChatEntry> = ({ chat_id, title, created_at, updated_at }) => {
  return (
    <li className="relative" style={{ opacity: 1, height: 'auto', overflow: 'hidden' }}>
      <div className="group relative active:opacity-90">
        <a
          href={`/c/${chat_id}`}
          className="flex items-center gap-2 rounded-lg p-2 hover:bg-token-surface-primary"
        >
          <div className="relative grow overflow-hidden whitespace-nowrap dark:text-gray-100 text-gray-800">
            {title}
            <div className="absolute bottom-0 right-0 top-0 w-8 bg-gradient-to-l to-transparent from-token-surface-primary group-hover:from-token-surface-primary dark:from-black"></div>
          </div>
        </a>
      </div>
    </li>
  );
};

interface ChatListProps {
  chats: ChatEntry[];
  label: string;
}

const ChatList: React.FC<ChatListProps> = ({ chats, label }) => {
  return (
    <div className="relative mt-5" style={{ opacity: 1, transform: 'none', transformOrigin: '50% 50% 0px' }}>
      <h3 className="h-9 pb-2 pt-3 px-2 text-xs font-medium text-ellipsis overflow-hidden break-all bg-white dark:bg-black text-gizmo-gray-600">
        {label}
      </h3>
      <ol>
        {chats.map((chat) => (
          <Chat key={chat.chat_id} chat_id={chat.chat_id} title={chat.title} created_at={chat.created_at} updated_at={chat.updated_at} />
        ))}
      </ol>
    </div>
  );
};

export default ChatList;
