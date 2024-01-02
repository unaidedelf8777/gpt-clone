import React, { useRef, useEffect, useState } from 'react';
import SendIcon from './sendIcon';
import './App.css';
import PromptButton from './chat/ExamplePrompt';

interface ChatInputProps {
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isWelcomePage?: boolean;
    append?: (arg0: string) => void;
    isLoading: boolean;
    stop: () => void;
}

interface Prompt {
    title: string;
    description: string;
    prompt: string;
}

const isMobile = () => window.innerWidth <= 768;


const ChatInput: React.FC<ChatInputProps> = ({ input, handleInputChange, handleSubmit, isWelcomePage = false, append, isLoading, stop }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [p1, setP1] = useState<Prompt[]>([]);
    const [p2, setP2] = useState<Prompt[]>([]);
    const [message, setMessage] = useState<string>(''); // the input state provided by vercel/ai doesnt work for some reason.

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = '52px'; // start from 52px
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // then increase by its scrollHeight
        }
    }, [message]); // use message, since input broken

    const handleInputChangeWrapper = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        handleInputChange(e);
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            setMessage('');
        }
    }

    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch("/api/prompt_library?offset=0&total=4");
            const prompts = await response.json();

            setP1(prompts.slice(0, 2)); // This will get the first two prompts
            setP2(prompts.slice(2, 4)); // This will get the next two prompts
        };
        if (isWelcomePage) {
            fetchPrompts();
        }

    }, []);

    return (
        <div className="w-full pt-2 md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)]">
            <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl" onSubmit={handleSubmit}>
                <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                    {isWelcomePage && (<div>
                        <div className='h-full flex ml-1 md:w-full md:m-auto md:mb-4 gap-0 md:gap-2 justify-center'>
                            <div className='grow'>
                                <div className='absolute bottom-full left-0 mb-4 flex w-full grow gap-2 px-1 pb-1 sm:px-2 sm:pb-0 md:static md:mb-0 md:max-w-none'>
                                    <div className='grid w-full grid-flow-row grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            {p1.map((prompt, index) => (
                                                <PromptButton key={index} title={prompt.title} description={prompt.description} prompt={prompt.prompt} append={append} />
                                            ))}
                                        </div>
                                        {!isMobile() ? (
                                            <div className="flex flex-col gap-2">
                                                {p2.map((prompt, index) => (
                                                    <PromptButton key={index} title={prompt.title} description={prompt.description} prompt={prompt.prompt} append={append} />
                                                ))}
                                            </div>) : <></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                    <div className="flex w-full items-center">
                        <div className="overflow-hidden flex flex-col w-full dark:border-token-border-heavy flex-grow relative border border-token-border-heavy dark:text-white rounded-2xl bg-white dark:bg-gray-800 shadow-[0_0_0_2px_rgba(255,255,255,0.95)] dark:shadow-[0_0_0_2px_rgba(52,53,65,0.95)]">
                            <textarea
                                ref={textAreaRef}
                                id="prompt-textarea"
                                tabIndex={0}
                                rows={1}
                                placeholder="Send a Message..."
                                className="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50 pl-10 md:pl-[55px]"
                                style={{ maxHeight: '200px', overflowY: 'auto' }}
                                value={message}
                                onKeyDown={handleKeyDown}
                                onChange={handleInputChangeWrapper}
                            />

                            {isLoading ? (
                                <div className="absolute bottom-0 right-2 top-0 p-1 md:right-3 md:p-2">
                                    <div className="flex h-full">
                                        <div className="flex h-full flex-row items-center justify-center gap-3">
                                            <button
                                                type="button"
                                                className="rounded-full border-2 border-gizmo-gray-950 p-1 dark:border-gray-200"
                                                aria-label="Stop generating"
                                                onClick={stop}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 16 16"
                                                    fill="currentColor"
                                                    className="h-2 w-2 text-gizmo-gray-950 dark:text-gray-200"
                                                    height={16}
                                                    width={16}
                                                >
                                                    <path
                                                        d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"
                                                        strokeWidth={0}
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    disabled={!message.trim()}
                                    className="absolute md:bottom-3 md:right-3 dark:disabled:bg-white disabled:bg-black disabled:opacity-10 disabled:text-gray-400 text-white p-0.5 border rounded-lg dark:border-white dark:bg-white bottom-1.5 transition-colors"
                                    data-testid="send-button"
                                    type="submit"
                                >
                                    <span data-state="closed">
                                        <SendIcon className="" />
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
            <div className="relative px-2 py-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-[60px]">
                <span>Language Models&apos;s can make mistakes. consider checking important information.</span>
            </div>
        </div>
    );
};

export default ChatInput;
