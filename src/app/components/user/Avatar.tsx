import React, { useEffect, useRef } from 'react';
import Jdenticon from './Jdenticon';
import { useAuth } from '../auth/useAuth';
import { useAvatar } from './useAvatar';

interface AvatarProps {
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ className }) => {
    const avatarRef = useRef(null);
    const { session, setSession } = useAuth(); // react context holding the supa session, and set fn
    const { avatar, setAvatar } = useAvatar();

    useEffect(() => {
        const email = session?.user?.email; // Move email inside useEffect
        if (!avatar && email) { // Check if email is defined
            if (session?.user.user_metadata?.avatar_url) {
                setAvatar(<img src={session.user.user_metadata.avatar_url} alt="User avatar"  className='rounded-sm'/>);
                return;
            } else {
                setAvatar(<Jdenticon size="24" value={email} className='rounded-sm' />)
            }
        }
    }, [session, avatar]); // Use session in the dependency array

    return (
            <div className="pt-0.5">
                <div className={`gizmo-shadow-stroke flex items-center justify-center overflow-hidden rounded-full ${className}`}>
                    <div className="relative flex">
                        {avatar}
                    </div>
                </div>
            </div>)
};

export default Avatar;
