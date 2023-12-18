import React from 'react';

interface ChatProps {
  id: string;
  title: string;
}

const Chat: React.FC<ChatProps> = ({ id, title }) => {
  return (
    <li className="relative hover-opacity-90 bg-gray-900-hover-important" style={{ opacity: 1, height: 'auto', overflow: 'hidden' }}>
      <div className="group relative active:opacity-90">
        <a
          href={`/c/${id}`}
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

export default Chat;
