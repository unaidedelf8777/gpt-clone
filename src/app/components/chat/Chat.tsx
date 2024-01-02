// This is a lifted component to house the contexts for the chat display. no function other than that.

import React, { useState, useEffect } from 'react';
import WelcomeChat from './WelcomeChat';
import ChatDisplay from './ChatDisplay';
import { useChat, UseChatOptions, Message, CreateMessage } from 'ai/react';
import { useNavigate, NavigateOptions } from 'react-router-dom';
import { useCurrentModel } from './ModelContext/useModelContext';
import createNewChat from '../utils/makeNewChat';
import { v4 as uuidv4} from 'uuid';
import { useAuth } from '../auth/useAuth';


interface ChatProps {
    id?: string;
}



const Chat: React.FC<ChatProps> = ({ id }) => {
    const navigate = useNavigate();
    const [navigated, setNavigated] = useState<boolean>(false);
    const changeUrlWithoutRendering = (newUrl: string) => {
        navigate(newUrl, { replace: true });
    };
    const OnR = (m: Message) => {
        console.log(m);
    }
    const { selectedModel } = useCurrentModel();
    const [ ChatId, setId] = useState<string>(!id ? uuidv4() : id);
    const {session, setSession} = useAuth();
    const options: UseChatOptions = {
        id: ChatId,
        api: selectedModel && typeof selectedModel['meta'] === 'object' && selectedModel['meta'] !== null ? (selectedModel['meta'] as { service_url?: string }).service_url : 'http://localhost:3000/api/chat',
        body: {
            stream: true,
            max_tokens: -1,
            temperature: 0.5,
            model: selectedModel ? selectedModel['model-slug'] : undefined,
        },
        onFinish: OnR,

    };
    const { messages, input, handleInputChange, handleSubmit, error, append, reload, stop, isLoading } = useChat(options);
    const [showWelcome, setShowWelcome] = useState<boolean>(false);
    

    useEffect(() => {
        if (messages.length == 0) {
            setShowWelcome(true);
        } else {
            setShowWelcome(false);
        }

        if (messages.length == 2 && selectedModel && selectedModel['model-slug']) {
            createNewChat(ChatId, messages[0], selectedModel['model-slug'], session?.user.id);
            changeUrlWithoutRendering(`/c/${ChatId}`);

        }
    }, [messages.length, ChatId, selectedModel]);

    const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
        // Provide the necessary arguments to handleSubmit
        handleSubmit(e);
    };

    return (
        <>
            {showWelcome ? (
                <WelcomeChat
                    input={input}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmitWrapper}
                    append={append}
                />
            ) : (
                <ChatDisplay messages={messages} handleInputChange={handleInputChange} handleSubmit={handleSubmitWrapper} reload={reload} isLoading={isLoading} stop={stop} />
            )}
        </>
    );
};

export default Chat;
