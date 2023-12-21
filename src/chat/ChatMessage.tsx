import React from 'react';
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const messageClass = role === 'assistant' ? 'agent-turn' : 'user-turn'; 
  const avatarColor = role === 'assistant' ? "#AB68FF" : "#FFAB68";

  // Configure marked with syntax highlighting
  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  // Convert Markdown content to HTML
  const htmlContent = marked.parse(content);

  return (
    <div className={`w-full text-token-text-primary ${messageClass}`} style={{ "--avatar-color": avatarColor } as React.CSSProperties}>
      <div className="px-4 py-2 justify-center text-base md:gap-6 m-auto">
        <div className="flex flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group final-completion">
          <div className="relative flex w-full flex-col lg:w-[calc(100%-115px)]">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex flex-grow flex-col max-w-full">
                <div className="min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&]:mt-5 overflow-x-auto">
                  <div className="markdown prose w-full break-words dark:prose-invert" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
