import React from 'react';
import Logo from '../assets/abstract.png';


const WelcomeChat: React.FC = () => {

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 overflow-hidden">
                <div className="relative h-full">
                    <div className="flex h-full flex-col items-center justify-center items-center">
                        <div className="h-20 w-20">
                            <img src={Logo}></img>
                        </div>
                        <div className="mb-5 mt-0 text-2xl text-white font-medium opacity-80">How can I help you today?</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeChat;