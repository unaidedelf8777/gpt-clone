import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollToBottomProps {
    children?: ReactNode; // Add this line
    pollRate?: number; // in milliseconds
    resumeButton?: React.ReactElement; // Button to resume auto-scroll passed as a prop
}

const ScrollToBottom: React.FC<ScrollToBottomProps> = ({ children, pollRate = 100, resumeButton }) => {
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (isAutoScrollActive) {
                scrollToBottom();
            }
        }, pollRate);

        return () => clearInterval(interval);
    }, [isAutoScrollActive, pollRate]);

    const handleUserScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
            const isAtBottom = scrollTop + clientHeight === scrollHeight;
            setIsAutoScrollActive(isAtBottom);
        }
    };

    const ResumeButton = resumeButton 
        ? React.cloneElement(resumeButton, { onClick: () => setIsAutoScrollActive(true) }) 
        : null;

    return (
        <>
            <div onScroll={handleUserScroll} ref={scrollContainerRef} style={{ overflowY: 'auto', maxHeight: '90vh' }}>
                {children}
                <div ref={bottomRef} />
            </div>
            {ResumeButton && !isAutoScrollActive && ResumeButton}
        </>
    );
};

export default ScrollToBottom;
