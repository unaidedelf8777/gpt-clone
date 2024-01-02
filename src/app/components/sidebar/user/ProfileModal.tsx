import React from 'react';

export interface ProfileModalProps {
    logout: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ logout }) => {

    return (
        <button
            onClick={logout}
            className="flex px-3 min-h-[44px] py-1 items-center gap-3 dark:text-white cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-token-surface-primary mt-3 rounded-lg"
            id="headlessui-menu-item-:rav:"
            role="menuitem"
            tabIndex={-1}
            data-headlessui-state=""
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
            Log out
        </button>

    );
};

export default ProfileModal;
