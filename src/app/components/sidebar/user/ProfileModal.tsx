import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { Menu } from '@headlessui/react';
import { useAvatar } from '../../user/useAvatar';

export interface ProfileModalProps {
    logout: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ logout }) => {

    const { session, setSession } = useAuth();

    const { avatar, setAvatar } = useAvatar();

    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        if (session?.user.user_metadata?.full_name) {
            setName(session?.user.user_metadata?.full_name)
        } else if (session?.user.user_metadata?.name) {
            setName(session.user.user_metadata.name)
        } else if (session?.user.user_metadata?.preferred_username) {
            setName(session.user.user_metadata.preferred_username)
        } else if (session?.user.user_metadata?.username) {
            setName(session?.user.user_metadata?.username)
        } else if (session && session.user.email) {
            const email = session.user.email
            setName(email.split("@")[0])
        } else {
            setName("Guest");
        }
    }, [session])

    return (
        <div className="flex flex-col pt-2 empty:hidden dark:border-white/20">
            <div className="flex w-full items-center">
                <div className='grow'>
                    <div className="group relative">
                        <Menu>
                            <Menu.Button
                                className="flex w-full items-center gap-2 rounded-lg p-2 text-sm hover:bg-gray-100 hover:bg-token-surface-primary group-ui-open:bg-gray-100 group-ui-open:bg-token-surface-primary dark:hover:bg-token-surface-primary dark:group-ui-open:bg-gray-800  dark:group-ui-open:bg-token-surface-primary"
                            >
                                <div className="flex-shrink-0">
                                    <div className='flex justify-center items-center overflow-hidden rounded-full'>
                                        <div className='relative flex h-6 w-6'>
                                            {avatar}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative -top-px grow -space-y-px overflow-hidden text-ellipsis whitespace-nowrap text-left text-gray-700 dark:text-white">
                                    <div className="font-semibold">
                                        {name}
                                    </div>
                                </div>
                            </Menu.Button >
                            <Menu.Items className={`absolute bottom-full left-0 z-20 mb-1 w-full overflow-hidden rounded-lg border border-gray-100 bg-white pb-1.5 pt-1 outline-none dark:border-gray-800 dark:bg-gray-900 opacity-100 translate-y-0`}>
                                <Menu.Item>
                                    <button
                                        className='w-full flex px-3 min-h-[44px] py-1 items-center gap-3 dark:text-white cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-800'
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-md"><path d="M11.6439 3C10.9352 3 10.2794 3.37508 9.92002 3.98596L9.49644 4.70605C8.96184 5.61487 7.98938 6.17632 6.93501 6.18489L6.09967 6.19168C5.39096 6.19744 4.73823 6.57783 4.38386 7.19161L4.02776 7.80841C3.67339 8.42219 3.67032 9.17767 4.01969 9.7943L4.43151 10.5212C4.95127 11.4386 4.95127 12.5615 4.43151 13.4788L4.01969 14.2057C3.67032 14.8224 3.67339 15.5778 4.02776 16.1916L4.38386 16.8084C4.73823 17.4222 5.39096 17.8026 6.09966 17.8083L6.93502 17.8151C7.98939 17.8237 8.96185 18.3851 9.49645 19.294L9.92002 20.014C10.2794 20.6249 10.9352 21 11.6439 21H12.3561C13.0648 21 13.7206 20.6249 14.08 20.014L14.5035 19.294C15.0381 18.3851 16.0106 17.8237 17.065 17.8151L17.9004 17.8083C18.6091 17.8026 19.2618 17.4222 19.6162 16.8084L19.9723 16.1916C20.3267 15.5778 20.3298 14.8224 19.9804 14.2057L19.5686 13.4788C19.0488 12.5615 19.0488 11.4386 19.5686 10.5212L19.9804 9.7943C20.3298 9.17767 20.3267 8.42219 19.9723 7.80841L19.6162 7.19161C19.2618 6.57783 18.6091 6.19744 17.9004 6.19168L17.065 6.18489C16.0106 6.17632 15.0382 5.61487 14.5036 4.70605L14.08 3.98596C13.7206 3.37508 13.0648 3 12.3561 3H11.6439Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="2"></circle></svg>
                                        Settings
                                    </button>
                                </Menu.Item>
                                <div className="h-px dark:bg-white/10 bg-black/20"></div>
                                <Menu.Item>
                                    <button className="w-full flex px-3 min-h-[44px] py-1 items-center gap-3 dark:text-white cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                                            onClick={logout}
                                    >
                                        <svg
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon-md"
                                        >
                                            <path
                                                d="M11 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H11"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M20 12H11M20 12L16 16M20 12L16 8"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Log Out
                                    </button>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu >
                    </div>
                </div>
            </div>
        </div>


    );
};

export default ProfileModal;