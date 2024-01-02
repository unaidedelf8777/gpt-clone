// src/chat/ModelContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Tables } from '../../types/database.types';
import { useAuth } from '../../auth/useAuth';

type Model = Tables<'models'>;

// Create a context for the models
const ModelsContext = createContext<Model[]>([]);

// Create a provider component that fetches the models
const ModelsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [models, setModels] = useState<Model[]>([]);
    const {session, setSession} = useAuth();

    useEffect(() => {
        const fetchModels = async () => {
            if (!session) {
                return;
            }

            const response = await fetch(`/api/models`, {
                headers: {
                  'Authorization': `Bearer ${session.access_token}`
                }});

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                return;
            }

            const data = await response.json();

            if (data.error) {
                console.error('Error fetching models:', data.error);
            } else {
                setModels(data);
            }
        };

        fetchModels();
    }, [session]); 

    return (
        <ModelsContext.Provider value={models}>
            {children}
        </ModelsContext.Provider>
    );
};

export { ModelsContext, ModelsProvider };
