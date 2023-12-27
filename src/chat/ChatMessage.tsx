import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import markedKatex from "marked-katex-extension";

//modules
import CodeBlock from './CodeBlock';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = React.memo(({ role, content }) => {
  const katexOptions = {
    throwOnError: false,
    displayMode: true
  };
  const messageClass = role === 'assistant' ? 'agent-turn' : 'user-turn'; 
  const avatarColor = role === 'assistant' ? "#AB68FF" : "#FFAB68";
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const marked = new Marked(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'text';
          const highlightedCode = hljs.highlight(code, { language }).value;
          const codeBlockElement = <CodeBlock lang={language} code={highlightedCode} />;
          return ReactDOMServer.renderToStaticMarkup(codeBlockElement);
        }
      })
    );
    marked.use(markedKatex(katexOptions))

    const parseContent = async () => {
      const result = await marked.parse(content);
      setHtmlContent(result);
    };

    parseContent();
  }, [content]);

  return (
    <div className={`w-full text-token-text-primary`} style={{ "--avatar-color": avatarColor } as React.CSSProperties}>
      <div className="px-4 py-2 justify-center text-base md:gap-6 m-auto">
        <div className="flex flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group agent-turn">
          <div className="flex-shrink-0 flex flex-col relative items-end">
            <span className='w-24px'></span>
          </div>
          <div className="relative flex w-full flex-col lg:w-[calc(100%-115px)]">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex flex-grow flex-col max-w-full">
                <div className="min-h-[20px] text-message flex flex-col items-start gap-3 break-words [.text-message+&]:mt-5 overflow-x-auto px-0 justify-center">
                  <div className="markdown prose w-full break-words dark:prose-invert" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ChatMessage;
