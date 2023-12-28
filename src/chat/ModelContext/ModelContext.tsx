// src/chat/ModelContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Tables } from '../../types/database.types';

type Model = Tables<'models'>;

// Creating the context
export const CurrentModelContext = createContext<{
    selectedModel: Model | null;
    setSelectedModel: (model: Model | null) => void;
}>({
    selectedModel: null,
    setSelectedModel: () => { }
});

// Provider Component
export const CurrentModelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);

    return (
        <CurrentModelContext.Provider value={{ selectedModel, setSelectedModel }}>
            {children}
        </CurrentModelContext.Provider>
    );
};
