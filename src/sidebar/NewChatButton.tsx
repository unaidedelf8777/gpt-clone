import React from 'react';

interface NewChatButtonProps {
  onClick: () => void;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ onClick }) => {
  return (
    <div className="sticky left-0 right-0 top-0 z-20 bg-black pt-3.5">
      <div className="pb-0.5 last:pb-0">
        <button
          className="group flex h-10 items-center gap-2 rounded-lg px-2 font-medium hover:bg-token-surface-primary text-white items-center "
          onClick={onClick}
        >
          New Chat
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 3.33334V8H12.6667V8.66667H8V13.3333H7.33333V8.66667H2.66667V8H7.33333V3.33334H8Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NewChatButton;
