import React from 'react';

interface SidebarToggleProps {
  onClick: () => void;
  isOpen: boolean;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ onClick, isOpen }) => {
  const [hovered, setHovered] = React.useState(false);

  const buttonStyle = {
    transform: `translateX(${isOpen ? '260px' : '0px'}) translateY(-50%) rotate(${isOpen ? '0deg' : '180deg'}) translateZ(0px)`,
    opacity: hovered ? 1 : 0.25
  };

  const lineStyle = {
    transition: 'transform 0.1s ease' // Adding transition for the transform property
  };

  const topLineStyle = {
    ...lineStyle,
    transform: `translateY(0.15rem) rotate(${hovered ? '15deg' : '0deg'}) translateZ(0px)`
  };

  const bottomLineStyle = {
    ...lineStyle,
    transform: `translateY(-0.15rem) rotate(${hovered ? '-15deg' : '0deg'}) translateZ(0px)`
  };

  return (
    <div className="fixed left-0 top-1/2 z-40" style={buttonStyle}>
      <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <span data-state={isOpen ? 'delayed-open' : 'closed'}>
          <div className="flex h-[72px] w-8 items-center justify-center">
            <div className="flex h-6 w-6 flex-col items-center">
              <div className="h-3 w-1 rounded-full bg-token-text-primary" style={topLineStyle}></div>
              <div className="h-3 w-1 rounded-full bg-token-text-primary" style={bottomLineStyle}></div>
            </div>
          </div>
          <span style={{ position: 'absolute', border: '0px', width: '1px', height: '1px', padding: '0px', margin: '-1px', overflow: 'hidden', clip: 'rect(0px, 0px, 0px, 0px)', whiteSpace: 'nowrap', overflowWrap: 'normal', visibility: hovered ? 'visible' : 'hidden' }}>
            {isOpen ? 'Close sidebar' : 'Open sidebar'}
          </span>
        </span>
      </button>
    </div>
  );
};

export default SidebarToggle;
