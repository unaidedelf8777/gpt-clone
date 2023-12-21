import React, { useState } from "react";
import ChatInput from "../chatInput";
import WelcomeChat from "./WelcomChat";
import ChatMessage from './ChatMessage';

export interface ChatDisplayProps {
    id?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ id }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [welcomeShown, setWelcomeShown] = useState(true);

    const handleNewMessage = (newMessage: string) => {
        setMessages([...messages, { role: 'user', content: newMessage }]);
        if (welcomeShown) {
            setWelcomeShown(false);
        }
    };

    return (
        <div className="flex h-full flex-col">
            {id ? (
                <div>
                    {/* Display messages here */}
                    {messages.map((message, index) => (
                        <ChatMessage key={index} role={message.role} content={message.content} />
                    ))}
                </div>
            ) : (
                // If no ID is provided, render the WelcomeComponent
                welcomeShown && <WelcomeChat />
            )}
            <ChatInput onSendMessage={handleNewMessage} />
        </div>
    );
};

export default ChatDisplay;
