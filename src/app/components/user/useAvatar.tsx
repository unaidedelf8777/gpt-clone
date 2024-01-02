import { useContext } from 'react';
import { AvatarContext } from './AvatarContext';

export const useAvatar = () => {
    const {avatar, setAvatar} = useContext(AvatarContext);
    return { avatar, setAvatar };
};
