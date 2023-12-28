import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import ChatInput from "../chatInput";
import WelcomeChat from "./WelcomeChat";
import ChatMessage from './ChatMessage';
import ModelSelector from "./ModelSelector";
import { CurrentModelProvider } from "./ModelContext/ModelContext";

export interface ChatDisplayProps {
    id?: string;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ id }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [convoId, setConvoId] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleNewMessage = (newMessage: string) => {
        console.log("newmessage triggered");
        if (!id) {
            const newConvoId = uuidv4();
            setConvoId(newConvoId);
            navigate(`/c/${newConvoId}`);
        }
        const newMessageObj: Message = { id: uuidv4(), role: 'user', content: newMessage };
        console.log(newMessageObj.content);
        setMessages(prevMessages => [...prevMessages, newMessageObj]);
    };

    return (
        <div
            className="flex h-full flex-col"
            role="presentation"
            tabIndex={0}
        >
            <div className="flex-1 overflow-hidden overflow-y-auto">
                {id || convoId ? (
                    <div className="w-full flex flex-col flex-1 justify-between">
                        <div className="flex flex-col pb-9 text-sm">
                            <ModelSelector />
                            {messages.map((message) => (
                                <ChatMessage key={message.id} role={message.role} content={message.content} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <ModelSelector />
                        <WelcomeChat />
                    </>
                )}
            </div>
            <ChatInput onSendMessage={handleNewMessage} />
        </div>

    );
};

export default ChatDisplay;
