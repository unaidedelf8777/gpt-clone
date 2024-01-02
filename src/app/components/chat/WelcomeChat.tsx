import React from 'react';
import ChatInput from '../chatInput';
import Image from 'next/image';
import ModelSelector from './ModelSelector';

interface WelcomeChatProps {
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    append: (arg0: string) => void;
}

const WelcomeChat: React.FC<WelcomeChatProps> = ({ input, handleInputChange, handleSubmit, append }) => {
    return (
        <div
            className="flex h-full flex-col"
            role="presentation"
            tabIndex={0}
        >   
            <ModelSelector />
            <div className="flex-1 overflow-hidden overflow-y-auto">
                <div className="flex h-full flex-col justify-center">
                    <div className="flex-1 overflow-hidden">
                        <div className="relative h-full">
                            <div className="flex h-full flex-col items-center justify-center items-center">
                                <div className="h-20 w-20">
                                    <img src='/abstract.png'></img>
                                </div>
                                <div className="mb-5 mt-0 text-2xl text-white font-medium opacity-80">How can I help you today?</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ChatInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isWelcomePage={true} append={append} />
        </div>
    )
}

export default WelcomeChat;