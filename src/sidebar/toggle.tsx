import React from 'react';

interface SidebarToggleProps {
  onClick: () => void;
  isOpen: boolean;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ onClick, isOpen }) => {
  const rotationStyle = isOpen
    ? { transform: 'translateY(0.15rem) rotate(180deg) translateZ(0px)' }
    : { transform: 'translateY(0.15rem) rotate(0deg) translateZ(0px)' };

  return (
    <div
      className="fixed left-0 top-1/2 z-40"
      style={{ transform: 'translateX(260px) translateY(-50%) rotate(0deg) translateZ(0px)' }}
    >
      <button onClick={onClick}>
        <span data-state={isOpen ? 'open' : 'closed'}>
          <div
            className="flex h-[72px] w-8 items-center justify-center"
            style={{ opacity: 0.25 }}
          >
            <div className="flex h-6 w-6 flex-col items-center">
              <div
                className="h-3 w-1 rounded-full bg-token-text-primary"
                style={rotationStyle}
              ></div>
              <div
                className="h-3 w-1 rounded-full bg-token-text-primary"
                style={{ transform: 'translateY(-0.15rem) rotate(0deg) translateZ(0px)' }}
              ></div>
            </div>
          </div>
          <span
            style={{
              position: 'absolute',
              border: '0px',
              width: '1px',
              height: '1px',
              padding: '0px',
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0px, 0px, 0px, 0px)',
              whiteSpace: 'nowrap',
              overflowWrap: 'normal',
            }}
          >
            {isOpen ? 'Close sidebar' : 'Open sidebar'}
          </span>
        </span>
      </button>
    </div>
  );
};

export default SidebarToggle;
