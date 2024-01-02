import React, { useState, ReactNode } from 'react';

const defaultAvatarState = {
  avatar: null,
  setAvatar: (_: any) => {},
};

export const AvatarContext = React.createContext(defaultAvatarState);

type AvatarProviderProps = {
  children: React.ReactNode;
};

export const AvatarProvider: React.FC<AvatarProviderProps> = ({ children }) => {
  const [avatar, setAvatar] = useState(null);

  return (
    <AvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};