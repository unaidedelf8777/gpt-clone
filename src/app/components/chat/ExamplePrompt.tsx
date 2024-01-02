import React from 'react';
import { Message } from 'ai/react';
import {v4 as uuidv4} from 'uuid';

type Props = {
    title: string;
    description: string;
    prompt: string;
    append: (arg0: Message) => void;
};

const PromptButton: React.FC<Props> = ({ title, description, prompt, append }) => {
    return (
        <span style={{ opacity: 1, transform: 'none' }}>
            <button className="btn relative btn-neutral group w-full whitespace-nowrap rounded-xl px-4 py-3 text-left text-gray-700 dark:text-gray-300 md:whitespace-normal"
                onClick={() => { 
                    const msg: Message = {
                        id: uuidv4(),
                        role:"user",
                        content: prompt
                    };
                    append(msg);
                }}
            >
                <div className="flex w-full gap-2 items-center justify-center">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col overflow-hidden">
                            <div className="truncate">{title}</div>
                            <div className="truncate font-normal opacity-50">{description}</div>
                        </div>
                        <div className="absolute bottom-0 right-0 top-0 flex items-center rounded-xl bg-gradient-to-l from-gray-50 from-[60%] pl-6 pr-4 text-gray-700 opacity-0 group-hover:opacity-100 dark:from-gray-700 dark:text-gray-200">
                            <span className="" data-state="closed">
                                <div className="rounded-lg bg-token-surface-primary p-1 shadow-xxs dark:shadow-none">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="icon-sm text-token-text-primary">
                                        <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </button>
        </span>
    );
};

export default PromptButton;