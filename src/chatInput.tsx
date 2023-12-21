import React, { useState, KeyboardEvent } from 'react';
import SendIcon from './assets/sendIcon';
import './App.css';


interface ChatInputProps {
    onSendMessage: (message: string) => void;
  }
  

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState<string>('');

    const handleSendMessage = () => {
        if (message.trim()) {
          onSendMessage(message);
          setMessage('');
        }
      };
    
      const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          handleSendMessage();
        }
      };


    return (
        <div className="w-full pt-2 md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)]">
            <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl" onSubmit={handleSendMessage}>
                <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                    <div className="flex w-full items-center">
                        <div className="overflow-hidden flex flex-col w-full dark:border-token-border-heavy flex-grow relative border border-token-border-heavy dark:text-white rounded-2xl bg-white dark:bg-gray-800 shadow-[0_0_0_2px_rgba(255,255,255,0.95)] dark:shadow-[0_0_0_2px_rgba(52,53,65,0.95)]">
                            <textarea
                                id="prompt-textarea"
                                tabIndex={0}
                                rows={1}
                                placeholder="Message ChatGPT…"
                                className="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50 pl-10 md:pl-[55px]"
                                style={{ maxHeight: '200px', height: '52px', overflowY: 'hidden' }}
                                value={message}
                                onKeyDown={handleKeyPress}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <button
                                disabled={!message.trim()}
                                className="absolute md:bottom-3 md:right-3 dark:disabled:bg-white disabled:bg-black disabled:opacity-10 disabled:text-gray-400 text-white p-0.5 border rounded-lg dark:border-white dark:bg-white bottom-1.5 transition-colors"
                                data-testid="send-button"
                                type="submit"
                            >
                                <span data-state="closed">
                                    <SendIcon className=""/>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="relative px-2 py-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-[60px]">
                <span>Language Models's can make mistakes. consider checking important information.</span>
            </div>
        </div>
    );
};

export default ChatInput;
