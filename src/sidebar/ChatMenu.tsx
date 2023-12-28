import React from 'react';
import { Menu } from '@headlessui/react';
import { DotsHorizontalIcon } from '@heroicons/react/outline';

const ChatMenu: React.FC<{ chatId: string }> = ({ chatId }) => {
    return (
        <Menu as="div" className="relative inline-block text-left bottom-0 right-0 top-0 flex items-center gap-1 rounded-lg bg-gradient-to-l from-token-surface-primary from-60% to-transparent pl-10 pr-1">
            <Menu.Button className="text-white">
                <div className="pr-1">
                    <DotsHorizontalIcon className="icon-md w-6 h-6" aria-hidden="true" />
                </div>
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-1 w-36 origin-top-right bg-black divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                    {({ active }) => (
                        <button
                            className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                            Share
                        </button>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <button
                            className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                            Rename
                        </button>
                    )}
                </Menu.Item>
                {/* ... other items ... */}
                <Menu.Item>
                    {({ active }) => (
                        <button
                            className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                            Delete chat
                        </button>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};

export default ChatMenu;