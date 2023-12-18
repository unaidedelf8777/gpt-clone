import React from 'react';

interface SendIconProps {
    className?: string;
}

const SendIcon: React.FC<SendIconProps> = ({ className }) => {
    // Define a base class string
    const baseClasses = "text-white bg-black dark:text-black dark:bg-white";
    // Combine base classes with any additional classes passed via props
    const combinedClasses = `${baseClasses} ${className}`;
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={combinedClasses}>
            <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    );
};

export default SendIcon;