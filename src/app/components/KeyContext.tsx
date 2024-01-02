import React, { createContext, useState, useContext } from 'react';

export interface KeyContextProps {
  key: number;
  setKey: React.Dispatch<React.SetStateAction<number>>;
}

export const KeyContext = createContext<KeyContextProps | undefined>(undefined);

interface KeyProviderProps {
    children: React.ReactNode;
}
export const KeyProvider: React.FC<KeyProviderProps> = ({ children }) => {
  const [key, setKey] = useState<number>(0);

  return (
    <KeyContext.Provider value={{ key, setKey }}>
      {children}
    </KeyContext.Provider>
  );
};

export const useKey = (): KeyContextProps => {
  const context = useContext(KeyContext);
  if (!context) {
    throw new Error('useKey must be used within a KeyProvider');
  }
  return context;
};
