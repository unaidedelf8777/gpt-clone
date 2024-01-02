import React from 'react';
import ChatInput from '../chatInput';
import ChatMessage from './ChatMessage';
import ScrollToBottom, { useScrollToBottom, useSticky, useScrollToEnd } from 'react-scroll-to-bottom';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export interface ChatDisplayProps {
    id?: string;
    messages: Message[];
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    reload: () => void
    isLoading: boolean,
    stop: () => void,
}

interface ChatContentProps {
    messages: Message[];
    reload: () => void;
    isLoading: boolean;
}

const ChatContent: React.FC<ChatContentProps> = ({ messages, reload, isLoading }) => {
    const scrollToBottom = useScrollToBottom();
    const [sticky] = useSticky();
    useScrollToEnd();

    return (
        <ScrollToBottom pollRate={1}>
            <div className="chat-content">
                {messages.map((message, index) => (
                    <ChatMessage
                        key={message.id}
                        id={message.id}
                        role={message.role}
                        content={message.content}
                        reload={reload}
                        isLoading={isLoading && index === messages.length - 1}
                    />
                ))}
            </div>
        </ScrollToBottom>
    );
};

const ChatDisplay: React.FC<ChatDisplayProps> = ({ id, messages, input, handleInputChange, handleSubmit, reload, isLoading, stop }) => {


    return (
        <div
            className="flex h-full flex-col"
            role="presentation"
            tabIndex={0}
        >
            <div className="flex-1 overflow-hidden overflow-y-auto">
                <div className="w-full flex flex-col flex-1 justify-between">
                    <div className="flex flex-col pb-9 text-sm">
                        <ScrollToBottom mode="bottom">
                            <div className='h-7 w-full'></div>
                            <ChatContent messages={messages} reload={reload} isLoading={isLoading} />
                        </ScrollToBottom>
                    </div>
                </div>
            </div>
            <ChatInput handleInputChange={handleInputChange} input={input} handleSubmit={handleSubmit} isLoading={isLoading} stop={stop} />
        </div>

    );
};

export default ChatDisplay;
